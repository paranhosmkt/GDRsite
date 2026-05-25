import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { getPageAssets, getSanityImageUrl } from "../lib/sanity";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    getPageAssets().then((assets) => {
      if (assets?.headerLogo) {
        const url = getSanityImageUrl(assets.headerLogo);
        if (url) {
          setLogoUrl(url);
        }
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Sobre a GDR", id: "sobre" },
    { label: "Áreas de Atuação", id: "atuacao" },
    { label: "Equipe", id: "equipe" },
    { label: "Portfólio", id: "portfolio" },
    { label: "Blog", id: "blog" },
    { label: "Contato", id: "contato" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="navbar-gdr"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-4 border-b border-gdr-border shadow-sm"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between font-sans">
          {/* Logo representation */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleLinkClick("hero")}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Gouvêa dos Reis Advogados"
                className="h-10 w-auto object-contain transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Elegant Image placeholder box forHeader Real Logo */
              <div className="border border-dashed border-gdr-dark/20 p-2 bg-gdr-gray shrink-0 flex flex-col items-center justify-center rounded-sm transition-all duration-300 group-hover:border-gdr-beige">
                <span className="text-[7px] tracking-widest font-mono text-gdr-beige uppercase font-bold leading-none">
                  [ LOGO REAL ]
                </span>
                <span className="text-[5.5px] text-gdr-dark/40 font-mono tracking-widest uppercase leading-none mt-0.5">
                  gdr_logo_header.png
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 relative py-2 ${
                  activeSection === item.id
                    ? "text-gdr-dark"
                    : "text-gdr-dark/60 hover:text-gdr-dark"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gdr-beige transition-all duration-350 ${
                    activeSection === item.id ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button
              id="cta-agendar"
              onClick={() => handleLinkClick("contato")}
              className="hidden sm:inline-flex items-center space-x-2 bg-gdr-dark hover:bg-gdr-beige text-white hover:text-gdr-dark font-sans text-xs uppercase tracking-widest px-5 py-3 transition-all duration-300 border border-gdr-dark group"
            >
              <span>Contato</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gdr-dark hover:text-gdr-beige transition-colors focus:outline-none"
              aria-label="Alternar Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-500 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 pb-10 px-8 justify-between">
          <nav className="flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className="text-left py-2 border-b border-gdr-border text-base uppercase tracking-widest font-medium text-gdr-dark block"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "both",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col space-y-4">
            <button
              id="mobile-cta-agendar"
              onClick={() => handleLinkClick("contato")}
              className="w-full text-center bg-gdr-dark hover:bg-gdr-beige text-white hover:text-gdr-dark font-sans text-xs uppercase tracking-widest py-4 transition-all duration-300 block"
            >
              Contato
            </button>
            <div className="text-center text-[10px] text-gdr-dark/45 font-sans tracking-widest">
              GOUVÊA DOS REIS ADVOGADOS — HÁ MAIS DE 57 ANOS
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
