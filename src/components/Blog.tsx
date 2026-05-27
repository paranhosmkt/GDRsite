import React, { useState, useEffect } from "react";
import { BookOpen, FileCode, Play, Award, Volume2, Newspaper, ChevronRight } from "lucide-react";
import { getMaterials, SanityMaterial } from "../lib/sanity";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [resources, setResources] = useState<SanityMaterial[]>([]);

  useEffect(() => {
    getMaterials().then((data) => {
      if (data && data.length > 0) {
        setResources(data);
      }
    });
  }, []);

  const categories = [
    { id: "all", label: "Todos os Recursos" },
    { id: "artigos", label: "Artigos" },
    { id: "ebooks", label: "E-books" },
    { id: "noticias", label: "Notícias" },
    { id: "palestras", label: "Palestras" },
    { id: "publicacoes", label: "Publicações" },
    { id: "videos", label: "Vídeos" }
  ];

  const filteredResources = activeCategory === "all"
    ? resources
    : resources.filter(item => item.category === activeCategory);

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

  return (
    <section id="blog" className="py-24 bg-white border-b border-gdr-border relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 border-b border-gdr-border pb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-medium">
            CONTEÚDO ACADÊMICO & RECURSOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans text-gdr-dark font-light mt-2 max-w-2xl leading-tight">
            Educação Corporativa e <br />
            <span className="font-baskerville-italic text-gdr-beige text-4xl sm:text-5xl">
              Materiais Exclusivos
            </span>
          </h2>
          <p className="text-xs text-gdr-dark/60 font-light mt-3 max-w-xl">
            Produzimos ensaios interpretativos, pareceres de conformidade e seminários práticos como contribuição de valor para a segurança técnica e discernimento mercadológico de sócios.
          </p>
        </div>

        {/* Category Filtration Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 justify-start items-center border-b border-gdr-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
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

        {/* Resources Grid layout */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-gdr-gray border border-gdr-border">
            <span className="text-xs text-gdr-dark/50 font-mono uppercase tracking-widest">Aguardando novos materiais para esta modalidade.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                id={`blog-card-${item.id}`}
                className="bg-white border border-gdr-border hover:border-gdr-beige flex flex-col justify-between group transition-all duration-300 shadow-xs"
              >
                {/* Visual Image Placeholder Slot */}
                <div className="aspect-[16/10] bg-gdr-gray border-b border-gdr-border relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-gdr-gray/40">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-radial from-gdr-dark/5 to-transparent pointer-events-none" />
                      
                      {/* Decorative corner markers */}
                      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-gdr-beige/40" />
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-gdr-beige/40" />
                      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-gdr-beige/40" />
                      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-gdr-beige/40" />

                      {/* Icon + Label */}
                      <div className="text-center p-4">
                        <span className="text-[9px] tracking-[0.2em] font-mono text-gdr-beige uppercase block mb-1">
                          [ INSERIR IMAGEM ]
                        </span>
                        <span className="text-[8px] text-gdr-dark/30 font-mono block break-all uppercase max-w-[200px] mx-auto leading-relaxed">
                          {item.id === "r1" ? "manual_holdings_gdr.jpg" : 
                           item.id === "r2" ? "reforma_tributaria_dividendos.jpg" :
                           item.id === "r3" ? "compliance_trabalhista_industrias.jpg" :
                           item.id === "r4" ? "governanca_esg_incorporacao.jpg" :
                           item.id === "r5" ? "privacy_by_design_lgpd.jpg" :
                           "sede_executiva_florianopolis.jpg"}
                        </span>
                      </div>

                      {/* Fallback pattern to show it is a content placeholder ready for production or Sanity integration */}
                      <div className="absolute bottom-2 right-3 text-[7.5px] font-mono text-gdr-dark/30 uppercase tracking-widest">
                        16:10 ratio
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    {/* Category Identifier */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 border border-gdr-beige bg-gdr-gray shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-gdr-beige font-semibold">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <span className="text-[10px] text-gdr-dark/45 font-mono">
                        {item.readTimeOrDuration}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2 text-left">
                      <h4 className="text-base font-sans font-medium text-gdr-dark leading-snug group-hover:text-gdr-beige transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gdr-dark/70 font-light leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                  </div>

                  {/* Footer specs inside card */}
                  <div className="mt-6 pt-4 border-t border-gdr-border flex flex-col space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-gdr-dark/45 font-sans">
                      <span>{item.author}</span>
                      <span>{item.date}</span>
                    </div>
                    
                    {item.buttonLink ? (
                      <a
                        href={item.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gdr-gray hover:bg-gdr-dark hover:text-white border border-gdr-border group-hover:border-gdr-beige py-2 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer text-center"
                      >
                        <span>{item.badge}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <button
                        className="w-full bg-gdr-gray hover:bg-gdr-dark hover:text-white border border-gdr-border group-hover:border-gdr-beige py-2 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer"
                      >
                        <span>{item.badge}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
