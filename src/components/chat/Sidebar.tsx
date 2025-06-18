import AnalyticsDashboard from './AnalyticsDashboard';
import PromptTemplates from './PromptTemplates';
import { Message } from '../../types';

interface SidebarProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ messages, setMessages }) => {
  const exportChat = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-65 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col h-screen">
      
      {/* Scrollable content area */}
      <div className=" flex-1 p-4 space-y-6">
        <h2 className="text-xl font-bold mb-2">Chat Tools</h2>
        
        <PromptTemplates
          onSelect={(template) => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                sender: 'user',
                content: template,
                timestamp: new Date(),
              },
            ]);
          }}
        />
              <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <button
          onClick={exportChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Export Chat
        </button>
      </div>

        {/* Analytics */}
        <AnalyticsDashboard messages={messages} />
      </div>

      {/* Fixed export button at bottom */}

    </div>
  );
};

export default Sidebar;
