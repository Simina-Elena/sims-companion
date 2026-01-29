import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import AuthCallback from "./components/auth/AuthCallback";
import Home from "./Home";
import AuthGuard from "./components/auth/AuthGuard";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
    </Routes>
  );
}
