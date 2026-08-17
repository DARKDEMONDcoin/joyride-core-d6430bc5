/** @doc Logoipsum-style modern data hero (Prompt 7). Dark, transparent search input, credit tracker chip. */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  placeholder?: string;
  onSubmit?: (q: string) => void;    // if omitted, navigates to /chat with prompt
  chip?: string;                     // e.g. "36 models · one wallet"
  suggestions?: string[];
}

export default function LogoipsumHero({
  eyebrow = "// Compare",
  title,
  subtitle,
  placeholder = "Ask Megsy…",
  onSubmit,
  chip,
  suggestions = [],
}: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = "logoipsum-font";
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(l);
  }, []);

  const submit = () => {
    const v = q.trim();
    if (!v) {
      inputRef.current?.focus();
      return;
    }
    if (onSubmit) onSubmit(v);
    else {
      try { sessionStorage.setItem("megsy.pendingPrompt", v); } catch { /* ignore */ }
      navigate("/chat");
    }
  };

  return (
    <section
      className="li relative w-full overflow-hidden bg-[#0b0d10] text-[#eef0f2]"
      style={{ fontFamily: "'Inter Tight', system-ui, sans-serif", minHeight: "100svh" }}
    >
      <style>{`
        .li .li-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .li .li-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(238,240,242,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(238,240,242,0.045) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 65%);
        }
        .li .li-input {
          background: rgba(238,240,242,0.04);
          border: 1px solid rgba(238,240,242,0.12);
          backdrop-filter: blur(18px) saturate(140%);
          transition: border-color 220ms ease, background 220ms ease;
        }
        .li .li-input:focus-within { border-color: rgba(238,240,242,0.34); background: rgba(238,240,242,0.06); }
        .li .li-chip {
          background: rgba(238,240,242,0.04);
          border: 1px solid rgba(238,240,242,0.14);
          transition: background 220ms ease;
        }
        .li .li-chip:hover { background: rgba(238,240,242,0.09); }
        @keyframes li-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .li .li-in { animation: li-in 1.1s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="li-grid" aria-hidden />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-14 md:pt-8">
        <button
          onClick={() => navigate("/")}
          className="li-in cursor-pointer border-none bg-transparent text-lg font-medium tracking-tight"
        >
          megsy
        </button>
        {chip && (
          <div className="li-chip li-in li-mono hidden rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] opacity-80 md:block">
            {chip}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-140px)] max-w-4xl flex-col items-center justify-center px-6 pb-24 pt-10 text-center">
        <div className="li-mono li-in mb-6 text-[10px] uppercase tracking-[0.32em] opacity-55">
          {eyebrow}
        </div>
        <h1
          className="li-in mb-6 max-w-3xl font-medium tracking-tight text-[#f6f7f8]"
          style={{ fontSize: "clamp(40px, 6.2vw, 76px)", lineHeight: 1.05, animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="li-in mb-10 max-w-xl text-base opacity-70 md:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {subtitle}
          </p>
        )}

        {/* Input */}
        <div
          className="li-input li-in relative w-full max-w-2xl rounded-2xl px-2 py-2"
          style={{ animationDelay: "380ms" }}
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder={placeholder}
              className="flex-1 bg-transparent px-4 py-3 text-base text-[#eef0f2] outline-none placeholder:text-[#eef0f2]/40"
              aria-label="Prompt"
            />
            <button
              onClick={submit}
              className="cursor-pointer rounded-xl bg-[#eef0f2] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#0b0d10] transition hover:bg-white"
            >
              Ask
            </button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div
            className="li-in mt-6 flex flex-wrap items-center justify-center gap-2"
            style={{ animationDelay: "520ms" }}
          >
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => { setQ(s); setTimeout(submit, 0); }}
                className="li-chip li-mono cursor-pointer rounded-full px-4 py-1.5 text-[11px] opacity-80"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
