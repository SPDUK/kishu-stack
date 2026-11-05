"""Install a published stable Kishu release. Python 3.11+, Git; no dependencies."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


OFFICIAL_REMOTE = "https://github.com/SPDUK/kishu-stack.git"
RELEASE_API = "https://api.github.com/repos/SPDUK/kishu-stack/releases"
STABLE_TAG = re.compile(r"v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)")


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


def release_tag(version: str | None = None, *, api=RELEASE_API) -> str:
    requested = None if version is None else "v" + version.removeprefix("v")
    if requested is not None and not STABLE_TAG.fullmatch(requested):
        raise UpdateError("Use a stable version such as 0.1.5 or v0.1.5; branches and prereleases are not accepted.")
    endpoint = "latest" if requested is None else "tags/" + requested
    request = Request(f"{api}/{endpoint}", headers={
        "Accept": "application/vnd.github+json", "User-Agent": "kishu-updater",
        "X-GitHub-Api-Version": "2026-03-10"})
    try:
        with urlopen(request, timeout=30) as response:
            release = json.load(response)
    except HTTPError as error:
        error.close()
        if error.code == 404:
            raise UpdateError(f"No published stable release found for {requested or 'Kishu'}. No main-branch fallback.") from error
        raise UpdateError(f"GitHub release lookup failed (HTTP {error.code}); retry later. No update was installed.") from error
    except (URLError, TimeoutError) as error:
        raise UpdateError(f"Cannot reach GitHub releases: {error}. No update was installed.") from error
    except (ValueError, UnicodeError) as error:
        raise UpdateError("GitHub returned invalid release data; no update was installed.") from error
    if (not isinstance(release, dict) or release.get("draft") is not False
            or release.get("prerelease") is not False or not release.get("published_at")):
        raise UpdateError("Only published stable releases can be installed; drafts and prereleases are excluded.")
    tag = release.get("tag_name")
    if not isinstance(tag, str) or not STABLE_TAG.fullmatch(tag) or (requested and tag != requested):
        raise UpdateError("The release does not identify the requested stable version.")
    return tag


def update(checkout: Path, harness: str, destination: Path | None = None, *,
           version: str | None = None, remote=OFFICIAL_REMOTE, api=RELEASE_API):
    if harness == "generic" and destination is None:
        raise UpdateError("A standalone update requires --destination with the existing skill directory.")
    checkout = checkout.expanduser().absolute()
    if checkout.is_symlink():
        raise UpdateError(f"Refusing a symlinked checkout: {checkout}")
    existing = (checkout / ".git").exists()
    previous_branch = previous_commit = None
    if existing:
        if git(checkout, "remote", "get-url", "origin").rstrip("/").removesuffix(".git") != remote.rstrip("/").removesuffix(".git"):
            raise UpdateError("The checkout's origin is not the expected Kishu repository.")
        previous_branch = git(checkout, "branch", "--show-current")
        if previous_branch not in {"", "main"}:
            raise UpdateError("The Kishu checkout is on a development branch; use a dedicated release checkout.")
        if git(checkout, "status", "--porcelain"):
            raise UpdateError("The Kishu checkout has local changes; preserve them before updating.")
        previous_commit = git(checkout, "rev-parse", "HEAD")
    elif checkout.exists() and any(checkout.iterdir()):
        raise UpdateError(f"Refusing to clone into a nonempty directory: {checkout}")
    tag = release_tag(version, api=api)
    if not existing:
        checkout.parent.mkdir(parents=True, exist_ok=True)
        run("git", "clone", "--branch", tag, "--single-branch", remote, checkout)
    # Main is fetched only to protect local work, never as an installation target.
    git(checkout, "fetch", "--no-tags", "origin", "refs/heads/main")
    published_head = git(checkout, "rev-parse", "FETCH_HEAD^{commit}")
    if existing:
        ancestry = subprocess.run(["git", "-C", str(checkout), "merge-base", "--is-ancestor", previous_commit, published_head],
                                  capture_output=True, text=True)
        if ancestry.returncode:
            raise UpdateError("The Kishu checkout has unpublished or divergent commits; no local history was replaced.")
    git(checkout, "fetch", "--no-tags", "origin", "refs/tags/" + tag)
    commit = git(checkout, "rev-parse", "FETCH_HEAD^{commit}")
    metadata = json.loads(git(checkout, "show", f"{commit}:plugin/plugin.json"))
    if not isinstance(metadata, dict) or metadata.get("name") != "kishu" or metadata.get("version") != tag[1:]:
        raise UpdateError("The release tag and plugin version do not match; no update was installed.")
    git(checkout, "cat-file", "-e", f"{commit}:scripts/kishu.py")
    git(checkout, "checkout", "--detach", commit)
    installer = checkout / "scripts/kishu.py"
    manifest = checkout / "plugin/plugin.json"
    if not installer.is_file() or not manifest.is_file():
        raise UpdateError("The fetched revision is missing Kishu's installer or generated plugin.")
    arguments = [sys.executable, installer, "install"]
    if harness != "generic":
        arguments.extend(["--harness", harness])
    if destination is not None:
        arguments.extend(["--destination", destination.expanduser().resolve()])
    try:
        output = run(*arguments, cwd=checkout)
    except UpdateError:
        if existing:
            if previous_branch:
                git(checkout, "checkout", previous_branch)
            else:
                git(checkout, "checkout", "--detach", previous_commit)
        raise
    if output:
        print(output)
    print(json.dumps({"updated": True, "version": metadata["version"], "tag": tag, "commit": commit,
                      "installation": "standalone" if destination else harness}, indent=2))
    return commit


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--harness", choices=["codex", "claude", "cursor", "generic"], required=True)
    parser.add_argument("--checkout", type=Path, default=Path.home() / ".kishu/releases")
    parser.add_argument("--destination", type=Path)
    parser.add_argument("--version", help="Install a specific published stable release, e.g. 0.1.5; default: latest")
    args = parser.parse_args()
    try:
        update(args.checkout, args.harness, args.destination, version=args.version)
    except (UpdateError, OSError, ValueError, KeyError) as error:
        print(f"kishu update: {error}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
