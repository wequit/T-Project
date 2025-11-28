import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  user?: {
    username: string;
    email?: string;
  } | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  
  setTokens: (token: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setTokens: (token, refreshToken) => {
        localStorage.setItem("auth-token", token);
        localStorage.setItem("auth-refresh-token", refreshToken);
        set({
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-refresh-token");
        set({
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
