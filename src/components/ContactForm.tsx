"use client";
import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, null);
  return (
    <form action={action} className="contact-form">
      <input type="text" name="fullname" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
      <textarea name="message" placeholder="Message" required />
      <button className="btn" type="submit" disabled={pending}>{pending ? "Sending…" : "Send"}</button>
      {state && <p className={`form-message${state.ok ? "" : " error"}`}>{state.message}</p>}
    </form>
  );
}
