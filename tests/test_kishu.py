import copy
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest
from unittest import mock


PROJECT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("kishu", PROJECT / "scripts/kishu.py")
kishu = importlib.util.module_from_spec(spec)
spec.loader.exec_module(kishu)


class BuildAndUpdateTests(unittest.TestCase):
    def setUp(self):
        (PROJECT / ".work").mkdir(exist_ok=True)
        self.work = tempfile.TemporaryDirectory(prefix="kishu-test-", dir=PROJECT / ".work")
        self.addCleanup(self.work.cleanup)
        self.root = Path(self.work.name) / "project"
        self.root.mkdir()
        for folder in ("src", "overrides"):
            shutil.copytree(PROJECT / folder, self.root / folder)
        for filename in ("LICENSE", "THIRD_PARTY_NOTICES.md"):
            shutil.copyfile(PROJECT / filename, self.root / filename)
        kishu.write_json(self.root / "src/patches.json", [])
        self.lock = copy.deepcopy(kishu.locked_sources(PROJECT))
        for name, source in self.lock["sources"].items():
            remote = Path(self.work.name) / "remotes" / name
            remote.mkdir(parents=True)
            self.command("git", "init", "-b", "main", remote)
            base = remote / source["subdir"]
            base.mkdir(parents=True, exist_ok=True)
            if name == "pstack":
                for override in (self.root / "overrides/pstack").rglob("*"):
                    if override.is_file():
                        dest = base / override.relative_to(self.root / "overrides/pstack")
                        dest.parent.mkdir(parents=True, exist_ok=True)
                        dest.write_text("Upstream original content.\n", encoding="utf-8")
                (base / "skills/poteto-mode/SKILL.md").write_text(
                    "---\nname: poteto-mode\n---\n## Playbooks\n- **Feature.** New behavior.\n", encoding="utf-8")
                fallback = base / "skills/figure-it-out/SKILL.md"
                fallback.parent.mkdir(parents=True)
                fallback.write_text("Fixture fallback guide.\n", encoding="utf-8")
            else:
                (base / "SKILL.md").write_text(f"---\nname: {name}\n---\nSource skill.\n", encoding="utf-8")
            license_path = remote / ("pstack/LICENSE" if name == "pstack" else "LICENSE")
            license_path.write_text("Fixture license.\n", encoding="utf-8")
            self.commit(remote, "Initial fixture")
            source["url"] = str(remote)
            source["commit"] = kishu.git(remote, "rev-parse", "HEAD")
            target = self.root / "upstream" / name
            target.parent.mkdir(exist_ok=True)
            self.command("git", "clone", remote, target)
        kishu.write_json(self.root / "upstreams.lock.json", self.lock)
        kishu.accept_overrides(self.root, self.lock, "Fixture baseline")

    def command(self, *args):
        return kishu.run(args)

    def commit(self, repo, message):
        self.command("git", "-C", repo, "add", ".")
        self.command("git", "-C", repo, "-c", "user.name=Kishu Test", "-c",
                     "user.email=test@example.invalid", "commit", "-m", message)

    def remote_change(self, name, relative, text):
        remote = Path(self.lock["sources"][name]["url"])
        path = remote / self.lock["sources"][name]["subdir"] / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
        self.commit(remote, "Change fixture")

    def test_build_is_reproducible_and_exposes_mode_and_administration(self):
        kishu.build(self.root, self.lock)
        before = kishu.tree_hashes(self.root / "plugin")
        kishu.build(self.root, self.lock)
        self.assertEqual(before, kishu.tree_hashes(self.root / "plugin"))
        public = list((self.root / "plugin/skills").rglob("SKILL.md"))
        self.assertEqual({p.parent.name for p in public}, {"kishu", "kishu-mode"})
        router = kishu.read_text(self.root / "plugin/lib/pstack/skills/kishu-mode/SKILL.md")
        self.assertIn("[Feature](playbooks/feature.md)", router)
        kishu.build(self.root, self.lock, check_only=True)

    def test_compatible_update_delivers_new_upstream_content(self):
        kishu.build(self.root, self.lock)
        self.remote_change("impeccable", "reference/new.md", "New upstream guidance.\n")
        kishu.update(self.root, self.lock)
        current = kishu.locked_sources(self.root)
        self.assertNotEqual(current["sources"]["impeccable"]["commit"], self.lock["sources"]["impeccable"]["commit"])
        self.assertEqual(kishu.read_text(self.root / "plugin/lib/impeccable/reference/new.md"), "New upstream guidance.\n")
        kishu.build(self.root, current, check_only=True)

    def test_conflicting_update_preserves_lock_build_and_checked_out_revision(self):
        kishu.build(self.root, self.lock)
        before = kishu.tree_hashes(self.root / "plugin")
        self.remote_change("pstack", "skills/tdd/SKILL.md", "Changed upstream testing policy.\n")
        with self.assertRaisesRegex(kishu.KishuError, "overlap"):
            kishu.update(self.root, self.lock)
        self.assertEqual(kishu.locked_sources(self.root), self.lock)
        self.assertEqual(before, kishu.tree_hashes(self.root / "plugin"))
        kishu.verify_repositories(self.root, self.lock)

    def test_failed_lock_publish_rolls_back_build_and_revisions(self):
        kishu.build(self.root, self.lock)
        before = kishu.tree_hashes(self.root / "plugin")
        self.remote_change("impeccable", "reference/new.md", "New upstream guidance.\n")
        original_replace = kishu.os.replace
        lock_path = self.root / "upstreams.lock.json"

        def fail_lock_write(source, destination):
            if Path(destination) == lock_path:
                raise PermissionError("Simulated lock publication failure")
            return original_replace(source, destination)

        with mock.patch.object(kishu.os, "replace", side_effect=fail_lock_write):
            with self.assertRaisesRegex(PermissionError, "publication failure"):
                kishu.update(self.root, self.lock)
        self.assertEqual(kishu.locked_sources(self.root), self.lock)
        self.assertEqual(before, kishu.tree_hashes(self.root / "plugin"))
        kishu.verify_repositories(self.root, self.lock)

    def test_edited_generated_file_is_never_overwritten(self):
        kishu.build(self.root, self.lock)
        entry = self.root / "plugin/skills/kishu-mode/SKILL.md"
        entry.write_text("User edit.\n", encoding="utf-8")
        with self.assertRaisesRegex(kishu.KishuError, "edited"):
            kishu.build(self.root, self.lock)
        self.assertEqual(entry.read_text(), "User edit.\n")

    def test_dirty_source_is_not_silently_packaged(self):
        source = self.root / "upstream/impeccable" / self.lock["sources"]["impeccable"]["subdir"] / "SKILL.md"
        source.write_text("Uncommitted upstream edit.\n", encoding="utf-8")
        with self.assertRaisesRegex(kishu.KishuError, "local changes"):
            kishu.build(self.root, self.lock)
        self.assertFalse((self.root / "plugin").exists())

    def test_patch_ambiguity_fails_before_publishing(self):
        kishu.build(self.root, self.lock)
        before = kishu.tree_hashes(self.root / "plugin")
        kishu.write_json(self.root / "src/patches.json", [{"source": "pstack", "path": "skills/how/SKILL.md",
                         "old": "No such upstream anchor", "new": "Replacement"}])
        with self.assertRaisesRegex(kishu.KishuError, "Patch needs review"):
            kishu.build(self.root, self.lock)
        self.assertEqual(before, kishu.tree_hashes(self.root / "plugin"))

    def test_standalone_export_is_self_contained_and_updates_idempotently(self):
        kishu.build(self.root, self.lock)
        target = Path(self.work.name) / "skills/kishu-mode"
        kishu.standalone(self.root, target)
        before = kishu.tree_hashes(target)
        self.assertEqual(list(target.rglob("SKILL.md")), [target / "SKILL.md"])
        self.assertTrue((target / "references/pstack/skills/kishu-mode/GUIDE.md").exists())
        self.assertTrue((target / "references/impeccable/GUIDE.md").exists())
        for name in ("modern-screenshot", "platform-design-skills"):
            self.assertEqual(
                kishu.read_text(target / "references/impeccable/third-party-licenses" / f"{name}-LICENSE.txt"),
                kishu.read_text(PROJECT / "src/licenses/impeccable" / f"{name}-LICENSE.txt"),
            )
        self.assertTrue((target / "scripts/update_kishu.py").exists())
        self.assertIn("Use $kishu-mode", kishu.read_text(target / "agents/openai.yaml"))
        adapter = kishu.read_text(target / "adapters/codex.md")
        self.assertIn("references/impeccable/scripts/impeccable.cmd", adapter)
        self.assertNotIn("`lib/", adapter)
        kishu.standalone(self.root, target)
        self.assertEqual(before, kishu.tree_hashes(target))

    def test_activation_preserves_user_rules_and_is_idempotent(self):
        instructions = self.root / "custom-rules.md"
        instructions.write_text("Keep my existing project rules.\n", encoding="utf-8")
        kishu.activate(self.root, "codex", instructions)
        first = instructions.read_text()
        kishu.activate(self.root, "codex", instructions)
        self.assertEqual(first, instructions.read_text())
        self.assertTrue(first.startswith("Keep my existing project rules.\n"))
        self.assertEqual(first.count("<!-- kishu:begin -->"), 1)

    def test_malformed_activation_markers_are_not_rewritten(self):
        instructions = self.root / "custom-rules.md"
        text = "<!-- kishu:end -->\nKeep this.\n<!-- kishu:begin -->\n"
        instructions.write_text(text, encoding="utf-8")
        with self.assertRaisesRegex(kishu.KishuError, "Malformed"):
            kishu.activate(self.root, "codex", instructions)
        self.assertEqual(kishu.read_text(instructions), text)

    def test_cursor_activation_enables_rule_without_dropping_existing_fields(self):
        instructions = self.root / "kishu-mode.mdc"
        instructions.write_text("---\ndescription: My rule\nalwaysApply: false\n---\n\nKeep this.\n", encoding="utf-8")
        kishu.activate(self.root, "cursor", instructions)
        first = kishu.read_text(instructions)
        self.assertIn("description: My rule\nalwaysApply: true", first)
        self.assertIn("Keep this.", first)
        kishu.activate(self.root, "cursor", instructions)
        self.assertEqual(first, kishu.read_text(instructions))

    def test_cleanup_rejects_parent_and_outside_paths(self):
        with self.assertRaises(kishu.KishuError):
            kishu.remove_owned_tree(self.root, self.root)
        with self.assertRaises(kishu.KishuError):
            kishu.remove_owned_tree(self.root.parent, self.root)
        self.assertTrue(self.root.exists())


