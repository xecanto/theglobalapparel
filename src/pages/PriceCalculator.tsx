import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Calculator, ArrowRight, Package, Scissors, Tag, Palette } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { GridBackground } from "@/components/GridBackground";

import tshirtImg from "@/assets/products/tshirt.png";
import longsleeveImg from "@/assets/products/longsleeve.png";
import crewneckImg from "@/assets/products/crewneck.png";
import hoodieImg from "@/assets/products/hoodie.png";
import ziphoodieImg from "@/assets/products/ziphoodie.png";
import tanktopImg from "@/assets/products/tanktop.png";
import shortsImg from "@/assets/products/shorts.png";

// ── Data ──

const programs = ["Basic Program", "Premium Program", "Streetwear Program"];

const products = [
  { id: "tshirt", name: "T-Shirt", img: tshirtImg, base: 4.5 },
  { id: "longsleeve", name: "Long Sleeve", img: longsleeveImg, base: 6.2 },
  { id: "crewneck", name: "Crewneck", img: crewneckImg, base: 8.5 },
  { id: "hoodie", name: "Hoodie", img: hoodieImg, base: 12.0 },
  { id: "ziphoodie", name: "Zip-Hoodie", img: ziphoodieImg, base: 13.5 },
  { id: "tanktop", name: "Tank Top", img: tanktopImg, base: 3.8 },
  { id: "shorts", name: "Shorts", img: shortsImg, base: 7.0 },
];

const fits = ["Boxy Fit", "Regular Fit", "Oversized", "Slim Fit"];
const fabricTypes = [
  { label: "Jersey", add: 0 },
  { label: "Waffle Knit", add: 1.2 },
  { label: "French Terry", add: 1.5 },
  { label: "Fleece", add: 1.8 },
];
const fabricColors = ["White", "White RTD", "Black", "Heather Grey", "Custom Color"];
const fabricWeights = [
  { label: "185 GSM", add: 0 },
  { label: "235 GSM", add: 0.8 },
  { label: "295 GSM", add: 1.5 },
  { label: "350 GSM", add: 2.2 },
  { label: "420 GSM", add: 3.0 },
];
const embellishments = [
  { label: "DTG Print", add: 2.5, icon: Palette },
  { label: "Screen Print", add: 1.8, icon: Palette },
  { label: "Embroidery", add: 3.0, icon: Scissors },
  { label: "Distressing", add: 1.5, icon: Scissors },
  { label: "Sunfade", add: 2.0, icon: Palette },
  { label: "Custom Stitching", add: 2.2, icon: Scissors },
];
const necklabels = ["Polyester", "Cotton Canvas", "Woven", "Satin"];
const carelabels = ["Polyester", "Cotton Canvas", "Satin"];
const packagingOptions = ["Neutral Polybag", "Branded Polybag", "Custom Box", "Unpackaged"];

// ── Helpers ──

function InfoTip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="inline w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

function Chip({
  label,
  selected,
  onClick,
  accent,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
        selected
          ? accent
            ? "bg-primary/10 text-primary border-primary/30 shadow-sm"
            : "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-secondary/50 text-muted-foreground border-transparent hover:border-border hover:bg-secondary/80"
      )}
    >
      {label}
    </motion.button>
  );
}

// ── Main Page ──

