export interface CreateChallengeRequest {
  theme: string;
  packs: string[];
}

export interface UpdateRuleText {
  challengeId: number;
  ruleId: number;
  text: string;
}

export type Challenge = {
  id: number;
  title: string;
  description: string;
  rules: Rule[];
};

export type Rule = {
  id: number;
  text: string;
  is_completed: boolean;
};

export type ChallengeStatus = {
  isCompleted: boolean;
};
