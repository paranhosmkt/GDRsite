import { PracticeArea, ClientSector, Testimonial, OfficeAddress } from "./types";

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "administrativo",
    title: "Administrativo",
    slug: "administrativo",
    description: "Assessoria estratégica nas relações lícitas com o poder público, licitações corporativas e processos regulatórios complexos.",
    extendedDescription: "Atuamos tanto no contencioso administrativo e judicial quanto no plano consultivo de vanguarda. Elaboramos pareceres sofisticados, recursos para licitações de grande escala, e defesa de interesses perante os Tribunais de Contas e agências reguladoras.",
    howWeAct: [
      "Assessoria em editais de licitações públicas federais, estaduais e municipais",
      "Modelagem e manutenção de contratos de concessão e parcerias (PPPs)",
      "Defesa de empresas e servidores em processos de improbidade e administrativos",
      "Elaboração de pareceres técnicos específicos para tomadas de decisão",
      "Representação focada em agências reguladoras nacionais"
    ]
  },
  {
    id: "imobiliario",
    title: "Imobiliário",
    slug: "imobiliario",
    description: "Segurança total em operações de aquisição, locações complexas, estruturação de condomínios e incorporações imobiliárias.",
    extendedDescription: "Oferecemos assessoria jurídica de ponta em todas as fases de transações imobiliárias corporativas. Nosso rigor de Due Diligence imobiliária garante a mitigação de litígios ocultos e viabiliza empreendimentos residenciais, comerciais e industriais.",
    howWeAct: [
      "Due Diligence imobiliária minuciosa e desprovida de riscos patrimoniais",
      "Estruturação jurídica de incorporações de alto padrão e condomínios fechados",
      "Contratos comerciais de locação, arrendamento e built-to-suit personalizados",
      "Regularização fundiária de posses e cadeias de propriedade de grande porte",
      "Representação em assembleias corporativas e litígios possessórios"
    ]
  },
  {
    id: "tributario",
    title: "Tributário",
    slug: "tributario",
    description: "Planejamento fiscal preventivo inteligência analítica na recuperação de créditos e defesas de autuações excessivas.",
    extendedDescription: "Aliamos rigor técnico e criatividades legítimas sob a legislação para mapear oportunidades tributárias e contornar contingências fiscais de alta complexidade. Protegemos o patrimônio empresarial de modo transparente e proativo.",
    howWeAct: [
      "Planejamento tributário estratégico focado na elisão fiscal legítima",
      "Auditoria jurídica preventiva para identificar créditos acumulados e fraudes",
      "Defesas de elevadíssimo nível técnico no contencioso administrativo e judicial",
      "Adequação empresarial estratégica frente à nova Reforma Tributária Nacional",
      "Gestão inteligente e parcelamento planejado de passivos tributários"
    ]
  },
  {
    id: "empresarial",
    title: "Empresarial",
    slug: "empresarial",
    description: "Estruturação societária, elaboração de contratos complexos, governança corporativa e transações de M&A.",
    extendedDescription: "Nossa advocacia comercial viabiliza negócios nacionais e estrangeiros. Oferecemos segurança absoluta para dissolvimento de sociedades, transações de fusões, e desenhos de acordos comerciais de alto valor comercial.",
    howWeAct: [
      "Constituição e reestruturação de Sociedades Anônimas e de responsabilidade limitada",
      "Assessoria minuciosa em Fusões e Aquisições (M&A) e Due Diligence",
      "Elaboração, análise e blindagem contratual de transações comerciais robustas",
      "Mediação jurídica especializada e técnica de impasses entre sócios",
      "Implementação de regimentos internos e conselhos de administração eficientes"
    ]
  },
  {
    id: "familia",
    title: "Família (Patrimonial e Estratégico)",
    slug: "familia",
    description: "Blindagem do patrimônio familiar e planejamento matrimonial com absoluta discrição e respeito às relações afetivas.",
    extendedDescription: "Atuamos com imensa discrição e ética de ponta na elaboração de planejamentos de regime de bens, contratos de partilha e uniões estáveis. Nosso foco é manter a perenidade dos recursos familiares e resguardar a intimidade do núcleo.",
    howWeAct: [
      "Assessoria com regime de bens e acordos pré-nupciais sob medida",
      "Planejamento patrimonial familiar focado na blindagem lícita de ativos",
      "Condução humanizada de inventários extrajudiciais e partilhas amigáveis",
      "Acompanhamento sutil em divórcios consensuais estratégicos",
      "Assessoria em pactos de convivência e proteção intergeracional de recursos"
    ]
  },
  {
    id: "criminal-empresarial",
    title: "Criminal Empresarial",
    slug: "criminal-empresarial",
    description: "Assessoria consultiva criminal, compliance penal corporativo e representação técnica voltada à defesa dos interesses empresariais.",
    extendedDescription: "Nossa área criminal tem um olhar focado na blindagem criminal de diretores e corpo diretivo. Auxiliamos empresas a auditar e mitigar riscos relacionados a infrações financeiras, ambientais e tributárias na esfera punitiva.",
    howWeAct: [
      "Defesa corporativa qualificada em inquéritos policiais e ações penais públicas",
      "Planejamento consultivo anticorrupção e implementação de compliance criminal",
      "Atuação centrada contra fraudes corporativas internas e vazamento de segredos",
      "Treinamentos corporativos preventivos para executivos e administradores",
      "Suporte legal em auditorias e investigações internas confidenciais"
    ]
  },
  {
    id: "lgpd-dpo",
    title: "LGPD / DPO",
    slug: "lgpd-dpo",
    description: "Adequação integral às exigências da LGPD, privacidade de dados por design e assessoria na atuação de DPO.",
    extendedDescription: "Auxiliamos empresas a criarem fluxos de processamento em total harmonia com a Lei Geral de Proteção de Dados (LGPD). Atuamos no mapeamento de dados (data mapping), criação de políticas internas de privacidade e representação perante a ANPD.",
    howWeAct: [
      "Implementação completa do programa de privacidade e proteção de dados pessoais",
      "Treinamento contínuo de equipes corporativas (DPO as a Service)",
      "Análise minuciosa de impactos à proteção de dados e relatórios técnicos (RIPD)",
      "Elaboração de termos de uso, políticas de privacidade e contratos digitais",
      "Defesa administrativa de sanções aplicadas pela ANPD e órgãos fiscalizadores"
    ]
  },
  {
    id: "previdenciario",
    title: "Previdenciário",
    slug: "previdenciario",
    description: "Planejamento previdenciário de executivos, cálculos analíticos de alta renda e gestão de benefícios corporativos.",
    extendedDescription: "Estruturamos planos previdenciários sofisticados e individuais para acionistas e diretores de alto nível. Além disso, atuamos nas esferas administrativa e contenciosa de benefícios previdenciários e contestações patronais.",
    howWeAct: [
      "Estudo de viabilidade de aposentadorias diferenciadas de alto padrão técnico",
      "Planejamento previdenciário minucioso contendo pareceres matemáticos",
      "Defesas administrativas e judiciais para concessão e revisão de benefícios",
      "Assessoria sob regimes próprios de previdência social e fundos fechados",
      "Contestação judicial de encargos patronais previdenciários desproporcionais"
    ]
  },
  {
    id: "relacoes-gov",
    title: "Relações Governamentais",
    slug: "relacoes-gov",
    description: "Interface jurídica técnica lícita, monitoramento regulatório setorial e assessoramento institucional perante o legislativo.",
    extendedDescription: "Conduzimos diagnósticos finos sobre impactos regulatórios e representamos interesses legítimos de diversos setores corporativos junto a legisladores e comitês setoriais com absoluto compliance.",
    howWeAct: [
      "Mapeamento constante de proposições legais e alterações regulatórias",
      "Elaboração de notas técnicas fundamentadas para subsidiar o debate regulatório",
      "Representação em audiências públicas e comitês setoriais oficiais",
      "Assessoria em compliance de relações no setor público de forma legítima",
      "Mediação técnica na modelagem de novos marcos regulatórios industriais"
    ]
  },
  {
    id: "valuation-due-diligence",
    title: "Due Diligence e Valuation",
    slug: "valuation-due-diligence",
    description: "Auditoria contábil-jurídica integrada de passivos latentes e avaliação pautada no resguardo em fusões.",
    extendedDescription: "Nosso setor realiza o levantamento preciso de todo o patrimônio tangível e intangível de empresas durante operações de investimento para resguardo das obrigações contratuais assumidas em aquisições.",
    howWeAct: [
      "Identificação milimétrica de passivos ocultos em esferas cível e tributária",
      "Avaliação jurídica de marcas, patentes e ativos imateriais relevantes",
      "Elaboração de relatórios técnicos de Due Diligence em curto espaço de tempo",
      "Definição de salvaguardas contratuais baseadas nos riscos constatados",
      "Coordenação de transições operacionais sob auditorias qualificadas"
    ]
  },
  {
    id: "saude",
    title: "Direito da Saúde",
    slug: "saude",
    description: "Defesa técnica regulatória administrativa e contenciosa voltada para operadoras, hospitais e clínicas sob a ANS.",
    extendedDescription: "Representamos operadoras de planos de saúde, redes de clínicas privadas e laboratórios em autuações regulatórias, defesas frente à ANS e órgãos de defesa do consumidor, e demandas civis de alta complexidade médica.",
    howWeAct: [
      "Defesas contundentes perante a ANS relativas à regulação e reembolsos",
      "Contratos de alta complexidade regulatória entre operadoras e prestadores",
      "Compliance institucional com base em diretrizes médicas internacionais",
      "Defesa de erros técnicos atribuídos e processos de responsabilidade em saúde",
      "Assessoria jurídica preventiva em governança de riscos sanitários locais"
    ]
  },
  {
    id: "responsabilidade-civil",
    title: "Responsabilidade Civil",
    slug: "responsabilidade-civil",
    description: "Gestão técnica de reparações pecuniárias, proteção à reputação de marcas e contencioso cível indenizatório.",
    extendedDescription: "Especializados no resguardo de prejuízos extraordinários de grandes marcas comerciais. Oferecemos defesas processuais eficientes em demandas de compensação civil e danos materiais em toda a federação brasileira.",
    howWeAct: [
      "Análise preventiva de riscos cíveis geradores de passivos de indenização",
      "Defesa em ações coletivas cíveis de grande alcance de opinião pública",
      "Pareceres técnicos em contratos de seguro de diretores e executivos (D&O)",
      "Atuação firme na preservação e reparabilidade de imagem perante mídias",
      "Gestão sob litígios contratuais complexos envolvendo inadimplemento civil"
    ]
  },
  {
    id: "trabalhista-empresarial",
    title: "Trabalhista Empresarial",
    slug: "trabalhista-empresarial",
    description: "Segurança total no gerenciamento das relações de trabalho, compliance preventivo e blindagem do passivo.",
    extendedDescription: "Nosso campo de atuação no Direito Trabalhista vai desde o consultivo, preventivo, administrativo, até o judicial. Atuamos de forma estratégica para mitigar conflitos laborais e blindar o passivo de empresas com rigor processual e controle de contingências.",
    howWeAct: [
      "Consultoria preventiva diária de condutas laborais e RH",
      "Auditoria jurídica detalhada de práticas de admissão e demissão",
      "Estruturação de políticas de remuneração variável e compliances",
      "Defesa contenciosa qualificada com teses focadas nos Tribunais Superiores",
      "Gestão estratégica de passivo e mitigação de reparações pecuniárias"
    ]
  },
  {
    id: "sucessao-familiar",
    title: "Sucessão Familiar",
    slug: "sucessao-familiar",
    description: "Estratégia legal refinada para perpetuar patrimônio, valores familiares e o legado imaterial de geração em geração.",
    extendedDescription: "A sucessão é o conjunto de princípios e de normas que regem a transferência do patrimônio aos herdeiros. Atuamos de maneira estruturada no planejamento sucessório para garantir a perenidade de empresas familiares e fortunas consolidadas.",
    howWeAct: [
      "Desenho e estruturação de Holdings Familiares e Patrimoniais",
      "Elaboração de acordos de sócios complexos e protocolos de herança",
      "Condução técnica de processo sucessório com resguardo de herdeiros",
      "Estruturação de doações com reserva de usufruto e restrições jurídicas",
      "Organização de transferências societárias e governança preventiva"
    ]
  }
];

