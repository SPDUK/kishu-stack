export const site = {
  url: "https://spduk.github.io/kishu-stack/",
  name: "Kishu",
  title: "Kishu — AI Workflows & Model Routing for Coding Agents",
  description: "Kishu coordinates AI coding workflows in Codex, Cursor, and Claude Code. Customize model roles, add design guidance, and get clear, checked results.",
  repository: "https://github.com/SPDUK/kishu-stack",
  image: "assets/kishu-social.jpg",
  imageAlt: "Kishu — Think big. Build smarter. AI workflows and model routing for Codex, Cursor, and Claude Code.",
};

export const questions = [
  {
    question: "What is Kishu?",
    answer: "Kishu is an open-source workflow plugin for AI coding agents. It brings task routing, customizable model roles, design guidance, and ADHD-aware communication together in one entrypoint: Kishu mode.",
  },
  {
    question: "Which coding agents does Kishu support?",
    answer: "Kishu provides native plugin entrypoints for Codex, Cursor, and Claude Code, plus a standalone skill export. It works inside your existing agent with the code and tools available in that environment.",
  },
  {
    question: "Can I choose different AI models for different roles?",
    answer: "Yes. Kishu setup helps you choose supported models and reasoning effort for planning, implementation, review, and other roles. Saved preferences guide delegation when it is useful. Available models depend on your host; role preferences do not change the model running your current chat.",
  },
  {
    question: "Can I ask for a plan before Kishu writes code?",
    answer: "Yes. Try “Plan the dashboard migration across three pull requests.” Kishu writes a Markdown checklist with each PR’s scope, dependencies, and verification steps. The bundled checker validates the plan’s structure. Live checks use your configured worker model. Implementation waits for your go-ahead.",
  },
  {
    question: "Can model routing reduce coding costs or save time?",
    answer: "It can concentrate expensive reasoning on difficult decisions, give efficient coding models a focused brief, and let independent assignments run in parallel. Savings depend on the task, model prices, context, and coordination overhead. The examples on this site are illustrative, not benchmarks.",
  },
  {
    question: "Which projects does Kishu build on?",
    answer: "Each release pins three reviewed dependencies. Kishu v0.1.7 uses pstack 0.15.44 for engineering playbooks, Impeccable 4.10.0 for design and motion review, and i-have-adhd 0.4.1 for ADHD-aware communication.",
  },
];
