"use server";
import { db, schema } from "@/db";

export type ContactState = { ok: boolean; message: string } | null;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const fullName = String(formData.get("fullname") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot) return { ok: true, message: "Thanks! Your message has been sent." };
  if (!fullName || !email || !message) return { ok: false, message: "Please fill in all fields." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Please enter a valid email address." };
  if (message.length > 5000) return { ok: false, message: "Message is too long." };
  await db.insert(schema.messages).values({ fullName, email, message, createdAt: new Date().toISOString() });
  return { ok: true, message: "Thanks! Your message has been sent." };
}
