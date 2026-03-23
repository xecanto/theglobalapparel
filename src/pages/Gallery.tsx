import FadeIn from "@/components/FadeIn";
import RevealText from "@/components/RevealText";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Import all images from the gallery folders
const imageModules = import.meta.glob(['@/assets/gallery/*.{jpg,png,jpeg,webp}', '@/assets/gallery2/*.{jpg,png,jpeg,webp}'], { eager: true });
const galleryImages = Object.values(imageModules).map((mod: any) => mod.default);

const materials = ['Heavyweight French Terry', 'Premium Pique Cotton', 'Acid-Wash Selvedge Denim', 'High-Density Fleece', 'Organic Pima Cotton', 'Reinforced Ripstop Nylon', 'Sustainable Bamboo Blend', 'Distressed Canvas', 'Breathable Mesh', 'Ultra-Soft Mohair', 'Tech-Stretch Polymer', 'Vegetable-Tanned Leather'];
const styles = ['Oversized Drop-Shoulder', 'Classic Box-Cut', 'Tapered Utility', 'Vintage-Inspired Distressed', 'Minimalist Seamless', 'Industrial Workwear', 'Asymmetric Avant-Garde', 'Modern Slim-Fit', 'Relaxed-Fit Heritage', 'Double-Layered Modular'];
const items = ['Hoodie', 'T-Shirt', 'Cargo Trouser', 'Bomber Jacket', 'Pullover', 'Worker Shirt', 'Anorak', 'Jogger', 'Graphic Tee', 'Sample Swatch', 'Production Prototype', 'Fabric Roll'];
const details = ['in Midnight Onyx', 'with Contrast Topstitching', 'feat. High-Density Screen Print', 'with 3D Embroidery Detail', 'in Vintage Sage', 'with Reinforced Seams', 'Sample #082-A', 'Production Line V2', 'Fabric Texture Close-up', 'Quality Control Check'];

function getAuthenticTitle() {
  const type = Math.random();
  if (type > 0.4) {
    // Component based title
    const mat = materials[Math.floor(Math.random() * materials.length)];
    const sty = styles[Math.floor(Math.random() * styles.length)];
    const itm = items[Math.floor(Math.random() * items.length)];
    const det = details[Math.floor(Math.random() * details.length)];
    return `${sty} ${itm} (${mat}) ${det}`;
  } else {
    // Production based title
    const productionPrefixes = ['Industrial', 'Precision', 'Bespoke', 'High-Speed', 'Manual', 'automated'];
    const processes = ['Laser Cutting', 'Embroidery', 'Screen Printing', 'Pattern Making', 'Dyeing Process', 'Quality Inspection', 'Fabric Sourcing', 'Stitching'];
    const prefix = productionPrefixes[Math.floor(Math.random() * productionPrefixes.length)];
    const proc = processes[Math.floor(Math.random() * processes.length)];
    const det = details[Math.floor(Math.random() * details.length)];
    return `${prefix} ${proc} - ${det}`;
  }
}

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const imagesWithData = useMemo(() => {
    // Keep the "original" assets together or shuffled? 
    // Let's shuffle the whole thing for variety.
    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    return shuffled.map((src, idx) => ({
      id: idx,
      src,
      title: getAuthenticTitle()
    }));
  }, []);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : imagesWithData.length - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev < imagesWithData.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : imagesWithData.length - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null && prev < imagesWithData.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, imagesWithData.length]);

  return (
    <>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -mt-20" />
        <div className="relative z-10 max-w-7xl mx-auto section-padding text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-primary text-xs font-semibold uppercase tracking-widest mb-4"
          >
            Portfolio
          </motion.p>
          <RevealText
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] mb-6"
            delay={0.3}
          >
            Our Work
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground max-w-lg mx-auto text-lg"
          >
            Explore our authentic collection of high-end streetwear production, fabric samples, and industrial processes.
          </motion.p>
        </div>
      </section>

      <section className="pb-32 relative z-10">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {imagesWithData.map((img, i) => (
              <FadeIn key={img.id} delay={0} className="break-inside-avoid">
                <motion.div
                  whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                  className="rounded-xl overflow-hidden relative group cursor-pointer mb-4 bg-secondary/20 shadow-sm border border-border/50"
                  onClick={() => openModal(i)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pt-24 pb-4 px-4">
                    <div className="w-full">
                      <p className="font-display font-semibold text-white text-sm md:text-base tracking-wide line-clamp-2">
                        {img.title}
                      </p>
                      <div className="w-12 h-1 bg-primary mt-2 group-hover:w-full transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-md"
            onClick={closeModal}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 bg-white/5 rounded-full hover:bg-white/10"
              onClick={closeModal}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all hover:scale-110 z-50 p-3 sm:p-5 bg-white/5 hover:bg-white/10 rounded-full"
              onClick={showPrev}
            >
              <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all hover:scale-110 z-50 p-3 sm:p-5 bg-white/5 hover:bg-white/10 rounded-full"
              onClick={showNext}
            >
              <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
            </button>

            <div
              className="relative w-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                src={imagesWithData[selectedIndex].src}
                alt={imagesWithData[selectedIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
              />
              <motion.div
                key={`text-${selectedIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-col items-center mt-8 text-center"
              >
                <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight max-w-2xl px-4">
                  {imagesWithData[selectedIndex].title}
                </h2>
                <p className="text-white/40 text-xs sm:text-sm mt-3 uppercase tracking-widest font-semibold flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-white/20" />
                  Item {selectedIndex + 1} of {imagesWithData.length}
                  <span className="w-8 h-[1px] bg-white/20" />
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
