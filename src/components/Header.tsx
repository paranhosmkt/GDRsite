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
  const [hasLogoError, setHasLogoError] = useState(false);

  useEffect(() => {
    getPageAssets().then((assets) => {
      if (assets?.headerLogo) {
        const url = getSanityImageUrl(assets.headerLogo);
        if (url) {
          setLogoUrl(url);
          return;
        }
      }
      setLogoUrl("/gdr_logo_header.png");
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
            {logoUrl && !hasLogoError ? (
              <img
                src={logoUrl}
                alt="Gouvêa dos Reis Advogados"
                className="h-24 w-auto object-contain transition-all duration-300"
                onError={() => {
                  // If we tried loading /gdr_logo_header.png and it's not present yet, trigger fallback text block
                  setHasLogoError(true);
                }}
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Graceful stylized typographic fallback if files are not uploaded yet */
              <div className="flex flex-col items-start justify-center py-1 select-none pr-4">
                <span className="text-xl font-serif tracking-[0.08em] font-medium text-gdr-dark leading-none">
                  Gouvêa dos Reis
                </span>
                <span className="text-[10px] font-sans tracking-[0.4em] font-bold text-gdr-beige uppercase mt-1 leading-none pl-[2px]">
                  Advogados
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
