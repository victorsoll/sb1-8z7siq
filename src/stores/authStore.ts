import create from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthStore {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ isAuthenticated: true, user: data.user });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ isAuthenticated: false, user: null });
  },
}));