/** @doc Megsy AI Chat landing — Wandor glass prompt hero (Prompt 2) + clean glass sections. */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/common/SEOHead";
import WandorHero from "@/components/landing/WandorHero";
import LandingFooter from "@/components/landing/LandingFooter";

const CAPABILITIES = [
  { t: "Web search with citations", d: "Live Google and Bing across news, finance, papers and forums. Every answer ships with inline sources." },
  { t: "Files, PDFs, sheets, audio, video", d: "Up to 100MB per file. PDFs page-by-page, Excel formulas, audio transcription, video frames." },
  { t: "Vision", d: "Upload screenshots, mockups, charts, whiteboards — Megsy reads, extracts and rewrites them." },
  { t: "Voice in, voice out", d: "Push-to-talk dictation and natural TTS replies in 30+ languages." },
  { t: "Persistent memory", d: "Megsy remembers preferences, projects and voice across sessions. View, edit or wipe anytime." },
  { t: "Canvas & artifacts", d: "Long-form writing, code, slides, SVGs and React components render in an editable side panel." },
  { t: "Code sandbox", d: "Python, Node, Bash and SQL run server-side. Charts, scrapes and conversions come back as files." },
  { t: "Image & video generation", d: "Nano Banana 2, Flux, Seedance 2.5, Sora and Veo 3 — inside the same chat window." },
];

const MODELS = [
  { name: "Megsy 3.9", body: "Our default model — fast, multilingual, free on every plan. Chat, tools, code, images and web search built in." },
  { name: "GPT-5.5", body: "OpenAI's flagship reasoning model for hard research and long documents." },
  { name: "Claude Opus 4.8", body: "Anthropic's top model for careful writing, planning and code." },
  { name: "Gemini 3.5", body: "Google's multimodal model with a 2M-token context window." },
  { name: "Grok 4", body: "xAI's model with real-time web and social context." },
  { name: "Claude Sonnet 4.6", body: "Fast, cheap, code-savvy — the daily driver for engineers." },
];

const SKILLS = [
  { n: "Web Researcher", d: "Multi-step search and a cited briefing." },
  { n: "Data Analyst", d: "Reads CSV/XLSX, runs pandas, returns charts." },
  { n: "Slide Designer", d: "PowerPoint and Google Slides from a one-line brief." },
  { n: "Doc Builder", d: "SOPs, contracts, RFCs and PRDs from your notes." },
  { n: "Translator", d: "Native-quality across 100+ languages with tone control." },
  { n: "SEO Writer", d: "Clusters, briefs, audits and full articles with internal links." },
];

const FAQ = [
  { q: "What is Megsy 3.9?", a: "Our in-house default model — fast, multilingual, and free on every plan. It powers chat, skills, file Q&A and tool use with native web search, image generation and code execution built in." },
  { q: "Is Claude Code really inside Megsy Chat?", a: "Yes. We integrated Anthropic's Claude Code agent natively — same file-edit, shell, Git and planning capabilities as the standalone agent, sandboxed and tied to your conversation." },
  { q: "Which models can I chat with?", a: "Megsy 3.9, Gemini 3.5, GPT-5.5, Grok 4, Claude Sonnet 4.6 and Claude Opus 4.8 — switchable mid-conversation with your context following you." },
  { q: "Does Megsy browse the web live?", a: "Yes. Web search is on by default for time-sensitive questions, using Google, Bing and specialised indexes, with inline citations." },
  { q: "What files can I upload?", a: "PDFs up to 100MB, Word, Excel, CSV, PowerPoint, Markdown, code files, images, audio and short videos — all parsed natively." },
  { q: "Is my data used to train AI?", a: "No. Your chats, files and code are never used to train Megsy or any third-party model. GDPR-compliant, SOC 2 Type II audited." },
];

export default function AIChatLandingPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, []);

  return (
    <div className="min-h-dvh bg-white">
      <SEOHead
        title="Megsy AI Chat — Every Flagship Model, One Wallet"
        description="Chat with Megsy 3.9, GPT-5.5, Claude Opus, Gemini 3.5 and Grok 4 in one workspace. Web search, files, voice, images and Claude Code included."
        path="/ai-chat"
      />

      <WandorHero />

      {/* Capabilities */}
      <section className="relative bg-[#0a0a0a] px-6 py-24 text-[#efeee9] md:px-14 md:py-32">
        <style>{`
          .ac-glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(255,255,255,0.10); border-radius: 22px; }
          .ac-serif { font-family: 'Special Elite', 'Instrument Serif', serif; }
        `}</style>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">// Capabilities</div>
          <h2 className="ac-serif mb-14 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Every AI you actually use, in one conversation.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div key={c.t} className="ac-glass p-8">
                <h3 className="ac-serif mb-3 text-xl md:text-2xl">{c.t}</h3>
                <p className="text-sm leading-relaxed opacity-70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="relative border-t border-white/5 bg-[#0a0a0a] px-6 py-24 text-[#efeee9] md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">// Models</div>
          <h2 className="ac-serif mb-14 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Switch models mid-thought.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m) => (
              <div key={m.name} className="ac-glass p-8">
                <h3 className="ac-serif mb-3 text-2xl md:text-3xl">{m.name}</h3>
                <p className="text-sm leading-relaxed opacity-70">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="relative border-t border-white/5 bg-[#0a0a0a] px-6 py-24 text-[#efeee9] md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">// Skills</div>
          <h2 className="ac-serif mb-14 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Named workflows, one shortcut away.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s) => (
              <div key={s.n} className="ac-glass p-8">
                <h3 className="ac-serif mb-2 text-xl">{s.n}</h3>
                <p className="text-sm leading-relaxed opacity-70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-white/5 bg-[#0a0a0a] px-6 py-24 text-[#efeee9] md:px-14 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">// FAQ</div>
          <h2 className="ac-serif mb-14 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Questions people ask.
          </h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="ac-glass group p-6">
                <summary className="ac-serif cursor-pointer list-none text-lg md:text-xl">
                  <span className="mr-3 opacity-40 group-open:opacity-100">+</span>{f.q}
                </summary>
                <p className="mt-4 text-sm leading-relaxed opacity-70">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer rounded-full bg-white px-10 py-4 text-sm font-medium uppercase tracking-[0.14em] text-black transition hover:opacity-90"
            >
              Open Megsy chat
            </button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
