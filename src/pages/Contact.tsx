import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", brand: "", projectType: "", quantity: "", message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", brand: "", projectType: "", quantity: "", message: "" });
    }, 1200);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputClass = "w-full bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all duration-200";

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -mt-20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto section-padding text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-primary text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Contact
          </motion.p>
          <RevealText
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] mb-6"
            delay={0.3}
          >
            Let's Start Your Project
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-muted-foreground max-w-lg mx-auto text-lg"
          >
            Whether you're launching a new brand, need blanks, or want custom merch — we're here to help.
          </motion.p>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <FadeIn direction="left" className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name *</label>
                    <input required maxLength={100} value={form.name} onChange={update("name")} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <input required type="email" maxLength={255} value={form.email} onChange={update("email")} className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone / WhatsApp</label>
                    <input value={form.phone} onChange={update("phone")} maxLength={30} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Brand Name</label>
                    <input value={form.brand} onChange={update("brand")} maxLength={100} className={inputClass} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Type</label>
                    <select value={form.projectType} onChange={update("projectType")} className={inputClass}>
                      <option value="">Select...</option>
                      <option value="sampling">Sampling</option>
                      <option value="bulk">Bulk Production</option>
                      <option value="private-label">Private Label</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Estimated Quantity</label>
                    <input value={form.quantity} onChange={update("quantity")} placeholder="e.g., 200 pcs" maxLength={50} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message / Project Details *</label>
                  <textarea required maxLength={2000} rows={5} value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} />
                </div>
                <MagneticButton>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-lg text-sm transition-all duration-200 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97] disabled:opacity-50"
                  >
                    <Send size={14} />
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </MagneticButton>
              </form>
            </FadeIn>

            {/* Contact info */}
            <FadeIn direction="right" className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-semibold text-lg mb-6">Alternative Contact</h3>
                  <div className="space-y-4 text-sm">
                    {[
                      { href: "https://instagram.com/globalapparel.x", icon: Instagram, text: "@globalapparel.x", external: true },
                      { href: "mailto:support@theglobalapparel.com", icon: Mail, text: "support@theglobalapparel.com" },
                      { href: "https://wa.me/923174639055", icon: Phone, text: "+92 317 4639055" },
                    ].map((c, i) => (
                      <motion.a
                        key={i}
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noopener noreferrer" : undefined}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center">
                          <c.icon size={16} />
                        </div>
                        {c.text}
                      </motion.a>
                    ))}
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div className="pt-2">
                        <p>Lahore, Pakistan</p>
                        <p>Hampton, VA (USA)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                  <h4 className="font-display font-semibold mb-2">Quick Response</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We typically respond within 24 hours. For fastest response, DM us on Instagram or WhatsApp.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
