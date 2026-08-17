/** @doc Features guide — Space voyage hero (Prompt 5) + clean glass overview. */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/common/SEOHead";
import SpaceVoyageHero from "@/components/landing/SpaceVoyageHero";
import LandingFooter from "@/components/landing/LandingFooter";

const CAPABILITIES = [
  { title: "AI chat, every model", body: "Megsy 3.9, GPT-5.5, Claude Opus 4.8, Gemini 3.5, Grok 4 — switch mid-thought, your context follows." },
  { title: "Image generation", body: "Nano Banana 2, Flux, Ideogram, Recraft, GPT-Image — one prompt, choose your engine, refine on the same canvas." },
  { title: "Video generation", body: "Sora 2, Veo 3, Seedance 2.5, Kling 2.5 — text-to-video, image-to-video, keyframes, motion brush." },
  { title: "Voice studio", body: "ElevenLabs, OpenAI voices and Suno music — clone, translate, dub, compose from a lyric." },
  { title: "Claude Code", body: "Full Anthropic coding agent inside Megsy — files, shell, Git, planning, sandboxed and tied to your chat." },
  { title: "Web research", body: "Live Google and Bing with citations. News, papers, finance, forums — sources every time." },
  { title: "Files & vision", body: "PDFs, spreadsheets, code, audio and video up to 100MB. Screenshots, mockups, charts read like a human." },
  { title: "Skills & agents", body: "Named workflows for research, slides, translation, SEO and outreach. Run one by name any time." },
  { title: "Integrations", body: "GitHub, Notion, Linear, Slack, Google Drive, Figma, Stripe and more — right in the composer." },
];

const PLANS = [
  { name: "Free", tag: "Forever", body: "Daily credits across chat, image, code and search. Megsy 3.9 unlimited." },
  { name: "Pro", tag: "$25/mo", body: "Higher limits, premium models, unlimited Claude Code, priority queue." },
  { name: "Elite", tag: "$59/mo", body: "Everything in Pro plus long-form video, batch generations and 100GB storage." },
  { name: "Business", tag: "$149/mo", body: "Shared workspace, roles, central billing and audit logs for teams." },
];

const COMPARE = [
  { us: "Every flagship model in one subscription", them: "One vendor, one model family per subscription" },
  { us: "Chat, image, video, voice, code in one wallet", them: "Separate tools with separate credits" },
  { us: "Megsy 3.9 free on every plan, tuned for Arabic and 100+ languages", them: "English-first, extra cost for higher tiers" },
  { us: "Claude Code natively inside chat", them: "Standalone install or IDE extension" },
  { us: "Signed DPA, no training on your data", them: "Opt-out training on paid tiers only" },
];

export default function FeaturesGuidePage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, []);

  return (
    <div className="min-h-dvh bg-[#050810] text-[#e8ecf3]">
      <SEOHead
        title="What Megsy Can Do — Full Feature Guide"
        description="A cinematic tour of every Megsy capability: chat, image, video, voice, code, research, skills and integrations. See what's inside one wallet."
        path="/features-guide"
      />

      <SpaceVoyageHero
        eyebrow="// Feature guide"
        headline="One workspace. Every AI you actually need."
        sublines={[
          "Chat, image, video, voice, code and research — under one wallet.",
          "Switch models mid-thought. Ship without juggling tabs.",
        ]}
        primaryCta={{ label: "Start free", to: "/auth" }}
        secondaryCta={{ label: "See pricing", to: "/pricing" }}
        section2Eyebrow="// Nine capabilities"
        section2Head="What's inside Megsy."
        section2Body="Every capability lives in the same conversation, sharing memory, files and credits."
        capabilities={CAPABILITIES}
      />

      {/* Plans */}
      <section className="relative border-t border-white/5 bg-[#050810] px-6 py-24 md:px-14 md:py-32">
        <style>{`
          .f-glass { background: rgba(232,236,243,0.03); backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(232,236,243,0.10); border-radius: 22px; }
          .f-serif { font-family: 'Instrument Serif', serif; letter-spacing: -0.01em; }
        `}</style>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">// Plans</div>
          <h2 className="f-serif mb-14 text-[#f2f4f8]" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08 }}>
            Four tiers. Every capability on every tier.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {PLANS.map((p) => (
              <div key={p.name} className="f-glass p-8">
                <div className="mb-2 text-[11px] uppercase tracking-[0.24em] opacity-60">{p.tag}</div>
                <h3 className="f-serif mb-4 text-3xl text-[#f2f4f8]">{p.name}</h3>
                <p className="text-sm leading-relaxed opacity-70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="relative border-t border-white/5 bg-[#050810] px-6 py-24 md:px-14 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">// vs. Every other AI subscription</div>
          <h2 className="f-serif mb-14 text-[#f2f4f8]" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08 }}>
            Why one wallet beats five subscriptions.
          </h2>
          <div className="f-glass overflow-hidden">
            <div className="grid grid-cols-2 border-b border-white/10 text-[11px] uppercase tracking-[0.18em] opacity-60">
              <div className="border-r border-white/10 p-5">Megsy</div>
              <div className="p-5">The others</div>
            </div>
            {COMPARE.map((row) => (
              <div key={row.us} className="grid grid-cols-2 border-b border-white/5 last:border-b-0">
                <div className="border-r border-white/10 p-5 text-sm opacity-90">{row.us}</div>
                <div className="p-5 text-sm opacity-60">{row.them}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer rounded-full bg-[#e8ecf3] px-10 py-4 text-sm font-medium uppercase tracking-[0.14em] text-[#050810] transition hover:bg-white"
            >
              Try Megsy free
            </button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
