"use client";
import { useActionState, useState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";
import { IoPaperPlane } from "./Icons";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, null);
  const [valid, setValid] = useState(false);
  return (
    <section className="contact-form">
      <h3 className="h3 form-title">Contact Form</h3>
      <form action={action} className="form" onInput={(e) => setValid(e.currentTarget.checkValidity())}>
        <div className="input-wrapper">
          <input type="text" name="fullname" className="form-input" placeholder="Full name" required />
          <input type="email" name="email" className="form-input" placeholder="Email address" required />
        </div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
        <textarea name="message" className="form-input" placeholder="Your Message" required />
        <button className="form-btn" type="submit" disabled={!valid || pending}>
          <IoPaperPlane />
          <span>{pending ? "Sending…" : "Send Message"}</span>
        </button>
        {state && <p className={`form-message${state.ok ? "" : " error"}`}>{state.message}</p>}
      </form>
    </section>
  );
}