class RealPackageTests(unittest.TestCase):
    def test_generated_routes_cover_upstream_playbooks(self):
        original = kishu.read_text(PROJECT / "upstream/pstack/pstack/skills/poteto-mode/SKILL.md")
        runtime = PROJECT / "plugin/lib/pstack/skills/kishu-mode"
        catalog = kishu.playbook_catalog(original, runtime)
        self.assertIn(kishu.rebrand(catalog), kishu.read_text(runtime / "SKILL.md"))
        kishu.validate(PROJECT / "plugin")

    def test_notice_and_portable_line_endings_survive_distribution(self):
        source_notice = PROJECT / "upstream/impeccable/NOTICE.md"
        bundled_notice = PROJECT / "plugin/lib/impeccable/NOTICE.md"
        self.assertEqual(kishu.read_text(source_notice), kishu.read_text(bundled_notice))
        for name in ("modern-screenshot", "platform-design-skills"):
            source_license = PROJECT / "src/licenses/impeccable" / f"{name}-LICENSE.txt"
            bundled_license = PROJECT / "plugin/lib/impeccable/third-party-licenses" / f"{name}-LICENSE.txt"
            self.assertEqual(kishu.read_text(source_license), kishu.read_text(bundled_license))
        for path in (PROJECT / "plugin").rglob("*.md"):
            self.assertNotIn(b"\r\n", path.read_bytes(), path)

    def test_claude_reinstall_refreshes_an_existing_version(self):
        state = {"version": "old"}

        def cli(args, **kwargs):
            if args[1:4] == ["plugin", "marketplace", "list"]:
                output = json.dumps([{"name": "kishu-local", "source": "directory", "path": str(PROJECT)}])
            elif args[1:3] == ["plugin", "update"]:
                state["version"] = "new"
                output = "Updated"
            else:
                output = "Already installed"
            return subprocess.CompletedProcess(args, 0, output, "")

        with mock.patch.object(kishu.shutil, "which", return_value="claude"), mock.patch.object(kishu, "run", side_effect=cli):
            kishu.install(PROJECT, "claude", None)
        self.assertEqual(state["version"], "new")

    def test_claude_source_conflict_does_not_remove_marketplace_data(self):
        calls = []

        def cli(args, **kwargs):
            calls.append(args)
            output = json.dumps([{"name": "kishu-local", "source": "github", "repo": "SPDUK/kishu-stack"}])
            return subprocess.CompletedProcess(args, 0, output, "")

        with mock.patch.object(kishu.shutil, "which", return_value="claude"), mock.patch.object(kishu, "run", side_effect=cli):
            with self.assertRaisesRegex(kishu.KishuError, "retained an existing Kishu source"):
                kishu.install(PROJECT, "claude", None)
        self.assertFalse(any("remove" in args or "uninstall" in args for args in calls))


if __name__ == "__main__":
    unittest.main()
