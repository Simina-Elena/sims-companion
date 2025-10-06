import { useJobPolling } from "./hooks/useJobPolling";
import { getChallenge, type Challenge } from "./api/challenges";
import CreateChallenge from "./components/CreateChallenge";
import { useJobStore } from "./state/job";
import { useState } from "react";

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
      <h1>Sims Companion</h1>

      {!jobId && <CreateChallenge />}

      {job && !challenge && (
        <div>
          <p>Status: {job.status}</p>
          {job.status === "completed" && (
            <button onClick={fetchChallenge}>View Challenge</button>
          )}
          {job.status === "failed" && <p>Error: {job.error}</p>}
        </div>
      )}

      {challenge && (
        <div>
          <h2>{challenge.title}</h2>
          <p>{challenge.description}</p>
          <h3>Rules</h3>
          <ul>
            {challenge.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
