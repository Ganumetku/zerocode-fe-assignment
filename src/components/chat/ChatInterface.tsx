import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import Message from './Message';
import { FiSend, FiMic } from 'react-icons/fi'; // ✅ Added mic icon
import { Message as MessageType } from '../../types';

interface ChatInterfaceProps {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const ChatInterface = ({ messages, setMessages }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { sendMessage, loading } = useChat(messages, setMessages);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await sendMessage(input);
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + ' ' + transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700"
      >
        <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-transparent outline-none text-sm text-black dark:text-white"
          />

          {/* 🎤 Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className="ml-2 p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800"
            title="Voice Input"
          >
            <FiMic size={18} />
          </button>

          {/* ➤ Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            <FiSend size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
