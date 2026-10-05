"use client";
import { useEffect, useRef, useState } from "react";

export type Stat = { label: string; value: number; suffix?: string };

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      if (reduce) { setN(value); return; }
      const start = performance.now(), dur = 1300;
      const tick = (t: number) => { const p = Math.min(1, (t - start) / dur); const eased = 1 - Math.pow(1 - p, 3); setN(Math.round(value * eased)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats" data-reveal>
      {stats.map((s, i) => (
        <div className="stat" key={s.label} style={{ ["--i" as string]: i }}>
          <div className="stat-n"><CountUp value={s.value} suffix={s.suffix} /></div>
          <div className="stat-l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
