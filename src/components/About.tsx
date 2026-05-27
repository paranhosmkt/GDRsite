import React, { useState, useEffect } from "react";
import { History, ShieldCheck, UserCheck, HeartHandshake, Scale } from "lucide-react";
import { getPageAssets, getSanityImageUrl } from "../lib/sanity";

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const [aboutImage, setAboutImage] = useState("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200");

  useEffect(() => {
    getPageAssets().then((assets) => {
      if (assets?.aboutImage) {
        setAboutImage(getSanityImageUrl(assets.aboutImage));
      }
    });
  }, []);

  const pillars = [
    {
      title: "Histórico",
      icon: <History className="w-5 h-5" />,
      description: "Atuação sólida e ininterrupta na advocacia pioneira e Full Service desde 1967. Aliamos quase seis décadas de experiência jurídica provada à agilidade tecnológica indispensável para subsidiar decisões críticas contemporâneas."
    },
    {
      title: "Missão",
      icon: <ShieldCheck className="w-5 h-5" />,
      description: "Guiar nossos clientes sob preceitos inflexíveis de segurança técnica, clareza máxima em todas as manifestações processuais e uma parceria de total comprometimento estratégico com seus interesses."
    },
    {
      title: "Liderança",
      icon: <UserCheck className="w-5 h-5" />,
      description: "Sob a condução executiva direta de Murilo Gouvêa dos Reis (Sócio-Diretor), o escritório consolidou políticas rigorosas de excelência de gestão, centralidade no cliente e discrição absoluta de alto padrão."
    },
    {
      title: "Proposta de valor",
      icon: <HeartHandshake className="w-5 h-5" />,
      description: "Fornecer presença consultiva permanente, estratégia jurídica altamente refinada e uma humanidade atenciosa e disciplinada nas relações de suporte para empresas, famílias e indivíduos."
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-gdr-gray border-y border-gdr-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Editorial Title Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-4 border-l-2 border-gdr-beige pl-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-medium font-sans">
              QUEM SOMOS (TRADIÇÃO E FUTURO)
            </span>
            <h2 className="text-3xl font-sans text-gdr-dark font-light mt-2 leading-tight">
              Mais de meio século <br />
              <span className="font-baskerville-italic text-gdr-beige text-4xl">
                lapidando a advocacia
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-8">
            <p className="text-lg text-gdr-dark leading-relaxed font-light mb-6">
              Fundado há mais de <span className="font-semibold text-gdr-dark">57 anos</span>, o escritório 
              <span className="font-semibold font-cinzel tracking-widest text-[#0e0e0e] ml-1">Gouvêa dos Reis Advogados</span> se consolidou como um selo de excelência e segurança jurídica oferecendo advocacia Full Service para empresas, grupos de relevo e clientes individuais estratégicos.
            </p>
            <p className="text-sm text-gdr-dark/70 leading-relaxed font-light">
              Nossa trajetória é fundamentada na união perfeita entre o conhecimento jurídico clássico acumulado ao longo de décadas e uma sensibilidade pragmática voltada às demandas contemporâneas. Acreditamos que a melhor advocacia Full Service não apenas resolve disputas, mas estuda e pacifica cenários complexos para proporcionar decisões definitivas com clareza máxima.
            </p>
          </div>
        </div>

        {/* Feature Layout (Two-Column Interactive Area) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-stretch">
          
          {/* Descriptive text for active tab */}
          <div className="lg:col-span-7 bg-white border border-gdr-beige p-8 md:p-12 flex flex-col justify-between relative shadow-sm">
            {/* Structural corner decoration */}
            <div className="absolute top-0 right-0 w-8 h-[1px] bg-gdr-beige" />
            <div className="absolute top-0 right-0 w-[1px] h-8 bg-gdr-beige" />
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-gdr-beige">
                {pillars[activeTab].icon}
                <span className="text-xs uppercase tracking-widest font-semibold font-sans text-gdr-dark">
                  Pilar de Excelência GDR
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-sans text-gdr-dark font-light leading-snug">
                Nossa diretriz em <span className="font-baskerville-italic text-gdr-beige font-semibold">{pillars[activeTab].title}</span>
              </h3>
              
              <p className="text-sm text-gdr-dark/75 font-light leading-relaxed">
                {pillars[activeTab].description}
              </p>
            </div>

            <div className="border-t border-gdr-border mt-8 pt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-gdr-beige" />
                <span className="font-sans text-[10px] uppercase text-gdr-dark/50 tracking-widest">
                  GOUVÊA DOS REIS ADVOGADOS — DESDE 1967
                </span>
              </div>
              <span className="font-cinzel text-xs text-gdr-beige">0{activeTab + 1} / 04</span>
            </div>
          </div>

          {/* Tab Selection Area */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gdr-dark font-semibold mb-2">
              Nossa Filosofia de Gestão:
            </h4>
            
            <div className="space-y-3">
              {pillars.map((pillar, idx) => (
                <button
                  key={idx}
                  id={`pilar-btn-${idx}`}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-5 transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                    activeTab === idx
                      ? "bg-gdr-dark border-gdr-dark text-white"
                      : "bg-white border-gdr-border text-gdr-dark hover:border-gdr-beige"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`text-xs font-cinzel ${activeTab === idx ? "text-gdr-beige" : "text-gdr-dark/40"}`}>
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm tracking-wide font-medium font-sans">
                      {pillar.title}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full transition-transform duration-300 ${activeTab === idx ? "bg-gdr-beige text-gdr-dark rotate-90" : "bg-gdr-gray text-gdr-dark/40"}`}>
                    {pillar.icon}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Full-width premium architectural image insert */}
        <div className="mt-16 relative w-full h-[240px] md:h-[280px] overflow-hidden border border-gdr-beige/30 shadow-xs">
          <img
            src={aboutImage}
            alt="Biblioteca Jurídica GDR"
            className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:scale-101 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gdr-dark/65 via-transparent to-transparent flex items-center p-8">
            <div className="max-w-md text-white space-y-2">
              <span className="text-[9px] tracking-[0.3em] text-gdr-beige font-semibold uppercase block">
                REUNIÃO CONSELHEIRA
              </span>
              <h3 className="text-xl font-sans font-light leading-snug">
                Estruturados para alinhar objetivos estratégicos e segurança técnica absoluta com atendimento personalizado.
              </h3>
            </div>
          </div>
        </div>

        {/* Historical Timeline Milestone Summary Line */}
        <div className="mt-20 pt-12 border-t border-gdr-beige/40 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <div className="font-cinzel text-3xl text-gdr-dark font-light md:text-4xl">1967</div>
            <div className="text-[10px] uppercase text-gdr-dark/60 tracking-widest mt-1">Fundação do Escritório</div>
          </div>
          <div>
            <div className="font-cinzel text-3xl text-gdr-dark font-light md:text-4xl">+12.000</div>
            <div className="text-[10px] uppercase text-gdr-dark/60 tracking-widest mt-1">Processos Conduzidos</div>
          </div>
          <div>
            <div className="font-cinzel text-3xl text-gdr-dark font-light md:text-4xl">98%</div>
            <div className="text-[10px] uppercase text-gdr-dark/60 tracking-widest mt-1">Indicação Corporativa</div>
          </div>
          <div>
            <div className="font-cinzel text-3xl text-gdr-dark font-light md:text-4xl">57+ Anos</div>
            <div className="text-[10px] uppercase text-gdr-dark/60 tracking-widest mt-1">De Atuação Consecutiva</div>
          </div>
        </div>

      </div>
    </section>
  );
}
