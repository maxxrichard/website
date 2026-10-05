import { getProfile, getPress } from "@/lib/queries";
import { renderMarkdown, formatDateDots, toYouTubeEmbed } from "@/lib/markdown";

export const metadata = { title: "Media" };

export default async function MediaPage() {
  const [profile, items] = await Promise.all([getProfile(), getPress()]);
  return (
    <section className="list-wrap">
      <h1 className="h-xl">Media Coverage</h1>
      {profile?.mediaIntro && <div className="intro serif" dangerouslySetInnerHTML={{ __html: renderMarkdown(profile.mediaIntro) }} />}
      <hr className="list-divider" />
      <div className="media-list">
        {items.map((m, i) => {
          const embed = toYouTubeEmbed(m.videoUrl);
          return (
            <article className={`media-item${i % 2 === 1 ? " flip" : ""}`} key={m.id}>
              <div>
                {embed ? (
                  <div className="media-video"><iframe src={embed} title={m.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                ) : m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <div className="media-img"><img src={m.image} alt={m.title} loading="lazy" /></div>
                ) : <div className="media-video" />}
              </div>
              <div>
                <div className="media-meta">{m.outlet}, {formatDateDots(m.date)}</div>
                <h2 className="media-title">{m.url ? <a href={m.url} target="_blank" rel="noreferrer" className="link">{m.title}</a> : m.title}</h2>
                <p className="media-text">{m.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="after-list" />
    </section>
  );
}
