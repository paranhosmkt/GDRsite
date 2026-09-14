import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  FileCode, 
  Play, 
  Award, 
  Volume2, 
  Newspaper, 
  ChevronRight, 
  X, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  Download, 
  MessageCircle, 
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { 
  getMaterials, 
  SanityMaterial, 
  findMaterialByIdOrSlug, 
  localDefaultMaterials 
} from "../lib/sanity";

interface BlogProps {
  targetMaterialId?: string;
}

export default function Blog({ targetMaterialId }: BlogProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resources, setResources] = useState<SanityMaterial[]>(localDefaultMaterials);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [spotlightMaterial, setSpotlightMaterial] = useState<SanityMaterial | null>(null);
  const [highlightedMaterialId, setHighlightedMaterialId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const hasInitializedTarget = useRef<boolean>(false);

  const itemsPerPage = 9;

  // Load materials from Sanity / CMS
  useEffect(() => {
    getMaterials().then((data) => {
      if (data && data.length > 0) {
        setResources(data);
      }
    });
  }, []);

  // Helper to generate the exact direct URL for any material
  const getDirectMaterialUrl = (item: SanityMaterial): string => {
    const origin = window.location.origin;
    if (item.category === "artigos" && item.slug) {
      return `${origin}/artigo/${item.slug}`;
    }
    const identifier = item.slug || item.id;
    return `${origin}/materiais/${identifier}`;
  };

  // Helper to copy direct link to clipboard
  const handleCopyLink = (item: SanityMaterial, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const directUrl = getDirectMaterialUrl(item);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(directUrl).then(() => {
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2500);
      }).catch(() => {
        fallbackCopyText(directUrl, item.id);
      });
    } else {
      fallbackCopyText(directUrl, item.id);
    }
  };

  const fallbackCopyText = (text: string, id: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Ignore
    }
  };

  // Helper to share via WhatsApp
  const handleShareWhatsApp = (item: SanityMaterial, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const directUrl = getDirectMaterialUrl(item);
    const text = `Confira este material exclusivo do Gouvêa dos Reis Advogados:\n\n*${item.title}*\n\nAcesse diretamente pelo link:\n${directUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Resolve targeted material from props, URL path, query params, or hash
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryTarget = 
      targetMaterialId ||
      searchParams.get("item") || 
      searchParams.get("material") || 
      searchParams.get("id") || 
      searchParams.get("slug");
    
    const hashTarget = location.hash ? location.hash.replace("#", "") : null;
    const targetKey = queryTarget || (hashTarget && hashTarget !== "blog" ? hashTarget : null);

    if (targetKey) {
      const match = findMaterialByIdOrSlug(targetKey, resources);
      if (match) {
        setHighlightedMaterialId(match.id);
        
        // Update document title for accurate context
        document.title = `${match.title} | GDR Advogados`;

        // Switch active category to match this material
        if (match.category) {
          setActiveCategory(match.category);
        }
        if (match.subcategory) {
          setActiveSubcategory(match.subcategory);
        }

        // Direct presentation:
        // If video -> open player
        // If e-book or other -> open spotlight modal
        if (match.category === "videos" && match.videoEmbed) {
          setActiveVideo(match.videoEmbed);
        } else if (match.category === "ebooks" || match.buttonLink) {
          setSpotlightMaterial(match);
        }

        // Smooth scroll to card
        setTimeout(() => {
          const el = document.getElementById(`blog-card-${match.id}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 400);

        hasInitializedTarget.current = true;
        return;
      }
    }

    // If no specific material targeted, check for category filter in query/hash
    const catParam = searchParams.get("categoria") || searchParams.get("category") || searchParams.get("tag") || searchParams.get("tipo");
    const hashParam = location.hash ? location.hash.replace("#", "").toLowerCase() : null;
    const targetCat = catParam || (hashParam && hashParam !== "blog" ? hashParam : null);

    if (targetCat && !hasInitializedTarget.current) {
      const normalized = targetCat.toLowerCase();
      if (["artigos", "ebooks", "noticias", "palestras", "videos", "all"].includes(normalized)) {
        setActiveCategory(normalized);
      } else if (normalized === "ebook" || normalized === "e-book" || normalized === "e-books") {
        setActiveCategory("ebooks");
      } else if (normalized === "artigo") {
        setActiveCategory("artigos");
      } else if (normalized === "noticia" || normalized === "notícias") {
        setActiveCategory("noticias");
      } else if (normalized === "palestra") {
        setActiveCategory("palestras");
      } else if (normalized === "video" || normalized === "vídeos" || normalized === "vídeo") {
        setActiveCategory("videos");
      }
    }
  }, [location, resources, targetMaterialId]);

  // Adjust pagination when a material is highlighted so its card is visible
  useEffect(() => {
    if (!highlightedMaterialId) return;

    let filtered = activeCategory === "all"
      ? resources
      : resources.filter(item => item.category === activeCategory);

    if ((activeCategory === "videos" || activeCategory === "artigos") && activeSubcategory !== "all") {
      filtered = filtered.filter(item => item.subcategory === activeSubcategory);
    }

    const index = filtered.findIndex(item => item.id === highlightedMaterialId);
    if (index !== -1) {
      const targetPage = Math.floor(index / itemsPerPage) + 1;
      setCurrentPage(targetPage);
    }
  }, [highlightedMaterialId, activeCategory, activeSubcategory, resources]);

  const categories = [
    { id: "all", label: "Todos materiais" },
    { id: "artigos", label: "Artigos" },
    { id: "ebooks", label: "E-books" },
    { id: "noticias", label: "Notícias" },
    { id: "palestras", label: "Palestras" },
    { id: "videos", label: "Vídeos" }
  ];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubcategory("all");
    setCurrentPage(1);
    setHighlightedMaterialId(null);
  };

  const handleSubcategoryChange = (subcatId: string) => {
    setActiveSubcategory(subcatId);
    setCurrentPage(1);
  };

  const clearTargetHighlight = () => {
    setHighlightedMaterialId(null);
    setSpotlightMaterial(null);
    setActiveCategory("all");
    setActiveSubcategory("all");
    setCurrentPage(1);
    navigate("/materiais", { replace: true });
  };

  const availableSubcategories = activeCategory === "videos" 
    ? [
        "Administrativo", "Bancário", "Cível", "Criminal", "Empresarial", "Família", 
        "Holding", "Imobiliário", "Internacional", "LGPD", "Previdenciário", 
        "Saúde", "Trabalhista", "Tributário"
      ]
    : activeCategory === "artigos"
    ? [
        "Criminal", "Holding", "Imobiliário", "Penal e Tributário", 
        "Saúde e Hospitalar", "Trabalhista", "Tributário"
      ]
    : [];

  let filteredResources = activeCategory === "all"
    ? resources
    : resources.filter(item => item.category === activeCategory);

  if ((activeCategory === "videos" || activeCategory === "artigos") && activeSubcategory !== "all") {
    filteredResources = filteredResources.filter(item => item.subcategory === activeSubcategory);
  }

  const paginatedResources = filteredResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "artigos":
        return <BookOpen className="w-4 h-4 text-gdr-beige" />;
      case "ebooks":
        return <FileCode className="w-4 h-4 text-gdr-beige" />;
      case "noticias":
        return <Newspaper className="w-4 h-4 text-gdr-beige" />;
      case "palestras":
        return <Volume2 className="w-4 h-4 text-gdr-beige" />;
      case "publicacoes":
        return <Award className="w-4 h-4 text-gdr-beige" />;
      case "videos":
        return <Play className="w-4 h-4 text-gdr-beige animate-pulse" />;
      default:
        return <BookOpen className="w-4 h-4 text-gdr-beige" />;
    }
  };

  const activeHighlightedMaterial = highlightedMaterialId 
    ? resources.find(m => m.id === highlightedMaterialId) 
    : null;

  return (
    <section id="blog" className="py-20 sm:py-24 bg-white border-b border-gdr-border relative scroll-mt-20">
      {/* Video Modal overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-sm overflow-hidden border border-gdr-beige/30">
            <button 
              onClick={() => setActiveVideo(null)}
              aria-label="Fechar vídeo"
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white hover:text-gdr-dark hover:bg-gdr-beige transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={activeVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      {/* Spotlight Presentation Modal for E-books and Shared Materials */}
      {spotlightMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white border border-gdr-beige shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gdr-dark text-white px-6 py-4 flex items-center justify-between border-b border-gdr-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gdr-beige" />
                <span className="text-[11px] font-mono tracking-widest text-gdr-beige uppercase">
                  Material Recomendado para Você
                </span>
              </div>
              <button 
                onClick={() => setSpotlightMaterial(null)}
                aria-label="Fechar janela"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left: Cover thumbnail (1:1 aspect) */}
                <div className="md:col-span-5">
                  <div className="aspect-square bg-gdr-gray border border-gdr-border relative overflow-hidden shadow-md group">
                    {spotlightMaterial.imageUrl ? (
                      <img
                        src={spotlightMaterial.imageUrl}
                        alt={spotlightMaterial.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-xs font-mono text-gdr-beige uppercase mb-1">
                          [ {spotlightMaterial.categoryLabel || "MATERIAL"} ]
                        </span>
                        <p className="text-[11px] text-gdr-dark/60 font-medium">
                          {spotlightMaterial.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Content details & actions */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] tracking-[0.2em] font-mono uppercase px-2 py-0.5 bg-gdr-beige/15 text-gdr-dark border border-gdr-beige/40">
                        {spotlightMaterial.categoryLabel || "E-book"}
                      </span>
                      {spotlightMaterial.subcategory && (
                        <span className="text-[10px] text-gdr-dark/50 font-sans">
                          • {spotlightMaterial.subcategory}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-gdr-dark font-bold leading-snug">
                      {spotlightMaterial.title}
                    </h3>
                    <p className="text-xs text-gdr-dark/70 font-sans leading-relaxed mt-3">
                      {spotlightMaterial.description}
                    </p>
                  </div>

                  {/* Primary Download / Access Button */}
                  <div className="pt-4 border-t border-gdr-border space-y-2.5">
                    {spotlightMaterial.buttonLink ? (
                      <a
                        href={spotlightMaterial.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gdr-dark text-white hover:bg-gdr-beige hover:text-gdr-dark border border-gdr-dark py-3.5 px-4 text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer text-center"
                      >
                        <Download className="w-4 h-4" />
                        <span>Baixar E-book (PDF)</span>
                      </a>
                    ) : spotlightMaterial.slug ? (
                      <Link
                        to={`/artigo/${spotlightMaterial.slug}`}
                        className="w-full bg-gdr-dark text-white hover:bg-gdr-beige hover:text-gdr-dark border border-gdr-dark py-3.5 px-4 text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer text-center"
                      >
                        <span>Ler Artigo Completo</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : null}

                    {/* Secondary WhatsApp consultation button */}
                    <a
                      href={`https://api.whatsapp.com/send?phone=5548991703667&text=${encodeURIComponent(
                        `Olá! Acessei o material "${spotlightMaterial.title}" no site do GDR e gostaria de tirar uma dúvida jurídica com a equipe.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-700 text-white hover:bg-emerald-800 py-3 px-4 text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Falar com Nossos Advogados</span>
                    </a>

                    {/* Quick share actions inside spotlight */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={(e) => handleCopyLink(spotlightMaterial, e)}
                        className="text-[11px] text-gdr-dark/60 hover:text-gdr-dark flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                      >
                        {copiedId === spotlightMaterial.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Link Direto Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Link deste Material</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSpotlightMaterial(null)}
                        className="text-[11px] text-gdr-beige hover:text-gdr-dark underline underline-offset-4 cursor-pointer font-medium"
                      >
                        Explorar toda a biblioteca
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 border-b border-gdr-border pb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-medium">
            MATERIAIS E CONHECIMENTO JURÍDICO
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans text-gdr-dark font-light mt-2 max-w-2xl leading-tight">
            Educação Corporativa e <br />
            <span className="font-baskerville-italic text-gdr-beige text-4xl sm:text-5xl">
              Materiais Exclusivos
            </span>
          </h2>
          <p className="text-xs text-gdr-dark/60 font-light mt-3 max-w-xl">
            Produzimos ensaios interpretativos, pareceres de conformidade, e-books e seminários práticos como contribuição de valor para a segurança técnica e discernimento de empresários e gestores.
          </p>
        </div>

        {/* Targeted Material Banner (When visiting via direct link) */}
        {activeHighlightedMaterial && (
          <div className="mb-8 p-4 sm:p-5 bg-gdr-beige/15 border border-gdr-beige flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gdr-beige/30 flex items-center justify-center shrink-0 text-gdr-dark">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gdr-dark/60 block">
                  Material Selecionado para Você
                </span>
                <h4 className="text-sm font-serif font-bold text-gdr-dark line-clamp-1">
                  {activeHighlightedMaterial.title}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={(e) => handleCopyLink(activeHighlightedMaterial, e)}
                className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium border border-gdr-border bg-white hover:border-gdr-beige flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === activeHighlightedMaterial.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>
              <button
                onClick={clearTargetHighlight}
                className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium bg-gdr-dark text-white hover:bg-gdr-beige hover:text-gdr-dark transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Ver Todos os Materiais</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Category Filtration Tabs */}
        <div className="flex flex-col space-y-4 mb-10 border-b border-gdr-border pb-6">
          <div className="flex flex-wrap gap-2 justify-start items-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-tab-${cat.id}`}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 font-medium border cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-gdr-dark border-gdr-dark text-white shadow-sm"
                    : "bg-gdr-gray border-gdr-border text-gdr-dark/75 hover:border-gdr-beige hover:bg-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {activeCategory === "videos" && availableSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-start items-center pt-2">
              <span className="text-[10px] text-gdr-dark/50 uppercase tracking-widest mr-2">Assuntos:</span>
              <button
                onClick={() => handleSubcategoryChange("all")}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  activeSubcategory === "all"
                    ? "text-gdr-beige border-gdr-beige bg-gdr-beige/5"
                    : "text-gdr-dark/60 border-transparent hover:border-gdr-border"
                }`}
              >
                Todos
              </button>
              {availableSubcategories.map((sub: string) => (
                <button
                  key={sub}
                  onClick={() => handleSubcategoryChange(sub)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    activeSubcategory === sub
                      ? "text-gdr-beige border-gdr-beige bg-gdr-beige/5"
                      : "text-gdr-dark/60 border-transparent hover:border-gdr-border"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {activeCategory === "artigos" && availableSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-start items-center pt-2">
              <span className="text-[10px] text-gdr-dark/50 uppercase tracking-widest mr-2">Áreas:</span>
              <button
                onClick={() => handleSubcategoryChange("all")}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  activeSubcategory === "all"
                    ? "text-gdr-beige border-gdr-beige bg-gdr-beige/5"
                    : "text-gdr-dark/60 border-transparent hover:border-gdr-border"
                }`}
              >
                Todas
              </button>
              {availableSubcategories.map((sub: string) => (
                <button
                  key={sub}
                  onClick={() => handleSubcategoryChange(sub)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    activeSubcategory === sub
                      ? "text-gdr-beige border-gdr-beige bg-gdr-beige/5"
                      : "text-gdr-dark/60 border-transparent hover:border-gdr-border"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gdr-dark/60">Nenhum material encontrado para esta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedResources.map((item) => {
              const isTargeted = highlightedMaterialId === item.id;
              const directLink = getDirectMaterialUrl(item);

              return (
                <div
                  key={item.id}
                  id={`blog-card-${item.id}`}
                  className={`bg-white border flex flex-col justify-between group transition-all duration-300 relative ${
                    isTargeted
                      ? "border-gdr-beige ring-2 ring-gdr-beige shadow-lg"
                      : "border-gdr-border hover:border-gdr-beige shadow-xs"
                  }`}
                >
                  {/* Spotlight Ribbon for the Targeted Material */}
                  {isTargeted && (
                    <div className="bg-gdr-beige text-gdr-dark px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider flex items-center justify-between border-b border-gdr-beige">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 fill-gdr-dark/20" />
                        Material Selecionado para Você
                      </span>
                      <span className="text-[9px] opacity-75 font-mono">Link Direto</span>
                    </div>
                  )}

                  {/* Thumbnail / Media Container */}
                  <div>
                    {item.slug ? (
                      <Link
                        to={`/artigo/${item.slug}`}
                        className="block w-full aspect-square bg-gdr-gray border-b border-gdr-border relative overflow-hidden transition-all duration-500 group-hover:bg-gdr-gray/40"
                      >
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-center p-4 h-full flex flex-col items-center justify-center">
                            <span className="text-[9px] tracking-[0.2em] font-mono text-gdr-beige uppercase block mb-1">
                              [ ARTIGO ]
                            </span>
                            <span className="text-[8px] text-gdr-dark/30 font-mono block break-all uppercase max-w-[200px] mx-auto leading-relaxed">
                              {item.subcategory || "GDR Advogados"}
                            </span>
                          </div>
                        )}
                      </Link>
                    ) : item.videoEmbed && item.videoEmbed.startsWith("<iframe") ? (
                      <div 
                        className="w-full aspect-video bg-black relative [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:w-full [&>iframe]:h-full"
                        dangerouslySetInnerHTML={{ __html: item.videoEmbed }}
                      />
                    ) : item.videoEmbed && item.videoEmbed.startsWith("http") ? (
                      <div 
                        className="w-full aspect-video bg-gdr-gray border-b border-gdr-border relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-gdr-gray/40 cursor-pointer"
                        onClick={() => setActiveVideo(item.videoEmbed as string)}
                      >
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105 opacity-90"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                          <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm border border-white/20 text-white group-hover:scale-110 group-hover:bg-gdr-beige group-hover:text-gdr-dark group-hover:border-gdr-beige transition-all">
                            <Play className="w-5 h-5 ml-1" />
                          </div>
                        </div>
                      </div>
                    ) : item.buttonLink ? (
                      <div
                        onClick={() => setSpotlightMaterial(item)}
                        className="block w-full aspect-square bg-gdr-gray border-b border-gdr-border relative overflow-hidden transition-all duration-500 group-hover:bg-gdr-gray/40 cursor-pointer"
                      >
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-center p-4 h-full flex flex-col items-center justify-center">
                            <span className="text-[9px] tracking-[0.2em] font-mono text-gdr-beige uppercase block mb-1">
                              [ {item.categoryLabel || "E-BOOK"} ]
                            </span>
                            <span className="text-[8px] text-gdr-dark/30 font-mono block break-all uppercase max-w-[200px] mx-auto leading-relaxed">
                              {item.title}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-gdr-gray border-b border-gdr-border flex items-center justify-center">
                        <span className="text-xs font-mono text-gdr-beige">[ {item.categoryLabel} ]</span>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-[10px] text-gdr-dark/40 font-mono uppercase tracking-widest mb-3">
                        {getCategoryIcon(item.category)}
                        <span>{item.categoryLabel || item.category}</span>
                        {item.readTimeOrDuration && (
                          <>
                            <span>•</span>
                            <span>{item.readTimeOrDuration}</span>
                          </>
                        )}
                      </div>

                      {item.slug ? (
                        <Link to={`/artigo/${item.slug}`} className="block">
                          <h3 className="text-base font-serif font-bold text-gdr-dark group-hover:text-gdr-beige transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                      ) : (
                        <h3 
                          onClick={() => {
                            if (item.category === "videos" && item.videoEmbed) {
                              setActiveVideo(item.videoEmbed);
                            } else {
                              setSpotlightMaterial(item);
                            }
                          }}
                          className="text-base font-serif font-bold text-gdr-dark group-hover:text-gdr-beige transition-colors leading-snug line-clamp-2 cursor-pointer"
                        >
                          {item.title}
                        </h3>
                      )}

                      <p className="text-xs text-gdr-dark/70 font-sans mt-3 line-clamp-3 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Main action + Direct Share Bar */}
                  <div className="px-6 pb-6 pt-2 flex flex-col space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-gdr-dark/45 font-sans pt-2 border-t border-gdr-border">
                      <span className="truncate max-w-[150px]">{item.author || "Gouvêa dos Reis"}</span>
                      <span>{item.date}</span>
                    </div>
                    
                    {/* Primary Button */}
                    {item.slug ? (
                      <Link
                        to={`/artigo/${item.slug}`}
                        className="w-full bg-gdr-dark text-white hover:bg-gdr-beige hover:text-gdr-dark border border-gdr-dark py-2.5 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer text-center"
                      >
                        <span>{item.badge || "Ler Artigo"}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ) : item.buttonLink ? (
                      <button
                        onClick={() => setSpotlightMaterial(item)}
                        className="w-full bg-gdr-dark text-white hover:bg-gdr-beige hover:text-gdr-dark border border-gdr-dark py-2.5 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer text-center"
                      >
                        <Download className="w-3 h-3" />
                        <span>{item.badge || "Baixar E-book"}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : item.category === "videos" && item.videoEmbed ? (
                      <button
                        onClick={() => setActiveVideo(item.videoEmbed as string)}
                        className="w-full bg-gdr-gray hover:bg-gdr-dark hover:text-white border border-gdr-border group-hover:border-gdr-beige py-2.5 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{item.badge || "Assistir Vídeo"}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setSpotlightMaterial(item)}
                        className="w-full bg-gdr-gray hover:bg-gdr-dark hover:text-white border border-gdr-border group-hover:border-gdr-beige py-2.5 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer"
                      >
                        <span>{item.badge || "Ver Detalhes"}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}

                    {/* Direct Sharing Bar for sending this exact material to clients */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={(e) => handleCopyLink(item, e)}
                        title="Copiar link direto para este material"
                        className={`py-1.5 px-2 text-[10px] font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          copiedId === item.id
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold"
                            : "bg-gdr-gray border-gdr-border text-gdr-dark/70 hover:border-gdr-beige hover:text-gdr-dark hover:bg-white"
                        }`}
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar Link</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleShareWhatsApp(item, e)}
                        title="Compartilhar material diretamente no WhatsApp do cliente"
                        className="py-1.5 px-2 text-[10px] font-medium border border-emerald-600/30 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600 group-hover:text-white" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium border border-gdr-border bg-white text-gdr-dark disabled:opacity-50 disabled:cursor-not-allowed hover:border-gdr-beige transition-colors cursor-pointer"
            >
              Anterior
            </button>
            <span className="text-xs text-gdr-dark/60 font-mono px-4">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium border border-gdr-border bg-white text-gdr-dark disabled:opacity-50 disabled:cursor-not-allowed hover:border-gdr-beige transition-colors cursor-pointer"
            >
              Próxima
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
