import { useState, useRef } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/chat/Sidebar';
import ChatInterface from '../components/chat/ChatInterface';
import { Message } from '../types';

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(260); // default width in px
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  const resize = (e: MouseEvent) => {
    if (isResizing.current) {
      setSidebarWidth(Math.max(200, Math.min(500, e.clientX))); // limit width
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside
          className="overflow-y-auto bg-gray-100 dark:bg-gray-900"
          style={{ width: sidebarWidth }}
        >
          <Sidebar messages={messages} setMessages={setMessages} />
        </aside>

        {/* Resize handle */}
        <div
          onMouseDown={startResizing}
          className="w-1 bg-gray-300 dark:bg-gray-600 cursor-col-resize"
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatInterface messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
