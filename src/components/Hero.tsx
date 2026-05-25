import React, { useState, useEffect } from "react";
import { ArrowDown, Flame, Shield, Award } from "lucide-react";
import { getPageTexts } from "../lib/sanity";

interface HeroProps {
  onLearnMore: () => void;
  onContact: () => void;
}

export default function Hero({ onLearnMore, onContact }: HeroProps) {
  const [heroTitle, setHeroTitle] = useState("Segurança para avançar. Clareza para decidir. Parceria para crescer.");

  useEffect(() => {
    getPageTexts().then((texts) => {
      if (texts && texts.hero_title) {
        setHeroTitle(texts.hero_title);
      }
    });
  }, []);

  const sentences = heroTitle.split(".").map((s) => s.trim()).filter(Boolean);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white pt-36 sm:pt-40 lg:pt-44 pb-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Editorial delicate background grid (golden geometry line assets) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-gdr-beige to-transparent" />
        <div className="absolute top-0 left-2/3 w-[1px] h-full bg-gradient-to-b from-gdr-beige to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gdr-beige to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gdr-beige to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Copy Area */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
            <div>
              {/* Subtle gold badge */}
              <div className="inline-flex items-center space-x-2 bg-gdr-gray border border-gdr-border px-3.5 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-gdr-beige animate-pulse" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-gdr-dark/80 font-semibold font-sans">
                  Atuando há mais de 57 anos na advocacia
                </span>
              </div>
 
              {/* Sophisticated dual typography title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans text-gdr-dark font-light leading-[1.35] tracking-tight">
                {sentences.map((sentence, idx) => {
                  const words = sentence.split(" ");
                  if (words.length > 1) {
                    const lastWord = words.pop();
                    const remaining = words.join(" ");
                    return (
                      <React.Fragment key={idx}>
                        {remaining} <span className="font-baskerville-italic text-gdr-beige">{lastWord}</span>.
                        {idx < sentences.length - 1 && <br />}
                      </React.Fragment>
                    );
                  }
                  return (
                    <React.Fragment key={idx}>
                      {sentence}.
                      {idx < sentences.length - 1 && <br />}
                    </React.Fragment>
                  );
                })}
              </h1>
            </div>

            {/* Explanatory subtitle */}
            <p className="text-xs sm:text-sm text-gdr-dark/70 font-light max-w-lg leading-relaxed">
              O Gouvêa dos Reis Advogados consolida uma trajetória impecável unindo rigor analítico, discrição absoluta e soluções jurídicas sob medida para viabilizar decisões vitais ao setor corporativo.
            </p>
 
            {/* Hero CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                id="hero-cta-atuacao"
                onClick={onLearnMore}
                className="bg-gdr-dark hover:bg-gdr-beige hover:text-gdr-dark text-white text-[10px] sm:text-xs uppercase tracking-widest font-semibold py-3.5 px-6 border border-gdr-dark flex items-center justify-center space-x-2 transition-all duration-300 transition-colors cursor-pointer"
              >
                <span>Nossa Atuação</span>
              </button>
              <button
                id="hero-cta-reuniao"
                onClick={onContact}
                className="bg-transparent hover:bg-gdr-gray text-gdr-dark text-[10px] sm:text-xs uppercase tracking-widest font-semibold py-3.5 px-6 border border-gdr-beige flex items-center justify-center space-x-2 transition-all duration-300 transition-colors cursor-pointer"
              >
                <span>Contato</span>
              </button>
            </div>
          </div>
 
          {/* Premium Architectural Frame on Right Side */}
          <div className="lg:col-span-6 relative self-center">
            <div className="absolute inset-0 border border-gdr-beige/40 translate-x-4 translate-y-4 pointer-events-none" />
            
            <div className="relative aspect-[4/5] w-full border border-gdr-dark/10 bg-gdr-gray overflow-hidden shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                alt="Sede Corporate Gouvêa dos Reis"
                className="w-full h-full object-cover grayscale opacity-95 transition-all duration-750 group-hover:scale-105 group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Down indicators */}
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center text-xs text-gdr-dark/50 tracking-widest uppercase relative z-10">
        <span className="font-sans text-[10px]">Gouvêa dos Reis Advogados</span>
        <button
          onClick={onLearnMore}
          className="flex items-center space-x-2 text-gdr-dark hover:text-gdr-beige transition-colors group cursor-pointer"
        >
          <span>Role para Explorar</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
