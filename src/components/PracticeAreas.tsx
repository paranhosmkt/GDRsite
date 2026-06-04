import React, { useState, useEffect } from "react";
import { PRACTICE_AREAS } from "../data";
import { PracticeArea } from "../types";
import { Check, ChevronRight, FileText, Scale } from "lucide-react";
import { getPracticeAreas } from "../lib/sanity";

export default function PracticeAreas() {
  const [areas, setAreas] = useState<PracticeArea[]>(PRACTICE_AREAS);
  const [selectedAreaId, setSelectedAreaId] = useState<string>(PRACTICE_AREAS[0].id);

  useEffect(() => {
    getPracticeAreas().then((data) => {
      if (data && data.length > 0) {
        setAreas(data);
        // Ensure state points to a valid selected id
        if (!data.some((a) => a.id === selectedAreaId)) {
          setSelectedAreaId(data[0].id);
        }
      }
    });
  }, []);

  const selectedArea = areas.find((area) => area.id === selectedAreaId) || areas[0] || PRACTICE_AREAS[0];

  return (
    <section id="atuacao" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center md:text-left mb-16 border-b border-gdr-border pb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-medium">
            ÁREAS DE ESPECIALIDADE (FULL SERVICE)
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans text-gdr-dark font-light mt-2 max-w-2xl leading-tight">
            Áreas de Atuação Integrada e <br />
            <span className="font-baskerville-italic text-gdr-beige text-4xl sm:text-5xl">
              Soluções Sob Demanda
            </span>
          </h2>
          <p className="text-xs text-gdr-dark/60 font-light mt-3 max-w-xl">
            Clique em cada especialidade listada abaixo para examinar detalhadamente nossas frentes de intervenção, diagnósticos inteligentes e consultorias estratégicas regulamentares.
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Menu list of areas */}
          <div className="lg:col-span-5 space-y-2.5">
            {areas.map((area) => {
              const isActive = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  id={`area-tab-${area.id}`}
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`w-full text-left p-6 transition-all duration-300 border flex items-center justify-between cursor-pointer relative ${
                    isActive
                      ? "bg-gdr-dark border-gdr-dark text-white translate-x-2 pl-8"
                      : "bg-gdr-gray border-gdr-border text-gdr-dark hover:bg-white hover:border-gdr-beige hover:translate-x-1"
                  }`}
                >
                  {/* Active highlight side element */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gdr-beige" />
                  )}
                  
                  <div className="space-y-1 pr-4">
                    <h3 className="text-sm font-semibold tracking-wide font-sans">
                      {area.title}
                    </h3>
                    <p className={`text-[11px] line-clamp-1 font-light ${isActive ? "text-gdr-beige" : "text-gdr-dark/60"}`}>
                      {area.description}
                    </p>
                  </div>
                  
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? "text-gdr-beige translate-x-1" : "text-gdr-dark/45"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep detail inspection panel of active area */}
          <div className="lg:col-span-7 bg-white border border-gdr-beige p-8 md:p-10 relative shadow-sm min-h-[500px] flex flex-col justify-between">
            {/* Corner visual embellishments */}
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-[1px] bg-gdr-beige" />
              <div className="absolute top-0 right-0 w-[1px] h-12 bg-gdr-beige" />
            </div>

            <div className="space-y-8">
              
              {/* Header inside detail block */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gdr-beige">
                  <Scale className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-sans font-medium text-gdr-dark/50">
                    EXAME DETALHADO DA MATÉRIA
                  </span>
                </div>
                
                <h3 className="text-2xl font-sans text-gdr-dark font-light leading-snug">
                  {selectedArea.title}
                </h3>
                
                <div className="w-16 h-[2px] bg-gdr-beige mt-2" />
              </div>

              {/* Explanatory detail prose */}
              <div className="space-y-4">
                <p className="text-sm text-gdr-dark/90 font-medium leading-relaxed italic">
                  &ldquo;{selectedArea.description}&rdquo;
                </p>
                <p className="text-xs md:text-sm text-gdr-dark/70 font-light leading-relaxed">
                  {selectedArea.extendedDescription}
                </p>
              </div>

              {/* Bullet list of "Como Atuamos" with premium bullet styles */}
              <div className="space-y-4 border-t border-gdr-border pt-6">
                <h4 className="text-xs uppercase tracking-widest text-gdr-dark font-semibold">
                  Como Atuamos / Linhas de Força:
                </h4>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedArea.howWeAct && selectedArea.howWeAct.map((action, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <div className="p-1 border border-gdr-beige bg-gdr-gray text-gdr-dark shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-gdr-dark/80 font-light leading-tight">
                        {action}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Floating help CTA */}
            <div className="border-t border-gdr-border mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-gdr-dark/40 font-sans text-[10px] tracking-widest">
                <FileText className="w-3.5 h-3.5" />
                <span>MEIO SÉCULO GARANTINDO SOLUÇÕES TÉCNICAS EFICAZES.</span>
              </div>
              <a
                href="#contato"
                className="text-xs uppercase tracking-widest font-semibold hover:text-gdr-beige transition-colors flex items-center space-x-1 underline"
              >
                <span>Saber mais</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
