import { useState, useCallback } from 'react';
import { sendMessage as sendMessageApi } from '../services/chat';
import { Message } from '../types';

interface UseChatReturn {
  sendMessage: (text: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const useChat = (
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
): UseChatReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const botResponse = await sendMessageApi(text);
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to send message');
      setError(error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [setMessages]);

  return { sendMessage, loading, error };
};
