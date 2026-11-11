# Codex adapter

Use the tools advertised in this session. In inherited pstack guides, `Task` means an available subagent tool, `AskQuestion` means the host's question tool, and a todo means the host's planning tool when present. Work directly when those tools are unavailable or delegation would add no useful separation.

A pstack agent type is a role brief. If Codex cannot register that type, read its file under `lib/pstack/agents/` and include the relevant brief in a normal subagent request. Give file paths, scope, the user's goal, and required evidence. Keep independent writers in separate files or worktrees.

Honor the user's model-role configuration, including any pstack-models.mdc explicitly named by their instructions. Discover supported model IDs before delegation. Pass reasoning effort separately from the model ID. Use `fork_turns: "none"` when the host requires it for an explicit model or effort, with sufficient context in the brief. `auto` and `inherit-parent` mean omit the model override. Never translate a GPT ID into a Claude model or guess an unsupported ID. Without an applicable choice, inherit the current model.

If a requested cross-family panel is unavailable, say so and use the workflow's supported fallback. Do not describe multiple runs of one family as cross-family review. Do not change the parent chat's model settings.

Use native shell, browser/computer tools, search, connectors, and skill-authoring tools when they meet the task. Pstack's cursor-team-kit, `/loop`, `drive`, and Cursor transcript paths are not required dependencies. Map them to the current host's equivalent; if absent, perform the useful step directly or report the precise unavailable check. Do not inspect other projects' chats to find transcripts.

In Codex desktop, deliver local image proof as Markdown image embeds in the main agent's final reply, using absolute filesystem paths and descriptive alt text. Use forward slashes on Windows and wrap paths containing spaces in angle brackets. A plain file link, inline-code path, relative path, or image viewed only through a tool does not render the image in the reply. For supported remote media or native attachments, use the host's permitted presentation mechanism; do not download media to bypass display restrictions.

Sub-agent image output is not automatically visible in the parent chat. Obtain an accessible saved path or supported attachment reference, inspect the image with the available image-viewing tool, then embed or attach it in the main reply. Check that each promised image is included and still accessible before sending. If the host exposes delivery or rendering status, check it; otherwise report only what was attached, without claiming the user saw it. When inline display is unsupported, give an accessible link and explain the limitation.

All bundled tool paths resolve from the plugin root, which is four directories above the internal router file. Keep command cwd at the user's project unless a command requires otherwise. On Windows use the actual shell's syntax. For Impeccable use `lib/impeccable/scripts/impeccable.cmd` when a POSIX shell is unavailable.

Codex registers the plugin skill as `kishu:kishu-mode`: select it through `/skills` or use `$kishu:kishu-mode`. The standalone export is `$kishu-mode`. Recognize `/kishu-mode` in ordinary prompts too; do not claim that the host has registered a custom slash command unless it exposes one. Use durable host instructions for optional always-on activation rather than duplicating the full router in every prompt.
