import client from "./client";
import { type Status } from "../types/status";
export interface CreateChallengeRequest {
  theme: string;
  packs: string[];
}

export interface JobResponse {
  job_id: string;
  status: Status;
  challenge_id: number | null;
  error?: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  rules: string[];
}

export const createChallenge = async (data: CreateChallengeRequest) => {
  const res = await client.post<JobResponse>("/challenges/create", data);
  return res.data;
};

export const getJob = async (jobId: string) => {
  const res = await client.get<JobResponse>(`/jobs/${jobId}`);
  return res.data;
};

export const getChallenge = async (challengeId: number) => {
  const res = await client.get<Challenge>(
    `/challenges/${challengeId}/complete`
  );
  console.log(res.data, "CHALLENGES");

  return res.data;
};
