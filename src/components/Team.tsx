import React, { useState, useEffect } from "react";
import { Award, Mail, Phone, Clock, Shield, Search, X, ArrowRight } from "lucide-react";
import { getTeamMembers } from "../lib/sanity";

// Structure definition for GDR Team members
interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone?: string;
  imageRef: string;
  area: string;
  isHonorary?: boolean;
  bio: string; // Long bio/background information for the popup
  credentials?: string[];
}

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [juridicoMembers, setJuridicoMembers] = useState<TeamMember[]>([]);
  const [conselhoMembers, setConselhoMembers] = useState<TeamMember[]>([]);
  const [founderMember, setFounderMember] = useState<TeamMember | null>(null);
  const [administrativoMembers, setAdministrativoMembers] = useState<TeamMember[]>([]);

  // Helper to decode Sanity image asset references into actual live CDN URLs
  function getSanityImageUrl(ref: string) {
    if (!ref) return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800";
    
    // Support regular URLs or local absolute paths (e.g., from Netlify CMS uploads)
    if (ref.startsWith('http') || ref.startsWith('/') || ref.includes('.')) {
      // If it looks like a URL or an actual file path (has extension dot), return as is
      return ref.startsWith('/') ? ref : (!ref.startsWith('http') && !ref.startsWith('image-') ? `/${ref}` : ref);
    }

    const cleanRef = ref.replace(/^image-/, "");
    const lastDashIndex = cleanRef.lastIndexOf("-");
    if (lastDashIndex === -1) return ref; // Fallback instead of replacing with placeholder
    
    const idAndSize = cleanRef.substring(0, lastDashIndex);
    const ext = cleanRef.substring(lastDashIndex + 1);
    return `https://cdn.sanity.io/images/xkc900rm/production/${idAndSize}.${ext}`;
  }

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMember]);

  // Accessibility: close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Elite Liderança / Sócio-Diretor & Corpo Jurídico
  const juridico: TeamMember[] = [
    {
      name: "Dr. Murilo Gouvêa dos Reis",
      role: "Sócio-Diretor • OAB/SC 11.234",
      email: "murilo.reis@gdr.adv.br",
      phone: "+55 (48) 3222-9696",
      imageRef: "image-9729452190d4d3869eecafefbc3c9db5a230e50d-2640x3960-jpg",
      area: "Trabalhista Empresarial, Relações Governamentais (RELGOV) e Planejamento Sucessório",
      bio: "Sócio-Diretor e conselheiro sênior para grupos empresariais e family offices nacionais. Com mais de 25 anos de atividade contínua na advocacia corporativa privada, consolidou sua carreira auxiliando empresas e holdings familiares em transações societárias estratégicas, relações governamentais, relações trabalhistas coletivas e planejamentos sucessórios intergeracionais complexos. É membro ativo da Comissão de Direito Empresarial e participante influente de conselhos de governança no Sul do país.",
      credentials: [
        "Graduado em Direito pela UNISUL",
        "Especialista em Relações Trabalhistas Corporativas",
        "Conselheiro de Governança Certificado",
        "Sócio-Diretor Geral Gouvêa dos Reis Advogados"
      ]
    },
    {
      name: "Dr. Renato Gouvêa dos Reis",
      role: "Advogado Empresarial • OAB/SC 15.678",
      email: "renato.gouvea@gdr.adv.br",
      imageRef: "image-a969db5f64f0576f00c6bb17feabc587c6d5d3a4-1080x1350-png",
      area: "Direito de Empresa, Governança e Societário",
      bio: "Especialista em Direito Societário e de Empresa, atua na elaboração e negociação de contratos de alta complexidade, na modelagem de estruturas de governança corporativa e em processos de reorganização societária. Com vasta experiência na facilitação de acordos e mediação entre acionistas, auxilia grupos familiares e sociedades anônimas de capital fechado a consolidar estruturas de governança sólidas e alinhadas aos seus objetivos institucionais de longo prazo."
    },
    {
      name: "Dr. Sérgio de Miranda",
      role: "Advogado Imobiliário & Holding • OAB/SC 18.912",
      email: "sergio@gdr.adv.br",
      imageRef: "image-6628ec71555a4656571770e10983fc9af7c5a851-2640x3051-jpg",
      area: "Planejamento Sucessório, Holding Familiar e Negócios Imobiliários",
      bio: "Com atuação focada na estruturação e proteção patrimonial, Dr. Sérgio assessora clientes particulares e grupos empresariais em planejamentos sucessórios de alta renda e na criação de holdings familiares estratégicas. Sua expertise também abrange transações e negócios imobiliários de grande porte, compreendendo due diligence para aquisição de imóveis rurais e urbanos, incorporações, contratos de Built-to-Suit, e regularização fundiária complexa."
    },
    {
      name: "Dra. Paula Sade",
      role: "Advogada Criminalista • OAB/SC 23.456",
      email: "paula.sade@gdr.adv.br",
      imageRef: "image-28d12e86c0635162fb2ee56404a6232e8785ddf0-1285x1600-jpg",
      area: "Direito Penal Empresarial e Compliance Criminal",
      bio: "Advogada criminalista com sólida formação e atuação dedicada à defesa corporativa e ao desenvolvimento de programas de compliance penal empresarial. Atua de forma técnica e especializada em inquéritos e ações penais complexas relativas a crimes financeiros, contra o sistema tributário, ambientais e de concorrência. Conduz investigações corporativas internas com absoluto sigilo, desenvolvendo defesas personalizadas de elevado nível analítico."
    },
    {
      name: "Dra. Marja Severo",
      role: "Advogada de Família e Sucessões • OAB/SC 27.890",
      email: "marja@gdr.adv.br",
      imageRef: "image-52b0c3d4b1b6087deb9f8ace0e9e4b4bd49341db-608x757-png",
      area: "Sucessão Familiar, Planejamento e Acordos de Família",
      bio: "Especializada na condução humanizada e estratégica de demandas familiares corporativas, Dra. Marja atua na modelagem de planejamentos sucessórios privados, partilhas patrimoniais amigáveis ou complexas e divórcios estratégicos consensuais. Desenvolve acordos de regimes de bens sofisticados, pactos pré-nupciais e protocolos de convivência familiar com o máximo rigor técnico, discrição e preservação das relações familiares."
    },
    {
      name: "Dr. Luciano da Veiga",
      role: "Advogado Tributarista • OAB/SC 28.513",
      email: "luciano@gdr.adv.br",
      imageRef: "image-dedee6dc912e1aca59ee39305bf484bea12c694b-4003x6014-jpg",
      area: "Direito Tributário, Processual Fiscal e Planejamento de Impostos",
      bio: "Atua há mais de duas décadas no Direito Tributário preventivo e contencioso. Especializado em auditoria tributária avançada, estruturação de planejamentos de elisão fiscal de alta conformidade e adequação de grandes corporações às contínuas atualizações normativas federais, estaduais e municipais. Atua com excelência técnica em defesas administrativas e judiciais perante os tribunais fiscais e conselhos de contribuintes."
    },
    {
      name: "Dr. Willians César",
      role: "Advogado de Direito Internacional • OAB/SC 31.254",
      email: "willians@gdr.adv.br",
      imageRef: "image-842bed3174f3187fe5f0d005d70ac9edc0836f96-2640x3960-jpg",
      area: "Contratos e Transações Multinacionais, Negociação Global",
      bio: "Com destacada atuação em negócios transfronteiriços, Dr. Willians atua na redação e revisão de contratos multinacionais de grande porte, assessoria em investimentos estrangeiros diretos no Brasil (IED) e internacionalização de empresas latino-americanas. Representa clientes em arbitragens internacionais e negociações de fusões e aquisições envolvendo fundos de investimentos globais."
    },
    {
      name: "Dr. Fernando Henrique",
      role: "Advogado de Administração de Passivos • OAB/SC 35.123",
      email: "fernando@gdr.adv.br",
      imageRef: "image-9614309e0a09351cf668890ab2fe9ea2c9b05fdd-2354x4160-jpg",
      area: "Equacionamento Financeiro, Negociação e Passivo Empresarial",
      bio: "Especialista em recuperação e gerenciamento de passivos de empresas de grande e médio porte, Dr. Fernando coordena reestruturações de dívidas ativas estruturadas. Auxilia na negociação estratégica diretamente com credores privados e públicos para reabilitação financeira, redução legítima de juros e encargos contratuais corporativos, consolidando planos de preservação operacional."
    },
    {
      name: "Dr. Mauro de Moraes",
      role: "Advogado Trabalhista Sênior • OAB/SC 12.046",
      email: "mauro@gdr.adv.br",
      imageRef: "image-1620b08205fc2eefe21cb6ac6c3b0f45d2e5cd8b-2640x2654-jpg",
      area: "Defesa Patronal, Contencioso e Consultoria Trabalhista",
      bio: "Especialista em defesa e consultoria trabalhista empresarial de vanguarda, o Dr. Mauro concentra sua atuação no patrocínio patronal de contenciosos estratégicos de alta relevância financeira. Desenvolve auditorias trabalhistas preventivas destinadas a identificar focos de insalubridade e passivos ocultos, estruturando planos de conformidade com as normas trabalhistas regulamentadoras."
    },
    {
      name: "Dr. Gleidson Rodrigues",
      role: "Advogado Administrativo e Público • OAB/SC 39.462",
      email: "gleidson@gdr.adv.br",
      imageRef: "image-cd377a315bbf1f59dbf1a56d4c0282733a1d76ed-2640x3960-jpg",
      area: "Licitações, Agências Reguladoras e Processos no Poder Público",
      bio: "Atua no Direito Administrativo com foco na representação de empresas licitantes corporativas perante conselhos governamentais e tribunais de contas. Especializado em agências reguladoras (como ANS, ANTT, ANVISA), assessora clientes na modelagem jurídica de concessões e parcerias público-privadas, assegurando total conformidade regulatória nas relações de mercado com os entes públicos."
    },
    {
      name: "Dra. Luciana Castro",
      role: "Advogada Empresarial e Trabalhista • OAB/SC 41.569",
      email: "luciana.castro@gdr.adv.br",
      imageRef: "image-d8d70b85a13c88039d16eefdf2b98abaa23b5cc7-880x1113-jpg",
      area: "Contratos de Trabalho, Direito Societário e Cível Geral",
      bio: "Advogada generalista sênior com especialização em litígios civis contratuais e regulação de contratos de trabalho patronais flexíveis. Concentra sua prática na assessoria preventiva rotineira de comitês executivos de recursos humanos e redação de instrumentos societários lícitos, proporcionando o respaldo necessário para a mitigação de contingências operacionais."
    },
    {
      name: "Dra. Jill Becker",
      role: "Advogada Previdenciário & LGPD • OAB/SC 44.201",
      email: "jill@gdr.adv.br",
      imageRef: "image-01ac1b480876e1f3faac3a31354fe452bb81e3e9-3960x2640-jpg",
      area: "Segurança de Dados, Adequação à LGPD e Previdência Complementar",
      bio: "Atua com ênfase em tecnologia jurídica, governança de dados pessoais por design e adequação corporativa às normativas da LGPD. Além de sua prática em privacidade, projeta planos de previdência complementar fechada de alta gama para executivos corporativos e comitês de alta gerência, elaborando cálculos analíticos complexos de benefícios integrados."
    }
  ];

  // Conselho Consultivo
  const conselho: TeamMember[] = [
    {
      name: "Dr. Aldo Enrique Benitez Cabrera",
      role: "Consultor Internacional Sênior",
      email: "aldo@gdr.adv.br",
      imageRef: "image-607e746f04c5e826a70e1d77f0967f24c673cbfd-747x928-jpg",
      area: "Consultoria Global, Mercado de Capitais e Negócios Estratégicos",
      bio: "Com relevante atuação acadêmica e profissional em finanças transnacionais e estruturação de investimentos estrangeiros na América Latina, o Dr. Aldo Enrique oferece aconselhamento estratégico especializado de nível macro para holdings e family offices filiados ao Gouvêa dos Reis Advogados. Seus pareceres abrangem modelagens de captação de recursos no mercado de capitais e conexões societárias internacionais.",
      credentials: [
        "Consultor Sênior em Economia e Direito Internacional",
        "Especialista em Mercado de Capitais Latino-americano",
        "Conselheiro Corporativo Ad-hoc para Transações Globais"
      ]
    }
  ];

  // Special Highlight Tribute: Sócio Fundador In memorian
  const founder: TeamMember = {
    name: "Prof. Wilson Corrêa dos Reis",
    role: "Sócio Fundador • In Memoriam",
    email: "contato@gdr.adv.br",
    imageRef: "image-af228c2a787521c434c289e5a7382bf6c1bbd000-450x450-jpg",
    area: "Sócio Idealizador e Patrono de Honra do Gouvêa dos Reis Advogados",
    isHonorary: true,
    bio: "Fundador e patrono originário do Gouvêa dos Reis Advogados. Sua visão vanguardista, pautada sob estritos ideais de integridade ética absoluta, excelência insuperável e dedicação irrestrita ao Direito, estabeleceu os alicerces fundamentais sobre os quais o escritório opera de forma sólida e perene. Professor universitário de imenso destaque e consultor admirado na área trabalhista e cível de Santa Catarina, Dr. Wilson deixou um legado jurídico imperecível para gerações de advogados no Sul do país, cujo espírito de honestidade e perfeccionismo profissional continua a orientar cada ação institucional de nossa equipe hoje.",
    credentials: [
      "Sócio Fundador e Patrono Originário de GDR Advogados",
      "Conselheiro Sênior | Trabalhista | Cível",
      "Professor Universitário Emérito de Direito",
      "Mentor Originário da Cultura de Excelência de Gouvêa dos Reis"
    ]
  };

  // Administrativo
  const administrativo: TeamMember[] = [
    {
      name: "Thamires Assis",
      role: "Diretora Estratégica e Comercial",
      email: "thamires@gdr.adv.br",
      imageRef: "image-e3f500af8e95c378aad9c8b66bdc2b199d734221-2640x3960-jpg",
      area: "Gestão Operacional, Comercial e Estratégia de Atendimento",
      bio: "Profissional sênior em gestão estratégica e comercial de prestação de serviços premium. Thamires coordena o gerenciamento operacional do escritório, integrando os núcleos jurídicos de forma a otimizar a sinergia entre as demandas corporativas e a presteza de nosso atendimento exclusivo. Lidera a interface de relacionamento inicial com clientes e o desenvolvimento estratégico do portfólio de contas nacionais."
    },
    {
      name: "Alcioneide Rodrigues",
      role: "Secretária Executiva",
      email: "alcioneide@gdr.adv.br",
      imageRef: "image-b59785ec0741ebf4e6eb354a6bcb40da06f6e6b0-1280x1794-jpg",
      area: "Apoio Institucional, Recepção e Fluxos de Atendimento",
      bio: "Com mais de 15 anos dedicados à assessoria executiva corporativa em escritórios de alto padrão. Alcioneide é responsável pelo suporte direto da diretoria geral do Gouvêa dos Reis e pelo gerenciamento cotidiano das comunicações e do acolhimento presencial na matriz de Florianópolis. Sua atuação pauta-se pelo extremo zelo com a privacidade de informações corporativas enviadas pelos nossos parceiros."
    },
    {
      name: "Guilherme Paranhos",
      role: "Analista de Comunicação & Marketing",
      email: "guilherme@gdr.adv.br",
      imageRef: "image-45512feef2c5815189f1d0b73e505834b79100ee-3960x2640-jpg",
      area: "Produção de Conteúdo, Relacionamento Digital e Mídia",
      bio: "Analista de comunicação responsável pelo posicionamento corporativo institucional do Gouvêa dos Reis nas mídias digitais e canais de divulgação oficiais. Guilherme lidera a curadoria e produção de artigos jurídicos de utilidade pública do nosso blog, a edição técnica de cartilhas institucionais e ebooks do escritório, e zela pela identidade e comunicação visual corporativa em todos os canais institucionais."
    }
  ];

  useEffect(() => {
    getTeamMembers().then((data) => {
      if (data && data.length > 0) {
        const sanityJuridico: TeamMember[] = [];
        const sanityConselho: TeamMember[] = [];
        const sanityAdministrativo: TeamMember[] = [];
        let sanityFounder: TeamMember | null = null;

        data.forEach((m) => {
          const member: TeamMember = {
            name: m.name,
            role: m.role,
            email: m.email,
            phone: m.phone,
            imageRef: typeof m.imageRef === "string" ? m.imageRef : (m.imageRef?.asset?._ref || m.imageRef?._ref || ""),
            area: m.area,
            isHonorary: m.isHonorary,
            bio: m.bio,
            credentials: m.credentials,
          };

          if (m.category === "founder" || m.isHonorary) {
            sanityFounder = member;
          } else if (m.category === "conselho") {
            sanityConselho.push(member);
          } else if (m.category === "administrativo") {
            sanityAdministrativo.push(member);
          } else {
            sanityJuridico.push(member);
          }
        });

        setJuridicoMembers(sanityJuridico);
        setConselhoMembers(sanityConselho);
        setFounderMember(sanityFounder);
        setAdministrativoMembers(sanityAdministrativo);
      } else {
        setJuridicoMembers(juridico);
        setConselhoMembers(conselho);
        setFounderMember(founder);
        setAdministrativoMembers(administrativo);
      }
    }).catch(() => {
      setJuridicoMembers(juridico);
      setConselhoMembers(conselho);
      setFounderMember(founder);
      setAdministrativoMembers(administrativo);
    });
  }, []);

  // Search logic that respects separate sections:
  // We check if input matches name, role, area, or bio.
  const filterList = (list: TeamMember[]) => {
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query) ||
        m.area.toLowerCase().includes(query) ||
        m.bio.toLowerCase().includes(query)
    );
  };

  const activeFounder = founderMember || founder;

  const filteredJuridico = filterList(juridicoMembers);
  const filteredConselho = filterList(conselhoMembers);
  const filteredFounder = activeFounder ? filterList([activeFounder]) : [];
  const filteredAdministrativo = filterList(administrativoMembers);

  const hasAnyResults =
    filteredJuridico.length > 0 ||
    filteredConselho.length > 0 ||
    filteredFounder.length > 0 ||
    filteredAdministrativo.length > 0;

  return (
    <section id="equipe" className="py-24 bg-white border-b border-gdr-border relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 border-b border-gdr-border pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-left">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gdr-dark/60 font-medium">
              CORPO PROFISSIONAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans text-gdr-dark font-light mt-2 max-w-2xl leading-tight">
              Nosso Corpo de <br />
              <span className="font-baskerville-italic text-gdr-beige text-4xl sm:text-5xl">
                Advogados & Especialistas
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gdr-dark/60 font-light mt-3 max-w-xl">
              Equipes de alta especialidade organizadas de forma independente, atuando com disciplina ética, discrição patrimonial e foco sob medida em suas demandas e conquistas.
            </p>
          </div>

          {/* Elegant Unified Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              id="team-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar especialista ou área..."
              className="w-full bg-gdr-gray border border-gdr-border pl-10 pr-4 py-2.5 text-xs focus:outline-hidden focus:border-gdr-beige transition-colors duration-300 text-gdr-dark placeholder:text-gdr-dark/30"
            />
            <Search className="w-4 h-4 text-gdr-dark/40 absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-xs text-gdr-dark/40 hover:text-gdr-dark"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Display of Non-mixed Sections */}
        {!hasAnyResults ? (
          <div className="text-center py-20 bg-gdr-gray border border-gdr-border">
            <p className="text-xs font-light text-gdr-dark/60">
              Nenhum profissional ou área correspondente encontrada na busca.
            </p>
            <button
              id="reset-search-btn"
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[10px] tracking-wider border-b border-gdr-dark text-gdr-dark uppercase pb-0.5"
            >
              Exibir equipe completa
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            
            {/* SECTION 1: SÓCIO FUNDADOR • IN MEMORIAM (GRAND RESPECTFUL SPOTLIGHT) */}
            {filteredFounder.length > 0 && (
              <div id="secao-fundador-in-memoriam" className="scroll-mt-24 text-left">
                <div className="border-l-2 border-gdr-beige pl-4 mb-8">
                  <h3 className="text-[13px] tracking-[0.2em] font-display text-gdr-dark uppercase">
                    Legado Histórico & Fundador
                  </h3>
                  <p className="text-[11px] text-gdr-dark/50 font-light mt-1">
                    Nossa homenagem solene e perpétua ao Dr. Wilson Corrêa dos Reis, cujos valores éticos e técnicos moldam o nosso escritório desde a fundação.
                  </p>
                </div>

                {/* Grand Spotlight Card for Founder Only */}
                <div 
                  onClick={() => setSelectedMember(activeFounder)}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-gdr-gray border border-gdr-beige/60 p-6 md:p-10 hover:shadow-xs transition-all duration-300 cursor-pointer relative group"
                >
                  {/* Decorative Border line */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gdr-beige opacity-80" />

                  {/* Bio descriptions */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 bg-white border border-gdr-beige/40 px-2.5 py-1 mb-3">
                        <Award className="w-3.5 h-3.5 text-gdr-beige shrink-0" />
                        <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-gdr-dark/80">
                          {activeFounder.role}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display text-gdr-dark font-light group-hover:text-gdr-beige transition-colors duration-300">
                        {activeFounder.name}
                      </h3>
                      <p className="text-[10px] text-gdr-beige font-mono uppercase tracking-widest mt-1">
                        Sócio-Fundador e Patrono Originário de GDR Advogados
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gdr-dark/70 font-light leading-relaxed italic pr-4">
                      "{activeFounder.bio.substring(0, 310)}..."
                    </p>

                    <div className="border-t border-gdr-beige/40 pt-6 space-y-3">
                      <h4 className="text-[10px] uppercase tracking-widest font-semibold text-gdr-dark">
                        Titularidades do Legado
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeFounder.credentials?.map((cred, i) => (
                           <li key={i} className="flex items-start space-x-2">
                            <span className="text-gdr-beige text-xs mt-0.5">•</span>
                            <span className="text-[11px] text-gdr-dark/80 font-light leading-tight">
                              {cred}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex items-center space-x-3 text-[10px] tracking-widest uppercase font-mono text-gdr-beige font-semibold group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Ver Tributo e Biografia Completa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Photo frame */}
                  <div className="lg:col-span-5 relative self-center flex items-center justify-center">
                    <div className="absolute inset-0 border border-gdr-beige translate-x-3 translate-y-3 pointer-events-none group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300" />
                    <div className="relative w-full aspect-[4/5] bg-white border border-gdr-dark/10 overflow-hidden shadow-xs">
                      <img
                        src={getSanityImageUrl(activeFounder.imageRef)}
                        alt={activeFounder.name}
                        className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gdr-dark/90 to-transparent p-4 text-left">
                        <span className="text-[9px] tracking-widest text-white/50 font-mono uppercase">
                          SÓCIO FUNDADOR • EM MEMÓRIA
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* SECTION 2: CORPO JURÍDICO */}
            {filteredJuridico.length > 0 && (
              <div id="secao-juridica" className="scroll-mt-24 text-left">
                <div className="border-l-2 border-gdr-beige pl-4 mb-8">
                  <h3 className="text-[13px] tracking-[0.2em] font-display text-gdr-dark uppercase">
                    Corpo Jurídico
                  </h3>
                  <p className="text-[11px] text-gdr-dark/50 font-light mt-1">
                    Equipe jurídica especializada focada em auditorias, defesas corporativas e planejamento estratégico multinacional.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredJuridico.map((member, i) => {
                    const isDirector = member.name.includes("Murilo");
                    return (
                      <div 
                        key={i} 
                        id={`team-card-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setSelectedMember(member)}
                        className={`bg-white border flex flex-col justify-between hover:border-gdr-beige hover:shadow-xs group transition-all duration-300 cursor-pointer ${
                          isDirector ? "border-gdr-beige/70 ring-1 ring-gdr-beige/10" : "border-gdr-border"
                        }`}
                      >
                        <div className="flex flex-col">
                          
                          {/* Visual Photo Card */}
                          <div className="relative aspect-[3/4] overflow-hidden bg-gdr-gray border-b border-gdr-border">
                            <img
                              src={getSanityImageUrl(member.imageRef)}
                              alt={member.name}
                              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-103 group-hover:grayscale-0"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Specialized Badges */}
                            <div className="absolute top-3 left-3 bg-gdr-dark text-white border border-gdr-beige/20 text-[7px] uppercase tracking-[0.15em] px-2 py-0.5">
                              {isDirector ? "Sócio-Diretor" : "Jurídico"}
                            </div>

                            {/* View Full Bio Hover Overlay */}
                            <div className="absolute inset-0 bg-gdr-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                              <span className="text-[10px] tracking-widest text-white border border-white/30 px-3 py-1.5 hover:bg-white hover:text-gdr-dark transition-colors duration-300 uppercase font-sans font-medium">
                                Ver Biografia Completa
                              </span>
                            </div>
                          </div>

                          {/* Meta Descriptions */}
                          <div className="p-5 space-y-3">
                            <div>
                              <span className="text-[9px] tracking-wider text-gdr-beige font-semibold uppercase block truncate">
                                {member.role}
                              </span>
                              <h5 className="font-sans font-medium text-gdr-dark text-sm sm:text-base mt-1 group-hover:text-gdr-beige transition-colors duration-300">
                                {member.name}
                              </h5>
                              <p className="text-[9.5px] font-mono text-gdr-dark/40 mt-1">
                                {member.email}
                              </p>
                            </div>

                            {/* Expertise Domain */}
                            <div className="bg-gdr-gray p-2.5 border-l border-gdr-beige space-y-0.5">
                              <span className="text-[7.5px] uppercase tracking-wider font-semibold text-gdr-dark/40 block">
                                Atuação / Foco:
                              </span>
                              <p className="text-[9.5px] text-gdr-dark/95 leading-normal font-medium line-clamp-2">
                                {member.area}
                              </p>
                            </div>
                          </div>

                        </div>

                        {/* Card bottom footer */}
                        <div className="px-5 pb-4 pt-2 border-t border-gdr-border/40 flex items-center justify-between text-[8px] text-gdr-dark/40 font-mono">
                          <span>GOUVÊA DOS REIS</span>
                          <span className="text-gdr-beige font-semibold uppercase tracking-widest">Clique para ver</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 3: CONSELHO CONSULTIVO */}
            {filteredConselho.length > 0 && (
              <div id="secao-conselho" className="scroll-mt-24 text-left">
                <div className="border-l-2 border-gdr-beige pl-4 mb-8">
                  <h3 className="text-[13px] tracking-[0.2em] font-display text-gdr-dark uppercase">
                    Conselhos & Consultores
                  </h3>
                  <p className="text-[11px] text-gdr-dark/50 font-light mt-1">
                    Suporte acadêmico-estratégico de nível internacional focado no mercado de capitais e conexões transfronteiriças.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredConselho.map((member, i) => (
                    <div 
                      key={i} 
                      id={`team-card-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedMember(member)}
                      className="bg-white border border-gdr-border flex flex-col justify-between hover:border-gdr-beige hover:shadow-xs group transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        
                        {/* Visual Photo Card */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-gdr-gray border-b border-gdr-border">
                          <img
                            src={getSanityImageUrl(member.imageRef)}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-103 group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                          
                          <div className="absolute top-3 left-3 bg-gdr-dark text-white border border-gdr-beige/20 text-[7px] uppercase tracking-[0.15em] px-2 py-0.5">
                            conselho consultor
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gdr-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                            <span className="text-[10px] tracking-widest text-white border border-white/30 px-3 py-1.5 hover:bg-white hover:text-gdr-dark transition-colors duration-300 uppercase font-sans font-medium">
                              Ver Biografia Completa
                            </span>
                          </div>
                        </div>

                        {/* Meta Descriptions */}
                        <div className="p-5 space-y-3">
                          <div>
                            <span className="text-[9px] tracking-wider text-gdr-beige font-semibold uppercase block">
                              {member.role}
                            </span>
                            <h5 className="font-sans font-medium text-gdr-dark text-base mt-1 group-hover:text-gdr-beige transition-colors duration-300">
                              {member.name}
                            </h5>
                            <p className="text-[9.5px] font-mono text-gdr-dark/40 mt-1">
                              {member.email}
                            </p>
                          </div>

                          {/* Expertise domain */}
                          <div className="bg-gdr-gray p-2.5 border-l border-gdr-beige space-y-0.5">
                            <span className="text-[7.5px] uppercase tracking-wider font-semibold text-gdr-dark/40 block">
                              Foco e Contribuição:
                            </span>
                            <p className="text-[9.5px] text-gdr-dark/95 leading-normal font-medium line-clamp-2">
                              {member.area}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Card bottom footer */}
                      <div className="px-5 pb-4 pt-2 border-t border-gdr-border/40 flex items-center justify-between text-[8px] text-gdr-dark/40 font-mono">
                        <span>GOUVÊA DOS REIS</span>
                        <span className="text-gdr-beige font-semibold uppercase tracking-widest">Clique para ver</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 4: EQUIPE ADMINISTRATIVA */}
            {filteredAdministrativo.length > 0 && (
              <div id="secao-administrativa" className="scroll-mt-24 text-left">
                <div className="border-l-2 border-gdr-beige pl-4 mb-8">
                  <h3 className="text-[13px] tracking-[0.2em] font-display text-gdr-dark uppercase">
                    Equipe Administrativa
                  </h3>
                  <p className="text-[11px] text-gdr-dark/50 font-light mt-1">
                    Profissionais responsáveis pela gestão operacional, atendimento executivo sênior e marketing de conformidade técnica do escritório.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredAdministrativo.map((member, i) => (
                    <div 
                      key={i} 
                      id={`team-card-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedMember(member)}
                      className="bg-white border border-gdr-border flex flex-col justify-between hover:border-gdr-beige hover:shadow-xs group transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        
                        {/* Visual Photo Card */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-gdr-gray border-b border-gdr-border">
                          <img
                            src={getSanityImageUrl(member.imageRef)}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-103 group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                          
                          <div className="absolute top-3 left-3 bg-gdr-dark text-white border border-gdr-beige/20 text-[7px] uppercase tracking-[0.15em] px-2 py-0.5">
                            Administrativo
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gdr-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                            <span className="text-[10px] tracking-widest text-white border border-white/30 px-3 py-1.5 hover:bg-white hover:text-gdr-dark transition-colors duration-300 uppercase font-sans font-medium">
                              Ver Informação Completa
                            </span>
                          </div>
                        </div>

                        {/* Meta Descriptions */}
                        <div className="p-5 space-y-3">
                          <div>
                            <span className="text-[9px] tracking-wider text-gdr-beige font-semibold uppercase block truncate">
                              {member.role}
                            </span>
                            <h5 className="font-sans font-medium text-gdr-dark text-base mt-1 group-hover:text-gdr-beige transition-colors duration-300">
                              {member.name}
                            </h5>
                            <p className="text-[9.5px] font-mono text-gdr-dark/40 mt-1">
                              {member.email}
                            </p>
                          </div>

                          {/* Expertise domain */}
                          <div className="bg-gdr-gray p-2.5 border-l border-gdr-beige space-y-0.5">
                            <span className="text-[7.5px] uppercase tracking-wider font-semibold text-gdr-dark/40 block">
                              Área de Apoio:
                            </span>
                            <p className="text-[9.5px] text-gdr-dark/95 leading-normal font-medium line-clamp-2">
                              {member.area}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Card bottom footer */}
                      <div className="px-5 pb-4 pt-2 border-t border-gdr-border/40 flex items-center justify-between text-[8px] text-gdr-dark/40 font-mono">
                        <span>GOUVÊA DOS REIS</span>
                        <span className="text-gdr-beige font-semibold uppercase tracking-widest">Clique para ver</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* DETAIL MODAL POPUP (SOLVES LINK TO POPUP REDIRECTION) */}
      {selectedMember && (
        <div 
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-gdr-dark/80 backdrop-blur-xs transition-opacity duration-300 overflow-y-auto"
        >
          {/* Modal Box */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white text-gdr-dark border border-gdr-beige shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close trigger button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 p-2 text-gdr-dark border border-gdr-border hover:bg-gdr-dark hover:text-white hover:border-gdr-dark transition-all duration-300"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Picture frame */}
            <div className="w-full md:w-2/5 bg-gdr-gray border-b md:border-b-0 md:border-r border-gdr-border h-72 md:h-auto overflow-hidden shrink-0 relative">
              <img
                src={getSanityImageUrl(selectedMember.imageRef)}
                alt={selectedMember.name}
                className={`w-full h-full object-cover grayscale opacity-95 hover:grayscale-0 transition-all duration-700`}
                referrerPolicy="referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gdr-dark/85 to-transparent p-5 text-left">
                <span className="text-[9px] tracking-widest text-white/60 font-mono uppercase block">
                  Cultura & Zelo Técnico
                </span>
                <span className="text-[10px] text-gdr-beige font-mono uppercase tracking-widest font-semibold">
                  Gouvêa dos Reis
                </span>
              </div>
            </div>

            {/* Right Column: Dynamic biography details and contact links */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between space-y-6 text-left">
              
              <div>
                {/* Accent Badges */}
                <div className="inline-flex items-center space-x-1.5 border border-gdr-beige/40 px-2 py-0.5 mb-2 bg-gdr-gray">
                  <Shield className="w-3.5 h-3.5 text-gdr-beige shrink-0" />
                  <span className="text-[9px] tracking-[0.15em] uppercase font-semibold text-gdr-dark/65">
                    {selectedMember.isHonorary ? "Tributo e Homenagem" : selectedMember.role}
                  </span>
                </div>
                
                {/* Title names */}
                <h3 className="text-2xl sm:text-3xl font-display font-light text-gdr-dark leading-tight mt-1">
                  {selectedMember.name}
                </h3>
                
                <span className="text-[9.5px] font-mono text-gdr-beige uppercase tracking-wider block mt-1.5">
                  {selectedMember.isHonorary ? "Patrono Fundador" : "Profissional Integrante"}
                </span>

                {/* Sub-tag area description */}
                <div className="mt-5 bg-gdr-gray p-4 border-l-2 border-gdr-beige space-y-1">
                  <span className="text-[8px] uppercase tracking-widest font-bold text-gdr-dark/40 block">
                    {selectedMember.isHonorary ? "Contribuição Histórica:" : "Área de Atuação e Foco:"}
                  </span>
                  <p className="text-xs text-gdr-dark leading-relaxed font-medium">
                    {selectedMember.area}
                  </p>
                </div>

                {/* Story narrative */}
                <div className="mt-6">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-gdr-dark/50 pb-1.5 border-b border-gdr-border block mb-3">
                    {selectedMember.isHonorary ? "Memorial e Trajetória" : "Perfil Profissional"}
                  </span>
                  <p className="text-xs sm:text-sm text-gdr-dark/80 font-light leading-relaxed whitespace-pre-line text-justify">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Optional Credentials mapping */}
                {selectedMember.credentials && selectedMember.credentials.length > 0 && (
                  <div className="mt-6 border-t border-gdr-border/60 pt-4 space-y-2">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-gdr-dark/50 block">
                      Títulos & Especialidades
                    </span>
                    <ul className="space-y-1.5 text-xs text-gdr-dark/75">
                      {selectedMember.credentials.map((cred, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="text-gdr-beige font-semibold">•</span>
                          <span className="font-light">{cred}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom bar links */}
              <div className="pt-6 border-t border-gdr-border flex flex-wrap gap-4 items-center justify-between text-xs font-mono text-gdr-dark/60">
                <div className="flex flex-col space-y-1">
                  <span className="text-[8px] uppercase tracking-widest text-gdr-dark/40 font-bold block">
                    Meio de Contato Oficial
                  </span>
                  <a 
                    href={`mailto:${selectedMember.email}`}
                    className="flex items-center space-x-2 text-gdr-dark hover:text-gdr-beige transition-colors duration-300"
                  >
                    <Mail className="w-3.5 h-3.5 text-gdr-beige shrink-0" />
                    <span>{selectedMember.email}</span>
                  </a>
                </div>

                {selectedMember.phone && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-gdr-dark/40 font-bold block">
                      Contato de Linha
                    </span>
                    <div className="flex items-center space-x-2 text-gdr-dark">
                      <Phone className="w-3.5 h-3.5 text-gdr-beige shrink-0" />
                      <span>{selectedMember.phone}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
