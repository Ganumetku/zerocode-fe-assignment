import { Message as MessageType } from '../../types';
import { FiUser, FiMessageSquare } from 'react-icons/fi';

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex items-start max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
      >
        <div className="mr-2 mt-1">
          {message.sender === 'user' ? <FiUser /> : <FiMessageSquare />}
        </div>
        <div>
          <p className="whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs opacity-70 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;