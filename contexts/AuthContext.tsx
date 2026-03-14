import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  googleId?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const saveUser = useCallback((userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }

        const response = await fetch('/backend/check-auth.php', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (data.success && data.user) {
          saveUser(data.user);
        } else if (!savedUser) {
          clearUser();
        }
      } catch (error) {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) {
          clearUser();
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [saveUser, clearUser]);

  const register = async (name: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'فشل في التسجيل');
      }

      saveUser(data.user);
      toast.success('تم إنشاء الحساب بنجاح!');
    } catch (error: any) {
      toast.error(error.message || 'فشل في التسجيل');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'فشل في تسجيل الدخول');
      }

      saveUser(data.user);
      toast.success('تم تسجيل الدخول بنجاح!');
    } catch (error: any) {
      toast.error(error.message || 'فشل في تسجيل الدخول');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await fetch('/backend/logout.php', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      // ignore
    } finally {
      clearUser();
      toast.success('تم تسجيل الخروج بنجاح!');
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/backend/google-login.php', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (!data.success || !data.auth_url) {
        throw new Error(data.message || 'فشل في تسجيل الدخول بـ Google');
      }

      window.location.href = data.auth_url;
    } catch (error: any) {
      toast.error(error.message || 'فشل في تسجيل الدخول بـ Google');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    googleLogin,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const useGoogleLogin = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useGoogleLogin must be used within an AuthProvider');
  }

  return context.googleLogin;
};
