import contextlib
import importlib.util
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest import mock
from urllib.error import HTTPError, URLError


PROJECT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("update_kishu", PROJECT / "src/scripts/update_kishu.py")
updater = importlib.util.module_from_spec(spec)
spec.loader.exec_module(updater)


class PublishedUpdateTests(unittest.TestCase):
    def setUp(self):
        (PROJECT / ".work").mkdir(exist_ok=True)
        self.work = tempfile.TemporaryDirectory(prefix="kishu-upgrade-test-", dir=PROJECT / ".work")
        self.addCleanup(self.work.cleanup)
        self.base = Path(self.work.name)
        self.remote = self.base / "remote"
        self.checkout = self.base / "managed"
        self.log = self.base / "installation.json"
        self.remote.mkdir()
        self.command("git", "init", "-b", "main", self.remote)
        (self.remote / "scripts").mkdir()
        (self.remote / "plugin").mkdir()
        (self.remote / "scripts/kishu.py").write_text(
            "import json, os, pathlib, sys\n"
            "pathlib.Path(os.environ['KISHU_INSTALL_LOG']).write_text(json.dumps(sys.argv[1:]))\n")
        self.releases = {}
        self.publish("1.0.0")
        self.requests = []
        environment = mock.patch.dict(os.environ, {"KISHU_INSTALL_LOG": str(self.log)})
        environment.start()
        self.addCleanup(environment.stop)
        http = mock.patch.object(updater, "urlopen", side_effect=self.release_response)
        self.http = http.start()
        self.addCleanup(http.stop)

    def command(self, *args):
        return updater.run(*args)

    def commit(self, directory):
        self.command("git", "-C", directory, "add", ".")
        self.command("git", "-C", directory, "-c", "user.name=Kishu Test", "-c",
                     "user.email=test@example.invalid", "commit", "-m", "Fixture revision")
        return updater.git(directory, "rev-parse", "HEAD")

    def publish(self, version, *, annotated=False):
        tag = "v" + version
        (self.remote / "plugin/plugin.json").write_text(json.dumps({"name": "kishu", "version": version}))
        (self.remote / "README.md").write_text(f"Published {version}.\n")
        commit = self.commit(self.remote)
        args = ["-a", tag, "-m", tag] if annotated else [tag]
        updater.git(self.remote, "-c", "user.name=Kishu Test", "-c", "user.email=test@example.invalid", "tag", *args)
        self.releases[tag] = {"tag_name": tag, "draft": False, "prerelease": False,
                              "published_at": "2026-11-04T00:00:00Z"}
        self.latest = tag
        return commit

    def release_response(self, request, timeout):
        self.requests.append(request.full_url)
        endpoint = request.full_url.removeprefix(updater.RELEASE_API + "/")
        tag = self.latest if endpoint == "latest" else endpoint.removeprefix("tags/")
        if tag not in self.releases:
            raise HTTPError(request.full_url, 404, "Not Found", {}, None)
        return io.BytesIO(json.dumps(self.releases[tag]).encode())

    def update(self, harness="codex", destination=None, *, version=None):
        with contextlib.redirect_stdout(io.StringIO()) as output:
            commit = updater.update(self.checkout, harness, destination, remote=str(self.remote), version=version)
        self.result = json.loads(output.getvalue())
        return commit

    def test_installs_release_instead_of_newer_main(self):
        released = updater.git(self.remote, "rev-parse", "HEAD")
        (self.remote / "README.md").write_text("Unreleased main changes.\n")
        self.commit(self.remote)
        self.assertEqual(self.update(), released)
        self.assertEqual((self.checkout / "README.md").read_text(), "Published 1.0.0.\n")
        self.assertEqual(updater.git(self.checkout, "branch", "--show-current"), "")
        self.assertEqual(json.loads(self.log.read_text()), ["install", "--harness", "codex"])
        self.assertEqual(self.result["tag"], "v1.0.0")
        self.assertEqual(self.result["commit"], released)

    def test_upgrades_to_new_release_and_can_repeat_install(self):
        first = self.update()
        second = self.publish("1.0.1", annotated=True)
        self.assertNotEqual(first, second)
        self.assertEqual(self.update(), second)
        self.assertEqual(self.update(), second)
        self.assertEqual(self.result["version"], "1.0.1")

    def test_explicit_published_version_supports_rollback(self):
        first = self.update()
        second = self.publish("1.0.1")
        self.update()
        self.assertEqual(self.update(version="1.0.0"), first)
        self.assertTrue(self.requests[-1].endswith("/tags/v1.0.0"))
        self.assertEqual(self.update(version="v1.0.1"), second)

    def test_clean_legacy_main_migrates_without_advancing_its_branch(self):
        released = updater.git(self.remote, "rev-parse", "HEAD")
        (self.remote / "README.md").write_text("Published source, but not a release.\n")
        source_head = self.commit(self.remote)
        self.command("git", "clone", str(self.remote), self.checkout)
        self.assertEqual(self.update(), released)
        self.assertEqual(updater.git(self.checkout, "rev-parse", "main"), source_head)

    def test_dirty_checkout_is_preserved_and_not_installed(self):
        self.update()
        (self.checkout / "personal-note.md").write_text("Keep this local work.\n")
        self.log.unlink()
        with self.assertRaisesRegex(updater.UpdateError, "local changes"):
            self.update()
        self.assertFalse(self.log.exists())
        self.assertEqual((self.checkout / "personal-note.md").read_text(), "Keep this local work.\n")

    def test_unpublished_commits_are_not_installed_or_replaced(self):
        self.update()
        (self.checkout / "README.md").write_text("Unpublished work.\n")
        head = self.commit(self.checkout)
        self.log.unlink()
        with self.assertRaisesRegex(updater.UpdateError, "unpublished or divergent"):
            self.update()
        self.assertEqual(updater.git(self.checkout, "rev-parse", "HEAD"), head)
        self.assertFalse(self.log.exists())

    def test_wrong_origin_is_rejected_before_lookup_or_install(self):
        self.update()
        updater.git(self.checkout, "remote", "set-url", "origin", str(self.base / "unrelated"))
        self.log.unlink()
        self.http.reset_mock()
        with self.assertRaisesRegex(updater.UpdateError, "origin"):
            self.update()
        self.http.assert_not_called()
        self.assertFalse(self.log.exists())

    def test_development_branch_is_preserved(self):
        self.update()
        updater.git(self.checkout, "checkout", "-b", "feature/local")
        self.log.unlink()
        with self.assertRaisesRegex(updater.UpdateError, "development branch"):
            self.update()
        self.assertEqual(updater.git(self.checkout, "branch", "--show-current"), "feature/local")
        self.assertFalse(self.log.exists())

    def test_standalone_updates_require_and_pass_the_destination(self):
        with self.assertRaisesRegex(updater.UpdateError, "--destination"):
            self.update("generic")
        destination = self.base / "skills/kishu-mode"
        self.update("generic", destination)
        self.assertEqual(json.loads(self.log.read_text()), ["install", "--destination", str(destination.resolve())])

    def test_installer_failure_restores_previous_checkout_without_success(self):
        first = self.update()
        self.log.unlink()
        (self.remote / "scripts/kishu.py").write_text("raise SystemExit('Fixture installation failed')\n")
        self.publish("1.0.1")
        with contextlib.redirect_stdout(io.StringIO()) as output:
            with self.assertRaisesRegex(updater.UpdateError, "Fixture installation failed"):
                self.update()
        self.assertNotIn('"updated": true', output.getvalue())
        self.assertEqual(updater.git(self.checkout, "rev-parse", "HEAD"), first)
        self.assertFalse(self.log.exists())

    def test_no_release_never_falls_back_to_main(self):
        self.releases.clear()
        with self.assertRaisesRegex(updater.UpdateError, "No published stable release"):
            self.update()
        self.assertFalse(self.checkout.exists())
        self.assertFalse(self.log.exists())

    def test_drafts_prereleases_and_unpublished_releases_are_rejected(self):
        for field, value in [("draft", True), ("prerelease", True), ("published_at", None)]:
            with self.subTest(field=field), mock.patch.dict(self.releases[self.latest], {field: value}):
                with self.assertRaisesRegex(updater.UpdateError, "Only published stable"):
                    self.update()
                self.assertFalse(self.checkout.exists())

    def test_invalid_version_is_rejected_without_network(self):
        for version in ["main", "../v1.0.0", "1.0", "1.0.0-beta.1", "01.0.0", "v1.0.0\n"]:
            with self.subTest(version=version), self.assertRaisesRegex(updater.UpdateError, "Use a stable version"):
                self.update(version=version)
        self.http.assert_not_called()

    def test_unknown_version_and_mismatched_api_tag_are_rejected(self):
        with self.assertRaisesRegex(updater.UpdateError, "No published stable release"):
            self.update(version="2.0.0")
        self.releases[self.latest]["tag_name"] = "v2.0.0"
        with self.assertRaisesRegex(updater.UpdateError, "requested stable version"):
            self.update(version="1.0.0")
        self.assertFalse(self.checkout.exists())

    def test_tag_version_mismatch_preserves_previous_install(self):
        first = self.update()
        self.log.unlink()
        updater.git(self.remote, "tag", "v2.0.0")
        self.releases["v2.0.0"] = {**self.releases[self.latest], "tag_name": "v2.0.0"}
        self.latest = "v2.0.0"
        with self.assertRaisesRegex(updater.UpdateError, "tag and plugin version"):
            self.update()
        self.assertEqual(updater.git(self.checkout, "rev-parse", "HEAD"), first)
        self.assertFalse(self.log.exists())

    def test_release_lookup_failures_leave_installed_checkout_unchanged(self):
        first = self.update()
        self.log.unlink()
        for error in [URLError("offline"), HTTPError(updater.RELEASE_API, 403, "Rate limited", {}, None), TimeoutError()]:
            self.http.side_effect = error
            with self.subTest(error=error), self.assertRaises(updater.UpdateError):
                self.update()
            self.assertEqual(updater.git(self.checkout, "rev-parse", "HEAD"), first)
            self.assertFalse(self.log.exists())

    def test_malformed_release_data_is_rejected_before_clone(self):
        for payload in [b"not json", b"[]", b'{}', b'{"tag_name":"main","draft":false,"prerelease":false,"published_at":"today"}']:
            self.http.side_effect = lambda *args, **kwargs: io.BytesIO(payload)
            with self.subTest(payload=payload), self.assertRaises(updater.UpdateError):
                self.update()
            self.assertFalse(self.checkout.exists())


if __name__ == "__main__":
    unittest.main()
