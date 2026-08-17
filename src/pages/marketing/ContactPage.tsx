/** @doc Contact — Marcus/Bennet portrait hero + clean glass sections (no icons). */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import SEOHead from "@/components/common/SEOHead";
import MarcusHero from "@/components/landing/MarcusHero";
import LandingFooter from "@/components/landing/LandingFooter";
import { supabase } from "@/integrations/supabase/client";

const supportSchema = z.object({
  username: z.string().trim().min(1, "Username is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Please describe your issue").max(2000),
});
const enterpriseSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  workEmail: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().min(1, "Company name is required").max(200),
  needs: z.string().trim().min(1, "Tell us about your needs").max(2000),
});
type SupportData = z.infer<typeof supportSchema>;
type EnterpriseData = z.infer<typeof enterpriseSchema>;

type Channel = { title: string; body: string; cta: string; to?: string; action?: "copy" };
const CHANNELS: Channel[] = [
  { title: "Instant support", body: "Chat with Megsy 3.9 24/7 — answers in seconds, in any language.", cta: "Open chat", to: "/support" },
  { title: "Email a human", body: "support@megsyai.com. We reply within 24 hours, seven days a week.", cta: "Copy email", action: "copy" },
  { title: "Enterprise sales", body: "Custom credit volume, SSO, SLA, annual contracts and onboarding.", cta: "Book a call", to: "/enterprise" },
  { title: "Follow on X", body: "Product updates, releases and behind the scenes from Cairo.", cta: "Open @megsyai", to: "https://twitter.com/megsyai" },
];

const inputCls =
  "w-full rounded-2xl bg-[#efeee9]/5 border border-[#efeee9]/15 px-4 py-3 text-sm text-[#efeee9] outline-none transition placeholder:text-[#efeee9]/40 focus:border-[#efeee9]/50";

