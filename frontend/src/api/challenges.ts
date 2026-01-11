import client from "./client";
import type { JobResponse } from "@/types/job";
import type {
  Challenge,
  ChallengeStatus,
  CreateChallengeRequest,
} from "@/types/challenge";
import { mockChallenge } from "./mockData";

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

export const updateChallengeStatus = async (
  challengeId: number,
  status: ChallengeStatus
) => {
  const res = await client.patch<Challenge>(
    `/challenges/${challengeId}/status`,
    status
  );

  return res.data;
};
