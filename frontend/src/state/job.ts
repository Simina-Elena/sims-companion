import { create } from "zustand";

type JobState = {
  jobId: string | null;
  setJobId: (value: string) => void;
};

export const useJobStore = create<JobState>((set) => ({
  jobId: null,
  setJobId: (value: string) => set(() => ({ jobId: value })),
}));
