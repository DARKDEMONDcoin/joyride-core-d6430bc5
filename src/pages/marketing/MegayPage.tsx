/** @doc Megay 3.9 — first Egyptian AI model. Route: /megay
 *  Hero: Velorah cinematic (Prompt 3). Sections below: clean glass, no icons. */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Languages } from "lucide-react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import VelorahProductHero from "@/components/landing/VelorahProductHero";

type Lang = "ar" | "en";

const COPY = {
  ar: {
    dir: "rtl" as const,
    metaTitle: "ميغاي 3.9 — أول نموذج وتطبيق ذكاء اصطناعي مصري | ميغسي",
    metaDesc:
      "ميغاي 3.9 هو أول نموذج ذكاء اصطناعي كبير مبني ومدرَّب بالكامل في مصر، ويشغّل تطبيق ميغسي مجاناً بالعربية وأكثر من 100 لغة.",
    eyebrow: "صُنع في مصر · Megay 3.9",
    headline: (
      <>
        أول نموذج ذكاء اصطناعي
        <br /> <em className="not-italic text-white/60">مصري</em>
      </>
    ),
    subhead:
      "نموذج لغوي ضخم مبني ومدرَّب في مصر، يفهم العربية واللهجة المصرية بشكل أصيل، ويشغّل تطبيق ميغسي مجاناً على كل الخطط.",
    ctaPrimary: "جرّب مجاناً",
    ctaSecondary: "شوف الأسعار",
    capabilitiesLabel: "// القدرات",
    capabilitiesHead: "قدرات ميغاي 3.9",
    capabilities: [
      { t: "عربي أصيل + 100 لغة", d: "مدرَّب على بيانات عربية ومصرية بكميات ضخمة، مع دعم كامل لأكثر من 100 لغة." },
      { t: "سرعة استجابة عالية", d: "زمن استجابة منخفض للمحادثات الحية والاستخدام اليومي." },
      { t: "أدوات مدمجة", d: "بحث ويب، توليد صور، تحليل مستندات، وتنفيذ كود — كلها جزء أصلي من النموذج." },
      { t: "خصوصية أولاً", d: "بياناتك ملكك. لا يتم استخدام محادثاتك لتدريب النموذج بدون إذنك." },
      { t: "فهم ثقافي", d: "يفهم السياق الثقافي العربي والمصري بشكل حقيقي — مش ترجمة سطحية." },
      { t: "مجاني إلى الأبد", d: "استخدام غير محدود لميغاي 3.9 على الخطة المجانية." },
    ],
    storyLabel: "// القصة",
    storyHead: "من مصر، للعالم",
    storyBody:
      "ميغاي 3.9 هو ثمرة عمل فريق مصري آمن إن الذكاء الاصطناعي لازم يتكلم لغتنا ويفهم ثقافتنا. من التوكنة العربية إلى بيانات التدريب واختيار السياقات، كل قرار في ميغاي اتصمم عشان يخدم المستخدم العربي أولاً.",
    specsLabel: "// المواصفات",
    specsHead: "معلومات النموذج",
    specs: [
      { k: "الاسم", v: "Megay 3.9" },
      { k: "المطوّر", v: "Megsy · مصر" },
      { k: "اللغات", v: "أكثر من 100 لغة" },
      { k: "التخصص", v: "عربي + مصري + متعدد اللغات" },
      { k: "الأدوات", v: "بحث · صور · مستندات · كود" },
      { k: "السعر", v: "مجاني على كل الخطط" },
    ],
    ctaHead: "جرّب ميغاي 3.9 دلوقتي",
    ctaBody: "افتح شات ميغسي واختار موديل Megay 3.9 من المنيو. مجاناً وبدون بطاقة ائتمان.",
    ctaBtn: "افتح الشات",
  },
  en: {
    dir: "ltr" as const,
    metaTitle: "Megay 3.9 — The First Egyptian AI Model | Megsy",
    metaDesc:
      "Megay 3.9 is the first large AI model built and trained entirely in Egypt. It powers the Megsy app for free, in Arabic and 100+ languages.",
    eyebrow: "Made in Egypt · Megay 3.9",
    headline: (
      <>
        The first Egyptian
        <br /> <em className="not-italic text-white/60">AI model</em>
      </>
    ),
    subhead:
      "A large language model built and trained in Egypt, natively fluent in Arabic and Egyptian dialect. Powers the Megsy app for free on every plan.",
    ctaPrimary: "Try free",
    ctaSecondary: "See pricing",
    capabilitiesLabel: "// Capabilities",
    capabilitiesHead: "What Megay 3.9 can do",
    capabilities: [
      { t: "Native Arabic + 100 languages", d: "Trained on massive Arabic and Egyptian corpora, with full support for 100+ languages." },
      { t: "Low-latency responses", d: "Fast enough for live conversation and everyday work." },
      { t: "Built-in tools", d: "Web search, image generation, document analysis, and code — all native to the model." },
      { t: "Privacy first", d: "Your data is yours. Conversations are never used to train the model without consent." },
      { t: "Cultural understanding", d: "Real Arab and Egyptian context — not surface-level translation." },
      { t: "Free forever", d: "Unlimited use of Megay 3.9 on the free plan." },
    ],
    storyLabel: "// Story",
    storyHead: "From Egypt to the world",
    storyBody:
      "Megay 3.9 is the work of an Egyptian team that believes AI should speak our language and understand our culture. Every decision — from Arabic tokenization to training data — was made to serve the Arab user first.",
    specsLabel: "// Specs",
    specsHead: "Model information",
    specs: [
      { k: "Name", v: "Megay 3.9" },
      { k: "Maker", v: "Megsy · Egypt" },
      { k: "Languages", v: "100+ languages" },
      { k: "Focus", v: "Arabic + Egyptian + multilingual" },
      { k: "Tools", v: "Search · Images · Documents · Code" },
      { k: "Price", v: "Free on every plan" },
    ],
    ctaHead: "Try Megay 3.9 now",
    ctaBody: "Open Megsy chat and pick Megay 3.9 from the model menu. Free, no credit card.",
    ctaBtn: "Open chat",
  },
};