export default function ContactPage() {
  const [tab, setTab] = useState<"support" | "enterprise">("support");
  const [submitting, setSubmitting] = useState(false);
  const supportForm = useForm<SupportData>({ resolver: zodResolver(supportSchema) });
  const enterpriseForm = useForm<EnterpriseData>({ resolver: zodResolver(enterpriseSchema) });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const onSupportSubmit = async (data: SupportData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: data.username, email: data.email, message: data.message, form_type: "support",
      });
      if (error) throw error;
      toast.success("Request submitted!");
      supportForm.reset();
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  };
  const onEnterpriseSubmit = async (data: EnterpriseData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: `${data.firstName} ${data.lastName}`,
        email: data.workEmail,
        message: data.needs,
        subject: `Enterprise - ${data.company}`,
        form_type: "enterprise",
      });
      if (error) throw error;
      toast.success("Inquiry submitted!");
      enterpriseForm.reset();
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-dvh bg-black text-white">
      <SEOHead
        title="Contact Megsy AI — Support & Enterprise"
        description="Reach Megsy AI support or talk to our enterprise team for custom plans, SSO and dedicated onboarding."
        path="/contact"
      />
      <MarcusHero
        marqueeLeft="Say" marqueeRight="Hi"
        footerLeft={["Support · Sales · Press", "Cairo · 24/7", "support@megsyai.com"]}
        footerRight={["A human will read", "every single message"]}
        navLinks={[
          { label: "Support", to: "#support" },
          { label: "Enterprise", to: "#enterprise" },
          { label: "Home", to: "/" },
        ]}
      />

      <main className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <style>{`
          .c-glass { position: relative; background: rgba(239,238,233,0.03); backdrop-filter: blur(6px); border-radius: 24px; border: 1px solid rgba(239,238,233,0.08); }
          .c-hn { font-family: 'Helvetica Neue ME', Helvetica, Arial, sans-serif; }
          .c-cream { color: #efeee9; }
          .c-tab { border: 1px solid rgba(239,238,233,0.15); background: transparent; color: rgba(239,238,233,0.6); }
          .c-tab.active { background: #efeee9; color: #050505; }
        `}</style>

        {/* Channels */}
        <section>
          <div className="c-cream mb-4 text-xs uppercase tracking-[0.2em] opacity-60">// Channels</div>
          <h2 className="c-hn c-cream mb-14 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Pick the fastest route to a real answer.
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {CHANNELS.map((c) => (
              <div key={c.title} className="c-glass p-8 md:p-10">
                <h3 className="c-hn c-cream mb-3 text-2xl md:text-3xl">{c.title}</h3>
                <p className="c-cream mb-6 text-sm leading-relaxed opacity-70">{c.body}</p>
                <button
                  onClick={() => {
                    if (c.action === "copy") {
                      navigator.clipboard?.writeText("support@megsyai.com");
                      toast.success("Email copied");
                    } else if (c.to?.startsWith("http")) {
                      window.open(c.to, "_blank");
                    } else if (c.to) {
                      if (c.to.startsWith("#")) {
                        document.querySelector(c.to)?.scrollIntoView({ behavior: "smooth" });
                      } else window.location.href = c.to;
                    }
                  }}
                  className="c-cream cursor-pointer rounded-full border border-[#efeee9]/25 bg-transparent px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition hover:bg-[#efeee9]/10"
                >
                  {c.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Forms */}
        <section id="support" className="mt-32">
          <div className="c-cream mb-4 text-xs uppercase tracking-[0.2em] opacity-60">// Message us</div>
          <h2 className="c-hn c-cream mb-8 text-4xl md:text-6xl" style={{ letterSpacing: "-0.02em" }}>
            Write directly.
          </h2>
          <div className="mb-8 flex gap-2">
            <button className={`c-tab rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.15em] ${tab === "support" ? "active" : ""}`} onClick={() => setTab("support")}>Support</button>
            <button id="enterprise" className={`c-tab rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.15em] ${tab === "enterprise" ? "active" : ""}`} onClick={() => setTab("enterprise")}>Enterprise</button>
          </div>

          <div className="c-glass p-8 md:p-12">
            {tab === "support" ? (
              <form onSubmit={supportForm.handleSubmit(onSupportSubmit)} className="space-y-5">
                <div>
                  <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">Username</label>
                  <input {...supportForm.register("username")} className={inputCls} placeholder="Your name" />
                  {supportForm.formState.errors.username && <p className="mt-1 text-xs text-red-400">{supportForm.formState.errors.username.message}</p>}
                </div>
                <div>
                  <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">Email</label>
                  <input {...supportForm.register("email")} className={inputCls} placeholder="you@domain.com" />
                  {supportForm.formState.errors.email && <p className="mt-1 text-xs text-red-400">{supportForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">Message</label>
                  <textarea {...supportForm.register("message")} rows={5} className={inputCls} placeholder="Describe your issue…" />
                  {supportForm.formState.errors.message && <p className="mt-1 text-xs text-red-400">{supportForm.formState.errors.message.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="c-hn cursor-pointer rounded-full bg-[#efeee9] px-8 py-3.5 text-sm uppercase tracking-[0.15em] text-[#050505] transition hover:opacity-80 disabled:opacity-50">
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            ) : (
              <form onSubmit={enterpriseForm.handleSubmit(onEnterpriseSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">First name</label>
                    <input {...enterpriseForm.register("firstName")} className={inputCls} />
                    {enterpriseForm.formState.errors.firstName && <p className="mt-1 text-xs text-red-400">{enterpriseForm.formState.errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">Last name</label>
                    <input {...enterpriseForm.register("lastName")} className={inputCls} />
                    {enterpriseForm.formState.errors.lastName && <p className="mt-1 text-xs text-red-400">{enterpriseForm.formState.errors.lastName.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">Work email</label>
                    <input {...enterpriseForm.register("workEmail")} className={inputCls} />
                    {enterpriseForm.formState.errors.workEmail && <p className="mt-1 text-xs text-red-400">{enterpriseForm.formState.errors.workEmail.message}</p>}
                  </div>
                  <div>
                    <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">Company</label>
                    <input {...enterpriseForm.register("company")} className={inputCls} />
                    {enterpriseForm.formState.errors.company && <p className="mt-1 text-xs text-red-400">{enterpriseForm.formState.errors.company.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="c-cream mb-2 block text-xs uppercase tracking-[0.15em] opacity-70">Needs</label>
                  <textarea {...enterpriseForm.register("needs")} rows={5} className={inputCls} placeholder="What are you trying to solve?" />
                  {enterpriseForm.formState.errors.needs && <p className="mt-1 text-xs text-red-400">{enterpriseForm.formState.errors.needs.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="c-hn cursor-pointer rounded-full bg-[#efeee9] px-8 py-3.5 text-sm uppercase tracking-[0.15em] text-[#050505] transition hover:opacity-80 disabled:opacity-50">
                  {submitting ? "Sending…" : "Talk to sales"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
