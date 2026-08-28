import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Play,
  Briefcase,
  BookOpen,
  FileText,
  Building2,
  ShieldCheck,
  Globe,
  ExternalLink,
  X,
  Share2,
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";

interface BioLinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon: React.ElementType;
  isExternal?: boolean;
  isVideoPopup?: boolean;
  featured?: boolean;
}

export default function BioPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Conheça os materiais do Gouvêa dos Reis Advogados";

    // Clean up hash from the browser URL address bar if present (e.g. /#/link -> /link)
    if (window.location.hash) {
      const cleanUrl = `${window.location.origin}/link`;
      window.history.replaceState(null, "", cleanUrl);
    }

    const updateMetaTag = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement | null;
      }
      if (el) {
        el.setAttribute("content", content);
      }
    };

    updateMetaTag("og:title", "Conheça os materiais do Gouvêa dos Reis Advogados");
    updateMetaTag("og:description", "Conheça os materiais, e-books, artigos e canais de atendimento exclusivos do Gouvêa dos Reis Advogados.");
    updateMetaTag("og:image", "https://i.ibb.co/Kx0wV3qG/Logo-GDR-1.png");
    updateMetaTag("twitter:title", "Conheça os materiais do Gouvêa dos Reis Advogados");
    updateMetaTag("twitter:description", "Conheça os materiais, e-books, artigos e canais de atendimento exclusivos do Gouvêa dos Reis Advogados.");
    updateMetaTag("twitter:image", "https://i.ibb.co/Kx0wV3qG/Logo-GDR-1.png");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getCleanBioUrl = () => {
    return `${window.location.origin}/link`;
  };

  const handleCopyLink = () => {
    const cleanUrl = getCleanBioUrl();
    navigator.clipboard.writeText(cleanUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const cleanUrl = getCleanBioUrl();
    if (navigator.share) {
      navigator.share({
        title: "Conheça os materiais do Gouvêa dos Reis Advogados",
        text: "Conheça os materiais, e-books, artigos e canais de atendimento do Gouvêa dos Reis Advogados.",
        url: cleanUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const bioLinks: BioLinkItem[] = [
    {
      id: "fale-conosco",
      title: "Fale Conosco",
      subtitle: "Atendimento direto com nossa equipe via WhatsApp",
      url: "http://wa.me/554832229696",
      icon: MessageCircle,
      isExternal: true,
      featured: true,
    },
    {
      id: "nossa-historia",
      title: "Nossa História",
      subtitle: "Assista ao documentário de nossa trajetória institucional",
      url: "https://youtu.be/wq9HqfMVVCU?si=Ks1hVW0mupWrNx5Y",
      icon: Play,
      isVideoPopup: true,
    },
    {
      id: "portfolio",
      title: "Portfólio",
      subtitle: "Nossos projetos de representação e casos de negócios",
      url: "/#portfolio",
      icon: Briefcase,
      isExternal: false,
    },
    {
      id: "ebooks",
      title: "E-books",
      subtitle: "Guias digitais e materiais práticos para download",
      url: "/materiais?categoria=ebooks",
      icon: BookOpen,
      isExternal: false,
    },
    {
      id: "artigos",
      title: "Artigos",
      subtitle: "Análises, teses jurídicas e artigos de nossos especialistas",
      url: "/materiais?categoria=artigos",
      icon: FileText,
      isExternal: false,
    },
    {
      id: "direito-imobiliarias",
      title: "Direito para Imobiliárias",
      subtitle: "Soluções e segurança jurídica para o mercado imobiliário",
      url: "https://gdrimobliar-naenjz3x.manus.space",
      icon: Building2,
      isExternal: true,
    },
    {
      id: "lgpd-cartorios",
      title: "LGPD para Cartórios",
      subtitle: "Adequação regulatória e conformidade notarial e registral",
      url: "https://lgpdcartorios-2dvm6src.manus.space",
      icon: ShieldCheck,
      isExternal: true,
    },
    {
      id: "site-oficial",
      title: "Acesse nosso Site",
      subtitle: "Conheça todas as áreas de atuação, sócios e artigos",
      url: "/",
      icon: Globe,
      isExternal: false,
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/gouveadosreis?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/gouveadosreis",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.82 5H18V0h-3.806C10.596 0 9 1.583 9 4.615V8z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@gouveadosreisadv",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/gouvea-dos-reis-advogados/posts/?feedView=all",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center justify-between px-4 py-6 sm:py-10 relative overflow-hidden selection:bg-gdr-beige selection:text-gdr-dark">
      {/* Subtle Background Glow and Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gdr-beige/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-900/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Top Floating Actions */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4 z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs text-white/70 hover:text-gdr-beige transition-colors py-1.5 px-3.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ir para o Site</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center space-x-1.5 text-xs text-white/70 hover:text-gdr-beige transition-colors py-1.5 px-3.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Link Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-lg flex flex-col items-center z-10">
        {/* Cover Banner Header */}
        <div className="relative w-full flex flex-col items-center text-center mb-6">
          {/* Logo Header (Transparent background) */}
          <Link to="/" title="Ir para o site oficial" className="w-full flex items-center justify-center py-3 mb-3 group cursor-pointer">
            <img
              src="https://i.ibb.co/Kx0wV3qG/Logo-GDR-1.png"
              alt="Gouvêa dos Reis Advogados"
              className="w-full max-w-[290px] sm:max-w-[340px] h-auto object-contain -translate-x-2 sm:-translate-x-3 transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:drop-shadow-[0_10px_30px_rgba(192,160,98,0.3)]"
              referrerPolicy="no-referrer"
            />
          </Link>

          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide flex items-center justify-center gap-2">
            <span>Gouvêa dos Reis Advogados</span>
          </h1>
          <p className="text-xs font-sans tracking-[0.25em] font-semibold text-gdr-beige uppercase mt-1.5">
            Tradição e Inovação Jurídica &bull; Desde 1968
          </p>

          <p className="text-xs text-white/70 font-light mt-2.5 max-w-md leading-relaxed">
            Escritório full service com atendimento em todo o Brasil
          </p>
        </div>

        {/* Links List */}
        <div className="w-full space-y-3.5">
          {bioLinks.map((item) => {
            const Icon = item.icon;

            if (item.isVideoPopup) {
              return (
                <button
                  key={item.id}
                  onClick={() => setIsVideoOpen(true)}
                  className="w-full group text-left relative overflow-hidden rounded-xl bg-[#161616] hover:bg-[#1c1c1c] border border-white/10 hover:border-gdr-beige/60 p-4 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-gdr-beige/10 border border-gdr-beige/30 flex items-center justify-center text-gdr-beige shrink-0 group-hover:scale-105 group-hover:bg-gdr-beige group-hover:text-gdr-dark transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-white group-hover:text-gdr-beige transition-colors block truncate">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <p className="text-[11px] text-white/50 font-light truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-gdr-beige group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              );
            }

            if (!item.isExternal) {
              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className="w-full group block relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg border bg-[#161616] hover:bg-[#1c1c1c] border-white/10 hover:border-gdr-beige/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 bg-gdr-beige/10 border border-gdr-beige/30 text-gdr-beige group-hover:bg-gdr-beige group-hover:text-gdr-dark">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-white group-hover:text-gdr-beige transition-colors block truncate">
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <p className="text-[11px] text-white/50 font-light truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-gdr-beige group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                </Link>
              );
            }

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full group block relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg border ${
                  item.featured
                    ? "bg-gradient-to-r from-emerald-950/60 to-[#161616] border-emerald-500/40 hover:border-emerald-400"
                    : "bg-[#161616] hover:bg-[#1c1c1c] border-white/10 hover:border-gdr-beige/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 ${
                        item.featured
                          ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white"
                          : "bg-gdr-beige/10 border border-gdr-beige/30 text-gdr-beige group-hover:bg-gdr-beige group-hover:text-gdr-dark"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-white group-hover:text-gdr-beige transition-colors block truncate">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <p className="text-[11px] text-white/50 font-light truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-gdr-beige group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Social Media Icons & Share URL Box */}
        <div className="w-full mt-10 pt-6 border-t border-white/10 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">
            Nossas Redes Sociais
          </span>
          <div className="flex items-center justify-center gap-3 mb-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-gdr-beige hover:text-gdr-dark text-white/70 border border-white/10 hover:border-gdr-beige flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Direct Clean Link Badge with One-Click Copy */}
          <div className="w-full bg-[#121212]/90 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2 shadow-inner">
            <div className="flex items-center space-x-2 min-w-0 pl-1">
              <Globe className="w-4 h-4 text-gdr-beige shrink-0" />
              <span className="text-xs text-white/70 font-mono truncate select-all">
                {window.location.host ? `${window.location.host}/link` : "gdr.adv.br/link"}
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              title="Copiar link limpo sem #"
              className="shrink-0 px-3 py-1.5 rounded-lg bg-gdr-beige/10 hover:bg-gdr-beige text-gdr-beige hover:text-gdr-dark border border-gdr-beige/30 transition-all text-xs font-medium flex items-center space-x-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVideoOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div className="relative w-full max-w-2xl bg-gdr-dark border border-white/20 rounded-2xl overflow-hidden shadow-2xl cursor-default">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#121212]">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-gdr-beige" />
                <h3 className="text-sm font-serif font-medium text-white">
                  Nossa História — Gouvêa dos Reis Advogados
                </h3>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/wq9HqfMVVCU?autoplay=1"
                title="Gouvêa dos Reis - Nossa História"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#121212] flex justify-between items-center text-xs text-white/60">
              <span>Mais de 57 anos de tradição jurídica</span>
              <a
                href="https://youtu.be/wq9HqfMVVCU?si=Ks1hVW0mupWrNx5Y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gdr-beige hover:underline flex items-center space-x-1"
              >
                <span>Assistir no YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer info */}
      <footer className="w-full max-w-lg text-center mt-8 pt-4 text-[10px] text-white/35 uppercase tracking-widest font-sans z-10">
        &copy; {new Date().getFullYear()} Gouvêa dos Reis Advogados. Todos os direitos reservados.
      </footer>
    </div>
  );
}
