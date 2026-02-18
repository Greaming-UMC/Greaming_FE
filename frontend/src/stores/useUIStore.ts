import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CheckHomeHeaderResult,
  HomeChallengeInfo,
  UserHomeInfo,
} from "../apis/types/home/checkHomeHeader";

type UIState = {
  homeHeader: CheckHomeHeaderResult | null;
  dailyChallengeInfo: HomeChallengeInfo | null;
  weeklyChallengeInfo: HomeChallengeInfo | null;
  userHomeInfo: UserHomeInfo | null;
  setHomeHeader: (payload: CheckHomeHeaderResult) => void;
  clearHomeHeader: () => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      homeHeader: null,
      dailyChallengeInfo: null,
      weeklyChallengeInfo: null,
      userHomeInfo: null,
      setHomeHeader: (payload) =>
        set({
          homeHeader: payload,
          dailyChallengeInfo: payload.dailyChallengeInfo,
          weeklyChallengeInfo: payload.weeklyChallengeInfo,
          userHomeInfo: payload.userHomeInfo,
        }),
      clearHomeHeader: () =>
        set({
          homeHeader: null,
          dailyChallengeInfo: null,
          weeklyChallengeInfo: null,
          userHomeInfo: null,
        }),
    }),
    {
      name: "ui-store",
    },
  ),
);
