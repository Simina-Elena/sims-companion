import { create } from "zustand";
import { type Challenge } from "../types/challenge";

type ChallengeState = {
  challenge: Challenge | null;
  setChallenge: (challenge: Challenge) => void;
  updateChallenge: (data: Partial<Challenge>) => void;
  deleteChallenge: () => void;
};

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenge: null,
  setChallenge: (challenge: Challenge) => set({ challenge }),
  updateChallenge: (data: Partial<Challenge>) =>
    set((state) => ({
      challenge: state.challenge ? { ...state.challenge, ...data } : null,
    })),
  deleteChallenge: () => set({ challenge: null }),
}));
