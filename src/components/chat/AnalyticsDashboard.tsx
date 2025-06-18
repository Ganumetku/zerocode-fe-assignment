import { useEffect, useState } from 'react';
import { Message } from '../../types/'; 
// ✅ Use your global type

// Define a proper Message interface (or import from your types file)
// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
// }

interface Stats {
  totalMessages: number;
  userMessages: number;
  botMessages: number;
  avgUserMessageLength: number;
  avgBotMessageLength: number;
}

interface AnalyticsDashboardProps {
  messages: Message[]; // Replaced 'any' with Message type
}

const AnalyticsDashboard = ({ messages }: AnalyticsDashboardProps) => {
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    userMessages: 0,
    botMessages: 0,
    avgUserMessageLength: 0,
    avgBotMessageLength: 0,
  });

  const handleDownload = () => {
  const blob = new Blob([JSON.stringify(messages, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chat-analytics.json';
  a.click();
  URL.revokeObjectURL(url);
};


  useEffect(() => {
      console.log("Received messages:", messages);
    if (messages.length > 0) {
      const userMessages = messages.filter(m => m.sender === 'user');
      const botMessages = messages.filter(m => m.sender === 'bot');
      
      const avgUserLength = userMessages.length > 0 
        ? userMessages.reduce((sum, m) => sum + m.content.length, 0) / userMessages.length 
        : 0;
      const avgBotLength = botMessages.length > 0 
        ? botMessages.reduce((sum, m) => sum + m.content.length, 0) / botMessages.length 
        : 0;

      setStats({
        totalMessages: messages.length,
        userMessages: userMessages.length,
        botMessages: botMessages.length,
        avgUserMessageLength: Math.round(avgUserLength),
        avgBotMessageLength: Math.round(avgBotLength),
      });
    }
  }, [messages]);
  

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Chat Analytics</h3>
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          label="Total Messages" 
          value={stats.totalMessages} 
        />
        <StatCard 
          label="Your Messages" 
          value={stats.userMessages} 
        />
        <StatCard 
          label="Bot Responses" 
          value={stats.botMessages} 
        />
        <StatCard 
          label="Avg. Your Message Length" 
          value={`${stats.avgUserMessageLength} chars`} 
        />
        <StatCard 
          label="Avg. Bot Message Length" 
          value={`${stats.avgBotMessageLength} chars`} 
        />

      </div>
      
<button
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  onClick={handleDownload}
>
  Download Chat
</button>
    </div>
  );
};

// Extracted StatCard as a separate component for reusability
interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AnalyticsDashboard;