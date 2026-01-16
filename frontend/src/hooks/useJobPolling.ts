import { useEffect, useState } from "react";
import { getJob } from "../api/challenges";
import type { JobResponse } from "@/types/job";

export function useJobPolling(jobId: string | null, interval = 2000) {
  const [job, setJob] = useState<JobResponse | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const timer = setInterval(async () => {
      try {
        const res = await getJob(jobId);
        setJob(res);
        if (res.status === "completed" || res.status === "failed") {
          clearInterval(timer);
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [jobId, interval]);

  return job;
}