export default function MegayPage() {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    const l = navigator.language?.toLowerCase();
    if (l && !l.startsWith("ar")) setLang("en");
  }, []);
  const t = COPY[lang];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Megay 3.9",
    applicationCategory: "AIApplication",
    operatingSystem: "Web, iOS, Android",
    creator: { "@type": "Organization", name: "Megsy", address: "Cairo, Egypt" },
    description: t.metaDesc,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div dir={t.dir} className="min-h-dvh bg-[hsl(201_100%_13%)] text-white">
      <Helmet>
        <html lang={lang} />
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDesc} />
        <link rel="canonical" href="https://megsyai.com/megay" />
        <link rel="alternate" hrefLang="ar" href="https://megsyai.com/megay?lang=ar" />
        <link rel="alternate" hrefLang="en" href="https://megsyai.com/megay?lang=en" />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDesc} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(productLd)}</script>
      </Helmet>

      <div className="hidden">
        <LandingNavbar />
      </div>

      <VelorahProductHero
        dir={t.dir}
        eyebrow={t.eyebrow}
        title={t.headline}
        subtitle={t.subhead}
        ctaPrimary={{ label: t.ctaPrimary, to: "/auth" }}
        ctaSecondary={{ label: t.ctaSecondary, to: "/pricing" }}
      />

      {/* Language toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur-md transition hover:bg-white/10"
        >
          <Languages className="h-4 w-4" />
          {lang === "ar" ? "EN" : "عربي"}
        </button>
      </div>

      {/* Clean glass sections below the hero */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <GlassStyles />

        {/* Capabilities */}
        <section>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
            {t.capabilitiesLabel}
          </div>
          <h2 className="serif mb-16 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            {t.capabilitiesHead}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.capabilities.map((c) => (
              <GlassCard key={c.t}>
                <h3 className="serif mb-3 text-2xl md:text-3xl">{c.t}</h3>
                <p className="text-sm leading-relaxed text-white/70">{c.d}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mt-32">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">{t.storyLabel}</div>
          <h2 className="serif mb-8 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            {t.storyHead}
          </h2>
          <GlassCard>
            <p className="text-lg leading-relaxed text-white/80 md:text-xl">{t.storyBody}</p>
          </GlassCard>
        </section>

        {/* Specs */}
        <section className="mt-32">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">{t.specsLabel}</div>
          <h2 className="serif mb-16 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            {t.specsHead}
          </h2>
          <GlassCard className="!p-0">
            <ul className="divide-y divide-white/10">
              {t.specs.map((s) => (
                <li key={s.k} className="flex items-center justify-between px-6 py-5 md:px-8">
                  <span className="text-sm text-white/60">{s.k}</span>
                  <span className="text-right text-sm text-white md:text-base">{s.v}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>

        {/* CTA */}
        <section className="mt-32 text-center">
          <h2 className="serif mb-6 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            {t.ctaHead}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/70">{t.ctaBody}</p>
          <a
            href="/auth"
            className="glass inline-block cursor-pointer rounded-full px-12 py-5 text-base font-medium text-white"
          >
            {t.ctaBtn}
          </a>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

/* ---------- shared glass primitives ---------- */
function GlassStyles() {
  return (
    <style>{`
      .megay-page .serif, .serif { font-family: 'Instrument Serif', serif; }
      .glass {
        position: relative;
        overflow: hidden;
        background: rgba(255,255,255,0.02);
        background-blend-mode: luminosity;
        backdrop-filter: blur(6px);
        box-shadow: inset 0 1px 1px rgba(255,255,255,0.08);
        border-radius: 24px;
      }
      .glass::before {
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
    `}</style>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass p-8 md:p-10 ${className}`}>{children}</div>;
}
