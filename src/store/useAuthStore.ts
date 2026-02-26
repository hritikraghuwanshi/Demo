import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      login: (email: string, _password: string) => {
        set({
          isAuthenticated: true,
          user: { email, name: email.split("@")[0] },
        });
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "paypilot-auth" }
  )
);
