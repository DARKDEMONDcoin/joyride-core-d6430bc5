/** @doc Mindloop dark-mono hero (Prompt 6). Concentric-circle wordmark, scroll-driven word reveal, no input. */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  eyebrow?: string;
  words: string[];      // words that reveal one by one on scroll
  tail?: string;        // trailing sentence rendered normal weight
  meta?: string;        // e.g. "01 · Journal"
  ctaLabel?: string;
  ctaTo?: string;
}

export default function MindloopHero({
  eyebrow = "// Mindloop",
  words,
  tail,
  meta = "01 · Field notes",
  ctaLabel,
  ctaTo,
}: Props) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = "mindloop-font";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Fraunces:wght@300;400;500&display=swap";
      document.head.appendChild(l);
    }
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when top of section aligned with top of viewport, 1 when bottom hits top.
      const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="ml relative w-full bg-[#0a0a0a] text-[#e6e6e6]"
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", minHeight: "180svh" }}
    >
      <style>{`
        .ml .ml-serif { font-family: 'Fraunces', 'Instrument Serif', serif; letter-spacing: -0.02em; font-weight: 300; }
        .ml .ml-ring { width: 34px; height: 34px; border-radius: 999px; border: 1px solid #e6e6e6; position: relative; }
        .ml .ml-ring::before { content: ''; position: absolute; inset: 6px; border-radius: 999px; border: 1px solid #e6e6e6; }
        .ml .ml-ring::after  { content: ''; position: absolute; inset: 12px; border-radius: 999px; background: #e6e6e6; }
        @keyframes ml-fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .ml .ml-in { animation: ml-fade-in 1.1s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Sticky viewport for scroll reveal */}
      <div className="sticky top-0 flex h-svh w-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 md:px-14 md:pt-8">
          <button
            onClick={() => navigate("/")}
            className="ml-in flex cursor-pointer items-center gap-3 border-none bg-transparent"
            aria-label="Megsy"
          >
            <span className="ml-ring" aria-hidden />
            <span className="ml-serif text-2xl">megsy</span>
          </button>
          <div className="ml-in hidden text-[11px] uppercase tracking-[0.28em] opacity-60 md:block">
            {meta}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col items-start justify-center px-6 pb-16 md:px-14">
          <div className="ml-in mb-6 text-[10px] uppercase tracking-[0.32em] opacity-55">
            {eyebrow}
          </div>
          <h1
            className="ml-serif max-w-[1100px] text-[#f4f4f4]"
            style={{ fontSize: "clamp(36px, 8vw, 108px)", lineHeight: 1.05, wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
          >
            {words.map((w, i) => {
              // Reveal one word per step
              const step = (i + 1) / words.length;
              const opacity = progress >= step - 0.001 ? 1 : Math.max(0.55, 1 - (step - progress) * 3);
              return (
                <span key={`${w}-${i}`} style={{ opacity, transition: "opacity 500ms ease-out" }}>
                  {w}
                  {i < words.length - 1 ? " " : ""}
                </span>
              );
            })}
            {tail && (
              <span
                className="ml-2 block pt-4 text-[0.42em] opacity-70"
                style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0 }}
              >
                {tail}
              </span>
            )}
          </h1>

          {ctaLabel && ctaTo && (
            <button
              onClick={() => navigate(ctaTo)}
              className="ml-in mt-12 cursor-pointer rounded-full border border-white/25 bg-transparent px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] transition hover:bg-white/10"
            >
              {ctaLabel}
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="flex items-end justify-between px-6 pb-6 text-[10px] uppercase tracking-[0.28em] opacity-55 md:px-14 md:pb-8">
          <span>Scroll to reveal</span>
          <span className="relative block h-[1px] w-40 bg-white/15">
            <span
              className="absolute inset-y-0 left-0 bg-white/80"
              style={{ width: `${Math.round(progress * 100)}%`, transition: "width 200ms linear" }}
            />
          </span>
          <span>{String(Math.round(progress * 100)).padStart(2, "0")} / 100</span>
        </div>
      </div>
    </section>
  );
}
