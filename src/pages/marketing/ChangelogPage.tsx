/** @doc Public changelog — Mindloop dark-mono hero + clean glass timeline. */
import { lazy, Suspense } from "react";
import SEOHead from "@/components/common/SEOHead";
import MindloopHero from "@/components/landing/MindloopHero";
import { CHANGELOG } from "@/data/changelog";

const LandingFooter = lazy(() => import("@/components/landing/LandingFooter"));

const TAG_STYLES: Record<string, string> = {
  new: "border-emerald-400/40 text-emerald-300",
  improved: "border-sky-400/40 text-sky-300",
  fixed: "border-amber-400/40 text-amber-300",
  security: "border-rose-400/40 text-rose-300",
};

const ChangelogPage = () => {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://megsyai.com/" },
      { "@type": "ListItem", position: 2, name: "Changelog", item: "https://megsyai.com/changelog" },
    ],
  };

  return (
    <div className="min-h-dvh w-full bg-[#0a0a0a] text-[#e6e6e6]">
      <SEOHead
        title="Changelog"
        description="What's new in Megsy AI — new features, improvements, fixes and security updates, in one place."
        path="/changelog"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <MindloopHero
        eyebrow="// Changelog"
        words={["Every", "notable", "update,", "in", "one", "place."]}
        tail="Ship notes from the Megsy team — features, improvements, fixes and security."
        meta="02 · Release notes"
      />

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-24 md:px-8">
        <style>{`
          .cl-glass { background: rgba(230,230,230,0.03); backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(230,230,230,0.10); border-radius: 22px; }
          .cl-serif { font-family: 'Fraunces', 'Instrument Serif', serif; letter-spacing: -0.01em; font-weight: 400; }
          .cl-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        `}</style>

        <ol className="relative space-y-6 border-s border-white/10 ps-6">
          {CHANGELOG.map((entry) => (
            <li key={`${entry.date}-${entry.title}`} className="relative">
              <span className="absolute -start-[29px] top-6 h-3 w-3 rounded-full bg-white/80" />
              <div className="cl-glass p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <time dateTime={entry.date} className="cl-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
                    {new Date(entry.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {entry.tag && (
                    <span
                      className={`cl-mono rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] ${
                        TAG_STYLES[entry.tag] ?? "border-white/20 text-white/60"
                      }`}
                    >
                      {entry.tag}
                    </span>
                  )}
                </div>
                <h2 className="cl-serif mt-3 text-2xl text-[#f4f4f4] md:text-3xl">{entry.title}</h2>
                <ul className="mt-4 list-disc space-y-1.5 ps-5 text-[15px] leading-relaxed opacity-80">
                  {entry.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </main>

      <Suspense fallback={null}>
        <LandingFooter />
      </Suspense>
    </div>
  );
};

export default ChangelogPage;
