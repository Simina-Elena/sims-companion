import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "@/api/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await getMe();
        setAuthed(true);
      } catch {
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading…</div>;
  if (!authed) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
