"""Build Kishu from pinned sources and reviewed overrides. Python 3.11+, stdlib only."""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import time
import zipfile


ROOT = Path(__file__).resolve().parents[1]
LIBRARIES = {"pstack": "pstack", "impeccable": "impeccable", "i-have-adhd": "communication"}
VERSION = "0.1.5"
MARKER = ".kishu-generated.json"


class KishuError(RuntimeError):
    pass


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path: Path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", newline="\n",
                                         prefix=".kishu-json-", dir=path.parent, delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(json.dumps(value, indent=2, ensure_ascii=False) + "\n")
        os.replace(temporary, path)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig").replace("\r\n", "\n")


def digest_text(text: str) -> str:
    return hashlib.sha256(text.replace("\r\n", "\n").encode()).hexdigest()


def digest_file(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(args, cwd: Path | None = None, *, check=True) -> subprocess.CompletedProcess:
    result = subprocess.run([str(a) for a in args], cwd=cwd, capture_output=True,
                            text=True, encoding="utf-8", errors="replace")
    if check and result.returncode:
        raise KishuError(f"Command failed: {' '.join(map(str, args))}\n{result.stderr.strip() or result.stdout.strip()}")
    return result


def git(repo: Path, *args, check=True) -> str:
    return run(["git", "-C", repo, *args], check=check).stdout.strip()


def source_file(root: Path, name: str, spec: dict, relative: str) -> Path:
    candidate = root / "upstream" / name / spec["subdir"] / relative
    base = (root / "upstream" / name).resolve()
    if not candidate.resolve().is_relative_to(base):
        raise KishuError(f"Source path escapes repository: {relative}")
    return candidate


def locked_sources(root: Path) -> dict:
    lock = read_json(root / "upstreams.lock.json")
    if lock.get("schema") != 1 or set(lock["sources"]) != set(LIBRARIES):
        raise KishuError("The lock must contain exactly pstack, impeccable, and i-have-adhd.")
    for name, spec in lock["sources"].items():
        if not re.fullmatch(r"[0-9a-f]{40}", spec["commit"]):
            raise KishuError(f"Unpinned source: {name}")
    return lock


def ensure_repositories(root: Path, lock: dict):
    for name, spec in lock["sources"].items():
        repo = root / "upstream" / name
        if not (repo / ".git").exists():
            if repo.exists() and any(repo.iterdir()):
                raise KishuError(f"Refusing to clone into nonempty {repo}")
            repo.parent.mkdir(parents=True, exist_ok=True)
            options = ["--filter=blob:none", "--sparse"] if name == "pstack" else ["--depth", "1"]
            run(["git", "clone", *options, spec["url"], repo])
        if git(repo, "status", "--porcelain"):
            raise KishuError(f"Upstream checkout has local changes: {repo}")
        if git(repo, "remote", "get-url", "origin") != spec["url"]:
            raise KishuError(f"Unexpected origin in {repo}")
        if run(["git", "-C", repo, "cat-file", "-e", spec["commit"]], check=False).returncode:
            git(repo, "fetch", "--depth", "1", "origin", spec["commit"])
        if name == "pstack":
            git(repo, "sparse-checkout", "set", spec["subdir"])
        git(repo, "checkout", "--detach", spec["commit"])


def verify_repositories(root: Path, lock: dict):
    for name, spec in lock["sources"].items():
        repo = root / "upstream" / name
        if not (repo / ".git").exists():
            raise KishuError(f"Missing {name}; run python scripts/kishu.py sync")
        if git(repo, "rev-parse", "HEAD") != spec["commit"]:
            raise KishuError(f"{name} is not at its locked commit; run sync")
        if git(repo, "remote", "get-url", "origin") != spec["url"]:
            raise KishuError(f"Unexpected origin in {repo}")
        if git(repo, "status", "--porcelain"):
            raise KishuError(f"Upstream checkout has local changes: {repo}")


def override_files(root: Path):
    return sorted(p for p in (root / "overrides").rglob("*") if p.is_file())


def source_at_commit(root: Path, name: str, spec: dict, relative: str) -> str:
    path = (Path(spec["subdir"]) / relative).as_posix()
    return run(["git", "-C", root / "upstream" / name, "show", f"{spec['commit']}:{path}"]).stdout


def accept_overrides(root: Path, lock: dict, reason: str):
    verify_repositories(root, lock)
    entries = {}
    for path in override_files(root):
        name, relative = path.relative_to(root / "overrides").parts[0], path.relative_to(root / "overrides").parts[1:]
        rel = Path(*relative).as_posix()
        content = source_at_commit(root, name, lock["sources"][name], rel)
        entries[f"{name}/{rel}"] = digest_text(content)
    write_json(root / "overrides.lock.json", {"schema": 1, "review_reason": reason, "files": entries})


def check_overrides(root: Path, lock: dict):
    guard = read_json(root / "overrides.lock.json")["files"]
    actual = set()
    conflicts = []
    for path in override_files(root):
        key = path.relative_to(root / "overrides").as_posix()
        actual.add(key)
        name, relative = key.split("/", 1)
        content = source_at_commit(root, name, lock["sources"][name], relative)
        if guard.get(key) != digest_text(content):
            conflicts.append(key)
    if actual != set(guard):
        conflicts.extend(sorted(set(guard) - actual))
    if conflicts:
        raise KishuError("Upstream changes overlap Kishu overrides; review before updating:\n  " +
                         "\n  ".join(conflicts) + "\nLock and installed build were not changed.")
    for patch in read_json(root / "src" / "patches.json"):
        content = source_at_commit(root, patch["source"], lock["sources"][patch["source"]], patch["path"])
        if content.count(patch["old"]) != 1:
            raise KishuError(f"Patch needs review: {patch['source']}/{patch['path']}")


def rebrand(text: str) -> str:
    def convert(part):
        return (part.replace("poteto-mode", "kishu-mode").replace("poteto-agent", "kishu-agent")
                .replace("poteto-help", "kishu-help").replace("Poteto mode", "Kishu mode")
                .replace("poteto's", "Kishu's"))
    parts = re.split(r"(https?://[^\s<>\]\)]+)", text)
    return "".join(part if index % 2 else convert(part) for index, part in enumerate(parts))


def playbook_catalog(router: str, directory: Path) -> str:
    section = router.split("## Playbooks\n", 1)[1]
    rows = re.findall(r"^- \*\*([^*]+)\.\*\* (.+)$", section, re.MULTILINE)
    if not rows:
        raise KishuError("Upstream pstack router has no recognized playbook catalog.")
    result = []
    for title, description in rows:
        explicit = re.search(r"(?:File:|file:) `playbooks/([^`]+)`", description)
        filename = explicit.group(1) if explicit else re.sub(r"[^a-z0-9 -]", "", title.lower()).replace(" ", "-") + ".md"
        if not (directory / "playbooks" / filename).is_file():
            raise KishuError(f"Router references missing playbook: {filename}")
        if title == "Opening a PR":
            description = "Prepare and open a PR when the task or agreed project workflow calls for one."
        description = re.sub(r" File: `playbooks/[^`]+`\.", "", description)
        result.append(f"- **[{title}](playbooks/{filename}).** {description}")
    return "\n".join(result)


def strip_frontmatter(text: str) -> str:
    return re.sub(r"\A---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL).lstrip()


def tree_hashes(path: Path) -> dict:
    return {p.relative_to(path).as_posix(): digest_file(p)
            for p in sorted(path.rglob("*")) if p.is_file() and p.name != MARKER}


def ensure_owned_clean(path: Path):
    if not path.exists():
        return
    if path.is_symlink() or not (path / MARKER).is_file():
        raise KishuError(f"Refusing to replace an unmanaged directory: {path}")
    manifest = read_json(path / MARKER)
    if manifest.get("files") != tree_hashes(path):
        raise KishuError(f"Generated files were edited in {path}. Move changes to src/ or overrides/ first.")


def remove_owned_tree(path: Path, parent: Path):
    resolved, boundary = path.resolve(), parent.resolve()
    if resolved == boundary or not resolved.is_relative_to(boundary) or path.is_symlink():
        raise KishuError(f"Unsafe cleanup path: {path}")
    shutil.rmtree(resolved)


def write_manifest(directory: Path, lock: dict):
    write_json(directory / MARKER, {"schema": 1, "version": VERSION, "sources": lock["sources"],
                                    "files": tree_hashes(directory)})


def normalize_text_files(directory: Path):
    """Keep generated bytes stable across Git and Windows newline settings."""
    for path in directory.rglob("*"):
        if not path.is_file():
            continue
        data = path.read_bytes()
        if b"\x00" in data or b"\r\n" not in data:
            continue
        try:
            data.decode("utf-8")
        except UnicodeDecodeError:
            continue
        path.write_bytes(data.replace(b"\r\n", b"\n"))


def build_into(root: Path, lock: dict, target: Path):
    verify_repositories(root, lock)
    check_overrides(root, lock)
    target.mkdir(parents=True, exist_ok=True)
    for name, library in LIBRARIES.items():
        spec = lock["sources"][name]
        source = root / "upstream" / name / spec["subdir"]
        shutil.copytree(source, target / "lib" / library,
                        ignore=shutil.ignore_patterns(".git", ".cursor-plugin", "plugin.json", "__pycache__"))
        license_source = root / "upstream" / name / ("pstack/LICENSE" if name == "pstack" else "LICENSE")
        shutil.copyfile(license_source, target / "lib" / library / "LICENSE")
        notice_source = root / "upstream" / name / "NOTICE.md"
        if notice_source.is_file():
            shutil.copyfile(notice_source, target / "lib" / library / "NOTICE.md")
    shutil.copytree(root / "src/licenses/impeccable",
                    target / "lib/impeccable/third-party-licenses", dirs_exist_ok=True)
    for path in override_files(root):
        parts = path.relative_to(root / "overrides").parts
        dest = target / "lib" / LIBRARIES[parts[0]] / Path(*parts[1:])
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(read_text(path), encoding="utf-8")
    for patch in read_json(root / "src" / "patches.json"):
        path = target / "lib" / LIBRARIES[patch["source"]] / patch["path"]
        text = read_text(path)
        if text.count(patch["old"]) != 1:
            raise KishuError(f"Patch does not apply exactly once: {patch['path']}")
        path.write_text(text.replace(patch["old"], patch["new"]), encoding="utf-8")
    router = target / "lib/pstack/skills/poteto-mode/SKILL.md"
    original = read_text(source_file(root, "pstack", lock["sources"]["pstack"], "skills/poteto-mode/SKILL.md"))
    communication = strip_frontmatter(read_text(target / "lib/communication/SKILL.md"))
    communication = re.sub(r"^# Communication\n+", "", communication)
    rendered = read_text(router).replace("{{COMMUNICATION}}", communication.rstrip())
    rendered = rendered.replace("{{PLAYBOOKS}}", playbook_catalog(original, router.parent))
    router.write_text(rendered, encoding="utf-8")
    for path in (target / "lib/pstack").rglob("*"):
        if path.is_file() and path.suffix in {".md", ".json", ".mjs", ".txt"}:
            path.write_text(rebrand(read_text(path)), encoding="utf-8")
    for path in sorted((target / "lib/pstack").rglob("*"), key=lambda p: len(p.parts), reverse=True):
        renamed = rebrand(path.name)
        if renamed != path.name:
            rename_path(path, path.with_name(renamed))
    entry = target / "skills/kishu-mode/SKILL.md"
    entry.parent.mkdir(parents=True)
    entry.write_text(read_text(root / "src/entrypoint.md"), encoding="utf-8")
    admin = target / "skills/kishu/SKILL.md"
    admin.parent.mkdir(parents=True)
    admin.write_text(read_text(root / "src/admin-entrypoint.md"), encoding="utf-8")
    shutil.copytree(root / "src/adapters", target / "adapters")
    shutil.copytree(root / "src/guides", target / "guides")
    shutil.copytree(root / "src/scripts", target / "scripts", ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))
    metadata = {"name": "kishu", "version": VERSION,
                "description": "Kishu mode: thoughtful work routing, a design taste engine, focused communication, meaningful tests, and useful proof.",
                "author": {"name": "Kishu contributors"}, "license": "MIT AND Apache-2.0"}
    write_json(target / "plugin.json", {"$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json", **metadata})
    write_json(target / ".codex-plugin/plugin.json", {**metadata, "skills": "./skills/",
               "interface": {"displayName": "Kishu", "shortDescription": "A no-fuss generalist stack for your agent",
                             "capabilities": ["Instructions"], "defaultPrompt": ["Use kishu-mode for this task."]}})
    write_json(target / ".claude-plugin/plugin.json", {**metadata, "skills": "./skills/"})
    write_json(target / ".cursor-plugin/plugin.json", {**metadata, "displayName": "Kishu", "skills": "./skills/"})
    ui = target / "skills/kishu-mode/agents/openai.yaml"
    ui.parent.mkdir(parents=True)
    ui.write_text('interface:\n  display_name: "Kishu mode"\n  short_description: "Generalist routing with useful tests and proof"\n  default_prompt: "Use $kishu:kishu-mode to complete this task."\npolicy:\n  allow_implicit_invocation: true\n', encoding="utf-8")
    shutil.copyfile(root / "THIRD_PARTY_NOTICES.md", target / "THIRD_PARTY_NOTICES.md")
    shutil.copyfile(root / "LICENSE", target / "LICENSE")
    shutil.copyfile(root / "src/plugin-readme.md", target / "README.md")
    write_json(target / "upstreams.lock.json", lock)
    normalize_text_files(target)
    validate(target)
    write_manifest(target, lock)


def validate(target: Path):
    public = list((target / "skills").rglob("SKILL.md"))
    if len(public) != 2 or {p.parent.name for p in public} != {"kishu", "kishu-mode"}:
        raise KishuError("The plugin must expose kishu-mode and the kishu setup/update dispatcher.")
    for kind in ("", ".codex-plugin/", ".claude-plugin/", ".cursor-plugin/"):
        manifest = read_json(target / kind / "plugin.json")
        if manifest["name"] != "kishu" or manifest["version"] != VERSION:
            raise KishuError(f"Inconsistent manifest: {kind}")
    required = [*public, target / "lib/pstack/skills/kishu-mode/SKILL.md",
                target / "lib/impeccable/SKILL.md", target / "lib/communication/SKILL.md"]
    required.extend((target / "adapters").glob("*.md"))
    required.extend((target / "guides").glob("*.md"))
    for path in required:
        text = read_text(path)
        if "{{COMMUNICATION}}" in text or "{{PLAYBOOKS}}" in text:
            raise KishuError(f"Unrendered template: {path}")
        for link in re.findall(r"\]\(([^)]+)\)", text):
            if re.match(r"[a-z]+:", link) or link.startswith("#"):
                continue
            dest = (path.parent / link.split("#", 1)[0]).resolve()
            if not dest.is_relative_to(target.resolve()) or not dest.exists():
                raise KishuError(f"Broken or escaping reference in {path}: {link}")
    for library in LIBRARIES.values():
        if not (target / "lib" / library / "LICENSE").is_file():
            raise KishuError(f"Missing upstream license: {library}")
    for name in ("modern-screenshot", "platform-design-skills"):
        if not (target / "lib/impeccable/third-party-licenses" / f"{name}-LICENSE.txt").is_file():
            raise KishuError(f"Missing inherited dependency license: {name}")
    for path in (target / "lib/pstack/skills").glob("*/SKILL.md"):
        if "poteto-mode" in re.sub(r"https?://\S+", "", read_text(path)):
            raise KishuError(f"Unrenamed active reference: {path}")


def rename_path(source: Path, destination: Path):
    # Windows indexers can briefly hold a freshly written directory open.
    for attempt in range(6):
        try:
            source.rename(destination)
            return
        except PermissionError as error:
            if os.name != "nt" or error.winerror not in {5, 32} or attempt == 5:
                raise
            time.sleep(0.05 * 2 ** attempt)


def publish(staged: Path, target: Path, *, finalize=None):
    ensure_owned_clean(target)
    backup = target.with_name(target.name + ".previous")
    if backup.exists():
        raise KishuError(f"Previous build backup needs inspection: {backup}")
    if target.exists():
        rename_path(target, backup)
    installed = False
    try:
        rename_path(staged, target)
        installed = True
        if finalize:
            finalize()
    except BaseException:
        if installed:
            remove_owned_tree(target, target.parent)
        if backup.exists():
            rename_path(backup, target)
        raise
    if backup.exists():
        try:
            remove_owned_tree(backup, target.parent)
        except OSError as error:
            print(f"Published successfully; could not remove backup {backup}: {error}", file=sys.stderr)


def build(root: Path, lock: dict, *, check_only=False):
    target = root / "plugin"
    ensure_owned_clean(target)
    with tempfile.TemporaryDirectory(prefix=".kishu-stage-", dir=root) as work:
        staged = Path(work) / "plugin"
        build_into(root, lock, staged)
        if check_only:
            if not target.exists() or tree_hashes(target) != tree_hashes(staged):
                raise KishuError("Generated plugin is stale; run build")
        else:
            publish(staged, target)
    print(f"{'Checked' if check_only else 'Built'} Kishu {VERSION}: mode + setup/update dispatcher, three pinned sources.")


def update(root: Path, lock: dict):
    verify_repositories(root, lock)
    ensure_owned_clean(root / "plugin")
    candidate = copy.deepcopy(lock)
    for name, spec in candidate["sources"].items():
        repo = root / "upstream" / name
        git(repo, "fetch", "origin", spec["branch"])
        spec["commit"] = git(repo, "rev-parse", "FETCH_HEAD")
    check_overrides(root, candidate)
    try:
        for name, spec in candidate["sources"].items():
            git(root / "upstream" / name, "checkout", "--detach", spec["commit"])
        with tempfile.TemporaryDirectory(prefix=".kishu-stage-", dir=root) as work:
            staged = Path(work) / "plugin"
            build_into(root, candidate, staged)
            publish(staged, root / "plugin", finalize=lambda: write_json(root / "upstreams.lock.json", candidate))
    except BaseException:
        for name, spec in lock["sources"].items():
            git(root / "upstream" / name, "checkout", "--detach", spec["commit"])
        raise
    print("Updated compatible upstream changes. Review the lock and generated diff before committing.")


def standalone(root: Path, destination: Path):
    """Export one self-contained skill without exposing the internal guides as skills."""
    source = root / "plugin"
    validate(source)
    ensure_owned_clean(source)
    destination = destination.resolve()
    if destination == root or destination.is_relative_to(source) or source.is_relative_to(destination):
        raise KishuError("Standalone destination must be separate from the source package.")
    ensure_owned_clean(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=".kishu-stage-", dir=destination.parent) as work:
        target = Path(work) / "kishu-mode"
        shutil.copytree(source / "lib", target / "references")
        shutil.copytree(source / "adapters", target / "adapters")
        shutil.copytree(source / "guides", target / "guides")
        shutil.copytree(source / "scripts", target / "scripts")
        shutil.copytree(source / "skills/kishu-mode/agents", target / "agents")
        ui = target / "agents/openai.yaml"
        ui.write_text(read_text(ui).replace("$kishu:kishu-mode", "$kishu-mode"), encoding="utf-8")
        for name in ("LICENSE", "THIRD_PARTY_NOTICES.md", "upstreams.lock.json"):
            shutil.copyfile(source / name, target / name)
        internal = set(p.resolve() for p in (target / "references").rglob("SKILL.md"))
        for path in target.rglob("*.md"):
            text = read_text(path)
            def rewrite_link(match):
                url = match.group(1)
                if re.match(r"[a-z]+:", url) or url.startswith("#"):
                    return match.group(0)
                file, separator, anchor = url.partition("#")
                resolved = (path.parent / file).resolve()
                if resolved.is_relative_to((target / "lib").resolve()):
                    resolved = (target / "references" / resolved.relative_to((target / "lib").resolve())).resolve()
                    file = Path(os.path.relpath(resolved, path.parent)).as_posix()
                if resolved in internal:
                    file = file.removesuffix("SKILL.md") + "GUIDE.md"
                return "](" + file + (separator + anchor if separator else "") + ")"
            text = re.sub(r"\]\(([^)]+)\)", rewrite_link, text)
            text = text.replace("`../<name>/SKILL.md`", "`../<name>/GUIDE.md`")
            # Rewrite real bundled paths in inline code as well as Markdown links.
            def rewrite_code(match):
                value = match.group(1)
                file = value.split("#", 1)[0]
                resolved = (path.parent / file).resolve()
                from_root = (target / "references" / file.removeprefix("lib/")).resolve()
                if resolved in internal or from_root in internal:
                    value = value.replace("SKILL.md", "GUIDE.md")
                if value.startswith(("lib/pstack/", "lib/impeccable/", "lib/communication/")):
                    value = "references/" + value.removeprefix("lib/")
                return "`" + value + "`"
            text = re.sub(r"`([^`\n]+)`", rewrite_code, text)
            path.write_text(text, encoding="utf-8")
        for path in internal:
            rename_path(path, path.with_name("GUIDE.md"))
        text = read_text(source / "skills/kishu-mode/SKILL.md")
        text = text.replace("../../lib/pstack/skills/kishu-mode/SKILL.md", "references/pstack/skills/kishu-mode/GUIDE.md")
        text = text.replace("../../guides/", "guides/")
        (target / "SKILL.md").write_text(text, encoding="utf-8")
        if list(target.rglob("SKILL.md")) != [target / "SKILL.md"]:
            raise KishuError("Standalone export exposes more than one skill.")
        normalize_text_files(target)
        for path in (target / "SKILL.md", target / "references/pstack/skills/kishu-mode/GUIDE.md",
                     target / "references/impeccable/GUIDE.md", *(target / "guides").glob("*.md")):
            for link in re.findall(r"\]\(([^)]+)\)", read_text(path)):
                if re.match(r"[a-z]+:", link) or link.startswith("#"):
                    continue
                resolved = (path.parent / link.split("#", 1)[0]).resolve()
                if not resolved.is_relative_to(target.resolve()) or not resolved.exists():
                    raise KishuError(f"Broken standalone reference in {path}: {link}")
        write_manifest(target, locked_sources(root))
        publish(target, destination)
    print(f"Exported standalone skill: {destination}")


def install(root: Path, harness: str, destination: Path | None):
    source = root / "plugin"
    validate(source)
    ensure_owned_clean(source)
    if destination:
        standalone(root, destination)
        return
    if harness == "codex":
        binary = shutil.which("codex")
        if not binary:
            raise KishuError("Codex CLI is unavailable; use --destination for a standalone skill export.")
        marketplaces = json.loads(run([binary, "plugin", "marketplace", "list", "--json"]).stdout)["marketplaces"]
        previous = next((m for m in marketplaces if m["name"] == "kishu-local"), None)
        moving = previous is not None and Path(previous["root"]).resolve() != root.resolve()
        if moving:
            old_catalog = read_json(Path(previous["root"]) / ".claude-plugin/marketplace.json")
            if {p["name"] for p in old_catalog["plugins"]} != {"kishu"}:
                raise KishuError("The existing kishu-local marketplace contains other plugins; migrate it explicitly.")
            restore_source = previous.get("marketplaceSource", {}).get("source", previous["root"])
            run([binary, "plugin", "marketplace", "remove", "kishu-local", "--json"])
        try:
            for args in ([binary, "plugin", "marketplace", "add", root, "--json"],
                         [binary, "plugin", "add", "kishu@kishu-local", "--json"]):
                print(run(args).stdout.strip())
        except BaseException:
            if moving:
                run([binary, "plugin", "marketplace", "remove", "kishu-local", "--json"], check=False)
                restored = run([binary, "plugin", "marketplace", "add", restore_source, "--json"], check=False)
                if restored.returncode:
                    print(f"Could not restore the previous Kishu marketplace: {restored.stderr.strip()}", file=sys.stderr)
            raise
    elif harness == "claude":
        binary = shutil.which("claude")
        if not binary:
            raise KishuError("Claude Code CLI is unavailable; use --destination for a standalone skill export.")
        print(run([binary, "plugin", "marketplace", "add", root]).stdout.strip())
        marketplaces = json.loads(run([binary, "plugin", "marketplace", "list", "--json"]).stdout)
        selected = next((m for m in marketplaces if m["name"] == "kishu-local"), None)
        if selected is None or selected.get("source") != "directory" or Path(selected["path"]).resolve() != root.resolve():
            existing = selected.get("path", selected.get("url", selected.get("repo", "unknown"))) if selected else "unknown"
            raise KishuError(f"Claude Code retained an existing Kishu source at {existing}. Update that source or use its clean main checkout via --checkout. Do not remove the marketplace, which can delete plugin data.")
        print(run([binary, "plugin", "install", "kishu@kishu-local"]).stdout.strip())
        print(run([binary, "plugin", "update", "kishu@kishu-local"]).stdout.strip())
    elif harness == "cursor":
        target = Path.home() / ".cursor/plugins/local/kishu"
        ensure_owned_clean(target)
        target.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix=".kishu-stage-", dir=target.parent) as work:
            staged = Path(work) / "kishu"
            shutil.copytree(source, staged)
            publish(staged, target)
        print(f"Installed Cursor plugin at {target}; reload Cursor.")


