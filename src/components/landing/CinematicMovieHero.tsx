/** @doc Cinematic movie hero (Prompt 4). Full viewport video/image, bottom blur mask, liquid-glass buttons. */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bgVideo?: string;
  bgPoster?: string;
  bgImage?: string;
  primary?: { label: string; to?: string; onClick?: () => void };
  secondary?: { label: string; to?: string; onClick?: () => void };
  chip?: string; // e.g. "MODEL · 2026"
}

export default function CinematicMovieHero({
  eyebrow = "// Feature",
  title,
  subtitle,
  bgVideo,
  bgPoster,
  bgImage,
  primary,
  secondary,
  chip,
}: Props) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const id = "cinematic-font";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&display=swap";
    document.head.appendChild(l);
  }, []);

  const go = (cta?: { to?: string; onClick?: () => void }) => {
    if (!cta) return;
    if (cta.onClick) cta.onClick();
    else if (cta.to) navigate(cta.to);
  };

  return (
    <header
      className="cm relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black text-white"
      style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
    >
      <style>{`
        .cm .cm-serif { font-family: 'Instrument Serif', serif; font-weight: 400; letter-spacing: -0.015em; }
        .cm .cm-glass {
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.24);
          backdrop-filter: blur(22px) saturate(140%);
          transition: background 300ms ease, transform 300ms ease;
        }
        .cm .cm-glass:hover { background: rgba(255,255,255,0.14); }
        .cm .cm-primary { background: #fff; color: #050505; border-color: transparent; }
        .cm .cm-primary:hover { background: #f2f2f2; }
        @keyframes cm-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .cm .cm-rise { animation: cm-rise 1.2s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {bgVideo ? (
        <video
          ref={videoRef}
          src={bgVideo}
          poster={bgPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      ) : (
        <img
          src={bgImage || bgPoster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Bottom blur mask — the signature of Prompt 4 */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.92) 100%)",
          backdropFilter: "blur(6px)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-6xl flex-col items-start px-6 pb-14 md:px-14 md:pb-20">
        {chip && (
          <div className="cm-rise mb-6 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] backdrop-blur">
            {chip}
          </div>
        )}
        <div
          className="cm-rise mb-4 text-[11px] uppercase tracking-[0.32em] text-white/70"
          style={{ animationDelay: "120ms" }}
        >
          {eyebrow}
        </div>
        <h1
          className="cm-serif cm-rise max-w-4xl text-white"
          style={{
            fontSize: "clamp(44px, 7.5vw, 96px)",
            lineHeight: 1.03,
            animationDelay: "240ms",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="cm-rise mt-6 max-w-2xl text-base text-white/75 md:text-lg"
            style={{ animationDelay: "380ms" }}
          >
            {subtitle}
          </p>
        )}

        {(primary || secondary) && (
          <div
            className="cm-rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "520ms" }}
          >
            {primary && (
              <button
                onClick={() => go(primary)}
                className="cm-glass cm-primary cursor-pointer rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em]"
              >
                {primary.label}
              </button>
            )}
            {secondary && (
              <button
                onClick={() => go(secondary)}
                className="cm-glass cursor-pointer rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white"
              >
                {secondary.label}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
