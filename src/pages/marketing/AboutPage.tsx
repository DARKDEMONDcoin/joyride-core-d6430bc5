/** @doc About Megsy — Marcus/Bennet editorial hero (Prompt 1) + clean glass sections. */
import { useEffect } from "react";
import SEOHead from "@/components/common/SEOHead";
import MarcusHero from "@/components/landing/MarcusHero";
import LandingFooter from "@/components/landing/LandingFooter";

const VALUES = [
  { t: "Built for creators", d: "Every tool is designed around people who actually ship — not benchmarks." },
  { t: "Honest by default", d: "One transparent credit, clear pricing, no hidden lock-ins." },
  { t: "Made in Cairo", d: "Designed and built in Egypt. Serving creators in any language they write in." },
  { t: "Your work is yours", d: "We never train on your private projects. Delete your data any time." },
];

const STATS = [
  { v: "36+", k: "AI engines unified" },
  { v: "100+", k: "Languages" },
  { v: "1", k: "Wallet, one credit" },
  { v: "24/7", k: "Human + AI support" },
];

const CHAPTERS = [
  {
    label: "// Origin",
    head: "From Cairo, for the world",
    body:
      "Megsy started as an internal tool to unify a mess of AI accounts, prompts and receipts into one calm workspace. What worked for our team started working for a lot of other teams — so we shipped it.",
  },
  {
    label: "// Product",
    head: "One workspace, every model",
    body:
      "Chat, images, code, research, agents — every serious AI tool lives inside Megsy under a single wallet. Switch models mid-thought without losing your context.",
  },
  {
    label: "// Model",
    head: "Megsy 3.9, our own brain",
    body:
      "Our in-house Megsy 3.9 model is free on every plan and tuned for Arabic plus 100+ languages, with web search, image generation and code as native abilities.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-dvh" style={{ background: "#0a0a0a", color: "#f4f4f4" }}>
      <SEOHead
        title="About Megsy — The Egyptian AI Studio"
        description="Megsy is an Egyptian AI studio building one calm workspace for chat, images, research, code and agents. Home of the Megsy 3.9 model."
        path="/about"
      />

      <MarcusHero
        brand="Megsy"
        marqueeLeft="Megsy"
        marqueeRight="Studio"
        footerLeft={["Egyptian AI Studio", "Built in Cairo", "Home of Megsy 3.9"]}
        footerRight={["A workspace for", "everyone who ships"]}
        navLinks={[
          { label: "Story", to: "/about" },
          { label: "Product", to: "/megsy-model" },
          { label: "Contact", to: "/contact" },
        ]}
        socialLinks={[
          { label: "Instagram", href: "https://instagram.com/megsyai" },
          { label: "TikTok", href: "https://tiktok.com/@megsyai" },
          { label: "YouTube", href: "https://youtube.com/@megsyai" },
        ]}
      />

      {/* Clean glass sections below the hero */}
      <main className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <style>{`
          .about-glass {
            position: relative; overflow: hidden;
            background: rgba(239,238,233,0.06);
            backdrop-filter: blur(6px);
            box-shadow: inset 0 1px 1px rgba(239,238,233,0.12);
            border-radius: 24px;
          }
          .about-glass::before {
            content: ''; position: absolute; inset: 0;
            border-radius: inherit; padding: 1.4px;
            background: linear-gradient(180deg,
              rgba(239,238,233,0.5) 0%, rgba(239,238,233,0.15) 20%,
              rgba(239,238,233,0) 40%, rgba(239,238,233,0) 60%,
              rgba(239,238,233,0.15) 80%, rgba(239,238,233,0.5) 100%);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude; pointer-events: none;
          }
          .about-hn { font-family: 'Helvetica Neue ME', Helvetica, Arial, sans-serif; }
          .about-cream { color: #efeee9 !important; }
        `}</style>

        {/* Chapters */}
        <section className="space-y-16">
          {CHAPTERS.map((c) => (
            <article key={c.head} className="about-glass p-8 md:p-12">
              <div className="about-cream mb-4 text-xs uppercase tracking-[0.2em] opacity-60">
                {c.label}
              </div>
              <h2 className="about-hn about-cream mb-6 text-3xl md:text-5xl" style={{ letterSpacing: "-0.02em" }}>
                {c.head}
              </h2>
              <p className="about-cream text-base leading-relaxed opacity-80 md:text-lg">{c.body}</p>
            </article>
          ))}
        </section>

        {/* Values */}
        <section className="mt-32">
          <div className="about-cream mb-4 text-xs uppercase tracking-[0.2em] opacity-60">
            // Values
          </div>
          <h2 className="about-hn about-cream mb-16 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            What we care about
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.t} className="about-glass p-8 md:p-10">
                <h3 className="about-hn about-cream mb-3 text-2xl md:text-3xl">{v.t}</h3>
                <p className="about-cream text-sm leading-relaxed opacity-70">{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-32">
          <div className="about-cream mb-4 text-xs uppercase tracking-[0.2em] opacity-60">
            // By the numbers
          </div>
          <div className="about-glass grid grid-cols-2 divide-x divide-[#efeee9]/10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.k} className="p-8 text-center md:p-12">
                <div className="about-hn about-cream mb-3 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
                  {s.v}
                </div>
                <div className="about-cream text-xs uppercase tracking-widest opacity-60">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 text-center">
          <h2 className="about-hn about-cream mb-6 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Start building with Megsy
          </h2>
          <a
            href="/auth"
            className="about-glass about-cream inline-block cursor-pointer rounded-full px-12 py-5 text-base font-medium"
          >
            Try free
          </a>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
