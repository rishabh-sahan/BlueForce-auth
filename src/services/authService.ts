// User authentication and management service

import { supabase } from '../client';

// Extended User interface with new employer fields
export interface User {
  id: number;
  name: string;
  email: string;
  type?: 'worker' | 'employer';
  profession?: string;
  location?: string;
  rating?: number;
  verified?: boolean;
  registeredDate: string;
  lastActive: string;
  status?: 'active' | 'suspended';
  jobsPosted?: number;
  companyName?: string;
  companyType?: string;
  profile_photo?: string;
  hiringVolume?: string;
  preferredSkills?: string[];
  gstin?: string;
  mobile?: string;
}

// LocalStorage keys
const USERS_KEY = 'blueforce_users';
const CURRENT_USER_KEY = 'blueforce_current_user';

export const initializeUsers = (): void => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
      const initialUsers: User[] = [
        {
          id: 1,
          name: 'Demo User',
          email: 'user@example.com',
          type: 'worker',
          profession: 'Electrician',
          location: 'Mumbai',
          rating: 4.8,
          verified: true,
          registeredDate: new Date().toISOString().split('T')[0],
          lastActive: new Date().toISOString().split('T')[0]
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
    }
  } catch (error) {
    console.error('Failed to initialize users:', error);
    window._blueforceUsers = [
      {
        id: 1,
        name: 'Demo User',
        email: 'user@example.com',
        type: 'worker',
        profession: 'Electrician',
        location: 'Mumbai',
        rating: 4.8,
        verified: true,
        registeredDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
      }
    ];
  }
};

export const getUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.warn('Could not retrieve users from localStorage:', error);
    return window._blueforceUsers || [];
  }
};

declare global {
  interface Window {
    _blueforceUsers?: User[];
  }
}

export const registerUser = (
  user: Omit<User, 'id' | 'registeredDate' | 'lastActive'>
): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    registeredDate: new Date().toISOString().split('T')[0],
    lastActive: new Date().toISOString().split('T')[0]
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return newUser;
};

export const loginUser = (email: string): User | null => {
  const users = getUsers();
  let user = users.find(u => u.email === email);

  if (!user) {
    user = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: email.split('@')[0],
      email: email,
      registeredDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const updateUserProfile = (
  userId: number,
  updates: Partial<User>
): User | null => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return null;

  const updatedUser: User = {
    ...users[index],
    ...updates,
    lastActive: new Date().toISOString().split('T')[0]
  };
  users[index] = updatedUser;

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  }

  return updatedUser;
};

// Optional Supabase profile sync
export const saveUserProfileToSupabase = async (profile: any) => {
  const { user_id, full_name, mobile, email, location, type, profile_photo } = profile;
  const { data, error } = await supabase.from('profiles').insert([
    { user_id, full_name, mobile, email, location, type, profile_photo }
  ]);
  if (error) throw error;
  return data;
};
