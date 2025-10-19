import { createChallenge } from "../api/challenges";
import { useJobStore } from "../state/job";
import ChallengeForm from "./ChallengeForm";
import CustomCard from "./CustomCard";
import { type CreateChallenge } from "../types/challengeSchema";

export default function CreateChallenge() {
  const setJobId = useJobStore((state) => state.setJobId);

  const onSubmit = async (data: CreateChallenge) => {
    console.log("✅ Valid Data:", data);
    const { theme, packs } = data;
    const packsArray = packs.split(",").map((pack: string) => pack.trim());
    const job = await createChallenge({ theme, packs: packsArray });
    setJobId(job.job_id);
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <CustomCard
        cardTitle="Create a Challenge"
        className="w-full max-w-sm bg-neutral-100"
      >
        <ChallengeForm onSubmit={onSubmit} />
      </CustomCard>
    </div>
  );
}
