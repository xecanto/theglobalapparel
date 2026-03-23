import fs from 'fs';
import path from 'path';

const SRC_DIR = '/opt/globalapparel/src';

// 1. Redesign headers
function updateHeader(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
        /<section className="dark relative py-40 overflow-hidden">\s*<div className="absolute inset-0 surface-dark" \/>/g,
        `<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -mt-20" />`
    );
    fs.writeFileSync(filePath, content);
}

['Services.tsx', 'Gallery.tsx', 'Contact.tsx'].forEach(file => {
    updateHeader(path.join(SRC_DIR, 'pages', file));
});

// 2. Migrate FAQ to Index.tsx
const indexFile = path.join(SRC_DIR, 'pages', 'Index.tsx');
let indexContent = fs.readFileSync(indexFile, 'utf8');

if (!indexContent.includes('Accordion')) {
    // Add imports
    indexContent = indexContent.replace(
        'import { motion, useScroll, useTransform } from "framer-motion";',
        `import { motion, useScroll, useTransform } from "framer-motion";\nimport { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";`
    );

    // Add faqs array before stats
    const faqsArray = `
const faqs = [
  { q: "What are your minimum order quantities (MOQs)?", a: "Our MOQs start as low as 50–100 pieces depending on style and fabric. We also offer smaller prototype and sampling runs starting from 1–10 pieces." },
  { q: "What is the average production lead time?", a: "Typical lead time is 4–8 weeks from sample approval to delivery. Sampling takes 7–14 days. Rush orders may be possible — contact us to discuss timelines." },
  { q: "Do you offer sampling before bulk production?", a: "Absolutely. We provide both digital mockups and physical samples so you can review fit, fabric, and construction before committing to a bulk run." },
  { q: "What types of fabrics do you work with?", a: "We work with premium cotton, fleece, French terry, jersey, heavyweight fabrics up to 500+ GSM, and more — sourced from top Pakistani mills that supply global sportswear brands." },
  { q: "What printing and embellishment techniques do you offer?", a: "We offer screen printing, DTG (direct-to-garment), all-over printing, embroidery, custom patches, woven labels, and hang tags. We can match any technique to your design needs." },
  { q: "Do you ship internationally?", a: "Yes, we ship worldwide via sea and air freight. We handle all packaging and shipping logistics to get your order delivered safely and on time." },
  { q: "How do I get started?", a: "Simply fill out our contact form, DM us on Instagram (@globalapparel.x), or WhatsApp us at +92 317 4639055. Share your designs, tech packs, or just your ideas — we'll guide you through the rest." },
];\n`;

    indexContent = indexContent.replace('const stats = [', faqsArray + '\nconst stats = [');

    // Add FAQ section before CTA
    const faqSection = `
      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-border/50">
        <div className="max-w-3xl mx-auto section-padding">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Questions</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AccordionItem
                    value={\`faq-\${i}\`}
                    className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/20 data-[state=open]:glow-primary-sm transition-all"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base py-5 hover:no-underline hover:text-primary transition-colors">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

`;

    indexContent = indexContent.replace('{/* CTA */}', faqSection + '      {/* CTA */}');
    fs.writeFileSync(indexFile, indexContent);
}

// 3. Remove FAQ from router
const appFile = path.join(SRC_DIR, 'App.tsx');
let appContent = fs.readFileSync(appFile, 'utf8');
appContent = appContent.replace(/import FAQ from ".\/pages\/FAQ";\n/, '');
appContent = appContent.replace(/\s*<Route path="\/faq" element={<FAQ \/>} \/>\n/, '\n');
fs.writeFileSync(appFile, appContent);

// 4. Remove FAQ.tsx
const faqFile = path.join(SRC_DIR, 'pages', 'FAQ.tsx');
if (fs.existsSync(faqFile)) {
    fs.unlinkSync(faqFile);
}

// 5. Update Navbar Links (remove FAQ)
const navbarFile = path.join(SRC_DIR, 'components', 'Navbar.tsx');
let navbarContent = fs.readFileSync(navbarFile, 'utf8');
navbarContent = navbarContent.replace(/\s*\{\s*to:\s*"\/faq",\s*label:\s*"FAQ"\s*\},/g, '');
fs.writeFileSync(navbarFile, navbarContent);

// 6. Update Footer Links (point to /#faq)
const footerFile = path.join(SRC_DIR, 'components', 'Footer.tsx');
let footerContent = fs.readFileSync(footerFile, 'utf8');
footerContent = footerContent.replace(/\{\s*to:\s*"\/faq",\s*label:\s*"FAQ"\s*\}/g, '{ to: "/#faq", label: "FAQ" }');
fs.writeFileSync(footerFile, footerContent);

console.log('Script completed successfully.');
