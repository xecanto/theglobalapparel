import { Link } from "react-router-dom";
import { ArrowRight, Factory, Shirt, Palette, Package, CheckCircle2, Star, Zap, Shield, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";
import AnimatedCounter from "@/components/AnimatedCounter";
import ParallaxImage from "@/components/ParallaxImage";
import MagneticButton from "@/components/MagneticButton";
import GridMotion from "@/components/GridMotion";
import { GridBackground } from "@/components/GridBackground";

import heroImg from "@/assets/hero-factory.jpg";
import productsImg from "@/assets/products-flatlay.jpg";
import fabricImg from "@/assets/fabric-rolls.jpg";
import qualityImg from "@/assets/quality-control.jpg";

// Import all images from the gallery folders for GridMotion
const imageModules = import.meta.glob(['@/assets/gallery/*.{jpg,png,jpeg,webp}', '@/assets/gallery2/*.{jpg,png,jpeg,webp}'], { eager: true });
const galleryImages = Object.values(imageModules).map((mod: any) => (mod as any).default);

gsap.registerPlugin(ScrollTrigger);


const faqs = [
  { q: "What are your minimum order quantities (MOQs)?", a: "Our MOQs start as low as 50–100 pieces depending on style and fabric. We also offer smaller prototype and sampling runs starting from 1–10 pieces." },
  { q: "What is the average production lead time?", a: "Typical lead time is 4–8 weeks from sample approval to delivery. Sampling takes 7–14 days. Rush orders may be possible — contact us to discuss timelines." },
  { q: "Do you offer sampling before bulk production?", a: "Absolutely. We provide both digital mockups and physical samples so you can review fit, fabric, and construction before committing to a bulk run." },
  { q: "What types of fabrics do you work with?", a: "We work with premium cotton, fleece, French terry, jersey, heavyweight fabrics up to 500+ GSM, and more — sourced from top Pakistani mills that supply global sportswear brands." },
  { q: "What printing and embellishment techniques do you offer?", a: "We offer screen printing, DTG (direct-to-garment), all-over printing, embroidery, custom patches, woven labels, and hang tags. We can match any technique to your design needs." },
  { q: "Do you ship internationally?", a: "Yes, we ship worldwide via sea and air freight. We handle all packaging and shipping logistics to get your order delivered safely and on time." },
  { q: "How do I get started?", a: "Simply fill out our contact form, DM us on Instagram (@globalapparel.x), or WhatsApp us at +92 317 4639055. Share your designs, tech packs, or just your ideas — we'll guide you through the rest." },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Low MOQ" },
  { value: "14", label: "Day Sampling" },
  { value: "100%", label: "In-House" },
];

const capabilities = [
  { icon: Shirt, title: "Cut & Sew", desc: "Tees, hoodies, sweatpants, jackets — custom fits from jersey, fleece, French terry up to 500+ GSM.", img: productsImg },
  { icon: Palette, title: "Printing & Embroidery", desc: "Screen print, DTG, all-over print, embroidery, patches, custom labels and trims.", img: fabricImg },
  { icon: Factory, title: "Knitwear & Blanks", desc: "Premium heavyweight blanks — sweatshirts, beanies, cardigans with brushed interiors.", img: heroImg },
  { icon: Package, title: "Private Label", desc: "Full branding: custom tags, labels, hangtags, polybags, boxes — retail-ready packaging.", img: qualityImg },
];

const steps = [
  { num: "01", title: "Inquiry & Design", desc: "Share your vision, tech packs, or references." },
  { num: "02", title: "Fabric & Trim Selection", desc: "Choose from premium Pakistani mill fabrics." },
  { num: "03", title: "Sampling & Approval", desc: "Physical or digital samples in 7–14 days." },
  { num: "04", title: "Bulk Production", desc: "Precision manufacturing with real-time updates." },
  { num: "05", title: "Quality Control", desc: "Rigorous AQL-standard checks at every stage." },
  { num: "06", title: "Global Shipping", desc: "Packaged and shipped worldwide on schedule." },
];

const testimonials = [
  { quote: "Insane quality on heavyweight hoodies — best production partner we've worked with.", author: "Streetwear brand, USA" },
  { quote: "Low MOQs and fast sampling made launching our first collection easy and risk-free.", author: "Emerging label, Europe" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Process line animation
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <img src={heroImg} alt="Global Apparel factory floor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto section-padding py-32"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              Empowering Global Brands since 2014
            </motion.div>

            <RevealText
              as="h1"
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-6"
              delay={0.3}
            >
              Premium Custom Apparel Manufacturing
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl"
            >
              From fabric knitting to final packaging — we handle your entire production chain with precision, quality, and low MOQs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-black px-12 py-5 rounded-2xl text-sm transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.95] uppercase tracking-widest"
                >
                  Get a Quote <ArrowRight size={14} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-md text-white font-black px-12 py-5 rounded-2xl text-sm transition-all duration-300 hover:bg-white/10 active:scale-[0.95] uppercase tracking-widest"
                >
                  Explore Studio
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <AnimatedCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn>
                <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Why Choose Us</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] mb-8">
                  No Middlemen. Full Control. Better Pricing.
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  We source premium surplus fabrics from mills that supply the world's leading sportswear brands.
                  Every step happens in-house in Lahore, Pakistan.
                </p>
              </FadeIn>
              <div className="space-y-4">
                {["World-class craftsmanship at competitive costs", "Vertically integrated production", "Ethical & sustainable practices", "Served brands in USA, Europe, Middle East"].map((t, i) => (
                  <FadeIn key={t} delay={0.3 + i * 0.08}>
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                        <CheckCircle2 size={12} className="text-primary" />
                      </div>
                      <span className="text-sm">{t}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <FadeIn direction="right" delay={0.2}>
              <div className="rounded-2xl overflow-hidden glow-primary">
                <ParallaxImage src={fabricImg} alt="Premium fabric rolls" className="h-[500px] rounded-2xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto section-padding">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">What We Do</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">Manufacturing Capabilities</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {capabilities.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative h-[300px] rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500"
                >
                  <img
                    src={c.img}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center mb-4 border border-primary/20">
                      <c.icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">{c.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{c.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
              Explore all capabilities <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 relative overflow-hidden bg-card/5" ref={processRef}>
        <GridBackground pattern="grid" opacity={0.03} size={40} />
        <div className="max-w-5xl mx-auto section-padding">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">How It Works</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">From Concept to Delivery</h2>
            </div>
          </FadeIn>
          <div className="relative">
            {/* Animated line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-border hidden md:block">
              <div className="process-line absolute inset-0 bg-gradient-to-b from-primary to-primary/20 origin-top" />
            </div>
            <div className="space-y-10 md:space-y-12">
              {steps.map((s, i) => (
                <FadeIn key={s.num} delay={i * 0.08} direction="left">
                  <div className="flex gap-6 md:gap-10 items-start group">
                    <div className="w-11 h-11 rounded-full border-2 border-border bg-background flex items-center justify-center shrink-0 text-xs font-display font-bold text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 relative z-10">
                      {s.num}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
                      <p className="text-muted-foreground text-sm">{s.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Archive - GridMotion */}
      <section className="py-0 overflow-hidden bg-background relative h-[60vh] sm:h-[80vh] border-y border-white/5">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center p-10">
            <FadeIn>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 drop-shadow-2xl uppercase tracking-tighter">Visual Archive</h2>
              <MagneticButton>
                <Link to="/gallery" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full font-bold text-sm transition-all shadow-2xl uppercase tracking-widest">
                  Explore Gallery
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </div>
        <GridMotion items={galleryImages} gradientColor="transparent" />
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto section-padding">
          <FadeIn>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 text-center">Trusted Worldwide</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16">What Our Partners Say</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.blockquote
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="bg-card/40 backdrop-blur-md border border-border/40 p-10 rounded-2xl hover:border-primary/20 transition-all duration-300 relative group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <CheckCircle2 size={80} className="text-primary" />
                  </div>
                  <div className="text-primary text-5xl font-display leading-none mb-6 opacity-20">"</div>
                  <p className="text-xl leading-relaxed mb-8 font-medium italic text-foreground/90">{t.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-primary/30" />
                    <cite className="text-sm text-muted-foreground not-italic font-bold tracking-tight uppercase tracking-widest">— {t.author}</cite>
                  </div>
                </motion.blockquote>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="py-32 relative overflow-hidden bg-card/10">
        <GridBackground pattern="dots" opacity={0.04} size={20} />
        <div className="max-w-4xl mx-auto section-padding">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter">Frequently Asked Questions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AccordionItem
                      value={`faq-${i}`}
                      className="bg-background/40 backdrop-blur-sm border border-border/60 rounded-2xl px-8 data-[state=open]:border-primary/40 data-[state=open]:bg-background/80 transition-all duration-300 shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-display font-black text-lg py-7 hover:no-underline hover:text-primary transition-colors uppercase tracking-tight">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8 border-t border-border/10 pt-6">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="dark surface-dark py-28 relative noise-overlay overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto section-padding text-center">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black mb-8 tracking-tighter uppercase">Scale Your Vision <br /> Globally</h2>
            <p className="text-muted-foreground mb-12 max-w-lg mx-auto text-xl font-medium">
              Join 50+ international labels growing with our premium infrastructure. Response within 24 hours guaranteed.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-black px-12 py-5 rounded-2xl text-sm transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.95] uppercase tracking-widest"
                >
                  Start Project <ArrowRight size={16} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://instagram.com/globalapparel.x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-md text-white font-black px-12 py-5 rounded-2xl text-sm transition-all duration-300 hover:bg-white/10 active:scale-[0.95] uppercase tracking-widest"
                >
                  Instagram DM
                </a>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
