"use client";
import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, null);
  return (
    <form action={action} className="contact-form">
      <div className="field"><input type="text" name="fullname" placeholder="Name" required /></div>
      <div className="field"><input type="email" name="email" placeholder="Email" required /></div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
      <div className="field"><textarea name="message" placeholder="Message" required /></div>
      <button className="btn" type="submit" disabled={pending}>{pending ? "Sending…" : "Send"} <span className="arr">→</span></button>
      {state && <p className={`form-message${state.ok ? "" : " error"}`}>{state.message}</p>}
    </form>
  );
}
