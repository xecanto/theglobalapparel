import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { motion } from "framer-motion";
import { Scissors, Layers, Printer, Tag, Ruler, TrendingUp, ArrowRight } from "lucide-react";

const services = [
  { icon: Layers, title: "Fabric Manufacturing & Sourcing", desc: "Knitting, dyeing, brushing — premium cotton, fleece, French terry, heavyweight (high GSM) fabrics from top Pakistani mills." },
  { icon: Scissors, title: "Cut & Sew", desc: "Precision cutting and sewing for hoodies, tees, sweatpants, jackets, shorts — custom fits and patterns to your exact specs." },
  { icon: Printer, title: "Printing & Embellishment", desc: "Screen printing, DTG/digital printing, all-over print, embroidery, patches, woven labels, custom tags — every technique available." },
  { icon: Tag, title: "Finishing & Packaging", desc: "Trimming, washing, pressing, custom polybags, labels, hangtags, boxes — retail-ready garments delivered to your door." },
  { icon: Ruler, title: "Product Development", desc: "Tech packs, CAD, physical sampling, fit approvals — turn ideas into sellable products fast with our design team." },
  { icon: TrendingUp, title: "Low MOQ & Scalability", desc: "Prototypes from 1–10 pcs, production runs from 50–100+ pcs, scaling to thousands without quality drop." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -mt-20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto section-padding text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-primary text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Our Services
          </motion.p>
          <RevealText
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] mb-6"
            delay={0.3}
          >
            Full-Stack Apparel Manufacturing
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-muted-foreground max-w-lg mx-auto text-lg"
          >
            End-to-end garment production — from raw fabric to retail-ready packaging.
          </motion.p>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-card/60 backdrop-blur-sm border border-border/50 p-8 rounded-xl hover:border-primary/30 hover:glow-primary-sm transition-all duration-300 h-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <s.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto section-padding text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Need Something Custom?</h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto text-lg">
              Whatever your project, we can make it happen. Get in touch and let's discuss.
            </p>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-9 py-3.5 rounded-lg text-sm transition-all duration-200 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
              >
                Get a Quote <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
