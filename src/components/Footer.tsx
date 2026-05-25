import React, { useState, useEffect } from "react";
import { OFFICE_ADDRESSES, CERTIFICATES } from "../data";
import { Mail, Phone, Clock, Landmark, ShieldCheck, Award } from "lucide-react";
import { getPageAssets, getSanityImageUrl, SanitySeal, getOfficeAddresses } from "../lib/sanity";
import { OfficeAddress } from "../types";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [seals, setSeals] = useState<SanitySeal[]>([]);
  const [addresses, setAddresses] = useState<OfficeAddress[]>(OFFICE_ADDRESSES);

  useEffect(() => {
    getPageAssets().then((assets) => {
      if (assets) {
        if (assets.footerLogo) {
          const fLogo = getSanityImageUrl(assets.footerLogo);
          if (fLogo) {
            setLogoUrl(fLogo);
          }
        }
        if (assets.seals && assets.seals.length > 0) {
          setSeals(assets.seals);
        }
      }
    });

    getOfficeAddresses().then((data) => {
      if (data && data.length > 0) {
        setAddresses(data);
      }
    });
  }, []);

  return (
    <footer id="gdr-footer" className="bg-gdr-dark text-white pt-24 pb-12 relative overflow-hidden border-t-2 border-gdr-beige/40">
      
      {/* Decorative texture lines representing absolute engineering precision */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white" />
        <div className="absolute top-0 right-2/3 w-[1px] h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* SECTOR A: SEALS AND CERTIFICATES (9 SELOS DO ESCRITÓRIO) */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="text-center md:text-left mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-beige font-semibold">
              ACREDITAÇÕES & CHANCELAS INSTITUCIONAIS
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-light text-white mt-1">
              Origem & Reconhecimentos Oficiais
            </h3>
            <p className="text-[11px] text-white/50 font-light mt-1 max-w-sm">
              Espaço reservado para as chancelas de outorgas e certificações que atestam mais de 50 anos de história de excelência da GDR.
            </p>
          </div>

          {/* 9 Seals Grid - small size as requested */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
            {Array.from({ length: 9 }).map((_, index) => {
              const customSeal = seals[index];
              const customImageUrl = customSeal ? getSanityImageUrl(customSeal.image) : null;
              
              return (
                <div
                  key={index}
                  id={`footer-seal-${index + 1}`}
                  className="bg-white/5 border border-dashed border-white/20 hover:border-gdr-beige/60 p-4 aspect-square flex flex-col items-center justify-center transition-all duration-300 relative group rounded-sm select-none"
                >
                  {/* Micro ornament */}
                  <div className="absolute top-1 left-1 w-1.5 h-[1px] bg-gdr-beige/20 group-hover:bg-gdr-beige" />
                  <div className="absolute top-1 left-1 w-[1px] h-1.5 bg-gdr-beige/20 group-hover:bg-gdr-beige" />

                  {customImageUrl ? (
                    <img
                      src={customImageUrl}
                      alt={customSeal.label || `Selo ${index + 1}`}
                      className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center space-y-1">
                      <span className="text-[8px] uppercase tracking-wider text-gdr-beige font-mono leading-none">
                         {customSeal?.label || `SELO ${index + 1}`}
                      </span>
                      <span className="text-[6px] text-white/40 block leading-none font-mono tracking-widest uppercase mt-1">
                        selo_gdr_0{index + 1}.png
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTOR B: ADDRESSES AND BRANCHES (ENDEREÇOS / UNIDADES FÍSICAS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-16 mb-16">
          
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Actual Logo Image Placeholder Slot */}
              {logoUrl ? (
                <div className="max-w-[480px] group">
                  <img
                    src={logoUrl}
                    alt="Gouvêa dos Reis Advogados"
                    className="max-h-32 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="border border-dashed border-white/20 p-8 bg-white/5 flex flex-col items-center justify-center rounded-sm max-w-[480px] group transition-all duration-300 hover:border-gdr-beige/40">
                  <span className="text-[16px] tracking-[0.3em] font-mono text-gdr-beige uppercase block mb-2">
                    [ IMAGEM DA LOGO REAL ]
                  </span>
                  <span className="text-[15px] text-white/40 block leading-none font-mono tracking-widest uppercase">
                    gdr_logo_footer.png
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-white/60 font-light leading-relaxed max-w-sm">
              Mais de meio século de atuação sob o selo de segurança técnica e excelência jurídica Full Service. Nossa estrutura em Florianópolis apoia empresas, investidores, famílias e clientes individuais em todo o país.
            </p>

            <div className="text-[10px] text-gdr-beige font-sans tracking-widest uppercase">
              OAB/SC — Advocacia Full Service de Excelência
            </div>
          </div>

          {/* Render individual addresses */}
          <div className="lg:col-span-8 grid grid-cols-1 gap-8 lg:pl-12">
            {addresses.map((address, i) => (
              <div key={i} className="space-y-4 border-l border-white/15 pl-6 relative">
                <h4 className="text-sm font-semibold tracking-widest uppercase text-white font-sans flex items-center space-x-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-gdr-beige" />
                  <span>Unidade {address.city} &mdash; {address.state}</span>
                </h4>

                <div className="space-y-2.5 text-xs text-white/70 font-light">
                  <p className="leading-snug">
                    {address.street} <br />
                    {address.suite} <br />
                    CEP {address.zipCode}
                  </p>

                  <div className="flex items-center space-x-2 pt-1 border-t border-white/5 mt-3 text-white/80">
                    <Phone className="w-3.5 h-3.5 text-gdr-beige shrink-0" />
                    <span>{address.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-white/80">
                    <Mail className="w-3.5 h-3.5 text-gdr-beige shrink-0" />
                    <span className="hover:text-gdr-beige hover:underline transition-colors cursor-pointer">{address.email}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-white/50">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] tracking-wide">{address.workingHours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* SECTOR C: SUB FOOTER COPYRIGHT & QUICK NAVIGATION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/45 uppercase tracking-widest font-sans">
          <div>
            &copy; {new Date().getFullYear()} Gouvêa dos Reis Advogados. Todos os direitos reservados.
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <button onClick={() => onNavigate("sobre")} className="hover:text-white transition-colors cursor-pointer">
              Sobre a GDR
            </button>
            <button onClick={() => onNavigate("atuacao")} className="hover:text-white transition-colors cursor-pointer">
              Áreas de Atuação
            </button>
            <button onClick={() => onNavigate("equipe")} className="hover:text-white transition-colors cursor-pointer">
              Equipe
            </button>
            <button onClick={() => onNavigate("portfolio")} className="hover:text-white transition-colors cursor-pointer">
              Portfólio
            </button>
            <button onClick={() => onNavigate("blog")} className="hover:text-white transition-colors cursor-pointer">
              Blog
            </button>
            <button onClick={() => onNavigate("contato")} className="hover:text-white transition-colors cursor-pointer">
              Contato
            </button>
          </div>
          
          <div className="text-right text-[9px] text-[#fafafa]/30">
            Termos de Uso &bull; Privacidade LGPD &bull; OAB Compliant
          </div>
        </div>

      </div>
    </footer>
  );
}