export default function PriceCalculator() {
  const [program, setProgram] = useState(programs[0]);
  const [product, setProduct] = useState(products[0]);
  const [fit, setFit] = useState(fits[0]);
  const [fabricType, setFabricType] = useState(fabricTypes[0]);
  const [fabricColor, setFabricColor] = useState(fabricColors[0]);
  const [fabricWeight, setFabricWeight] = useState(fabricWeights[0]);
  const [selectedEmbellishments, setSelectedEmbellishments] = useState<string[]>([]);
  const [necklabel, setNecklabel] = useState(necklabels[0]);
  const [carelabel, setCarelabel] = useState(carelabels[0]);
  const [packaging, setPackaging] = useState(packagingOptions[0]);
  const [quantity, setQuantity] = useState(300);
  const [fadeOutDye, setFadeOutDye] = useState(false);

  const programMultiplier = program === "Premium Program" ? 1.15 : program === "Streetwear Program" ? 1.25 : 1;

  const unitCost = useMemo(() => {
    let cost = product.base * programMultiplier;
    cost += fabricType.add;
    cost += fabricWeight.add;
    if (fadeOutDye) cost += 1.0;
    if (fabricColor === "Custom Color") cost += 0.5;
    const embAdd = embellishments
      .filter((e) => selectedEmbellishments.includes(e.label))
      .reduce((sum, e) => sum + e.add, 0);
    cost += embAdd;
    // packaging
    if (packaging === "Branded Polybag") cost += 0.3;
    if (packaging === "Custom Box") cost += 1.5;
    // volume discount
    if (quantity >= 500) cost *= 0.95;
    if (quantity >= 1000) cost *= 0.92;
    return Math.round(cost * 100) / 100;
  }, [product, programMultiplier, fabricType, fabricWeight, fadeOutDye, fabricColor, selectedEmbellishments, packaging, quantity]);

  const timeline = useMemo(() => {
    let weeks = 4;
    if (quantity > 500) weeks += 1;
    if (quantity > 1000) weeks += 1.5;
    if (selectedEmbellishments.length > 2) weeks += 0.5;
    return weeks;
  }, [quantity, selectedEmbellishments]);

  const total = Math.round(unitCost * quantity * 100) / 100;
  const devCost = selectedEmbellishments.length > 0 || fabricColor === "Custom Color" ? 50 : 0;

  const toggleEmbellishment = (label: string) => {
    setSelectedEmbellishments((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label]
    );
  };

  // Animated counter ref
  const costRef = useRef<HTMLSpanElement>(null);
  const [displayTotal, setDisplayTotal] = useState(total);
  useEffect(() => {
    const start = displayTotal;
    const end = total;
    const duration = 400;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayTotal(Math.round((start + (end - start) * eased) * 100) / 100);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [total]);

  return (
    <>
      <section className="py-24 md:py-32 bg-background/50 relative overflow-hidden">
        <GridBackground pattern="grid" size={50} opacity={0.03} />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          {/* Header */}
          <FadeIn>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                Price <span className="text-primary/80">Calculator</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base max-w-2xl mb-12">
              Configure your garment production with full transparency.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-12 items-start">
            <div className="space-y-12">
              {/* Program & Product */}
              <FadeIn delay={0.05}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4 px-1">Program Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {programs.map((p) => (
                        <Chip key={p} label={p} selected={program === p} onClick={() => setProgram(p)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4 px-1">Choose Product</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {products.map((p) => (
                        <motion.button
                          key={p.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setProduct(p)}
                          className={cn(
                            "flex flex-col items-center gap-3 p-3 rounded-xl border transition-all duration-200",
                            product.id === p.id
                              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                              : "border-border/50 bg-card/40 hover:border-border hover:bg-card/60"
                          )}
                        >
                          <div className="flex items-center justify-center">
                            <img
                              src={p.img}
                              alt={p.name}
                              className={cn("w-full h-full object-contain dark:invert transition-opacity", product.id === p.id ? "opacity-100" : "opacity-60")}
                            />
                          </div>
                          <span className={cn("text-[12px] font-medium text-center truncate w-full", product.id === p.id ? "text-primary" : "text-muted-foreground")}>{p.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Specification Grid */}
              <FadeIn delay={0.1}>
                <div className="p-6 rounded-2xl bg-card/30 border border-border/40 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 mb-6 px-1">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {[
                      { label: "Fit", options: fits, val: fit, set: setFit, tip: "Select the garment silhouette." },
                      { label: "Fabric Type", options: fabricTypes.map(f => f.label), val: fabricType.label, set: (l: any) => setFabricType(fabricTypes.find(f => f.label === l)!), tip: "Choose fabric construction." },
                      { label: "Fabric Color", options: fabricColors, val: fabricColor, set: setFabricColor, tip: "Standard or custom dyed." },
                      { label: "Fabric Weight", options: fabricWeights.map(f => f.label), val: fabricWeight.label, set: (l: any) => setFabricWeight(fabricWeights.find(f => f.label === l)!), tip: "Heavier = thicker fabric." },
                    ].map((s) => (
                      <div key={s.label}>
                        <label className="text-xs font-bold text-foreground/80 mb-3 flex items-center">
                          {s.label} <InfoTip text={s.tip} />
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {s.options.map((opt) => (
                            <Chip key={opt} label={opt} selected={s.val === opt} onClick={() => s.set(opt)} />
                          ))}
                        </div>
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-bold text-foreground/80 mb-3 flex items-center">
                        Vintage Fade <InfoTip text="Washed-out dye effect." />
                      </label>
                      <div className="flex gap-1.5">
                        <Chip label="Yes" selected={fadeOutDye} onClick={() => setFadeOutDye(true)} />
                        <Chip label="No" selected={!fadeOutDye} onClick={() => setFadeOutDye(false)} />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Embellishments & Finishing */}
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-card/30 border border-border/40 backdrop-blur-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-5">Embellishments</h3>
                    <div className="flex flex-wrap gap-2">
                      {embellishments.map((e) => (
                        <button
                          key={e.label}
                          onClick={() => toggleEmbellishment(e.label)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200",
                            selectedEmbellishments.includes(e.label)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary/40 text-muted-foreground border-transparent hover:border-border"
                          )}
                        >
                          <e.icon size={12} />
                          {e.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-card/30 border border-border/40 backdrop-blur-sm space-y-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-4">Branding</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground">Neck Tag</span>
                          <select value={necklabel} onChange={(e) => setNecklabel(e.target.value)} className="bg-transparent text-xs font-medium border-b border-border/50 focus:border-primary outline-none py-1">
                            {necklabels.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground">Care Tag</span>
                          <select value={carelabel} onChange={(e) => setCarelabel(e.target.value)} className="bg-transparent text-xs font-medium border-b border-border/50 focus:border-primary outline-none py-1">
                            {carelabels.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-3">Packaging</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {packagingOptions.map(p => (
                          <Chip key={p} label={p} selected={packaging === p} onClick={() => setPackaging(p)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:sticky lg:top-32 space-y-6">
              <FadeIn delay={0.25}>
                <div className="rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-xl p-8 shadow-2xl shadow-primary/5">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quantity</span>
                        <span className="text-lg font-display font-bold text-primary">{quantity} <span className="text-[10px] text-muted-foreground uppercase ml-1">Pieces</span></span>
                      </div>
                      <Slider
                        value={[quantity]}
                        onValueChange={([v]) => setQuantity(v)}
                        min={50}
                        max={5000}
                        step={50}
                        className="my-6"
                      />
                    </div>

                    <div className="space-y-3 py-6 border-y border-border/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Unit Price</span>
                        <span className="font-medium font-display">${unitCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Timeline</span>
                        <span className="font-medium font-display">{timeline} Weeks</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">In-House Quality Check</span>
                        <span className="text-primary font-bold">Included</span>
                      </div>
                      {devCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Dev. Fee</span>
                          <span className="font-medium font-display">${devCost.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-sm font-bold">Total Estimate</span>
                        <motion.span
                          layoutId="total-price"
                          className="text-4xl font-display font-bold tracking-tight text-foreground"
                        >
                          ${displayTotal.toLocaleString()}
                        </motion.span>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-right italic mb-8">
                        Excluding shipping & taxes
                      </p>
                    </div>

                    <div className="space-y-3">
                      <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                      >
                        Start Production <ArrowRight size={16} />
                      </motion.a>
                      <button className="w-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-2">
                        Download Configuration (PDF)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    <span className="font-bold text-primary mr-1">Note:</span>
                    Higher quantities unlock significant unit price reductions. Our 500+ and 1000+ tiers offer the best value for growing brands.
                  </p>
                </div>
              </FadeIn>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Sub Components ──

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8 space-y-4">
      <h3 className="font-display text-xl font-bold flex items-center gap-2">
        {title} {icon}
      </h3>
      {children}
    </div>
  );
}

function PriceStat({
  label,
  value,
  highlight,
  asterisk,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  asterisk?: boolean;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground mb-1">
        {label} {asterisk && "*"}
      </p>
      <motion.p
        key={value}
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "font-display text-xl md:text-2xl font-bold",
          highlight ? "text-accent" : "text-foreground"
        )}
      >
        {value}
      </motion.p>
    </div>
  );
}
