import { create } from 'zustand';
import { DBUser } from '@/types/user';

type UserState = {
  user: DBUser | null;
  setUser: (user: DBUser | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