export const CLIENT_SECTORS: ClientSector[] = [
  {
    id: "pagamento-variavel",
    name: "Sistema de Pagamento Variável",
    representativeness: "Incentivos corporativos de alta produtividade (PLR, Bônus, LTI, Stock Options).",
    description: "Estruturação sob medida de planos de participação de lucros e resultados, bônus executivos e opções de compra de ações de forma lícita, segura e alinhada às decisões do TST, eliminando reflexos de natureza salarial indesejados.",
    highlights: ["Acordos de PLR sob a Lei 10.101", "Stock Options Plans customizados", "Metas e KPIs com respaldo legal"]
  },
  {
    id: "reforma-tributaria",
    name: "Reforma Tributária",
    representativeness: "Consultoria preditiva, transição operacional e simulação de impactos fiscais.",
    description: "Simulação financeira e planejamento preventivo para enquadramento nas alterações do novo Sistema Tributário Nacional (IBS, CBS e imposto seletivo). Reestruturação de canais comerciais e cadeias de suprimentos para absorver os impactos com total resguardo administrativo.",
    highlights: ["Cálculo projetivo CBS/IBS", "Aproveitamento de créditos de transição", "Readequação de contratos e preços"]
  },
  {
    id: "nr-1",
    name: "NR-1 (Segurança e Saúde do Trabalho)",
    representativeness: "Gerenciamento de Riscos Ocupacionais (GRO) e governança em SST.",
    description: "Implantação técnica e legal do Programa de Gerenciamento de Riscos (PGR) e conformidade integral com a NR-1. Assessoria preventiva avançada para impedir autuações e mitigar riscos gravíssimos ligados a acidentes do trabalho e passivos de insalubridade.",
    highlights: ["Auditoria técnica de GRO e PGR", "Mitigação integrada de adicionais", "Defesa contra nexo técnico causal"]
  },
  {
    id: "lgpd-compliance",
    name: "LGPD (Privacidade & Proteção de Dados)",
    representativeness: "Adequação integral multimilionária, treinamento DPO e defesa de incidentes.",
    description: "Conformidade geral com a Lei Geral de Proteção de Dados por design. Mapeamento analítico de processos de circulação de dados, auditoria de segurança da informação legada, contratos de terceirização blindados e representação firme perante a ANPD em eventuais contestações.",
    highlights: ["DPO as a Service executivo", "Data Mapping e Avaliação (RIPD)", "Treinamento ético e plano de resposta"]
  },
  {
    id: "penal-empresarial",
    name: "Penal Empresarial",
    representativeness: "Patrocínio defensivo técnico em âmbito penal, financeiro e tributário.",
    description: "Defesa criminal corporativa de alto nível para fundadores e executivos frente a alegações de fraudes financeiras, crimes ambientais de escala, sonegação tributária e concorrência desleal. Atuação voltada à total confidencialidade e preservação de reputação comercial.",
    highlights: ["Defesas firmes em Inquéritos Policiais", "Compliance penal estratégico", "Gestão confidencial de crises"]
  },
  {
    id: "holding-patrimonial",
    name: "Holding e Planejamento Sucessório",
    representativeness: "Criação de Holdings familiares e proteção do patrimônio intergeracional.",
    description: "Desenho societário sofisticado de empresas holding com reservas de usufruto e cláusulas de inalienabilidade e impenhorabilidade. Condução profissional e pacífica de protocolos de família para evitar a desintegração de fortunas societárias ou empreendimentos operacionais.",
    highlights: ["Protocolos de Acordo de Herdeiros", "Estruturas societárias imunes", "Planejamento tributário pré-sucessão"]
  },
  {
    id: "gestao-passivos",
    name: "Gestão de Passivos",
    representativeness: "Reorganização de passivos estruturados e negociações sob sigilo absoluto.",
    description: "Análise técnica integral e negociação estratégica de contingências e passivos financeiros com bancos, fornecedores e entes públicos. Modelagem de planos de recuperação extrajudicial e resgate operacional de fluxos de caixa corporativos sem quebra de credibilidade.",
    highlights: ["Dação em pagamento blindada", "Arbitragem e negociação sindical", "Alongamento estratégico profissional"]
  },
  {
    id: "blindagem-trabalhista",
    name: "Blindagem Trabalhista",
    representativeness: "Auditoria preventiva cirúrgica, renegociação de normas e controle de riscos.",
    description: "Análise profunda de práticas de RH, contratos de prestadores de serviços, terceirizações lícitas e PJ. Implementação de defesas cirúrgicas que diminuem sensivelmente o volume de reclamações ativas e evitam sanções administrativas do Ministério do Trabalho.",
    highlights: ["Auditoria profunda de contratos PJ", "Acordos e convenções de vanguarda", "Defesas trabalhistas nos tribunais"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Dr. Roberto Albuquerque",
    position: "Diretor Jurídico de Holding Siderúrgica",
    company: "Grupo Albuquerque S/A",
    text: "O Gouvêa dos Reis salvou a nossa governança societária em um momento de profunda transição familiar. A capacidade técnica e a discrição deles foram exemplares. O acompanhamento humanizado e o refinamento das estruturas criadas deram segurança para as próximas três gerações.",
    isAnonymized: false
  },
  {
    id: "t2",
    author: "Executivo Anônimo",
    position: "C-Level de Multi-indústria Alimentícia",
    company: "Grupo Alimentar Premium",
    text: "Em termos de contencioso trabalhista de alto risco, a equipe do GDR demonstrou um conhecimento do STF que mudou o panorama de nossa contingência fiscal de forma decisiva. Recomendo para qualquer empresa que veja a advocacia como investimento e blindagem estratégica.",
    isAnonymized: true
  },
  {
    id: "t3",
    author: "Mariana L. de Castro",
    position: "Fundadora de Family Office de Luxo",
    company: "Castro & Associados Patrimônio",
    text: "A assessoria no planejamento tributário nacional e aduaneiro deles reduziu nossa exposição corporativa em milhões de forma estritamente legal. Uma abordagem limpa, altamente corporativa e com prazos respeitados milimetricamente.",
    isAnonymized: false
  }
];

export const OFFICE_ADDRESSES: OfficeAddress[] = [
  {
    city: "Florianópolis",
    state: "SC",
    street: "Avenida Rio Branco, 691",
    suite: "3º Andar — Centro Executivo Atlantis — Centro",
    zipCode: "88015-203",
    phone: "+55 (48) 3222-9696",
    email: "secretaria@gdr.adv.br",
    workingHours: "Segunda a Sexta, das 08h às 12h e das 13h30 às 18h"
  }
];

export const CERTIFICATES = [
  {
    id: "c1",
    title: "Análise Advocacia 500",
    year: "Reconhecimento Consecutivo desde 2012",
    description: "Eleito entre os escritórios de advocacia mais admirados do Brasil pelas maiores empresas do país na categoria Trabalhista e Tributária."
  },
  {
    id: "c2",
    title: "Selo de Excelência GDR",
    year: "Mais de 57 Anos",
    description: "Compromisso inegociável com a ética, discrição total, atendimento personalizado ao cliente corporativo e soluções jurídicas integradas."
  },
  {
    id: "c3",
    title: "ISO 9001 Compliance",
    year: "Gestão Integrada",
    description: "Padronização de processos jurídicos e administrativos com foco no atendimento corporativo de alto nível e menor tempo de resposta."
  }
];
