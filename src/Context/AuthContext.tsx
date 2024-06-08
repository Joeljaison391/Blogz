import React, { createContext, useState, useContext,  ReactNode } from 'react';
import axiosInstance from '../axiosConfig'; 
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string; 
}


interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
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



  
    
   

  const login = async (userData: User) => {
    try {
      const response = await axiosInstance.post('/auth/login', userData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
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
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
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
