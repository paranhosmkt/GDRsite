import React from "react";
import { Zap, ShieldAlert, Cpu, HeartHandshake, Eye } from "lucide-react";

export default function KeyFeatures() {
  const highlights = [
    {
      title: "Conselheiros Executivos",
      icon: <HeartHandshake className="w-5 h-5 text-gdr-beige" />,
      tagline: "Proximidade Real",
      description: "Nosso atendimento é realizado diretamente pelos sócios seniores. Cada conta corporativa conta com um comitê fixo de tomadores de decisão jurídicos dedicados, evitando burocracias hierárquicas."
    },
    {
      title: "Combate & Prontidão 24/7",
      icon: <ShieldAlert className="w-5 h-5 text-gdr-beige" />,
      tagline: "Resposta Imediata",
      description: "Sistemas complexos, fiscalizações fiscais surpresa ou mandados urgentes não esperam pelo horário comercial. Dispomos de um canal de atuação emergencial ininterrupto para mitigar riscos extremos."
    },
    {
      title: "Pragmática Multidisciplinar",
      icon: <Cpu className="w-5 h-5 text-gdr-beige" />,
      tagline: "Foco no Resultado",
      description: "Não geramos laudos ambíguos. Nossas avaliações são claras, assertivas e quantificadas em probabilidades matemáticas de ganho técnico ou impacto financeiro direto para o balanço de sua empresa."
    }
  ];

  return (
    <section id="diferenciais" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16 pb-8 border-b border-gdr-border">
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-semibold block font-sans">
              ATRIBUTOS DE DISTINÇÃO
            </span>
            <h2 className="text-3xl font-sans text-gdr-dark font-light mt-2 leading-tight">
              A diferença entre representar e <br />
              <span className="font-baskerville-italic text-gdr-beige text-4xl">
                 gerar valor estratégico
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-7">
            <p className="text-xs md:text-sm text-gdr-dark/65 font-light leading-relaxed">
              Nosso escritório entende que no nível de alta diretoria corporativa, segurança jurídica é premissa, não diferencial. Nos distinguimos pela velocidade, sensibilidade aos objetivos de negócios e capacidade única de estruturar saídas seguras para desafios com aparente impasse insolúvel.
            </p>
          </div>
        </div>

        {/* Highlight panels list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              id={`highlight-block-${idx}`}
              className="bg-gdr-gray border border-gdr-border hover:border-gdr-beige p-8 relative flex flex-col justify-between transition-all duration-300 group shadow-sm"
            >
              {/* Internal decorative line accent */}
              <div className="absolute top-0 right-0 w-6 h-[1px] bg-gdr-beige" />
              <div className="absolute top-0 right-0 w-[1px] h-6 bg-gdr-beige" />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 border border-gdr-beige bg-white">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-gdr-beige tracking-[0.25em] font-semibold uppercase">
                    {item.tagline}
                  </span>
                </div>

                <h3 className="text-base font-semibold tracking-wide text-gdr-dark font-sans pt-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gdr-dark/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="border-t border-gdr-border/65 mt-6 pt-4 flex items-center justify-between text-[10px] tracking-widest text-gdr-dark/45 uppercase">
                <span>CONFIANÇA GDR</span>
                <span className="font-cinzel text-gdr-beige">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
