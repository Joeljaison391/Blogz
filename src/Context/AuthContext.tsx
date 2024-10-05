import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import API_URLS  from '../utils/backendAPIs'

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: { identifier: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
  loading: boolean;
  testBackend: () => void;
  checkUser: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      console.log('Checking user');
      const user = localStorage.getItem('user');
      const expiry = localStorage.getItem('expiry');
  
      if (user && expiry) {
        const expiryDate = new Date(expiry);
        if (new Date() <= expiryDate) {
          setUser(JSON.parse(user));
          setLoading(false);
          return true;
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('expiry');
          setUser(null);
        }
      }
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Error checking user:', error);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      await checkUser();
    };
    initializeUser();
  }, []);

  const login = async (userData: { identifier: string; password: string }) => {
    try {
      const response = await axiosInstance.post(API_URLS.AUTH.LOGIN, userData , {
        withCredentials: true
      });
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        const expiry = new Date();
        expiry.setUTCHours(expiry.getUTCHours() + 5);
        localStorage.setItem('expiry', expiry.toISOString());
        setUser(response.data.user);
        setLoading(false);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post(API_URLS.AUTH.LOGOUT);
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const register = async (userData: { username: string; email: string; password: string }) => {
    try {
      const response = await axiosInstance.post(API_URLS.AUTH.REGISTER, userData);
      if (response.status === 201) {
        setLoading(false);
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const testBackend = async () => {
    try {
      console.log('Testing backend');
      const response = await axiosInstance.get(API_URLS.TEST.HEALTH);
      console.log(response.data);
    } catch (error) {
      console.error('Error testing backend:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, testBackend, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
