/** @doc Wandor-style hero — fullscreen video, glass prompt card, clean nav.
 *  Prompt 2 in the redesign brief. Used on the public landing `/`. */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

const VIDEO_SRC = "/route-assets/videos/landing-top.mp4";

export default function WandorHero() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState(
    "I'm planning a 7-day trip to Japan in October. I love food, hidden cafes, scenic hikes, and want to avoid crowds....",
  );

  useEffect(() => {
    // Load Geist + Special Elite once for this hero (no @import in CSS).
    const id = "wandor-fonts";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Special+Elite&family=Geist:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  }, []);

  const go = () => {
    try {
      sessionStorage.setItem("megsy.pendingPrompt", prompt);
    } catch {
      // ignore
    }
    navigate("/chat");
  };

  return (
    <section
      className="wandor relative min-h-svh w-full overflow-hidden bg-white"
      style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
    >
      <style>{`
        .wandor .w-display { font-family: 'Special Elite', serif; }
        .wandor .w-glass {
          background: rgba(255,255,255,0.06);
          border: 3px solid #fff;
          border-radius: 44px;
          box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .wandor .w-upload {
          border: 1px solid rgba(255,255,255,0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .wandor .w-cta:hover { background: #333; }
        .wandor .w-cta:active { transform: scale(0.97); }
      `}</style>

      {/* Background video */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      {/* Top white fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[687px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-[1360px]">
        {/* Nav */}
        <nav className="relative flex items-center justify-between px-6 pt-5 md:px-20 md:pt-6 md:pb-4">
          <button
            onClick={() => navigate("/")}
            className="w-display text-[32px] leading-none text-[#1a1a1a] md:text-[40px]"
            aria-label="Megsy"
          >
            megsy
          </button>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {[
              { l: "Discover", to: "/features-guide" },
              { l: "Pricing", to: "/pricing" },
              { l: "FAQs", to: "/support" },
            ].map((it) => (
              <button
                key={it.l}
                onClick={() => navigate(it.to)}
                className="cursor-pointer border-none bg-transparent text-[15px] font-medium uppercase tracking-[0.04em] text-[#1a1a1a] transition-opacity hover:opacity-55"
              >
                {it.l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => navigate("/auth")}
              className="hidden cursor-pointer border-none bg-transparent text-[15px] font-semibold uppercase tracking-[0.04em] text-[#292929] transition-opacity hover:opacity-55 md:inline"
            >
              Login
            </button>
            <button
              onClick={go}
              className="w-cta cursor-pointer rounded-full border-none bg-[#0a0a0a] px-5 py-3.5 text-[13px] font-medium uppercase tracking-[0.04em] text-[#fafafa] transition-all md:text-[15px]"
            >
              Plan My Trip
            </button>
          </div>
        </nav>

        {/* Hero body */}
        <div className="flex flex-col items-center px-6 pb-24 pt-16 text-center">
          <h1
            className="mb-5 max-w-[820px] font-medium leading-[1.05] tracking-[-0.04em] text-[#1a1a1a]"
            style={{ fontSize: "clamp(40px, 6vw, 68px)" }}
          >
            Where will you go next?
          </h1>
          <p className="mb-10 max-w-[500px] text-xl font-medium leading-relaxed text-[#767676]">
            Tell our AI where you're going and what you love. We'll create a personalized itinerary
            for you.
          </p>

          {/* Liquid glass prompt card */}
          <div
            className="w-glass relative min-h-[208px] w-[701px] max-w-[calc(100vw-48px)] overflow-hidden text-left"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="absolute left-[29px] top-[26px] w-[calc(100%-58px)] resize-none border-none bg-transparent text-xl font-medium leading-relaxed text-[#905831] outline-none placeholder:text-[#905831]/60 md:text-xl"
              style={{ height: 90, fontSize: 17 }}
              aria-label="Prompt"
            />

            {/* Upload */}
            <button
              onClick={() => fileRef.current?.click()}
              className="w-upload absolute left-[21px] top-[137px] flex h-11 w-11 items-center justify-center rounded-full bg-transparent transition-transform hover:scale-105"
              aria-label="Upload inspiration"
            >
              <Upload className="h-[18px] w-[18px] text-white" strokeWidth={1.75} />
            </button>
            <input ref={fileRef} type="file" className="hidden" />

            {/* CTA */}
            <button
              onClick={go}
              className="w-cta absolute bottom-[21px] right-[21px] flex h-14 w-[156px] items-center justify-center rounded-[44px] border-none bg-black text-base font-medium uppercase tracking-[0.02em] text-[#fafafa] shadow-[0_0_2px_0_rgba(0,0,0,0.05)] transition-all"
            >
              Plan My Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
