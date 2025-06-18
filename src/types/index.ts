export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  id: string;
  content: string;  // Not 'text'
  sender: 'user' | 'bot';
  timestamp: Date;
}