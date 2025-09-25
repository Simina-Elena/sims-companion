import { useState } from "react";
import { createChallenge } from "./api/challenges";
import { useJobPolling } from "./hooks/useJobPolling";
import { getChallenge, type Challenge } from "./api/challenges";

export default function App() {
  const [theme, setTheme] = useState("");
  const [packs, setPacks] = useState<string[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const job = useJobPolling(jobId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const job = await createChallenge({ theme, packs });
    setJobId(job.job_id);
  }

  async function fetchChallenge() {
    if (job?.challenge_id) {
      const c = await getChallenge(job.challenge_id);
      setChallenge(c);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sims Companion</h1>

      {!jobId && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Theme (e.g. Family Legacy)"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
          <input
            placeholder="Packs (comma separated)"
            onChange={(e) =>
              setPacks(e.target.value.split(",").map((p) => p.trim()))
            }
          />
          <button type="submit">Generate Challenge</button>
        </form>
      )}

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
