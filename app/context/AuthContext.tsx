'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../components/PersonalAccount/PersonInfo';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          // Validate token format (basic JWT structure check)
          const tokenParts = token.split('.');
          if (tokenParts.length !== 3) {
            console.warn('Invalid token format');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
          }
          
          // Parse and validate user data
          try {
            const parsedUser = JSON.parse(userData);
            if (!parsedUser || typeof parsedUser !== 'object') {
              throw new Error('Invalid user data');
            }
            setIsAuthenticated(true);
            setUser(parsedUser);
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string, userData: User) => {
    try {
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Save to cookies
      document.cookie = `token=${token}; path=/`;
      
      setIsAuthenticated(true);
      setUser(userData);
      router.push('/personalAccount');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      // Remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Remove from cookies
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      
      setIsAuthenticated(false);
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 