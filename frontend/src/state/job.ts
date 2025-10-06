import { create } from "zustand";

export const useJobStore = create((set) => ({
  jobId: null,
  setJobId: (value: string) => set(() => ({ jobId: value })),
}));
