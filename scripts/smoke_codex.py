"""Check native Codex installation in an isolated workspace-local profile."""

import json
import os
from pathlib import Path
import queue
import shutil
import subprocess
import sys
import tempfile
import threading
import time

import kishu


def discovered_skills(binary, env, cwd):
    """Ask the installed CLI's app-server which plugin skills it actually loads."""
    responses = queue.Queue()
    log = Path(env["CODEX_HOME"]) / "app-server-smoke.log"
    with log.open("w", encoding="utf-8") as errors:
        process = subprocess.Popen([binary, "app-server", "--stdio"], env=env, stdin=subprocess.PIPE,
                                   stdout=subprocess.PIPE, stderr=errors, text=True, encoding="utf-8")

        def read_responses():
            for line in process.stdout:
                responses.put(json.loads(line))

        reader = threading.Thread(target=read_responses, daemon=True)
        reader.start()

        def send(message):
            process.stdin.write(json.dumps(message) + "\n")
            process.stdin.flush()

        def reply(identifier):
            deadline = time.monotonic() + 30
            while time.monotonic() < deadline:
                try:
                    item = responses.get(timeout=max(0.1, deadline - time.monotonic()))
                except queue.Empty:
                    break
                if item.get("id") == identifier:
                    if "error" in item:
                        raise RuntimeError(item["error"])
                    return item["result"]
            raise RuntimeError(f"Codex app-server did not answer request {identifier}.")

        try:
            send({"id": 1, "method": "initialize", "params": {
                "clientInfo": {"name": "kishu-smoke", "version": kishu.VERSION}}})
            reply(1)
            send({"method": "initialized", "params": {}})
            send({"id": 2, "method": "skills/list", "params": {"cwds": [str(cwd)], "forceReload": True}})
            response = reply(2)
            return [s for row in response["data"] for s in row["skills"]
                    if s.get("pluginId") == "kishu@kishu-local"]
        finally:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)
            reader.join(timeout=5)
            process.stdin.close()
            process.stdout.close()


def main():
    root = Path(__file__).resolve().parents[1]
    kishu.validate(root / "plugin")
    kishu.ensure_owned_clean(root / "plugin")
    binary = shutil.which("codex")
    if not binary:
        raise SystemExit("Codex CLI is required for this integration check.")
    (root / ".work").mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="codex-smoke-", dir=root / ".work") as temporary:
        env = os.environ.copy()
        env["CODEX_HOME"] = temporary
        marketplace_root = Path(temporary) / "marketplace"
        shutil.copytree(root / ".claude-plugin", marketplace_root / ".claude-plugin")
        shutil.copyfile(root / "upstreams.lock.json", marketplace_root / "upstreams.lock.json")
        source = marketplace_root / "plugin"
        shutil.copytree(root / "plugin", source)

        def command(*args):
            result = subprocess.run([binary, *args, "--json"], env=env, capture_output=True,
                                    text=True, encoding="utf-8", errors="replace")
            if result.returncode:
                raise RuntimeError(result.stderr or result.stdout)
            return json.loads(result.stdout)

        marketplace = command("plugin", "marketplace", "add", str(marketplace_root))
        if marketplace["marketplaceName"] != "kishu-local":
            raise RuntimeError("Codex registered the wrong marketplace.")
        for attempt in range(2):
            installed = command("plugin", "add", "kishu@kishu-local")
            cached = Path(installed["installedPath"])
            if not cached.resolve().is_relative_to(Path(temporary).resolve()):
                raise RuntimeError("Codex installed outside the isolated profile.")
            if kishu.tree_hashes(cached) != kishu.tree_hashes(source):
                raise RuntimeError("Codex cache does not match the generated plugin.")
            if attempt == 0:
                readme = source / "README.md"
                readme.write_bytes(readme.read_bytes() + b"\nIsolated cache refresh fixture.\n")
                kishu.write_manifest(source, kishu.locked_sources(root))
        moved_marketplace = Path(temporary) / "updated-source"
        shutil.copytree(marketplace_root, moved_marketplace)
        source = moved_marketplace / "plugin"
        readme = source / "README.md"
        readme.write_bytes(readme.read_bytes() + b"\nManaged checkout source migration fixture.\n")
        kishu.write_manifest(source, kishu.locked_sources(root))
        migrated = subprocess.run([sys.executable, str(root / "scripts/kishu.py"), "--root", str(moved_marketplace),
                                   "install", "--harness", "codex"], env=env, capture_output=True, text=True)
        if migrated.returncode:
            raise RuntimeError(migrated.stderr or migrated.stdout)
        installed = command("plugin", "add", "kishu@kishu-local")
        if kishu.tree_hashes(Path(installed["installedPath"])) != kishu.tree_hashes(source):
            raise RuntimeError("Codex did not refresh from the new Kishu checkout.")
        listing = command("plugin", "list", "--marketplace", "kishu-local")
        entries = [p for p in listing["installed"] if p["pluginId"] == "kishu@kishu-local"]
        if len(entries) != 1 or not entries[0]["enabled"]:
            raise RuntimeError("Kishu was not enabled exactly once.")
        skills = discovered_skills(binary, env, root)
        if len(skills) != 2 or {s["name"] for s in skills} != {"kishu:kishu", "kishu:kishu-mode"} or not all(s["enabled"] for s in skills):
            raise RuntimeError(f"Unexpected Kishu skill catalog: {skills}")
        print(json.dumps({"plugin": entries[0]["pluginId"], "installed": True, "enabled": True,
                          "discovered_skills": [s["name"] for s in skills],
                          "cache_matches_package": True, "repeat_install": "passed",
                          "same_version_content_refresh": "passed",
                          "marketplace_source_migration": "passed",
                          "profile": "isolated; normal user configuration unchanged"}, indent=2))


if __name__ == "__main__":
    main()
