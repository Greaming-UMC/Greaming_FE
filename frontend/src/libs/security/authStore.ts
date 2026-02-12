import { create } from "zustand";
import { getAccessToken } from "./tokenStore";

export type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface AuthState {
  status: AuthStatus;
  isLoggedIn: boolean;
  setAuthenticated: () => void;
  setUnauthenticated: () => void;
  resetAuthStatus: () => void;
}

const hasInitialToken = Boolean(getAccessToken());

export const useAuthStore = create<AuthState>((set) => ({
  status: hasInitialToken ? "authenticated" : "unknown",
  isLoggedIn: hasInitialToken,
  setAuthenticated: () =>
    set({
      status: "authenticated",
      isLoggedIn: true,
    }),
  setUnauthenticated: () =>
    set({
      status: "unauthenticated",
      isLoggedIn: false,
    }),
  resetAuthStatus: () =>
    set({
      status: "unknown",
      isLoggedIn: false,
    }),
}));
