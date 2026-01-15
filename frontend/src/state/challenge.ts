import { create } from "zustand";
import { type Challenge, type Rule } from "../types/challenge";

type ChallengeState = {
  challenge: Challenge | null;
  setChallenge: (challenge: Challenge) => void;
  updateChallenge: (data: Partial<Challenge>) => void;
  updateRule: (data: Rule) => void;
  deleteChallenge: () => void;
};

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenge: null,
  setChallenge: (challenge: Challenge) => set({ challenge }),
  updateChallenge: (data: Partial<Challenge>) =>
    set((state) => ({
      challenge: state.challenge ? { ...state.challenge, ...data } : null,
    })),
  updateRule: (updated: Rule) =>
    set((state) => {
      if (!state.challenge) return state;
      return {
        challenge: {
          ...state.challenge,
          rules: state.challenge.rules.map((r) =>
            r.id === updated.id ? { ...r, ...updated } : r
          ),
        },
      };
    }),
  deleteChallenge: () => set({ challenge: null }),
}));
