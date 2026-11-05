# Kishu — AI workflows and model routing for coding agents

> Kishu coordinates AI coding workflows in Codex, Cursor, and Claude Code. Customize model roles, add design guidance, and get clear, checked results.

Kishu is an open-source workflow plugin, used inside an existing coding agent. It is not a hosted coding service. The website’s interactive scenarios and model profiles are demonstrations, not live model sessions or measured benchmarks.

## How Kishu works

1. Describe the outcome in one prompt.
2. Kishu selects the relevant workflow and applies your preferences.
3. pstack playbooks guide planning, implementation, and useful review.
4. Impeccable guidance joins when interface design or polish matters.
5. Receive a clear account of what changed, what was checked, and what remains.

## Models and cost

Choose supported models and reasoning effort for planning, implementation, review, and other roles. A deeper reasoning model can resolve uncertain decisions, while an efficient coding model implements a bounded brief. Independent assignments can run in parallel after agreeing shared boundaries. Actual savings depend on model prices, context, task complexity, and coordination overhead. These preferences guide delegated roles, not the model running the current chat.

## Installation and activation

Requires Python 3.11+ and Git for installation. Choose one native plugin or standalone export per harness.

```sh
git clone --branch v0.1.5 --single-branch https://github.com/SPDUK/kishu-stack.git
cd kishu-stack
python scripts/kishu.py install --harness codex
```

Use `--harness cursor` or `--harness claude` for those hosts. Start a fresh session after installation.

| Host | Work command | Model setup |
| --- | --- | --- |
| Codex plugin | `$kishu:kishu-mode` | `$kishu:kishu setup` |
| Cursor | `/kishu-mode` | `/kishu setup` |
| Claude Code | `/kishu:kishu-mode` | `/kishu:kishu setup` |

## Common questions

### What is Kishu?

Kishu is an open-source workflow plugin for AI coding agents. It brings task routing, customizable model roles, design guidance, and ADHD-aware communication together in one entrypoint: Kishu mode.

### Which coding agents does Kishu support?

Kishu provides native plugin entrypoints for Codex, Cursor, and Claude Code, plus a standalone skill export. It works inside your existing agent with the code and tools available in that environment.

### Can I choose different AI models for different roles?

Yes. Kishu setup helps you choose supported models and reasoning effort for planning, implementation, review, and other roles. Saved preferences guide delegation when it is useful. Available models depend on your host; role preferences do not change the model running your current chat.

### Can model routing reduce coding costs or save time?

It can concentrate expensive reasoning on difficult decisions, give efficient coding models a focused brief, and let independent assignments run in parallel. Savings depend on the task, model prices, context, and coordination overhead. The examples on this site are illustrative, not benchmarks.

### What do pstack and Impeccable do in Kishu?

pstack provides the engineering playbooks behind Kishu’s routing and handoffs. Impeccable provides the foundation for its design guidance. Kishu adapts these foundations with its own preferences for scope, model choices, useful checks, and clear communication; i-have-adhd informs its communication style.

## A real project

This website was built using Kishu mode. Its source, behavior tests, and browser-verification record are in the repository’s site directory. The example engineering tasks are illustrative.

## Open-source foundations

- pstack, Lauren Tan, MIT: engineering playbooks, adapted by Kishu.
- Impeccable, Paul Bakaus, Apache-2.0: design guidance.
- i-have-adhd, Ayoub G., MIT: the starting point for ADHD-aware communication.

Kishu’s code is MIT licensed. Original upstream licenses and notices remain with the bundle. Attribution does not imply endorsement.

## Source and documentation

- [Website](https://spduk.github.io/kishu-stack/)
- [Repository and setup guide](https://github.com/SPDUK/kishu-stack)
- [Build story](https://github.com/SPDUK/kishu-stack/blob/main/site/BUILD_STORY.md)
- [Verification record](https://github.com/SPDUK/kishu-stack/blob/main/site/VERIFICATION.md)
- [Licenses and attribution](https://github.com/SPDUK/kishu-stack/blob/main/THIRD_PARTY_NOTICES.md)
