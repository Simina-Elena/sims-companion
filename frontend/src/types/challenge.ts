export interface CreateChallengeRequest {
  theme: string;
  packs: string[];
}

export interface RuleData {
  challengeId: number;
  ruleId: number;
  ruleToUpdate: RuleToUpdate;
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

type RuleToUpdate = Partial<Omit<Rule, "id">>;
