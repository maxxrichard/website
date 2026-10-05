"use client";
import { useTransition } from "react";

export default function ToggleButton({ value, onToggle, onLabel = "Visible", offLabel = "Hidden" }: { value: boolean; onToggle: (next: boolean) => Promise<void>; onLabel?: string; offLabel?: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" className={`adm-badge ${value ? "on" : "off"}`} style={{ cursor: "pointer", border: "none" }} disabled={pending}
      onClick={() => start(() => onToggle(!value))} title="Click to toggle">
      {pending ? "…" : value ? onLabel : offLabel}
    </button>
  );
}
