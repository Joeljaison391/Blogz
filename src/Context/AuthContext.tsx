import React, { createContext, useState, useContext,  ReactNode } from 'react';
import axiosInstance from '../axiosConfig'; 
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string; 
}


interface AuthContextType {
  user: User | null;
  login: (userData: { identifier:string; password: string }) => Promise<void>;
  logout: () => void;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
  loading: boolean;
  testBackend: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('Checking user');
    const checkUser = async () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          setUser(JSON.parse(user));
          console.log('User found:', user);
        }
        const expiry = localStorage.getItem('expiry');
        if (expiry) {
          const expiryDate = new Date(expiry);
          if (new Date() > expiryDate) {
            localStorage.removeItem('user');
            localStorage.removeItem('expiry');
            setUser(null);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };
    checkUser();
  }, []);

  
    
   

  const login = async (userData: { identifier:string; password: string }) => {
    try {
      const response = await axiosInstance.post('/v2/auth/user/login', userData);
      console.log(response);
      setUser(response.data);
      if(response.status === 200){
        console.log('User logged in successfully');
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
      await axiosInstance.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const register = async (userData: { username: string; email: string; password: string; }) => {
    try {
      
      const response = await axiosInstance.post('/v2/auth/user/register', userData);
      console.log(response);
      if(response.status === 201){
        console.log('User registered successfully');
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
      const response = await axiosInstance.get('/test/heatlh');
      console.log(response.data);
    } catch (error) {
      console.error('Error testing backend:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, 
    loading , testBackend }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
