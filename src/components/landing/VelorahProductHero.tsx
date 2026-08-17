/** @doc Velorah cinematic hero (Prompt 3) — reusable for product/model pages
 *  (/megay, /megsy-model, /egypt). Fullscreen video, deep navy, Instrument Serif. */
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
  videoSrc?: string;
  dir?: "ltr" | "rtl";
  brand?: string;
  navLinks?: { label: string; to: string }[];
}

const DEFAULT_VIDEO = "/route-assets/videos/landing-top.mp4";

export default function VelorahProductHero({
  title,
  subtitle,
  eyebrow,
  ctaPrimary,
  ctaSecondary,
  videoSrc = DEFAULT_VIDEO,
  dir = "ltr",
  brand = "Megsy",
  navLinks,
}: Props) {
  const navigate = useNavigate();
  const links = useMemo<Props["navLinks"]>(
    () =>
      navLinks ?? [
        { label: dir === "rtl" ? "الرئيسية" : "Home", to: "/" },
        { label: dir === "rtl" ? "الأسعار" : "Pricing", to: "/pricing" },
        { label: dir === "rtl" ? "تواصل" : "Contact", to: "/contact" },
      ],
    [navLinks, dir],
  );

  useEffect(() => {
    const id = "velorah-fonts";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500&display=swap";
    document.head.appendChild(l);
  }, []);

  return (
    <section
      dir={dir}
      className="v-hero relative min-h-dvh w-full overflow-hidden"
      style={{
        background: "hsl(201 100% 13%)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .v-hero .serif { font-family: 'Instrument Serif', serif; }
        .v-hero .glass {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .v-hero .glass:hover { transform: scale(1.03); }
        .v-hero .glass::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%,
            rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%,
            rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%,
            rgba(255,255,255,0.45) 100%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }
        @keyframes v-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v-hero .rise    { animation: v-rise 0.8s ease-out both; }
        .v-hero .rise-1  { animation: v-rise 0.8s ease-out 0.2s both; }
        .v-hero .rise-2  { animation: v-rise 0.8s ease-out 0.4s both; }
      `}</style>

      <video
        src={videoSrc}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-black/10 to-[hsl(201_100%_13%)]/80"
        aria-hidden
      />

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="serif text-2xl tracking-tight text-white md:text-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          {brand}
          <sup className="text-xs">®</sup>
        </a>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links!.map((l) => (
            <li key={l.label}>
              <a
                href={l.to}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(l.to);
                }}
                className="text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {ctaPrimary && (
          <button
            onClick={() => navigate(ctaPrimary.to)}
            className="glass cursor-pointer rounded-full px-5 py-2.5 text-sm text-white md:px-6"
          >
            {ctaPrimary.label}
          </button>
        )}
      </nav>

      {/* Hero */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-16 text-center md:pb-32 md:pt-24">
        {eyebrow && (
          <div className="rise mb-6 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur-md">
            {eyebrow}
          </div>
        )}
        <h1
          className="serif rise text-4xl font-normal tracking-tight sm:text-6xl md:text-7xl"
          style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="rise-1 mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            {subtitle}
          </p>
        )}

        <div className="rise-2 mt-10 flex flex-wrap items-center justify-center gap-3">
          {ctaPrimary && (
            <button
              onClick={() => navigate(ctaPrimary.to)}
              className="glass cursor-pointer rounded-full px-10 py-4 text-base font-medium text-white md:px-14 md:py-5"
            >
              {ctaPrimary.label}
            </button>
          )}
          {ctaSecondary && (
            <button
              onClick={() => navigate(ctaSecondary.to)}
              className="cursor-pointer px-6 py-4 text-sm text-white/70 underline-offset-4 transition-opacity hover:text-white hover:underline md:text-base"
            >
              {ctaSecondary.label}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
