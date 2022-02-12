module.exports = {
  disableEmoji: false,
  list: [
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "chore",
    "revert",
    "WIP",
  ],
  maxMessageLength: 100,
  minMessageLength: 3,
  questions: ["type", "scope", "subject", "body"],
  scopes: ["app", "common", "user", "tools"],
  types: {
    feat: {
      description: "",
      emoji: "✨",
      value: "feat",
    },
    fix: {
      description: "",
      emoji: "🐛",
      value: "fix",
    },
    docs: {
      description: "",
      emoji: "📝",
      value: "docs",
    },
    style: {
      description: "",
      emoji: "💄",
      value: "style",
    },
    refactor: {
      description: "",
      emoji: "♻️",
      value: "refactor",
    },
    perf: {
      description: "",
      emoji: "🚀",
      value: "perf",
    },
    test: {
      description: "",
      emoji: "✔️",
      value: "test",
    },
    chore: {
      description: "",
      emoji: "🔨",
      value: "chore",
    },
    revert: {
      description: "",
      emoji: "⏪",
      value: "revert",
    },
    WIP: {
      description: "",
      emoji: "🚧",
      value: "WIP",
    },
  },
};
