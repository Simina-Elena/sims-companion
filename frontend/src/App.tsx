import { useJobPolling } from "./hooks/useJobPolling";
import { getChallenge, type Challenge } from "./api/challenges";
import CreateChallenge from "./components/CreateChallenge";
import { useJobStore } from "./state/job";
import { useState } from "react";
import { TypographyH1 } from "./components/TypographyH1";
import CustomSpinner from "./components/CustomSpinner";
import { Button } from "./components/ui/button";
import DisplayChallenge from "./components/DisplayChallenge";

export default function App() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const jobId = useJobStore((state) => state.jobId);

  const job = useJobPolling(jobId);

  async function fetchChallenge() {
    if (job?.challenge_id) {
      const c = await getChallenge(job.challenge_id);
      setChallenge(c);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <TypographyH1>Sims Companion</TypographyH1>

      {!jobId && <CreateChallenge />}

      {job && !challenge && (
        <div>
          {job.status === "processing" && <CustomSpinner status={job.status} />}
          {job.status === "completed" && (
            <Button
              onClick={fetchChallenge}
              className="bg-emerald-800 hover:bg-emerald-600"
            >
              View Challenge
            </Button>
          )}
          {job.status === "failed" && <p>Error: {job.error}</p>}
        </div>
      )}

      {challenge && <DisplayChallenge challenge={challenge} />}
    </div>
  );
}
