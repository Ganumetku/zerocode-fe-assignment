import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser, registerUser, getUser } from '../services/auth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
useEffect(() => {
  const initializeAuth = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const userData = await getUser(storedToken); // ✅ PASS TOKEN HERE
        setUser(userData);
        setToken(storedToken);
      } catch {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };
  initializeAuth();
}, []);


  const login = async (email: string, password: string) => {
    const { user, token } = await loginUser(email, password);
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    router.push('/chat');
  };

  const register = async (name: string, email: string, password: string) => {
    const { user, token } = await registerUser(name, email, password);
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    router.push('/chat');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export a custom hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};