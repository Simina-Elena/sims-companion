import client from "./client";
import type { JobResponse } from "@/types/job";
import type {
  Challenge,
  ChallengeStatus,
  CreateChallengeRequest,
  Rule,
  UpdateRuleText,
} from "@/types/challenge";

export const createChallenge = async (
  data: CreateChallengeRequest
): Promise<JobResponse> => {
  const res = await client.post<JobResponse>("/challenges/create", data);
  return res.data;
};

export const getJob = async (jobId: string): Promise<JobResponse> => {
  const res = await client.get<JobResponse>(`/jobs/${jobId}`);
  return res.data;
};

export const getChallenge = async (challengeId: number): Promise<Challenge> => {
  const res = await client.get<Challenge>(
    `/challenges/${challengeId}/complete`
  );
  console.log(res.data, "CHALLENGE");

  return res.data;
};

export const updateChallengeStatus = async (
  challengeId: number,
  status: ChallengeStatus
): Promise<Challenge> => {
  const res = await client.patch<Challenge>(
    `/challenges/${challengeId}/status`,
    status
  );

  return res.data;
};

export const updateRuleText = async (data: UpdateRuleText): Promise<Rule> => {
  const { challengeId, ruleId, text } = data;

  const res = await client.patch(`challenges/${challengeId}/rules/${ruleId}`, {
    text,
  });

  return res.data;
};
