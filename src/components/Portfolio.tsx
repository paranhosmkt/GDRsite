import React, { useState, useEffect } from "react";
import { CLIENT_SECTORS } from "../data";
import { ChevronRight, ShieldCheck, Trophy, Layers, Target, Coins } from "lucide-react";
import { getPortfolioCases } from "../lib/sanity";
import { ClientSector } from "../types";

export default function Portfolio() {
  const [portfolioCases, setPortfolioCases] = useState<ClientSector[]>(CLIENT_SECTORS);

  useEffect(() => {
    getPortfolioCases().then((data) => {
      // Validate that we got a populated array
      if (data && data.length > 0) {
        setPortfolioCases(data);
      }
    });
  }, []);

  // Icon mapping for the 8 specific corporate portfolios for rich aesthetics
  const getSectorIcon = (id: string) => {
    switch (id) {
      case "pagamento-variavel":
        return <Coins className="w-5 h-5 text-gdr-beige" />;
      case "reforma-tributaria":
        return <Layers className="w-5 h-5 text-gdr-beige" />;
      case "nr-1":
        return <ShieldCheck className="w-5 h-5 text-gdr-beige" />;
      case "lgpd-compliance":
        return <ShieldCheck className="w-5 h-5 text-gdr-beige" />;
      case "penal-empresarial":
        return <Target className="w-5 h-5 text-gdr-beige" />;
      case "holding-patrimonial":
        return <Trophy className="w-5 h-5 text-gdr-beige" />;
      case "gestao-passivos":
        return <Coins className="w-5 h-5 text-gdr-beige" />;
      case "blindagem-trabalhista":
        return <ShieldCheck className="w-5 h-5 text-gdr-beige" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-gdr-beige" />;
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-gdr-gray border-y border-gdr-border relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Title Header */}
        <div className="text-center md:text-left mb-16 border-b border-gdr-border pb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-medium">
            PORTFÓLIO INSTITUCIONAL & COMPLIANCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans text-gdr-dark font-light mt-2 max-w-2xl leading-tight">
            Nossos Projetos de Representação & <br />
            <span className="font-baskerville-italic text-gdr-beige text-4xl sm:text-5xl border-b border-gdr-border/30 pb-2">
              Casos de Negócios
            </span>
          </h2>
          <p className="text-xs text-gdr-dark/60 font-light mt-3 max-w-xl">
            Em total observância aos preceitos éticos estabelecidos pela OAB, resguardamos com sigilo rigoroso a identidade de nossos parceiros e grupos corporativos. Apresentamos abaixo um detalhamento analítico de nossos casos de sucesso.
          </p>
        </div>

        {/* Sectors Display Bento Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 animate-in fade-in duration-700">
          {portfolioCases.map((sector) => (
            <div
              key={sector.id}
              id={`portfolio-sector-${sector.id}`}
              className="bg-white border border-gdr-border p-8 relative hover:border-gdr-beige transition-all duration-300 group shadow-xs flex flex-col justify-between"
            >
              {/* Custom border style decoration */}
              <div className="absolute top-0 left-0 w-[2px] h-6 bg-gdr-beige transition-all group-hover:h-full duration-500" />
              <div className="absolute top-0 left-0 w-6 h-[2px] bg-gdr-beige transition-all group-hover:w-full duration-500" />

              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 border border-gdr-border bg-gdr-gray group-hover:bg-gdr-dark group-hover:text-white transition-colors duration-300">
                    {getSectorIcon(sector.id)}
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gdr-dark/50">
                    SOLUÇÃO ESTRATÉGICA
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-sans font-medium text-gdr-dark group-hover:text-gdr-beige transition-colors duration-300">
                  {sector.name}
                </h3>
                
                <p className="text-[11px] text-gdr-dark/55 italic leading-relaxed">
                  <strong>Foco Operacional:</strong> {sector.representativeness}
                </p>
                
                <p className="text-xs text-gdr-dark/75 font-light leading-relaxed">
                  {sector.description}
                </p>
              </div>

              {/* Sub features request list */}
              {sector.highlights && sector.highlights.length > 0 && (
                <div className="border-t border-gdr-border/60 mt-6 pt-4 space-y-2">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                    Atividades e Medidas Práticas:
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sector.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] uppercase tracking-widest bg-gdr-gray border border-gdr-beige/40 text-gdr-dark/90 px-2 py-1 font-sans"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Button */}
              {(sector.buttonLabel || sector.buttonLink) && (
                <div className="mt-6 pt-4 border-t border-gdr-border/60">
                  {sector.buttonLink ? (
                    <a
                      href={sector.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gdr-gray hover:bg-gdr-dark hover:text-white border border-gdr-border group-hover:border-gdr-beige py-2 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer text-center"
                    >
                      <span>{sector.buttonLabel || "Acessar Caso"}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <button className="w-full bg-gdr-gray hover:bg-gdr-dark hover:text-white border border-gdr-border group-hover:border-gdr-beige py-2 px-3 text-[10px] uppercase font-semibold tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-300 cursor-pointer">
                      <span>{sector.buttonLabel}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
