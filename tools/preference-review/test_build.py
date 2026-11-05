import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("preference_review_build", HERE / "build.py")
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class PreferenceCoverageTests(unittest.TestCase):
    def test_snapshot_is_unchanged_when_only_the_git_commit_changes(self):
        with patch("subprocess.check_output", return_value="a" * 40):
            before = builder.make_catalog()
        with patch("subprocess.check_output", return_value="b" * 40):
            after = builder.make_catalog()
        self.assertEqual(before, after)
        self.assertEqual(builder.review_documents(before), builder.review_documents(after))

    def test_snapshot_identity_changes_with_reviewed_source_content(self):
        before = builder.make_catalog()
        read = builder.read
        changed_path = builder.ROOT / "src/entrypoint.md"
        with patch.object(builder, "read", side_effect=lambda path: read(path) + ("\nA changed instruction.\n" if path == changed_path else "")):
            after = builder.make_catalog()
        self.assertNotEqual(before["kishuSourceHash"], after["kishuSourceHash"])
        self.assertTrue(any(rule["text"] == "A changed instruction." for rule in after["rules"]))

    def test_fences_tables_and_nested_lists_keep_exact_text_and_lines(self):
        text = "# Scope\n\n- Outer\n  - Inner\n\n| Rule | Effect |\n| A | B |\n\n```md\n## Not a heading\n- Not a new block\n```\n"
        blocks, omitted = builder.partition(text)
        self.assertEqual(omitted, [])
        self.assertEqual(blocks[-1]["text"], "```md\n## Not a heading\n- Not a new block\n```")
        self.assertEqual(len(blocks), 5)
        for block in blocks:
            self.assertEqual(block["text"], "\n".join(text.splitlines()[block["start"] - 1:block["end"]]))

    def test_exclusions_end_at_the_next_peer_section(self):
        text = "# Mode\n## Rules\nDo work.\n## Communication\nSpeak briefly.\n### Tone\nFriendly.\n## Delegation\nUse available models.\n"
        blocks, omitted = builder.partition(text, excluded_sections=("Communication",))
        self.assertEqual([block["text"] for block in blocks], ["Do work.", "Use available models."])
        self.assertEqual([item["line"] for item in omitted], [5, 7])

    def test_metadata_triggers_are_included_even_with_an_empty_skill_body(self):
        text = '---\nname: example\ndescription: "Build 2-3 prototypes."\n---\n# Example\n'
        blocks, _ = builder.partition(text)
        self.assertEqual(blocks[0]["section"], "Activation and metadata")
        self.assertIn("Build 2-3 prototypes", blocks[0]["text"])

    def test_inventory_accounts_for_every_upstream_file_and_every_source_line(self):
        catalog = builder.make_catalog()
        expected = {"upstream/pstack/pstack/" + p.relative_to(builder.ROOT / "upstream/pstack/pstack").as_posix() for p in (builder.ROOT / "upstream/pstack/pstack").rglob("*") if p.is_file()}
        actual = {item["path"] for item in catalog["coverage"] if item["path"].startswith("upstream/")}
        self.assertEqual(expected, actual)
        ordered = [item["path"] for item in catalog["coverage"] if item["path"].startswith("upstream/")]
        self.assertEqual(ordered, sorted(ordered))
        self.assertTrue(all(item["reason"] for item in catalog["coverage"] if item["status"] == "excluded"))
        rules = {rule["id"]: rule for rule in catalog["rules"]}
        for source in catalog["sources"]:
            text = builder.read(builder.ROOT / source["path"])
            for rule_id in source["ruleIds"]:
                rule = rules[rule_id]
                self.assertEqual(rule["text"], "\n".join(text.splitlines()[rule["start"] - 1:rule["end"]]))
                self.assertEqual(rule["hash"], builder.digest(rule["text"]))
        router = next(s for s in catalog["sources"] if s["key"] == "current:skills/poteto-mode/SKILL.md")
        self.assertTrue(router["excludedLines"])
        self.assertFalse(any("{{COMMUNICATION}}" in rules[r]["text"] for r in router["ruleIds"]))


if __name__ == "__main__":
    unittest.main()
