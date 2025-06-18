export const DEFAULT_PROMPT_TEMPLATES = [
  "Help me brainstorm ideas for...",
  "Explain this concept to me like I'm 5...",
  "What are the pros and cons of...",
  "Suggest creative ways to...",
  "Help me debug this problem..."
];

export const INITIAL_MESSAGES = [
  {
    sender: 'bot' as const,
    text: 'Hello! How can I help you today?',
    timestamp: new Date()
  }
];