import type { SocialLink } from "@/db/schema";
import { socialIcons } from "./Icons";

export default function SocialIcons({ socials, className = "icon-row" }: { socials: SocialLink[]; className?: string }) {
  if (!socials.length) return null;
  return (
    <div className={className}>
      {socials.map((s) => {
        const Icon = socialIcons[s.platform.toLowerCase()] ?? socialIcons.link;
        return <a key={s.id} href={s.url} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}><Icon /></a>;
      })}
    </div>
  );
}
