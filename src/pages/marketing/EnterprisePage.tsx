/** @doc Enterprise — Space voyage cinematic hero (Prompt 5) + clean glass sections. */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SEOHead from "@/components/common/SEOHead";
import SpaceVoyageHero from "@/components/landing/SpaceVoyageHero";
import LandingFooter from "@/components/landing/LandingFooter";
import { supabase } from "@/integrations/supabase/client";

const CAPABILITIES = [
  { title: "Custom credit volume", body: "A monthly MC allowance sized to your team's real usage, on one predictable invoice." },
  { title: "Team workspaces", body: "Shared seats, central billing, per-member visibility, and role-based access controls." },
  { title: "Priority channel", body: "Direct line to the founding team for setup, escalations and quarterly reviews." },
  { title: "Higher rate limits", body: "Raised concurrent generation and API limits sized for production workloads." },
  { title: "Data residency", body: "Regional deployment options and signed DPAs to match your jurisdiction." },
  { title: "Custom agreements", body: "Retention windows, training opt-outs, security addenda and NET-30 invoicing." },
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const NEEDS = [
  "Image generation at scale",
  "Video generation at scale",
  "Custom AI models",
  "API access & webhooks",
  "Dedicated infrastructure",
  "SLA guarantees",
  "Priority support",
  "Custom integrations",
  "Data privacy & compliance",
];

const inputCls =
  "w-full rounded-2xl bg-[#e8ecf3]/5 border border-[#e8ecf3]/15 px-4 py-3 text-sm text-[#e8ecf3] outline-none transition placeholder:text-[#e8ecf3]/40 focus:border-[#e8ecf3]/40";

export default function EnterprisePage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const toggleNeed = (n: string) =>
    setSelectedNeeds((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const handleSubmit = async () => {
    if (!companyName || !contactName || !email) {
      toast.error("Please fill in company, name and email.");
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from("contact_submissions").insert({
        name: contactName,
        email,
        message: `Company: ${companyName}\nSize: ${companySize}\nNeeds: ${selectedNeeds.join(", ")}\n\n${message}`,
        form_type: "enterprise",
        subject: `Enterprise Inquiry - ${companyName}`,
      });
      toast.success("Your inquiry has been submitted. We'll be in touch soon.");
      setCompanyName(""); setContactName(""); setEmail(""); setCompanySize("");
      setSelectedNeeds([]); setMessage("");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-dvh bg-[#050810] text-[#e8ecf3]">
      <SEOHead
        title="Megsy for Enterprise — Custom AI at Team Scale"
        description="Custom credit volume, team workspaces, priority support and tailored contracts for organizations running Megsy AI at scale."
        path="/enterprise"
      />

      <SpaceVoyageHero
        eyebrow="// Enterprise"
        headline="Megsy at team scale."
        sublines={[
          "Custom credit volume, shared workspaces, priority support",
          "and tailored contracts — sized to how your team actually works.",
        ]}
        primaryCta={{ label: "Talk to sales", to: "#ent-form" }}
        secondaryCta={{ label: "See features", to: "/features-guide" }}
        section2Eyebrow="// What's included"
        section2Head="Everything a serious team needs from an AI vendor."
        section2Body="Nine capabilities, one contract, one invoice. No add-ons."
        capabilities={CAPABILITIES}
      />

      {/* Form section */}
      <section id="ent-form" className="relative border-t border-white/5 bg-[#050810] px-6 py-24 md:px-14 md:py-32">
        <style>{`
          .e-glass { background: rgba(232,236,243,0.03); backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(232,236,243,0.10); border-radius: 22px; }
          .e-serif { font-family: 'Instrument Serif', serif; letter-spacing: -0.01em; }
          .e-chip { border: 1px solid rgba(232,236,243,0.18); background: rgba(232,236,243,0.04); }
          .e-chip.on { background: #e8ecf3; color: #050810; border-color: transparent; }
        `}</style>

        <div className="mx-auto max-w-4xl">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] opacity-60">// Inquiry</div>
          <h2 className="e-serif mb-10 text-[#f2f4f8]" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08 }}>
            Tell us how your team plans to use Megsy.
          </h2>

          <div className="e-glass space-y-6 p-8 md:p-12">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] opacity-70">Company name *</label>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] opacity-70">Your name *</label>
                <input value={contactName} onChange={(e) => setContactName(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] opacity-70">Work email *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] opacity-70">Team size</label>
                <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} className={inputCls}>
                  <option value="" className="bg-[#050810]">Select…</option>
                  {COMPANY_SIZES.map((s) => <option key={s} value={s} className="bg-[#050810]">{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-[11px] uppercase tracking-[0.18em] opacity-70">What do you need?</label>
              <div className="flex flex-wrap gap-2">
                {NEEDS.map((n) => (
                  <button
                    key={n} type="button" onClick={() => toggleNeed(n)}
                    className={`e-chip cursor-pointer rounded-full px-4 py-2 text-xs transition ${selectedNeeds.includes(n) ? "on" : ""}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] opacity-70">Anything else?</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className={inputCls} placeholder="Timelines, integrations, compliance…" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="cursor-pointer rounded-full bg-[#e8ecf3] px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-[#050810] transition hover:bg-white disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Submit inquiry"}
            </button>
          </div>

          <p className="mt-10 text-center text-xs opacity-50">
            Prefer to browse first?{" "}
            <button onClick={() => navigate("/pricing")} className="underline underline-offset-4 hover:opacity-80">
              See pricing
            </button>
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
