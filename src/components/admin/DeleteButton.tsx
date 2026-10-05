"use client";
import { useTransition } from "react";

export default function DeleteButton({ onDelete, label = "Delete", confirmText = "Delete this item? This cannot be undone." }: { onDelete: () => Promise<void>; label?: string; confirmText?: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" className="adm-btn adm-btn-sm adm-btn-danger" disabled={pending}
      onClick={() => { if (confirm(confirmText)) start(() => onDelete()); }}>
      {pending ? "…" : label}
    </button>
  );
}
