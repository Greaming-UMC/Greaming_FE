import { create } from "zustand";

export type HeaderProfile = {
  nickname: string;
  profileImgUrl?: string;
  level?: string;
};

interface HeaderProfileState {
  profile: HeaderProfile | null;
  setProfile: (profile: HeaderProfile | null) => void;
  clearProfile: () => void;
}

export const useHeaderProfileStore = create<HeaderProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
