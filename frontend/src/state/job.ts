import type { JobState } from "@/types/job";
import { create } from "zustand";

export const useJobStore = create<JobState>((set) => ({
  jobId: null,
  setJobId: (jobId: string) => set({ jobId }),
}));
