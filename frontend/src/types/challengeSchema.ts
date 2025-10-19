import { z } from "zod";

export const challengeSchema = z.object({
  theme: z.string().min(4, "Theme is required"),
  packs: z.string().min(4, "At least one pack is required"),
});

export type CreateChallenge = z.infer<typeof challengeSchema>;
