export interface CreateChallengeRequest {
  theme: string;
  packs: string[];
}

export type Challenge = {
  title: string;
  description: string;
  rules: Rule[];
};

type Rule = {
  id: number;
  text: string;
};

export type ChallengeStatus = {
  isCompleted: boolean;
};
