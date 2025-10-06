import { z } from "zod";

export const challengeSchema = z.object({
  theme: z.string().min(1, "Theme is required"),
  packs: z.string().min(1, "At least one pack is required"),
});

export type CreateChallenge = z.infer<typeof challengeSchema>;
