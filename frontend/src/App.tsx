import { useJobPolling } from "./hooks/useJobPolling";
import { getChallenge } from "./api/challenges";
import CreateChallenge from "./components/CreateChallenge";
import { useJobStore } from "./state/job";
import { useChallengeStore } from "./state/challenge";
import { TypographyH1 } from "./components/TypographyH1";
import CustomSpinner from "./components/CustomSpinner";
import { Button } from "./components/ui/button";
import DisplayChallenge from "./components/DisplayChallenge";

export default function App() {
  const { jobId } = useJobStore();
  const { challenge, setChallenge } = useChallengeStore();

  const job = useJobPolling(jobId);

  async function fetchChallenge() {
    if (job?.challenge_id) {
      const c = await getChallenge(job.challenge_id);
      // const c = {
      //   title: "Test",
      //   description: "Test description",
      //   rules: ["first rule test", "second rule test", "third rule test"],
      // };
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

      {challenge && <DisplayChallenge />}
    </div>
  );
}
