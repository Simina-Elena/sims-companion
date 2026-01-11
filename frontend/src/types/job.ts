import { type Status } from "../types/status";

export type JobState = {
  jobId: string | null;
  setJobId: (jobId: string) => void;
};

export type JobResponse = {
  job_id: string;
  status: Status;
  challenge_id: number | null;
  error?: string;
};
