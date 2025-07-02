import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { UserProfile, UserRole } from '../types/user';
import { supabase } from '../client';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    role: UserRole,
    userData: Partial<UserProfile>
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchAndSetProfile = async (userId: string, fallbackUser?: any) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profile && isMounted.current) {
      setCurrentUser({
        uid: profile.user_id,
        email: profile.email,
        role: profile.type || 'worker',
        firstName: profile.full_name || '',
        lastName: '',
        phoneNumber: profile.mobile || '',
        isApproved: true,
        createdAt: profile.created_at ? new Date(profile.created_at) : new Date(),
        updatedAt: profile.created_at ? new Date(profile.created_at) : new Date(),
        companyName: profile.company_name,
        skills: profile.skills,
        experience: profile.experience,
        rating: profile.rating,
        bio: profile.bio,
        profileImage: profile.profile_photo,
      });
    } else if (fallbackUser && isMounted.current) {
      setCurrentUser({
        uid: fallbackUser.id,
        email: fallbackUser.email || '',
        role: 'worker',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        isApproved: true,
        createdAt: fallbackUser.created_at ? new Date(fallbackUser.created_at) : new Date(),
        updatedAt: fallbackUser.created_at ? new Date(fallbackUser.created_at) : new Date(),
      });
    } else if (isMounted.current) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    isMounted.current = true;

    const getSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (user && isMounted.current) {
        await fetchAndSetProfile(user.id, user);
      } else if (isMounted.current) {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    getSession();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      if (data?.user && isMounted.current) {
        await fetchAndSetProfile(data.user.id, data.user);
      }
    } catch (err: any) {
      if (isMounted.current) setError(err.message);
      throw err;
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await supabase.auth.signOut();
      if (isMounted.current) setCurrentUser(null);
    } catch (err: any) {
      if (isMounted.current) setError(err.message);
      throw err;
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    role: UserRole,
    userData: Partial<UserProfile>
  ) => {
    setError(null);
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;

      const user = data?.user;
      if (user && isMounted.current) {
        setCurrentUser({
          uid: user.id,
          email: user.email || '',
          role,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phoneNumber: userData.phoneNumber || '',
          isApproved: true,
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.created_at),
        });
      }
    } catch (err: any) {
      if (isMounted.current) setError(err.message);
      throw err;
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
