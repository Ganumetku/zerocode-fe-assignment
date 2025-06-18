// src/services/chat.ts
// Mock implementation of chat service
export const sendMessage = async (message: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock responses based on user input
  const responses: Record<string, string> = {
    'hello': 'Hi there! How can I help you today?',
    'how are you': "I'm just a bot, but I'm functioning well! How about you?",
    'what can you do': 'I can respond to your messages with pre-defined responses. Try asking me "hello" or "how are you"',
    'default': "I'm a simple chatbot for this demo. In a real application, I would connect to an LLM like OpenAI's GPT to generate responses."
  };
  
  const lowerMessage = message.toLowerCase();
  return responses[lowerMessage] || responses['default'];
};