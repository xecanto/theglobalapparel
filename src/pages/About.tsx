import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";
import ParallaxImage from "@/components/ParallaxImage";
import { motion } from "framer-motion";
import qualityImg from "@/assets/quality-control.jpg";
import factoryImg from "@/assets/hero-factory.jpg";
import { Target, Clock, Lightbulb, Leaf, Users } from "lucide-react";

const values = [
  { icon: Target, title: "Quality First", desc: "Premium fabrics and rigorous QC at every stage of production." },
  { icon: Clock, title: "Reliability", desc: "On-time delivery with transparent, proactive communication." },
  { icon: Lightbulb, title: "Innovation", desc: "Constant R&D in fabrics, fits, and printing techniques." },
  { icon: Leaf, title: "Sustainability", desc: "Ethical workforce, waste reduction, and surplus fabric usage." },
  { icon: Users, title: "Partnership", desc: "We grow when you grow — your success is our mission." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={factoryImg} alt="Factory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto section-padding text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-primary text-xs font-semibold uppercase tracking-widest mb-4"
          >
            About Us
          </motion.p>
          <RevealText
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] mb-6"
            delay={0.3}
          >
            Your Trusted Manufacturing Partner
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-muted-foreground max-w-lg mx-auto text-lg"
          >
            Vertically integrated apparel manufacturing since 2014.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn>
                <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Our Story</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-8">
                  From Lahore to the World
                </h2>
              </FadeIn>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                {[
                  "Founded in 2014 in Lahore, Pakistan, Global Apparel (also known as Pal Apparel Global) is a vertically integrated apparel manufacturer specializing in high-quality custom garments for international brands.",
                  "With representatives in the USA (Hampton, Virginia), we bridge the gap between creative brands and world-class production. Our factory combines traditional Pakistani craftsmanship with modern machinery and ethical standards.",
                  "Led by founder & Managing Director Tahaam Pal — a self-taught textile expert — our team of skilled professionals handles everything in-house for maximum control and consistency.",
                ].map((text, i) => (
                  <FadeIn key={i} delay={0.2 + i * 0.1}>
                    <p>{text}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
            <FadeIn direction="right" delay={0.2}>
              <div className="rounded-2xl overflow-hidden glow-primary">
                <ParallaxImage src={qualityImg} alt="Quality control" className="h-[500px] rounded-2xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto section-padding">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Our Values</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">What Drives Us</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="flex gap-4 bg-card/60 backdrop-blur-sm border border-border/50 p-6 rounded-xl hover:border-primary/20 transition-all duration-300 h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <v.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
