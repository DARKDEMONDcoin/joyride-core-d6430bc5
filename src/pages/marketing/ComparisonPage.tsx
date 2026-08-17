/** @doc Head-to-head comparison page — Logoipsum modern hero + clean glass table. */
import { useParams, Navigate } from "react-router-dom";
import { PrefetchLink as Link } from "@/components/common/PrefetchLink";
import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { LazyOnVisible } from "@/components/common/LazyOnVisible";
import SEOHead from "@/components/common/SEOHead";
import LogoipsumHero from "@/components/landing/LogoipsumHero";
import { getComparison, COMPARISONS } from "@/data/comparisons";

const LandingFooter = lazy(() => import("@/components/landing/LandingFooter"));

const winnerLabel = (winner: "megsy" | "competitor" | "tie") =>
  winner === "megsy" ? "Megsy" : winner === "competitor" ? "Other" : "Tie";

const ComparisonPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const data = getComparison(slug);
  if (!data) return <Navigate to="/" replace />;

  return (
    <div data-theme="dark" className="min-h-dvh overflow-x-hidden bg-[#0b0d10] text-[#eef0f2]">
      <SEOHead title={data.title} description={data.description} path={`/vs/${data.slug}`} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.title,
            description: data.description,
            author: { "@type": "Organization", name: "Megsy AI" },
            publisher: { "@type": "Organization", name: "Megsy AI" },
            mainEntityOfPage: `https://megsyai.com/vs/${data.slug}`,
          })}
        </script>
      </Helmet>

      <LogoipsumHero
        eyebrow="// Comparison"
        title={`Megsy vs ${data.competitorName}.`}
        subtitle={data.intro}
        placeholder={`Ask about ${data.competitorName}…`}
        chip={`vs ${data.competitorName}`}
        suggestions={["What's cheaper?", "Which is better for teams?", "How do plans compare?"]}
      />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-16 md:px-8">
        <style>{`
          .cx-glass { background: rgba(238,240,242,0.03); backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(238,240,242,0.10); border-radius: 22px; }
          .cx-serif { font-family: 'Inter Tight', sans-serif; letter-spacing: -0.02em; }
          .cx-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        `}</style>

        <p className="cx-mono mb-14 max-w-2xl text-center mx-auto text-[11px] uppercase tracking-[0.18em] opacity-55 italic">
          {data.honestNote}
        </p>

        {/* Best for */}
        <section className="mb-14 grid gap-4 md:grid-cols-2">
          <div className="cx-glass p-8">
            <h2 className="cx-serif mb-5 text-2xl font-medium">Megsy is best for</h2>
            <ul className="space-y-3">
              {data.bestFor.megsy.map((b) => (
                <li key={b} className="text-[15px] opacity-85">— {b}</li>
              ))}
            </ul>
          </div>
          <div className="cx-glass p-8">
            <h2 className="cx-serif mb-5 text-2xl font-medium">{data.competitorName} is best for</h2>
            <ul className="space-y-3">
              {data.bestFor.competitor.map((b) => (
                <li key={b} className="text-[15px] opacity-70">— {b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Table */}
        <section className="mb-14">
          <h2 className="cx-serif mb-6 text-3xl font-medium md:text-4xl">Feature comparison</h2>
          <div className="cx-glass overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead className="cx-mono border-b border-white/10 text-[10px] uppercase tracking-[0.18em] opacity-60">
                <tr>
                  <th className="px-4 py-4 text-left font-medium">Feature</th>
                  <th className="px-4 py-4 text-left font-medium">Megsy</th>
                  <th className="px-4 py-4 text-left font-medium">{data.competitorName}</th>
                  <th className="px-4 py-4 text-center font-medium w-24">Edge</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-white/5">
                    <td className="px-4 py-4 font-medium opacity-95">{row.feature}</td>
                    <td className="px-4 py-4 opacity-80">{row.megsy}</td>
                    <td className="px-4 py-4 opacity-70">{row.competitor}</td>
                    <td className="cx-mono px-4 py-4 text-center text-[11px] uppercase tracking-[0.14em] opacity-70">
                      {winnerLabel(row.winner)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verdict */}
        <section className="cx-glass mb-14 p-8 md:p-10">
          <h2 className="cx-serif mb-3 text-2xl font-medium">The honest verdict</h2>
          <p className="text-[15.5px] leading-relaxed opacity-85">{data.verdict}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/auth"
              className="cursor-pointer rounded-full bg-[#eef0f2] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#0b0d10] transition hover:bg-white"
            >
              Try Megsy free
            </Link>
            <Link
              to="/pricing"
              className="cursor-pointer rounded-full border border-white/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition hover:bg-white/5"
            >
              See pricing
            </Link>
          </div>
        </section>

        {/* Others */}
        <section>
          <h3 className="cx-mono mb-4 text-[11px] uppercase tracking-[0.18em] opacity-55">
            Compare with other tools
          </h3>
          <ul className="flex flex-wrap gap-2">
            {COMPARISONS.filter((c) => c.slug !== data.slug).map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/vs/${c.slug}`}
                  className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-[12px] transition hover:bg-white/5"
                >
                  vs {c.competitorName}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <LazyOnVisible minHeight={320} rootMargin="600px">
        <Suspense fallback={<div style={{ minHeight: 320 }} />}>
          <LandingFooter />
        </Suspense>
      </LazyOnVisible>
    </div>
  );
};

export default ComparisonPage;
