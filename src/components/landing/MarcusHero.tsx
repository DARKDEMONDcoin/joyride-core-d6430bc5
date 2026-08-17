/** @doc Marcus/Bennet portrait editorial hero (Prompt 1). Used on /about, /contact. */
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const BG_IMG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85";
const PORTRAIT_IMG =
  "https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png";

interface Props {
  brand?: string;
  marqueeLeft?: string;
  marqueeRight?: string;
  footerLeft?: string[];
  footerRight?: string[];
  navLinks?: { label: string; to: string }[];
  socialLinks?: { label: string; href: string }[];
}

export default function MarcusHero({
  brand = "Megsy",
  marqueeLeft = "Megsy",
  marqueeRight = "AI",
  footerLeft = ["Egyptian AI Studio", "Built in Cairo", "Made for creators"],
  footerRight = ["A homage to", "everyone who ships"],
  navLinks = [
    { label: "Story", to: "/about" },
    { label: "Product", to: "/megsy-model" },
    { label: "Contact", to: "/contact" },
  ],
  socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = "marcus-font";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href =
        "https://db.onlinewebfonts.com/c/95cecf452d3208890088a5b4c19c7ecf?family=Helvetica+Neue+ME";
      document.head.appendChild(l);
    }
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      className="marcus relative h-[100dvh] w-full overflow-hidden bg-black"
      style={{ fontFamily: "'Helvetica Neue ME', Helvetica, Arial, sans-serif" }}
    >
      <style>{`
        .marcus .cream { color: #efeee9; }
        .marcus .bg-cream { background: #efeee9; }
        @keyframes m-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes m-rise-in {
          from { opacity: 0; transform: translateY(4vh) scale(1.03); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes m-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes m-line {
          from { transform: scaleX(0); } to { transform: scaleX(1); }
        }
        @keyframes m-marquee {
          from { transform: translateX(0); } to { transform: translateX(-50%); }
        }
        .marcus .a-fade    { animation: m-fade-in 1.2s ease-out both; }
        .marcus .a-rise    { animation: m-rise-in 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .marcus .a-line    { animation: m-line 1.1s cubic-bezier(0.76,0,0.24,1) 1.2s both; transform-origin: left; }
        .marcus .a-up      { animation: m-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-fill-mode: both; }
        .marcus .marquee   { animation: m-marquee 30s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .marcus .a-fade, .marcus .a-rise, .marcus .a-line, .marcus .a-up { animation-duration: 0.01ms !important; animation-delay: 0ms !important; }
          .marcus .marquee { animation: none; }
        }
      `}</style>

      {/* Background image */}
      <img
        src={BG_IMG}
        alt=""
        className="a-fade absolute inset-0 h-full w-full object-cover"
      />

      {/* Marquee name */}
      <div className="absolute inset-x-0 top-[10vh] z-10 overflow-hidden sm:top-[14vh]">
        <div
          className="marquee cream a-up flex w-max whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(56px, 10vh, 128px)", animationDelay: "500ms" }}
        >
          <span className="pr-[6vw] sm:text-[26vh]" style={{ fontSize: "inherit" }}>
            {marqueeLeft} &mdash; {marqueeRight}&nbsp;
          </span>
          <span className="pr-[6vw] sm:text-[26vh]" style={{ fontSize: "inherit" }}>
            {marqueeLeft} &mdash; {marqueeRight}&nbsp;
          </span>
        </div>
      </div>

      {/* Cream rule */}
      <div className="a-line bg-cream absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 sm:inset-x-10 sm:bottom-28" />

      {/* Front portrait */}
      <img
        src={PORTRAIT_IMG}
        alt="Portrait"
        className="a-rise pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
      />

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <a
          href="/"
          className="cream a-up text-lg tracking-wide"
          style={{ animationDelay: "800ms" }}
        >
          {brand}
        </a>

        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <div className="cream a-up text-sm" style={{ animationDelay: "900ms" }}>
            2026
          </div>
          <ul className="flex flex-col gap-0.5 text-sm">
            {navLinks.map((n, i) => (
              <li key={n.label}>
                <a
                  href={n.to}
                  className="cream a-up block transition-opacity duration-300 hover:opacity-60"
                  style={{ animationDelay: `${1000 + i * 80}ms` }}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-0.5 text-sm">
            {socialLinks.map((n, i) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="cream a-up block transition-opacity duration-300 hover:opacity-60"
                  style={{ animationDelay: `${1150 + i * 80}ms` }}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="a-up relative z-50 flex h-10 w-10 items-center justify-center sm:hidden"
          style={{ animationDelay: "900ms" }}
          aria-label="menu"
        >
          <span
            className="bg-cream absolute h-[1.5px] w-6 transition-all duration-500"
            style={{
              transform: open ? "translateY(0) rotate(45deg)" : "translateY(-6px)",
              transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)",
            }}
          />
          <span
            className="bg-cream absolute h-[1.5px] w-6 transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="bg-cream absolute h-[1.5px] w-6 transition-all duration-500"
            style={{
              transform: open ? "translateY(0) rotate(-45deg)" : "translateY(6px)",
              transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)",
            }}
          />
        </button>
      </header>

      {/* Footer */}
      <footer className="cream absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 pb-5 text-xs leading-relaxed sm:z-10 sm:px-10 sm:pb-8 sm:text-sm">
        <div className="a-up" style={{ animationDelay: "1400ms" }}>
          {footerLeft.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
        <div className="a-up text-right" style={{ animationDelay: "1550ms" }}>
          {footerRight.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </footer>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-[80%] max-w-sm px-8 py-10 sm:hidden`}
        style={{
          background: "#141414",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 600ms cubic-bezier(0.76,0,0.24,1)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          className="cream absolute right-6 top-6 transition-all duration-300"
          style={{
            transform: open ? "rotate(0deg)" : "rotate(90deg)",
            opacity: open ? 1 : 0,
            transitionDelay: open ? "300ms" : "0ms",
          }}
          aria-label="close"
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        <div
          className="cream/50 mb-4 text-xs uppercase tracking-[0.2em] text-[#efeee9]/50 transition-all"
          style={{
            transitionDelay: "250ms",
            transform: open ? "translateY(0)" : "translateY(1.5rem)",
            opacity: open ? 1 : 0,
          }}
        >
          Site Index
        </div>
        <ul className="cream space-y-2">
          {navLinks.map((n, i) => (
            <li
              key={n.label}
              className="text-4xl transition-all duration-500"
              style={{
                transitionDelay: `${300 + i * 80}ms`,
                transform: open ? "translateY(0)" : "translateY(1.5rem)",
                opacity: open ? 1 : 0,
              }}
            >
              <a href={n.to}>{n.label}</a>
            </li>
          ))}
        </ul>

        <div
          className="cream/50 mb-3 mt-10 text-xs uppercase tracking-[0.2em] text-[#efeee9]/50 transition-all"
          style={{
            transitionDelay: "500ms",
            transform: open ? "translateY(0)" : "translateY(1.5rem)",
            opacity: open ? 1 : 0,
          }}
        >
          Find Me
        </div>
        <ul className="cream flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {socialLinks.map((n, i) => (
            <li
              key={n.label}
              className="transition-all duration-500"
              style={{
                transitionDelay: `${550 + i * 60}ms`,
                transform: open ? "translateY(0)" : "translateY(1rem)",
                opacity: open ? 1 : 0,
              }}
            >
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
