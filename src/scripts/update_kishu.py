"""Install the latest published Kishu from its own repository. Python 3.11+, Git."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import subprocess
import sys


OFFICIAL_REMOTE = "https://github.com/SPDUK/kishu-stack.git"


class UpdateError(RuntimeError):
    pass


def run(*args, cwd=None):
    result = subprocess.run([str(a) for a in args], cwd=cwd, capture_output=True,
                            text=True, encoding="utf-8", errors="replace")
    if result.returncode:
        raise UpdateError(result.stderr.strip() or result.stdout.strip() or f"Command failed: {args[0]}")
    return result.stdout.strip()


def git(checkout, *args):
    return run("git", "-C", checkout, *args)


def update(checkout: Path, harness: str, destination: Path | None = None, *, remote=OFFICIAL_REMOTE):
    if harness == "generic" and destination is None:
        raise UpdateError("A standalone update requires --destination with the existing skill directory.")
    checkout = checkout.expanduser().absolute()
    if checkout.is_symlink():
        raise UpdateError(f"Refusing a symlinked checkout: {checkout}")
    if not (checkout / ".git").exists():
        if checkout.exists() and any(checkout.iterdir()):
            raise UpdateError(f"Refusing to clone into a nonempty directory: {checkout}")
        checkout.parent.mkdir(parents=True, exist_ok=True)
        run("git", "clone", "--branch", "main", "--single-branch", remote, checkout)
    if git(checkout, "remote", "get-url", "origin").rstrip("/").removesuffix(".git") != remote.rstrip("/").removesuffix(".git"):
        raise UpdateError("The checkout's origin is not the expected Kishu repository.")
    if git(checkout, "branch", "--show-current") != "main":
        raise UpdateError("The Kishu checkout is not on main; keep development branches separate.")
    if git(checkout, "status", "--porcelain"):
        raise UpdateError("The Kishu checkout has local changes; preserve them before updating.")
    git(checkout, "fetch", "origin", "main")
    ancestry = subprocess.run(["git", "-C", str(checkout), "merge-base", "--is-ancestor", "HEAD", "FETCH_HEAD"],
                              capture_output=True, text=True)
    if ancestry.returncode:
        raise UpdateError("The Kishu checkout has unpublished or divergent commits; no local history was replaced.")
    git(checkout, "merge", "--ff-only", "FETCH_HEAD")
    installer = checkout / "scripts/kishu.py"
    manifest = checkout / "plugin/plugin.json"
    if not installer.is_file() or not manifest.is_file():
        raise UpdateError("The fetched revision is missing Kishu's installer or generated plugin.")
    arguments = [sys.executable, installer, "install"]
    if harness != "generic":
        arguments.extend(["--harness", harness])
    if destination is not None:
        arguments.extend(["--destination", destination.expanduser().resolve()])
    output = run(*arguments, cwd=checkout)
    if output:
        print(output)
    version = json.loads(manifest.read_text(encoding="utf-8"))["version"]
    commit = git(checkout, "rev-parse", "HEAD")
    print(json.dumps({"updated": True, "version": version, "commit": commit,
                      "installation": "standalone" if destination else harness}, indent=2))
    return commit


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--harness", choices=["codex", "claude", "cursor", "generic"], required=True)
    parser.add_argument("--checkout", type=Path, default=Path.home() / ".kishu/source")
    parser.add_argument("--destination", type=Path)
    args = parser.parse_args()
    try:
        update(args.checkout, args.harness, args.destination)
    except (UpdateError, OSError, ValueError, KeyError) as error:
        print(f"kishu update: {error}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
