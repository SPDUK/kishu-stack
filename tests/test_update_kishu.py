import importlib.util
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest import mock


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
        (self.remote / "plugin/plugin.json").write_text(json.dumps({"name": "kishu", "version": "1.0.0"}))
        (self.remote / "scripts/kishu.py").write_text(
            "import json, os, pathlib, sys\n"
            "pathlib.Path(os.environ['KISHU_INSTALL_LOG']).write_text(json.dumps(sys.argv[1:]))\n")
        (self.remote / "README.md").write_text("Initial published version.\n")
        self.commit(self.remote)
        self.environment = mock.patch.dict(os.environ, {"KISHU_INSTALL_LOG": str(self.log)})
        self.environment.start()
        self.addCleanup(self.environment.stop)

    def command(self, *args):
        return updater.run(*args)

    def commit(self, directory):
        self.command("git", "-C", directory, "add", ".")
        self.command("git", "-C", directory, "-c", "user.name=Kishu Test", "-c",
                     "user.email=test@example.invalid", "commit", "-m", "Fixture revision")

    def update(self, harness="codex", destination=None):
        return updater.update(self.checkout, harness, destination, remote=str(self.remote))

    def test_clone_and_fast_forward_install_latest_published_content(self):
        first = self.update()
        self.assertEqual(json.loads(self.log.read_text()), ["install", "--harness", "codex"])
        (self.remote / "README.md").write_text("Updated published version.\n")
        self.commit(self.remote)
        second = self.update()
        self.assertNotEqual(first, second)
        self.assertEqual(second, updater.git(self.remote, "rev-parse", "HEAD"))
        self.assertEqual((self.checkout / "README.md").read_text(), "Updated published version.\n")

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
        self.commit(self.checkout)
        head = updater.git(self.checkout, "rev-parse", "HEAD")
        self.log.unlink()
        with self.assertRaisesRegex(updater.UpdateError, "unpublished or divergent"):
            self.update()
        self.assertEqual(updater.git(self.checkout, "rev-parse", "HEAD"), head)
        self.assertFalse(self.log.exists())

    def test_wrong_origin_is_rejected_before_fetch_or_install(self):
        self.update()
        updater.git(self.checkout, "remote", "set-url", "origin", str(self.base / "unrelated"))
        self.log.unlink()
        with self.assertRaisesRegex(updater.UpdateError, "origin"):
            self.update()
        self.assertFalse(self.log.exists())

    def test_development_branch_is_preserved(self):
        self.update()
        updater.git(self.checkout, "checkout", "-b", "feature/local")
        self.log.unlink()
        with self.assertRaisesRegex(updater.UpdateError, "not on main"):
            self.update()
        self.assertEqual(updater.git(self.checkout, "branch", "--show-current"), "feature/local")
        self.assertFalse(self.log.exists())

    def test_standalone_updates_pass_the_explicit_destination(self):
        destination = self.base / "skills/kishu-mode"
        self.update("generic", destination)
        self.assertEqual(json.loads(self.log.read_text()), ["install", "--destination", str(destination.resolve())])

    def test_installer_failure_does_not_report_success(self):
        (self.remote / "scripts/kishu.py").write_text("raise SystemExit('Fixture installation failed')\n")
        self.commit(self.remote)
        with self.assertRaisesRegex(updater.UpdateError, "Fixture installation failed"):
            self.update()
        self.assertFalse(self.log.exists())


if __name__ == "__main__":
    unittest.main()
