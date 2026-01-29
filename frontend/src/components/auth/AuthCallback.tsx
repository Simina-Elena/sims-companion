import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyMagicLink } from "@/api/auth";

function getTokenFromHash(): string | null {
  const hash = window.location.hash;
  const params = new URLSearchParams(
    hash.startsWith("#") ? hash.slice(1) : hash,
  );
  return params.get("token");
}

export default function AuthCallback() {
  const nav = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getTokenFromHash();
    if (!token) {
      setError("Missing token.");
      return;
    }

    (async () => {
      try {
        await verifyMagicLink(token);

        // remove token from address bar
        window.history.replaceState({}, document.title, "/");

        nav("/", { replace: true });
      } catch (err: any) {
        setError(
          err?.response?.data?.detail ?? err?.message ?? "Verify failed",
        );
      }
    })();
  }, [nav]);

  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h1>Signing you in…</h1>
      {error && <p>{error}</p>}
    </div>
  );
}
