import React, { useState, useEffect } from "react";
import { PRACTICE_AREAS, OFFICE_ADDRESSES } from "../data";
import { ChevronRight, CalendarCheck, Send, ShieldAlert, Check } from "lucide-react";
import { getPracticeAreas, getOfficeAddresses } from "../lib/sanity";
import { PracticeArea, OfficeAddress } from "../types";

export default function ContactForm() {
  const [practiceAreasList, setPracticeAreasList] = useState<PracticeArea[]>(PRACTICE_AREAS);
  const [officeAddressesList, setOfficeAddressesList] = useState<OfficeAddress[]>(OFFICE_ADDRESSES);
  
  const [formData, setFormData] = useState({
    fullName: "",
    corporateEmail: "",
    corporatePhone: "",
    companyName: "",
    practiceArea: PRACTICE_AREAS[0].title,
    preferredOffice: OFFICE_ADDRESSES[0].city,
    details: "",
    termsAccepted: false
  });

  useEffect(() => {
    // Load practice areas
    getPracticeAreas().then((data) => {
      if (data && data.length > 0) {
        setPracticeAreasList(data);
        setFormData((prev) => ({
          ...prev,
          practiceArea: data[0].title
        }));
      }
    });

    // Load office addresses
    getOfficeAddresses().then((data) => {
      if (data && data.length > 0) {
        setOfficeAddressesList(data);
        setFormData((prev) => ({
          ...prev,
          preferredOffice: data[0].city
        }));
      }
    });
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validations
    if (!formData.fullName || !formData.corporateEmail || !formData.corporatePhone || !formData.companyName) {
      setErrorMsg("Por favor, preencha todos os campos obrigatórios identificados.");
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMsg("É necessário aceitar os termos de tratamento específico de dados corporativos.");
      return;
    }

    setIsSubmitting(true);

    // Simulate elite API interaction
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: "",
        corporateEmail: "",
        corporatePhone: "",
        companyName: "",
        practiceArea: PRACTICE_AREAS[0].title,
        preferredOffice: OFFICE_ADDRESSES[0].city,
        details: "",
        termsAccepted: false
      });
    }, 1200);
  };

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
                As relações corporativas demandam rapidez e extremo rigor processual. Ao submeter suas informações básicas através do formulário ao lado, nossa coordenação o direcionará imediatamente ao sócio especializado em seu setor de operação.
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

          {/* Form Panel Column */}
          <div className="lg:col-span-7">
            <div className="border border-gdr-beige bg-gdr-gray p-8 sm:p-10 relative shadow-sm">
              
              {/* Submission success handler view */}
              {submitSuccess ? (
                <div className="text-center py-12 flex flex-col items-center space-y-6">
                  <div className="p-4 rounded-full bg-white border border-gdr-beige text-gdr-dark">
                    <Check className="w-8 h-8 stroke-[3] text-gdr-beige" />
                  </div>
                  
                  <h3 className="text-2xl font-sans font-light text-gdr-dark">
                    Solicitação Submetida com <span className="font-baskerville-italic text-gdr-beige">Sucesso</span>
                  </h3>
                  
                  <p className="text-xs text-gdr-dark/65 max-w-md leading-relaxed mx-auto font-sans">
                    Nossa assessoria executiva de coordenação jurídica já foi acionada. Em breves instantes, um de nossos sócios-diretores entrará em contato via e-mail ou chamada para agendar sua videoconferência ou encontro presencial.
                  </p>

                  <button
                    id="new-inquiry-btn"
                    onClick={() => setSubmitSuccess(false)}
                    className="border border-gdr-dark text-gdr-dark hover:bg-gdr-dark hover:text-white transition-all text-[10px] uppercase tracking-widest font-semibold py-3 px-6 cursor-pointer"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form id="schedule-consultation-form" onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {errorMsg && (
                    <div id="form-error-banner" className="p-4 bg-red-50 border-l-2 border-red-500 text-xs text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5ClassName">
                      <label htmlFor="fullName" className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ex: Roberto de Souza"
                        required
                        className="w-full bg-white border border-gdr-border focus:border-gdr-beige focus:outline-none p-3.5 text-xs text-gdr-dark transition-colors"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="companyName" className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                        Empresa Corporativa *
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Ex: Companhia S/A"
                        required
                        className="w-full bg-white border border-gdr-border focus:border-gdr-beige focus:outline-none p-3.5 text-xs text-gdr-dark transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="corporateEmail" className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        id="corporateEmail"
                        name="corporateEmail"
                        value={formData.corporateEmail}
                        onChange={handleInputChange}
                        placeholder="Ex: roberto@companhia.com.br"
                        required
                        className="w-full bg-white border border-gdr-border focus:border-gdr-beige focus:outline-none p-3.5 text-xs text-gdr-dark transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="corporatePhone" className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                        Telefone Corporativo *
                      </label>
                      <input
                        type="tel"
                        id="corporatePhone"
                        name="corporatePhone"
                        value={formData.corporatePhone}
                        onChange={handleInputChange}
                        placeholder="Ex: +55 (11) 98888-7777"
                        required
                        className="w-full bg-white border border-gdr-border focus:border-gdr-beige focus:outline-none p-3.5 text-xs text-gdr-dark transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Practice Area selectors dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="practiceArea" className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                        Especialidade Requerida
                      </label>
                      <select
                        id="practiceArea"
                        name="practiceArea"
                        value={formData.practiceArea}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gdr-border focus:border-gdr-beige focus:outline-none p-3.5 text-xs text-gdr-dark transition-colors cursor-pointer"
                      >
                        {practiceAreasList.map((area) => (
                          <option key={area.id} value={area.title}>
                            {area.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred office locations */}
                    <div className="space-y-1.5">
                      <label htmlFor="preferredOffice" className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                        Unidade GDR de Interesse
                      </label>
                      <select
                        id="preferredOffice"
                        name="preferredOffice"
                        value={formData.preferredOffice}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gdr-border focus:border-gdr-beige focus:outline-none p-3.5 text-xs text-gdr-dark transition-colors cursor-pointer"
                      >
                        {officeAddressesList.map((office) => (
                          <option key={office.city} value={office.city}>
                            Unidade {office.city} &mdash; {office.state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message / Details inquiry text input area */}
                  <div className="space-y-1.5">
                    <label htmlFor="details" className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                      Notas Adicionais do Assunto
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Descreva, em termos gerais, as necessidades específicas do seu grupo. Não compartilhe dados ultra-sensíveis neste primeiro canal."
                      rows={4}
                      className="w-full bg-white border border-gdr-border focus:border-gdr-beige focus:outline-none p-3.5 text-xs text-gdr-dark transition-colors"
                    />
                  </div>

                  {/* Acceptance agreements */}
                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      className="mt-0.5 border border-gdr-border rounded-sm h-4 w-4 text-gdr-dark focus:ring-gdr-beige accent-gdr-beige"
                    />
                    <label htmlFor="termsAccepted" className="text-[10px] leading-tight text-gdr-dark/60 font-light select-none">
                      Autorizo espressamente o tratamento de meus dados cadastrais e corporativos para fins exclusivos de auditoria de conflito de interesses anterior ao agendamento de reuniões, nos termos da Lei nº 13.709/18 (LGPD). *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      id="submit-contact-form"
                      disabled={isSubmitting}
                      className="w-full bg-gdr-dark hover:bg-gdr-beige text-white hover:text-gdr-dark font-sans text-xs uppercase tracking-widest py-4 transition-all duration-300 border border-gdr-dark flex items-center justify-center space-x-3 shrink-0 disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isSubmitting ? "Processando Agendamento..." : "Solicitar Reunião de Alta Diretoria"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
