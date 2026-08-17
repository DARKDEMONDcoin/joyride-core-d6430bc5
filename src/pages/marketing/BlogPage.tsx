/** @doc Blog index — Mindloop dark-mono hero + clean glass post list. */
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { PrefetchLink as Link } from "@/components/common/PrefetchLink";
import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { LazyOnVisible } from "@/components/common/LazyOnVisible";
import SEOHead from "@/components/common/SEOHead";
import MindloopHero from "@/components/landing/MindloopHero";
import { BLOG_POSTS } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";
import { BLOG_LANGS, blogPath, getLang } from "@/data/blogLangs";

const LandingFooter = lazy(() => import("@/components/landing/LandingFooter"));

type DbPost = {
  slug: string;
  title: string;
  meta_description: string | null;
  excerpt: string | null;
  category: string | null;
  reading_minutes: number | null;
  published_at: string | null;
  hero_image_url: string | null;
  language: string | null;
};

const SITE_ORIGIN = "https://megsyai.com";

const BlogPage = () => {
  const { lang: langParam } = useParams<{ lang?: string }>();
  if (langParam && !getLang(langParam)) return <Navigate to="/not-found" replace />;
  const lang = langParam || "en";
  const langMeta = getLang(lang)!;

  const [dbPosts, setDbPosts] = useState<DbPost[]>([]);
  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("slug,title,meta_description,excerpt,category,reading_minutes,published_at,hero_image_url,language")
      .eq("status", "published")
      .eq("language", lang)
      .order("published_at", { ascending: false })
      .limit(500)
      .then(({ data }) => setDbPosts((data as DbPost[]) ?? []));
  }, [lang]);

  const dbCards = dbPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.meta_description || p.excerpt || "",
    category: p.category || "AI Guides",
    date: p.published_at || new Date().toISOString(),
    readTime: `${p.reading_minutes || 6} min read`,
  }));
  const allPosts = lang === "en" ? [...dbCards, ...BLOG_POSTS] : dbCards;

  const isAr = lang === "ar";
  const words = isAr
    ? ["نكتب", "عن", "العمل،", "لا", "عن", "الضجيج."]
    : ["Writing", "about", "the", "work,", "not", "the", "hype."];
  const tail = isAr
    ? "أدلة عملية للذكاء الاصطناعي — صور، فيديو، كتابة."
    : "Practical guides for AI image, video and writing — from the Megsy team.";

  return (
    <div
      data-theme="dark"
      dir={langMeta.dir}
      lang={lang}
      className="min-h-dvh overflow-x-hidden bg-[#0a0a0a] text-[#e6e6e6]"
    >
      <SEOHead
        title={`Megsy AI Blog — ${langMeta.nativeName}`}
        description="Practical guides on AI image generation, video generation, prompt engineering, and how to build a creator stack with all-in-one AI tools."
        path={lang === "en" ? "/blog" : `/${lang}/blog`}
      />
      <Helmet htmlAttributes={{ lang, dir: langMeta.dir }}>
        {BLOG_LANGS.map((l) => (
          <link
            key={l.code}
            rel="alternate"
            hrefLang={l.code}
            href={`${SITE_ORIGIN}${l.code === "en" ? "/blog" : `/${l.code}/blog`}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_ORIGIN}/blog`} />
      </Helmet>

      <MindloopHero
        eyebrow={isAr ? "// مجلة Megsy" : "// The Megsy Journal"}
        words={words}
        tail={tail}
        meta={`01 · ${langMeta.nativeName}`}
      />

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:px-8 md:py-32">
        <style>{`
          .bl-glass { background: rgba(230,230,230,0.03); backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(230,230,230,0.10); border-radius: 22px; transition: background 220ms ease; }
          .bl-glass:hover { background: rgba(230,230,230,0.06); }
          .bl-serif { font-family: 'Fraunces', 'Instrument Serif', serif; font-weight: 400; letter-spacing: -0.01em; }
          .bl-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        `}</style>

        {/* Language switcher */}
        <nav aria-label="Languages" className="mb-14 flex flex-wrap justify-center gap-2">
          {BLOG_LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <Link
                key={l.code}
                to={l.code === "en" ? "/blog" : `/${l.code}/blog`}
                hrefLang={l.code}
                className={`bl-mono rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "border-white bg-white text-[#0a0a0a]"
                    : "border-white/15 text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.nativeName}
              </Link>
            );
          })}
        </nav>

        <ul className="space-y-4">
          {allPosts.map((post) => (
            <li key={post.slug}>
              <Link to={blogPath(post.slug, lang)} className="bl-glass group block p-6 md:p-10">
                <div className="bl-mono mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] opacity-55">
                  <span>{post.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(lang, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="bl-serif text-2xl md:text-4xl text-[#f4f4f4] transition-opacity group-hover:opacity-90">
                  {post.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed opacity-70">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <LazyOnVisible minHeight={320} rootMargin="600px">
        <Suspense fallback={<div style={{ minHeight: 320 }} />}>
          <LandingFooter />
        </Suspense>
      </LazyOnVisible>
    </div>
  );
};

export default BlogPage;