def activate(root: Path, harness: str, instructions: Path):
    """Add a reversible small reference to an explicitly chosen harness instruction file."""
    instructions = instructions.resolve()
    old = read_text(instructions) if instructions.exists() else ""
    original = old
    start, end = "<!-- kishu:begin -->", "<!-- kishu:end -->"
    if old.count(start) != old.count(end) or old.count(start) > 1:
        raise KishuError("Malformed Kishu activation markers; inspect the instruction file.")
    if start in old and old.index(start) > old.index(end):
        raise KishuError("Malformed Kishu activation markers; inspect the instruction file.")
    if harness == "cursor" and instructions.suffix == ".mdc":
        frontmatter = re.match(r"\A---\n(.*?)\n---(?:\n|$)", old, re.DOTALL)
        if frontmatter:
            fields = frontmatter.group(1)
            if re.search(r"^alwaysApply:", fields, re.MULTILINE):
                fields = re.sub(r"^alwaysApply:.*$", "alwaysApply: true", fields, flags=re.MULTILINE)
            else:
                fields += "\nalwaysApply: true"
            old = "---\n" + fields + "\n---\n" + old[frontmatter.end():]
        elif old.startswith("---"):
            raise KishuError("Malformed Cursor rule frontmatter; inspect the instruction file.")
        else:
            old = "---\ndescription: Kishu default working mode\nalwaysApply: true\n---\n\n" + old
    entry = "kishu:kishu-mode" if harness in {"codex", "claude"} else "kishu-mode"
    block = f"{start}\nUse the installed {entry} skill from this host's skill inventory as the default working mode and let Kishu route the work. Apply the user's current request and project instructions first. Load detailed workflows only when useful.\n{end}"
    if start in old:
        new = re.sub(re.escape(start) + r".*?" + re.escape(end), lambda _: block, old, flags=re.DOTALL)
    else:
        new = old.rstrip() + ("\n\n" if old.strip() else "") + block + "\n"
    if new == original:
        print(f"Already active: {instructions}")
        return
    instructions.parent.mkdir(parents=True, exist_ok=True)
    instructions.write_text(new, encoding="utf-8")
    print(f"Added Kishu reference to {instructions}; remove its marked block to disable.")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    subs = parser.add_subparsers(dest="command", required=True)
    for name in ("sync", "build", "check", "update", "status", "package"):
        subs.add_parser(name)
    accept = subs.add_parser("accept-overrides", help="Record reviewed full-file override baselines")
    accept.add_argument("--reason", required=True)
    installer = subs.add_parser("install", help="Install through a native harness or export a standalone skill")
    installer.add_argument("--harness", choices=["codex", "claude", "cursor"], default="codex")
    installer.add_argument("--destination", type=Path, help="Explicit standalone skill directory; no global settings change")
    activation = subs.add_parser("activate", help="Opt in to always-on behavior in a chosen instruction file")
    activation.add_argument("--harness", choices=["codex", "claude", "cursor", "generic"], default="codex")
    activation.add_argument("--instructions", type=Path, required=True)
    args = parser.parse_args(argv)
    root = args.root.resolve()
    lock = locked_sources(root)
    if args.command == "sync":
        ensure_repositories(root, lock)
        print("All three upstream checkouts match their pinned revisions.")
    elif args.command in {"build", "check"}:
        build(root, lock, check_only=args.command == "check")
    elif args.command == "update":
        update(root, lock)
    elif args.command == "accept-overrides":
        accept_overrides(root, lock, args.reason)
        print("Recorded reviewed override baselines. Inspect overrides.lock.json before committing.")
    elif args.command == "status":
        for name, spec in lock["sources"].items():
            print(f"{name}: {spec['commit']} ({spec['url']})")
    elif args.command == "install":
        install(root, args.harness, args.destination)
    elif args.command == "activate":
        validate(root / "plugin")
        activate(root, args.harness, args.instructions)
    elif args.command == "package":
        build(root, lock, check_only=True)
        (root / "dist").mkdir(exist_ok=True)
        archive = root / "dist" / f"kishu-{VERSION}.zip"
        with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
            for path in sorted((root / "plugin").rglob("*")):
                if path.is_file():
                    info = zipfile.ZipInfo((Path("kishu") / path.relative_to(root / "plugin")).as_posix())
                    info.compress_type = zipfile.ZIP_DEFLATED
                    info.external_attr = 0o100644 << 16
                    bundle.writestr(info, path.read_bytes())
        print(archive)


if __name__ == "__main__":
    try:
        main()
    except (KishuError, OSError, ValueError, KeyError) as error:
        print(f"kishu: {error}", file=sys.stderr)
        sys.exit(1)
