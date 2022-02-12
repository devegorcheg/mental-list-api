module.exports = {
  types: [
    { value: "feat", name: "feat: New functionality" },
    { value: "fix", name: "fix: Bug fix" },
    {
      value: "refactor",
      name: "refactor: Code change that does not fix a bug or add functionality",
    },
    {
      value: "chore",
      name: "chore: Support tool changes",
    },
    { value: "WIP", name: "WIP: Work in progress" },
  ],

  scopes: [
    { name: "app" },
    { name: "common" },
    { name: "user" },
    { name: "tools" },
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: "№",
  ticketNumberRegExp: "\\d{1,5}",

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nDenote the SCOPE of this change (optional):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer:
      "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },

  allowCustomScopes: true,

  // limit subject length
  subjectLimit: 100,
};
