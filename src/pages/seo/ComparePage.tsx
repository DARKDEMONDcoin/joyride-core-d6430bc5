/** @doc Programmatic SEO comparison page (/compare/megsy-vs-<competitor>) — Logoipsum hero + clean glass. */
import { useParams, Navigate } from "react-router-dom";
import { PrefetchLink as Link } from "@/components/common/PrefetchLink";
import { Helmet } from "react-helmet-async";
import { COMPETITORS, getCompetitor } from "@/data/programmaticSeo";
import LogoipsumHero from "@/components/landing/LogoipsumHero";

export default function ComparePage() {
  const { competitor } = useParams<{ competitor: string }>();
  const data = competitor ? getCompetitor(competitor) : undefined;
  if (!data) return <Navigate to="/compare" replace />;

  const title = `Megsy AI vs ${data.name} — Which AI Website Builder Wins?`;
  const description = `Detailed comparison of Megsy AI and ${data.name}. ${data.tagline}. See features, pricing, and which is better for your project.`;
  const url = `/compare/megsy-vs-${data.slug}`;

  return (
    <main className="min-h-dvh bg-[#0b0d10] text-[#eef0f2]">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
      </Helmet>

      <LogoipsumHero
        eyebrow="// Compare"
        title={`Megsy vs ${data.name}.`}
        subtitle={data.tagline}
        placeholder={`Ask Megsy about ${data.name}…`}
        chip={`vs ${data.name}`}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-16 md:px-8">
        <style>{`
          .cp-glass { background: rgba(238,240,242,0.03); backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(238,240,242,0.10); border-radius: 22px; }
          .cp-serif { font-family: 'Inter Tight', sans-serif; letter-spacing: -0.02em; }
          .cp-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        `}</style>

        {/* Table */}
        <section className="mb-14">
          <h2 className="cp-serif mb-6 text-3xl font-medium md:text-4xl">
            Feature-by-feature comparison
          </h2>
          <div className="cp-glass overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead className="cp-mono border-b border-white/10 text-[10px] uppercase tracking-[0.18em] opacity-60">
                <tr>
                  <th className="px-4 py-4 text-left font-medium">Feature</th>
                  <th className="px-4 py-4 text-left font-medium">Megsy AI</th>
                  <th className="px-4 py-4 text-left font-medium">{data.name}</th>
                </tr>
              </thead>
              <tbody>
                {data.comparison.map((row, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-4 py-4 font-medium opacity-95">{row.feature}</td>
                    <td className="px-4 py-4 opacity-90">{row.megsy}</td>
                    <td className="px-4 py-4 opacity-65">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Strengths */}
        <section className="mb-14 grid gap-4 md:grid-cols-2">
          <div className="cp-glass p-8">
            <h3 className="cp-serif mb-5 text-2xl font-medium">Where Megsy wins</h3>
            <ul className="space-y-3">
              {data.ourStrengths.map((s, i) => (
                <li key={i} className="text-[15px] opacity-85">— {s}</li>
              ))}
            </ul>
          </div>
          <div className="cp-glass p-8">
            <h3 className="cp-serif mb-5 text-2xl font-medium">Where {data.name} wins</h3>
            <ul className="space-y-3">
              {data.theirStrengths.map((s, i) => (
                <li key={i} className="text-[15px] opacity-70">— {s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Verdict */}
        <section className="cp-glass mb-14 p-8 md:p-10">
          <h2 className="cp-serif mb-3 text-2xl font-medium">Our verdict</h2>
          <p className="text-[15.5px] leading-relaxed opacity-85">{data.verdict}</p>
          <div className="mt-6">
            <Link
              to="/auth"
              className="inline-flex cursor-pointer items-center rounded-full bg-[#eef0f2] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#0b0d10] transition hover:bg-white"
            >
              Try Megsy free
            </Link>
          </div>
        </section>

        {/* Related */}
        <section>
          <h3 className="cp-mono mb-4 text-[11px] uppercase tracking-[0.18em] opacity-55">
            Other comparisons
          </h3>
          <div className="flex flex-wrap gap-2">
            {COMPETITORS.filter((c) => c.slug !== data.slug).map((c) => (
              <Link
                key={c.slug}
                to={`/compare/megsy-vs-${c.slug}`}
                className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-[12px] transition hover:bg-white/5"
              >
                Megsy vs {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
