import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import FadeIn from "./FadeIn";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="dark surface-dark relative noise-overlay">
      <div className="relative z-10 max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <FadeIn delay={0}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex flex-col items-end leading-none font-display font-bold tracking-tight">
                  <span className="text-[1.3rem]">GLOBAL</span>
                  <span className="text-[0.85rem] opacity-70">APPAREL</span>
                </div>
                <img src={logo} alt="Global Apparel" className="h-10 w-auto drop-shadow-[0_0_10px_rgba(218,221,224,0.15)]" />
              </div>
              <p className="text-sm leading-relaxed opacity-70 max-w-xs">
                Premium custom apparel manufacturing from Pakistan. Full-stack
                production for global brands since 2014.
              </p>
            </div>
          </FadeIn>

          {/* Links */}
          <FadeIn delay={0.1}>
            <div>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 opacity-60">
                Navigation
              </h4>
              <div className="space-y-2.5">
                {[
                  { to: "/about", label: "About Us" },
                  { to: "/services", label: "Services" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/#faq", label: "FAQ" },
                  { to: "/contact", label: "Contact" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.2}>
            <div>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 opacity-60">
                Get in Touch
              </h4>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:support@theglobalapparel.com"
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-primary transition-all"
                >
                  <Mail size={14} /> support@theglobalapparel.com
                </a>
                <a
                  href="https://wa.me/923174639055"
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-primary transition-all"
                >
                  <Phone size={14} /> +92 317 4639055
                </a>
                <a
                  href="https://instagram.com/globalapparel.x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-primary transition-all"
                >
                  <Instagram size={14} /> @globalapparel.x
                </a>
                <div className="flex items-start gap-2 opacity-70">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>Lahore, Pakistan · Hampton, VA (USA)</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-40">
          © {new Date().getFullYear()} Global Apparel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
