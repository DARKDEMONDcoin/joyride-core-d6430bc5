/** @doc Megsy 3.9 in-house model marketing page. Route: /megsy-model
 *  Hero: Velorah cinematic (Prompt 3). Below: clean glass, no icons. */
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import VelorahProductHero from "@/components/landing/VelorahProductHero";

const CAPABILITIES = [
  { t: "Multilingual by design", d: "Native Arabic plus 100+ languages, with cultural context — not surface translation." },
  { t: "Tool-native", d: "Web search, image generation, document analysis and code execution are first-class abilities." },
  { t: "Low latency", d: "Optimized for live chat and iterative work — most replies start in under a second." },
  { t: "Long context", d: "Handles long conversations, long documents, and multi-turn tool use without losing the thread." },
  { t: "Grounded", d: "Cites the web when it searches, and shows its work when it uses tools." },
  { t: "Free on every plan", d: "Megsy 3.9 is the default brain of every Megsy account — no upgrade required." },
];

const SPECS = [
  { k: "Name", v: "Megsy 3.9" },
  { k: "Maker", v: "Megsy · in-house" },
  { k: "Languages", v: "100+" },
  { k: "Tools", v: "Search · Images · Docs · Code" },
  { k: "Context", v: "Long-context, tool-native" },
  { k: "Price", v: "Free on every plan" },
];

export default function MegsyModelPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-dvh bg-[hsl(201_100%_13%)] text-white">
      <Helmet>
        <title>Megsy 3.9 — Our In-House AI Model | Megsy AI</title>
        <meta
          name="description"
          content="Megsy 3.9 is our in-house AI model — free on every plan, tuned for Arabic and 100+ languages, with native web search, image generation and code tools built in."
        />
        <link rel="canonical" href="https://megsyai.com/megsy-model" />
        <meta property="og:title" content="Megsy 3.9 — Our In-House AI Model" />
        <meta
          property="og:description"
          content="Fast, multilingual, tool-native. The default brain behind every Megsy conversation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://megsyai.com/megsy-model" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="hidden">
        <LandingNavbar />
      </div>

      <VelorahProductHero
        eyebrow="// Megsy 3.9"
        title={
          <>
            The brain behind
            <br />
            <em className="not-italic text-white/60">every Megsy chat</em>
          </>
        }
        subtitle="Our in-house AI model — fast, multilingual and tool-native. Free on every plan, from day one."
        ctaPrimary={{ label: "Try in chat", to: "/auth" }}
        ctaSecondary={{ label: "See pricing", to: "/pricing" }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <style>{`
          .serif { font-family: 'Instrument Serif', serif; }
          .mm-glass {
            position: relative;
            overflow: hidden;
            background: rgba(255,255,255,0.02);
            backdrop-filter: blur(6px);
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.08);
            border-radius: 24px;
          }
          .mm-glass::before {
            content: ''; position: absolute; inset: 0;
            border-radius: inherit; padding: 1.4px;
            background: linear-gradient(180deg,
              rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
              rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
              rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude; pointer-events: none;
          }
        `}</style>

        <section>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">// Capabilities</div>
          <h2 className="serif mb-16 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            What Megsy 3.9 does well
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div key={c.t} className="mm-glass p-8 md:p-10">
                <h3 className="serif mb-3 text-2xl md:text-3xl">{c.t}</h3>
                <p className="text-sm leading-relaxed text-white/70">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">// Story</div>
          <h2 className="serif mb-8 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Built in-house, on purpose
          </h2>
          <div className="mm-glass p-8 md:p-10">
            <p className="text-lg leading-relaxed text-white/80 md:text-xl">
              We built Megsy 3.9 in-house so we could put multilingual quality, tool use and speed on
              the same roadmap. It's the default model on every Megsy plan — including free — and it
              gets better with every release.
            </p>
          </div>
        </section>

        <section className="mt-32">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">// Specs</div>
          <h2 className="serif mb-16 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Model information
          </h2>
          <div className="mm-glass !p-0">
            <ul className="divide-y divide-white/10">
              {SPECS.map((s) => (
                <li key={s.k} className="flex items-center justify-between px-6 py-5 md:px-8">
                  <span className="text-sm text-white/60">{s.k}</span>
                  <span className="text-right text-sm text-white md:text-base">{s.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-32 text-center">
          <h2 className="serif mb-6 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Try Megsy 3.9 in chat
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/70">
            It's already the default model in every conversation. Just start typing.
          </p>
          <a
            href="/auth"
            className="mm-glass inline-block cursor-pointer rounded-full px-12 py-5 text-base font-medium text-white"
          >
            Open chat
          </a>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
