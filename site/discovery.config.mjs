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
    question: "Can model routing reduce coding costs or save time?",
    answer: "It can concentrate expensive reasoning on difficult decisions, give efficient coding models a focused brief, and let independent assignments run in parallel. Savings depend on the task, model prices, context, and coordination overhead. The examples on this site are illustrative, not benchmarks.",
  },
  {
    question: "What do pstack and Impeccable do in Kishu?",
    answer: "pstack provides the engineering playbooks behind Kishu’s routing and handoffs. Impeccable provides the foundation for its design guidance. Kishu adapts these foundations with its own preferences for scope, model choices, useful checks, and clear communication; i-have-adhd informs its communication style.",
  },
];
