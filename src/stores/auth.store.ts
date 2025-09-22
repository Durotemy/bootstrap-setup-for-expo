import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  token?: string;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: undefined,
  login: (token) => set({ isAuthenticated: true, token }),
  logout: () => set({ isAuthenticated: false, token: undefined }),
}));
