import React from "react";
import { ShieldAlert } from "lucide-react";

export default function ContactForm() {
  return (
    <section id="contato" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Informational Text Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-l-2 border-gdr-beige pl-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-medium">
                ATENDIMENTO SOB MEDIDA
              </span>
              <h2 className="text-3xl font-sans text-gdr-dark font-light mt-2 leading-tight">
                Inicie uma <br />
                <span className="font-baskerville-italic text-gdr-beige text-4xl">
                  reunião consultiva
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gdr-dark/70 font-light leading-relaxed">
              <p>
                As relações corporativas demandam rapidez e extremo rigor processual. Nossa equipe está pronta para direcioná-lo imediatamente ao sócio especializado em seu setor de operação.
              </p>
              <p>
                Garantimos total integridade de seus dados sob nossa infraestrutura corporativa privada de segurança jurídica preventiva.
              </p>
            </div>

            {/* Support notes */}
            <div className="border border-gdr-beige bg-gdr-gray/40 p-6 relative">
              <div className="flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-gdr-beige shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-gdr-dark">
                    Acordo de Confidencialidade (NDA)
                  </h4>
                  <p className="text-[11px] text-gdr-dark/55 leading-relaxed">
                    Se desejado por sua corporação, podemos assinar um acordo de sigilo (NDA) formal antes da exposição profunda ou do envio de documentos estratégicos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Column */}
          <div className="lg:col-span-7">
            <div className="border border-gdr-beige bg-gdr-gray p-8 sm:p-12 relative shadow-sm flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
              
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#25D366] text-[#25D366] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-8 h-8 fill-current"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </div>

              <h3 className="text-2xl font-sans font-light text-gdr-dark">
                Atendimento via <span className="font-baskerville-italic text-[#25D366]">WhatsApp</span>
              </h3>
              
              <p className="text-xs text-gdr-dark/65 max-w-md leading-relaxed">
                Entre em contato diretamente pelo WhatsApp para um atendimento ágil e personalizado. Nossa equipe está pronta para direcionar sua demanda ao profissional mais qualificado.
              </p>

              <div className="pt-4">
                <a
                  href="https://wa.me/554832229696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 px-8 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans text-[11px] font-bold uppercase tracking-widest py-4 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 fill-current shrink-0"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <span>Entrar em Contato</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
