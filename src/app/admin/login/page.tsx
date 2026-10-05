"use client";
import { useActionState, useState } from "react";
import { login, type LoginState } from "./actions";
import "../admin.css";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, null);
  const [email, setEmail] = useState("");
  return (
    <div className="adm-login">
      <form action={action} className="adm-card adm-login-card">
        <h1>Admin login</h1>
        <p className="adm-muted">Sign in to manage the website content.</p>
        <label>Email<input name="email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
        {state?.error && <p className="adm-error">{state.error}</p>}
        <button className="adm-btn adm-btn-primary" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
        <p className="adm-muted" style={{ marginTop: 14, fontSize: 12 }}>Credentials are set via ADMIN_EMAIL / ADMIN_PASSWORD in the server environment.</p>
      </form>
    </div>
  );
}
