/** @doc Cinematic space-voyage hero (Prompt 5). Dual section, deep space palette, no input. */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Capability {
  title: string;
  body: string;
}

interface Props {
  eyebrow?: string;
  headline: string;
  sublines?: string[];
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  bgVideo?: string;
  bgImage?: string;
  capabilities?: Capability[];
  section2Eyebrow?: string;
  section2Head?: string;
  section2Body?: string;
}

const DEFAULT_BG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_231218_2a4f4e0e.png&w=1920&q=90";

export default function SpaceVoyageHero({
  eyebrow = "// Cinematic",
  headline,
  sublines = [],
  primaryCta,
  secondaryCta,
  bgVideo,
  bgImage = DEFAULT_BG,
  capabilities = [],
  section2Eyebrow = "// Capabilities",
  section2Head,
  section2Body,
}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const id = "space-voyage-font";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);

  return (
    <section
      className="sv relative w-full overflow-hidden bg-[#050810] text-[#e8ecf3]"
      style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
    >
      <style>{`
        .sv .sv-serif { font-family: 'Instrument Serif', serif; font-weight: 400; letter-spacing: -0.01em; }
        .sv .sv-glass {
          background: rgba(232,236,243,0.03);
          backdrop-filter: blur(18px) saturate(140%);
          border: 1px solid rgba(232,236,243,0.10);
          border-radius: 22px;
        }
        .sv .sv-cta {
          background: rgba(232,236,243,0.06);
          border: 1px solid rgba(232,236,243,0.22);
          backdrop-filter: blur(14px);
          transition: background 300ms ease, transform 300ms ease;
        }
        .sv .sv-cta:hover { background: rgba(232,236,243,0.12); }
        .sv .sv-cta-primary {
          background: #e8ecf3; color: #050810; border-color: transparent;
        }
        .sv .sv-cta-primary:hover { background: #fff; }
        @keyframes sv-rise { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sv-fade { from { opacity: 0; } to { opacity: 1; } }
        .sv .sv-rise { animation: sv-rise 1.2s cubic-bezier(0.22,1,0.36,1) both; }
        .sv .sv-fade { animation: sv-fade 1.6s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .sv .sv-rise, .sv .sv-fade { animation-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="relative min-h-svh w-full">
        {bgVideo ? (
          <video
            className="sv-fade absolute inset-0 h-full w-full object-cover opacity-70"
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        ) : (
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className="sv-fade absolute inset-0 h-full w-full object-cover opacity-70"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(5,8,16,0.1) 0%, rgba(5,8,16,0.75) 55%, rgba(5,8,16,0.95) 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-svh flex-col">
          {/* Nav row */}
          <div className="flex items-center justify-between px-6 pt-6 md:px-14 md:pt-8">
            <button
              onClick={() => navigate("/")}
              className="sv-serif cursor-pointer border-none bg-transparent text-2xl text-[#e8ecf3] md:text-3xl"
            >
              megsy
            </button>
            <div className="hidden gap-8 text-xs uppercase tracking-[0.22em] opacity-70 md:flex">
              <span>Cairo · 2026</span>
              <span>Voyage 03</span>
            </div>
          </div>

          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-16 text-center md:pb-32">
            <div
              className="sv-rise mb-6 text-[11px] uppercase tracking-[0.32em] opacity-70"
              style={{ animationDelay: "150ms" }}
            >
              {eyebrow}
            </div>

            <h1
              className="sv-serif sv-rise mx-auto max-w-[1100px] text-[#f2f4f8]"
              style={{
                fontSize: "clamp(44px, 8vw, 108px)",
                lineHeight: 1.02,
                animationDelay: "300ms",
              }}
            >
              {headline}
            </h1>

            {sublines.length > 0 && (
              <div
                className="sv-rise mx-auto mt-8 max-w-[640px] space-y-2 text-base opacity-70 md:text-lg"
                style={{ animationDelay: "500ms" }}
              >
                {sublines.map((s) => (
                  <p key={s}>{s}</p>
                ))}
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div
                className="sv-rise mt-12 flex flex-wrap items-center justify-center gap-3"
                style={{ animationDelay: "700ms" }}
              >
                {primaryCta && (
                  <button
                    onClick={() => navigate(primaryCta.to)}
                    className="sv-cta sv-cta-primary cursor-pointer rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.14em]"
                  >
                    {primaryCta.label}
                  </button>
                )}
                {secondaryCta && (
                  <button
                    onClick={() => navigate(secondaryCta.to)}
                    className="sv-cta cursor-pointer rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-[#e8ecf3]"
                  >
                    {secondaryCta.label}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer hair line */}
          <div className="relative z-10 flex items-end justify-between px-6 pb-6 text-[11px] uppercase tracking-[0.24em] opacity-55 md:px-14 md:pb-10">
            <span>Made in Cairo</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </div>

      {/* Section 2 — capabilities (clean glass, no icons) */}
      {(capabilities.length > 0 || section2Head) && (
        <div className="relative z-10 border-t border-white/5 bg-[#050810] px-6 py-24 md:px-14 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">
              {section2Eyebrow}
            </div>
            {section2Head && (
              <h2
                className="sv-serif mb-6 max-w-3xl text-[#f2f4f8]"
                style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08 }}
              >
                {section2Head}
              </h2>
            )}
            {section2Body && (
              <p className="mb-16 max-w-2xl text-base opacity-70 md:text-lg">{section2Body}</p>
            )}

            {capabilities.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {capabilities.map((c) => (
                  <div key={c.title} className="sv-glass p-8 md:p-10">
                    <h3 className="sv-serif mb-3 text-2xl text-[#f2f4f8] md:text-3xl">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-70">{c.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
