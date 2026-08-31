export interface ArticleAuthor {
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
}

export interface ArticleSection {
  heading?: string;
  content: string[];
  bullets?: { title?: string; text: string }[];
  callout?: { title?: string; text: string };
  numberedList?: { number: string; title?: string; text: string }[];
}

export interface ArticleData {
  id: string;
  slug: string;
  category: "artigos";
  categoryLabel: string;
  subcategory: string;
  title: string;
  lead: string;
  description: string;
  badge: string;
  date: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorImage: string;
  authors?: ArticleAuthor[];
  readTimeOrDuration: string;
  imageUrl: string;
  youtubeVideoUrl?: string;
  youtubeVideoTitle?: string;
  sections: ArticleSection[];
  conclusion?: string;
  conclusionTitle?: string;
  recommendationBox?: { title: string; text: string };
  references?: string[];
  whatsappMessage?: string;
}

export const ARTICLES_DATA: ArticleData[] = [
  {
    id: "a-corretor-associado",
    slug: "corretor-associado-na-pratica-seguranca-juridica-e-gestao-preventiva-para-imobiliarias",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Imobiliário",
    title: "Corretor Associado na Prática: Segurança Jurídica e Gestão Preventiva para Imobiliárias",
    lead: "Por que a informalidade histórica no mercado imobiliário não tem mais espaço e como a Lei nº 13.097/2015 oferece o modelo contratual ideal para imobiliárias e corretores.",
    description: "Historicamente, o mercado imobiliário operou com base em arranjos informais entre imobiliárias e profissionais autônomos. Saiba como a Lei 13.097/2015 parametriza o contrato de corretor associado, afastando passivos trabalhistas.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Dr. Murilo Gouvêa dos Reis e Marcelo Brognoli",
    authorRole: "Advogado Especialista em Direito Imobiliário e Trabalhista • Presidente do CRECI-SC",
    authorBio: "Dr. Murilo Gouvêa dos Reis é Mestre em Relações Internacionais, especialista em Direito do Trabalho, idealizador da regulamentação do Corretor Associado e assessor jurídico de imobiliárias e construtoras em todo o Brasil. Marcelo Brognoli é Presidente do CRECI-SC e liderança da Brognoli Imóveis.",
    authorImage: "https://cdn.sanity.io/images/xkc900rm/production/9729452190d4d3869eecafefbc3c9db5a230e50d-2640x3960.jpg",
    authors: [
      {
        name: "Dr. Murilo Gouvêa dos Reis",
        role: "Advogado Trabalhista e Empresarial • Sócio-Diretor Geral",
        image: "https://cdn.sanity.io/images/xkc900rm/production/9729452190d4d3869eecafefbc3c9db5a230e50d-2640x3960.jpg",
        bio: "Mestre em Relações Internacionais e especialista em Direito do Trabalho. Formado pela International Academy for Leadership (Alemanha). Idealizador da Lei do Corretor Associado e assessor jurídico de imobiliárias e construtoras em todo o Brasil."
      },
      {
        name: "Marcelo Brognoli",
        role: "Presidente do CRECI-SC • Diretor da Brognoli Imóveis",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
        bio: "Presidente do Conselho Regional de Corretores de Imóveis de Santa Catarina (CRECI-SC) e líder da Brognoli Imóveis, atuando no fortalecimento institucional e na profissionalização do mercado imobiliário."
      }
    ],
    readTimeOrDuration: "8 min de leitura",
    imageUrl: "https://i.ibb.co/k2FMbk0b/CR-Associado.jpg",
    youtubeVideoUrl: "https://youtu.be/0nl8SLGGuxs",
    youtubeVideoTitle: "Corretor Associado na prática: o que imobiliárias precisam saber",
    whatsappMessage: "Olá! Li o artigo sobre 'Corretor Associado na Prática' no portal GDR e gostaria de orientações sobre a assessoria imobiliária.",
    sections: [
      {
        heading: "A gênese da regulamentação no mercado imobiliário",
        content: [
          "Historicamente, o mercado imobiliário operou com base em arranjos informais entre imobiliárias e profissionais autônomos. No entanto, em um setor que movimenta bilhões anualmente e envolve operações de alto valor, a ausência de parametrização jurídica gera passivos trabalhistas severos e insegurança para investidores e clientes.",
          "A relação entre a imobiliária e o corretor não pode ser tratada de maneira improvisada. A consolidação legislativa veio exatamente para trazer segurança para ambos os lados da intermediação imobiliária."
        ]
      },
      {
        heading: "1. O \"Terceiro Gênero\" Contratual",
        content: [
          "A inclusão dos parágrafos 2º, 3º e 4º no artigo 6º da Lei nº 6.530/1978 (introduzida pela Lei nº 13.097/2015) criou um modelo jurídico próprio para o setor:"
        ],
        bullets: [
          {
            title: "Não é CLT e não é mera prestação de serviços genérica",
            text: "Trata-se de um contrato de associação civil específico, desenhado sob medida para a dinâmica de intermediação imobiliária."
          },
          {
            title: "Autonomia profissional preservada",
            text: "A lei estabelece expressamente a ausência de subordinação e de vínculo empregatício ou previdenciário, desde que observados os parâmetros legais."
          },
          {
            title: "Sem quarentena",
            text: "Diferente da terceirização tradicional da CLT (que impõe quarentena de 6 meses para migração de CLT para PJ), o enquadramento como corretor associado possui flexibilidade operacional imediata."
          }
        ]
      },
      {
        heading: "2. O Comportamento Prático Fala Mais Alto que o Papel",
        content: [
          "A validação do contrato nos Tribunais Regionais do Trabalho (TRTs) e no STF depende estritamente do alinhamento entre o documento e a rotina da empresa:"
        ],
        bullets: [
          {
            title: "Coordenação vs. Subordinação",
            text: "Imobiliária e corretor coordenam a atuação para atender ao cliente final (comprador, vendedor ou locador). Gestores não devem emitir ordens diretas, impor sanções disciplinares ou controlar jornadas e horários rígidos."
          },
          {
            title: "Registro Obrigatório",
            text: "Para eficácia e validade, o contrato de associação deve ser devidamente registrado no respectivo Sindicato de Corretores de Imóveis (Sindimóveis) ou na delegacia da Federação Nacional dos Corretores de Imóveis (FENACI)."
          }
        ]
      },
      {
        heading: "3. Gestão Financeira e Split de Pagamento",
        content: [
          "A gestão dos recebíveis e o formato de remuneração são pilares fundamentais da higidez jurídica do modelo:"
        ],
        bullets: [
          {
            title: "Partilha de Resultados",
            text: "A comissão decorre do esforço conjunto. A implementação do split payment (diretamente pelas partes, construtoras ou via fintechs) garante transparência e rastreabilidade da receita."
          },
          {
            title: "Eficiência Tributária",
            text: "Na pessoa física, o profissional está sujeito à retenção de até 27,5% de IRPF; já na constituição de pessoa jurídica individual (PJ), a carga tributária é reduzida substancialmente (14% a 15%), ampliando a regularidade fiscal."
          }
        ]
      }
    ],
    conclusionTitle: "Conclusão",
    conclusion: "A formalização da relação de associação protege a imobiliária contra passivos trabalhistas retroativos, assegura a comprovação de renda do profissional e confere solidez institucional em processos de valuation e auditorias (due diligence).",
    references: [
      "BRASIL. Lei nº 6.530, de 12 de maio de 1978. Regulamenta a profissão de Corretor de Imóveis.",
      "BRASIL. Lei nº 13.097, de 19 de janeiro de 2015. Disciplina o contrato de associação entre corretores de imóveis e imobiliárias.",
      "CONSELHO FEDERAL DE CORRETORES DE IMÓVEIS (COFECI). Resoluções normativas sobre intermediação imobiliária e contratos de associação."
    ]
  },
  {
    id: "a-crimes-tributarios",
    slug: "crimes-tributarios-o-limite-entre-a-inadimplencia-fiscal-e-a-responsabilidade-criminal-do-empresario",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Penal e Tributário",
    title: "Crimes Tributários: O Limite entre a Inadimplência Fiscal e a Responsabilidade Criminal do Empresário",
    lead: "Compreenda quando o não recolhimento de tributos ultrapassa a esfera administrativa e ingressa na seara penal, além das estratégias legais de defesa.",
    description: "Em momentos de restrição de fluxo de caixa, o não recolhimento de tributos pode cruzar a linha da simples dívida civil e ensejar denúncias penais. Saiba quais são os tributos de risco imediato e os meios de extinção da punibilidade.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Dr. Luciano Daniel da Veiga e Dra. Paula Sade",
    authorRole: "Coordenador Tributário • Advogada Especialista em Direito Penal Empresarial",
    authorBio: "Dr. Luciano Daniel da Veiga é advogado tributarista com 20 anos de experiência, Conselheiro do TAT/SC e membro do Comitê Jurídico da FACISC. Dra. Paula Sade é pós-graduada em Direito Penal e Criminologia, especialista em defesas de crimes econômicos e compliance penal.",
    authorImage: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
    authors: [
      {
        name: "Dr. Luciano Daniel da Veiga",
        role: "Advogado Tributário • Coordenador Tributário GDR",
        image: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
        bio: "Advogado tributarista com 20 anos de experiência, pós-graduado em Direito Tributário, Conselheiro Suplente do TAT/SC e Assessor Jurídico Tributário da FACISC, especialista em contencioso e planejamento fiscal."
      },
      {
        name: "Dra. Paula Sade",
        role: "Advogada Criminal • Especialista Penal Empresarial",
        image: "https://cdn.sanity.io/images/xkc900rm/production/28d12e86c0635162fb2ee56404a6232e8785ddf0-1285x1600.jpg",
        bio: "Advogada especialista na área criminal, pós-graduada em Direito Penal e Criminologia. Atuação consolidada em defesas penais complexas, compliance criminal e crimes contra a ordem tributária."
      }
    ],
    readTimeOrDuration: "7 min de leitura",
    imageUrl: "https://i.ibb.co/60dRwnRj/CR-Tribut-rio.jpg",
    youtubeVideoUrl: "https://youtu.be/uoA4eO1_9-k",
    youtubeVideoTitle: "Crimes Tributários: quando o problema fiscal pode virar caso criminal?",
    whatsappMessage: "Olá! Li o artigo sobre 'Crimes Tributários e Responsabilidade Criminal' no portal GDR e gostaria de uma orientação jurídica preventiva.",
    sections: [
      {
        heading: "A linha tênue entre crise financeira e persecução penal",
        content: [
          "Em momentos de restrição de fluxo de caixa, muitos gestores priorizam o pagamento de fornecedores e folha salarial, postergando o recolhimento de obrigações tributárias. Contudo, essa prática pode cruzar a linha da simples dívida civil e ensejar denúncias por crimes contra a ordem tributária.",
          "Compreender a diferença entre mera dificuldade econômica e condutas fraudulentas é vital para resguardar a liberdade dos sócios e a continuidade das atividades empresariais."
        ]
      },
      {
        heading: "1. Inadimplência vs. Dolo de Fraudar",
        content: [
          "A jurisprudência brasileira e a doutrina penal estabelecem critérios rigorosos para a tipificação de crimes tributários:"
        ],
        bullets: [
          {
            title: "Mera Inadimplência",
            text: "A dificuldade financeira momentânea não constitui crime por si só. Deixar de pagar um tributo por absoluta impossibilidade conjuntural não pode ser automaticamente equiparado a fraude."
          },
          {
            title: "O Elemento Subjetivo do Dolo",
            text: "A tipificação penal exige a comprovação da intenção livre e consciente de fraudar o erário por meio de omissão de receitas, falsidade documental, criação de empresas de fachada ou simulação de operações."
          }
        ]
      },
      {
        heading: "2. Os Dois Principais Tributos de Risco Criminal Imediato",
        content: [
          "Mesmo quando as operações são devidamente informadas, dois tributos exigem atenção máxima dos gestores:"
        ],
        numberedList: [
          {
            number: "1",
            title: "Apropriação Indébita Previdenciária (INSS dos Empregados)",
            text: "O valor descontado do contracheque do trabalhador pertence à Previdência. Deixar de repassá-lo aos cofres públicos configura crime formal tipificado no art. 168-A do Código Penal."
          },
          {
            number: "2",
            title: "ICMS Declarado e Não Pago",
            text: "Conforme tese firmada pelo STF (RHC 163.334), o não recolhimento contumaz e com dolo de apropriação do ICMS cobrado do consumidor constitui crime, expondo os administradores a processos penais estaduais."
          }
        ]
      },
      {
        heading: "3. Caminhos de Regularização e Extinção da Punibilidade",
        content: [
          "A legislação tributária e penal oferece instrumentos eficientes para afastar a persecução criminal:"
        ],
        bullets: [
          {
            title: "Auditoria da Legitimidade do Crédito",
            text: "Antes de qualquer medida, deve-se avaliar se a autuação do fisco é legítima ou se contém nulidades passíveis de cancelamento na via administrativa ou judicial."
          },
          {
            title: "Transação Tributária e Parcelamento",
            text: "A inclusão do débito em programas de parcelamento ou transação tributária tem o condão de suspender a pretensão punitiva do Estado e o curso da ação penal. Uma vez quitado integralmente o débito, opera-se a extinção da punibilidade."
          }
        ]
      }
    ],
    recommendationBox: {
      title: "Diretriz de Governança",
      text: "O alinhamento contínuo entre os setores contábil, fiscal e jurídico é indispensável para evitar que contingências de caixa se convertam em riscos à liberdade dos sócios e diretores."
    },
    references: [
      "BRASIL. Lei nº 8.137, de 27 de dezembro de 1990. Define crimes contra a ordem tributária, econômica e contra as relações de consumo.",
      "BRASIL. Código Penal Brasileiro (Decreto-Lei nº 2.848/1940), art. 168-A (Apropriação indébita previdenciária).",
      "SUPREMO TRIBUNAL FEDERAL (STF). RHC nº 163.334/SC. Rel. Min. Roberto Barroso. Criminalização do não recolhimento contumaz de ICMS próprio declarado."
    ]
  },
  {
    id: "a-lei-maria-da-penha-20-anos",
    slug: "20-anos-da-lei-maria-da-penha-avancos-legislativos-desafios-praticos-e-novos-paradigmas-de-protecao",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Criminal",
    title: "20 Anos da Lei Maria da Penha: Avanços Legislativos, Desafios Práticos e Novos Paradigmas de Proteção",
    lead: "Duas décadas após a promulgação da Lei nº 11.340/2006, analisamos o ecossistema protetivo, a multifacetada violência de gênero e os rumos da responsabilização penal.",
    description: "A sanção da Lei Maria da Penha representou um marco civilizatório na legislação brasileira. Conheça as cinco formas de violência protegidas, o funcionamento das medidas protetivas e os desafios contemporâneos da justiça restaurativa.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Dra. Paula Sade",
    authorRole: "Advogada Criminalista e Pesquisadora",
    authorBio: "Dra. Paula Sade é advogada criminalista com pós-graduação em Direito Penal e Criminologia, pesquisadora atuante na área de direitos fundamentais, violência de gênero e assistência qualificada em processos criminais.",
    authorImage: "https://cdn.sanity.io/images/xkc900rm/production/28d12e86c0635162fb2ee56404a6232e8785ddf0-1285x1600.jpg",
    authors: [
      {
        name: "Dra. Paula Sade",
        role: "Advogada Criminalista • Compliance Penal",
        image: "https://cdn.sanity.io/images/xkc900rm/production/28d12e86c0635162fb2ee56404a6232e8785ddf0-1285x1600.jpg",
        bio: "Dra. Paula Sade é advogada criminalista com pós-graduação em Direito Penal e Criminologia, pesquisadora atuante na área de direitos fundamentais, violência de gênero e assistência qualificada em processos penais."
      }
    ],
    readTimeOrDuration: "8 min de leitura",
    imageUrl: "https://i.ibb.co/3gSpQxh/Criminal.jpg",
    youtubeVideoUrl: "https://youtu.be/f9vNH7MppZE",
    youtubeVideoTitle: "Lei Maria da Penha Completa 20 Anos: O Que Mudou na Proteção das Mulheres?",
    whatsappMessage: "Olá! Li o artigo sobre '20 Anos da Lei Maria da Penha' e gostaria de consultar a equipe de direito penal/direitos fundamentais.",
    sections: [
      {
        heading: "Um marco civilizatório na história brasileira",
        content: [
          "A sanção da Lei Maria da Penha representou um marco civilizatório na legislação brasileira, fruto de intensa mobilização social e da condenação internacional do Brasil pela Comissão Interamericana de Direitos Humanos (OEA).",
          "Ao completar 20 anos de vigência em 2026, a norma consolidou não apenas respostas punitivas, mas um paradigma multidisciplinar preventivo e assistencial indispensável."
        ]
      },
      {
        heading: "1. Além da Agressão Física: O Espectro Amplo da Violência",
        content: [
          "A legislação consagrou cinco formas expressas de violência doméstica e familiar:"
        ],
        bullets: [
          {
            title: "Física",
            text: "Ofensa à integridade ou saúde corporal."
          },
          {
            title: "Psicológica",
            text: "Ameaça, humilhação, isolamento, manipulação e controle comportamental."
          },
          {
            title: "Moral",
            text: "Calúnia, difamação e injúria."
          },
          {
            title: "Patrimonial",
            text: "Retenção, subtração, destruição parcial ou total de bens, instrumentos de trabalho e recursos econômicos."
          },
          {
            title: "Sexual",
            text: "Qualquer conduta que constranja a presenciar, manter ou participar de relação sexual não desejada."
          }
        ]
      },
      {
        heading: "2. A Rede Integrada e a Não Revitalização da Vítima",
        content: [
          "O maior avanço da norma foi a criação de um ecossistema multidisciplinar:"
        ],
        bullets: [
          {
            title: "Medidas Protetivas de Urgência",
            text: "Fixação de afastamento do agressor, proibição de contato e monitoramento eletrônico (tornozeleiras e dispositivos de alerta)."
          },
          {
            title: "Casa da Mulher Brasileira e Varas Especializadas",
            text: "Atendimento conjunto de assistência jurídica (Defensoria Pública e Assistência à Acusação), suporte psicossocial e acolhimento institucional para mitigar a revitimização no sistema de justiça."
          }
        ]
      },
      {
        heading: "3. Desafios Contemporâneos e Justiça Restaurativa",
        content: [
          "Apesar do arcabouço normativo robusto, o enfrentamento à violência de gênero exige reconhecer sua natureza progressiva:"
        ],
        bullets: [
          {
            title: "Interseccionalidade",
            text: "Mulheres periféricas e em situação de vulnerabilidade enfrentam maiores barreiras no acesso célere aos órgãos judiciais."
          },
          {
            title: "Cultura e Prevenção",
            text: "A atuação penal deve ser complementada por programas reflexivos e de responsabilização dos agressores para interromper ciclos de reincidência, além de ampla conscientização social."
          }
        ]
      }
    ],
    recommendationBox: {
      title: "Canais de Apoio",
      text: "A denúncia precoce e a busca por assistência jurídica especializada salvam vidas. Ligue 180 (Central de Atendimento à Mulher) ou acione a Delegacia de Proteção à Mulher mais próxima."
    },
    references: [
      "BRASIL. Lei nº 11.340, de 7 de agosto de 2006 (Lei Maria da Penha). Cria mecanismos para coibir a violência doméstica e familiar contra a mulher.",
      "COMISSÃO INTERAMERICANA DE DIREITOS HUMANOS (CIDH/OEA). Relatório nº 54/01, Caso 12.051 (Maria da Penha Maia Fernandes vs. Brasil).",
      "CONSELHO NACIONAL DE JUSTIÇA (CNJ). Diretrizes para aplicação de medidas protetivas e formulário nacional de avaliação de risco."
    ]
  },
  {
    id: "a-reforma-tributaria-2026",
    slug: "reforma-tributaria-por-que-2026-nao-e-ano-de-espera-para-as-empresas",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Tributário",
    title: "Reforma Tributária: Por Que 2026 Não É Ano de Espera para as Empresas?",
    lead: "Entenda por que a parametrização de ERPs, a gestão da não cumulatividade plena e o impacto no fluxo de caixa exigem ação imediata antes de 2027.",
    description: "Muitos executivos tratam 2026 como um período neutro de testes. Esse é um equívoco perigoso. Veja os impactos da parametrização de TI, nova não cumulatividade, enquadramento do Simples Nacional e split payment.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Dr. Luciano Daniel da Veiga",
    authorRole: "Advogado Tributarista • Sócio e Coordenador da Área Tributária",
    authorBio: "Luciano Daniel da Veiga é advogado tributarista, especialista e pós-graduado em Direito Tributário, com 20 anos de experiência nas áreas Tributária e Empresarial. É sócio e Coordenador da área tributária do escritório Gouvêa dos Reis Advogados e Assessor Jurídico Tributário da FACISC.",
    authorImage: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
    authors: [
      {
        name: "Dr. Luciano Daniel da Veiga",
        role: "Advogado Tributarista • Sócio e Coordenador Tributário GDR",
        image: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
        bio: "Luciano Daniel da Veiga é advogado tributarista, especialista e pós-graduado em Direito Tributário, com 20 anos de experiência nas áreas Tributária e Empresarial. É sócio e Coordenador da área tributária do escritório Gouvêa dos Reis Advogados e Assessor Jurídico Tributário da FACISC."
      }
    ],
    readTimeOrDuration: "9 min de leitura",
    imageUrl: "https://i.ibb.co/7xQnzDCj/Tribut-rio.jpg",
    youtubeVideoUrl: "https://youtu.be/7_Nbqn6UHfE",
    youtubeVideoTitle: "Reforma Tributária: Por que 2026 não é ano de espera?",
    whatsappMessage: "Olá! Li o artigo 'Reforma Tributária: Por Que 2026 Não É Ano de Espera' e gostaria de agendar uma consulta sobre planejamento tributário.",
    sections: [
      {
        heading: "O perigoso mito do ano de testes",
        content: [
          "Muitos executivos tratam o ano de 2026 como um período neutro ou de \"testes\", acreditando que os impactos da Reforma Tributária (Emenda Constitucional nº 132/2023) só serão sentidos com a entrada em vigor plena dos novos tributos. Esse é um equívoco perigoso.",
          "As decisões fiscais, contratuais e tecnológicas tomadas durante este ano determinarão a sobrevivência e a margem de lucro das empresas no novo cenário tributário nacional."
        ]
      },
      {
        heading: "1. A Janela Regulatória dos 4 Meses e o Destaque em Nota",
        content: [
          "Com a publicação dos regulamentos do Imposto sobre Bens e Serviços (IBS) e da Contribuição sobre Bens e Serviços (CBS), abriu-se um prazo regulamentar para as empresas adaptarem seus sistemas:"
        ],
        bullets: [
          {
            title: "Parametrização Obrigatória de TI",
            text: "A partir de 2026, as notas fiscais já exigem a segregação e destaque operacional de IBS e CBS. Empresas sem sistemas atualizados estão expostas a penalidades por descumprimento de obrigações acessórias."
          }
        ]
      },
      {
        heading: "2. A Não Cumulatividade Plena e a Gestão de Fornecedores",
        content: [
          "O novo sistema altera profundamente a relação comercial entre empresas e seus fornecedores de insumos:"
        ],
        bullets: [
          {
            title: "Crédito Vinculado ao Pagamento Efetivo",
            text: "Sob o novo sistema, o creditamento tributário na entrada não ocorre mais no mero faturamento da nota, mas na liquidação financeira efetiva da operação."
          },
          {
            title: "Revisão da Cadeia de Suprimentos",
            text: "Adquirir insumos ou serviços de parceiros que não geram créditos ou que geram créditos reduzidos altera o custo final. A precificação e a seleção de fornecedores tornam-se decisões estratégicas conjuntas entre Compras, Finanças e Jurídico."
          }
        ]
      },
      {
        heading: "3. A Encruzilhada do Simples Nacional",
        content: [
          "As empresas optantes pelo Simples Nacional enfrentam prazos decisivos de enquadramento:"
        ],
        bullets: [
          {
            title: "Regime Normal vs. Regime Híbrido",
            text: "Empresas que vendem no modelo B2B (para outras pessoas jurídicas) precisarão migrar para o modelo híbrido (recolhendo IBS/CBS por fora) para transferir créditos integrais aos clientes, sob risco de perda de competitividade comercial. Já no mercado B2C (consumidor final), a manutenção no regime simplificado tradicional pode ser a opção mais vantajosa."
          }
        ]
      },
      {
        heading: "4. O Choque do Split Payment no Fluxo de Caixa",
        content: [
          "A regulamentação do split payment automatizará a retenção do tributo no ato da transação bancária/cartão. Aquele valor que as empresas utilizavam transitoriamente como capital de giro não ingressará mais na conta corrente, exigindo uma reestruturação profunda da tesouraria."
        ]
      }
    ],
    recommendationBox: {
      title: "Recomendação Estratégica",
      text: "A Reforma Tributária é uma reforma do modelo de negócios. O diagnóstico da operação e o planejamento tributário preventivo devem ser concluídos imediatamente."
    },
    references: [
      "BRASIL. Emenda Constitucional nº 132, de 20 de dezembro de 2023. Altera o Sistema Tributário Nacional.",
      "BRASIL. Lei Complementar nº 214, de 16 de janeiro de 2025. Institui o IBS, a CBS e o Imposto Seletivo.",
      "COMITÊ GESTOR DO IBS. Regulamentos e resoluções sobre leiautes de documentos fiscais e split payment."
    ]
  },
  {
    id: "a-holding-familiar-e-imobiliaria",
    slug: "holding-familiar-e-imobiliaria-quando-vale-a-pena-e-os-riscos-das-solucoes-de-prateleira",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Holding",
    title: "Holding Familiar e Imobiliária: Quando Vale a Pena (e os Riscos das Soluções \"De Prateleira\")",
    lead: "Análise técnica sobre planejamento sucessório, eficiência tributária na locação de imóveis e os cuidados documentais prévios à constituição da sociedade.",
    description: "A busca por Holdings patrimoniais cresceu exponencialmente. Todavia, a disseminação de contratos padronizados tem produzido nulidades jurídicas e prejuízos fiscais. Conheça os pilares de uma estruturação segura.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Dr. Murilo Gouvêa dos Reis, Dr. Sérgio de Miranda e Dr. Luciano Daniel da Veiga",
    authorRole: "Sócios GDR • Especialistas em Direito Sucessório, Imobiliário e Tributário",
    authorBio: "Equipe multidisciplinar de sócios do Gouvêa dos Reis Advogados especializada na constituição personalizada de holdings patrimoniais, blindagem jurídica sucessória e governança corporativa familiar.",
    authorImage: "https://cdn.sanity.io/images/xkc900rm/production/6628ec71555a4656571770e10983fc9af7c5a851-2640x3051.jpg",
    authors: [
      {
        name: "Dr. Murilo Gouvêa dos Reis",
        role: "Advogado Trabalhista e Empresarial • Sócio-Diretor Geral",
        image: "https://cdn.sanity.io/images/xkc900rm/production/9729452190d4d3869eecafefbc3c9db5a230e50d-2640x3960.jpg",
        bio: "Mestre em Relações Internacionais e Especialista em Direito do Trabalho. Formado pela International Academy for Leadership (Alemanha). Atua na governança corporativa e planejamento sucessório empresarial."
      },
      {
        name: "Dr. Sérgio de Miranda",
        role: "Advogado Imobiliário & Holding • Especialista Notarial",
        image: "https://cdn.sanity.io/images/xkc900rm/production/6628ec71555a4656571770e10983fc9af7c5a851-2640x3051.jpg",
        bio: "Pós-graduado em Direito Imobiliário e Notarial/Registral, associado ao IBRADIM e membro da Comissão de Direito Notarial da OAB/SC, com 25 anos de prática em contratos e holdings patrimoniais."
      },
      {
        name: "Dr. Luciano Daniel da Veiga",
        role: "Advogado Tributário • Coordenador Tributário GDR",
        image: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
        bio: "Especialista em Direito Tributário, Assessor da FACISC e Conselheiro do TAT/SC, responsável pela engenharia fiscal e mitigação legítima de tributos na integralização de holdings."
      }
    ],
    readTimeOrDuration: "10 min de leitura",
    imageUrl: "https://i.ibb.co/GvFdBdmF/Holding.jpg",
    youtubeVideoUrl: "https://youtu.be/uR8Vi3g2EH0",
    youtubeVideoTitle: "Holding: quando vale a pena — e quando NÃO vale",
    whatsappMessage: "Olá! Li o artigo 'Holding Familiar e Imobiliária: Quando Vale a Pena' e gostaria de consultar a equipe de Planejamento Patrimonial.",
    sections: [
      {
        heading: "A ilusão das fórmulas mágicas e dos modelos padronizados",
        content: [
          "A busca pela estruturação de Holdings patrimoniais cresceu exponencialmente nos últimos anos. Todavia, a disseminação de contratos padronizados (\"de prateleira\") tem produzido nulidades jurídicas e prejuízos fiscais consideráveis.",
          "Cada patrimônio e cada família possuem dinâmicas sucessórias, regimes de bens e ativos únicos que exigem engenharia jurídica sob medida."
        ]
      },
      {
        heading: "1. Os Quatro Pilares de uma Holding Bem Estruturada",
        content: [
          "Uma holding só cumpre plenamente o seu papel quando alicerçada em quatro frentes:"
        ],
        numberedList: [
          {
            number: "1",
            title: "Planejamento Tributário (Tax Planning)",
            text: "Redução da tributação sobre locação de imóveis (tributação no Lucro Presumido em torno de 11% a 14%, contra até 27,5% no IRPF) e economia no ganho de capital na alienação de ativos."
          },
          {
            number: "2",
            title: "Sucessão sem Traumas e Fim do Inventário",
            text: "Transferência das quotas aos herdeiros com cláusula de reserva de usufruto, mantendo a gestão e a administração política integral com os patriarcas/matriarcas durante toda a vida."
          },
          {
            number: "3",
            title: "Proteção Patrimonial Lícita",
            text: "Blindagem patrimonial legítima e organização de ativos materiais, financeiros e imateriais (direitos autorais, ativos digitais)."
          },
          {
            number: "4",
            title: "Organização Documental Prévia",
            text: "Identificação e saneamento de pendências em matrículas, averbações de construções, partilhas e inventários antigos."
          }
        ]
      },
      {
        heading: "2. A Necessidade da Due Diligence Imobiliária",
        content: [
          "A holding não nasce no Contrato Social na Junta Comercial; ela nasce na conferência minuciosa dos documentos no Registro de Imóveis.",
          "Matrículas com falhas de averbação (divórcio não averbado, habite-se pendente, descrições precárias) impedem a integralização do capital social e a fruição de benefícios fiscais."
        ]
      },
      {
        heading: "3. ITBI e ITCMD na Transição Tributária",
        content: [
          "O aspecto tributário exige rigor técnico na análise das imunidades e doações:"
        ],
        bullets: [
          {
            title: "Imunidade de ITBI",
            text: "A transferência de imóveis para integralização de capital social é constitucionalmente imune, demandando análise técnica quanto à preponderância de atividade imobiliária frente aos precedentes dos Tribunais Superiores (Tema 796 do STF)."
          },
          {
            title: "Planejamento do ITCMD",
            text: "A doação de quotas com reserva de usufruto permite mitigar a base de cálculo do imposto sobre heranças/doações e escalonar transferências em conformidade com as regras estaduais de isenção."
          },
          {
            title: "Cadastro Imobiliário Brasileiro (CIB)",
            text: "Com a integração de dados da Receita Federal e concessionárias de serviços públicos, a omissão de rendimentos de aluguéis na pessoa física será facilmente identificada, tornando a holding uma necessidade de conformidade."
          }
        ]
      }
    ],
    recommendationBox: {
      title: "Ponto de Atenção",
      text: "A família deve participar do processo. A elaboração de regras sucessórias deve ser acompanhada do alinhamento dos regimes de bens dos herdeiros (pactos antenupciais e contratos de convivência) para resguardar o patrimônio comum."
    },
    references: [
      "BRASIL. Código Civil (Lei nº 10.406/2002), arts. 997 a 1.087 (Sociedades Limitadas) e arts. 1.784 a 2.027 (Direito das Sucessões).",
      "BRASIL. Constituição Federal de 1988, art. 156, § 2º, I (Imunidade de ITBI).",
      "SUPREMO TRIBUNAL FEDERAL (STF). Tema 796 de Repercussão Geral (RE 796.376). Alcance da imunidade de ITBI na integralização de capital social."
    ]
  },
  {
    id: "a-nr1-saude-mental-riscos-psicossociais",
    slug: "nr-1-e-riscos-psicossociais-a-saude-mental-como-obrigacao-juridica-e-estrategica-na-empresa",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Trabalhista",
    title: "NR-1 e Riscos Psicossociais: A Saúde Mental como Obrigação Jurídica e Estratégica na Empresa",
    lead: "Como a fiscalização trabalhista, o passivo de indenizações e a gestão de pessoas foram transformados pela exigência de mapeamento contínuo dos ambientes corporativos.",
    description: "Com mais de 400 mil afastamentos anuais por transtornos mentais, a saúde mental corporativa virou obrigação legal estrita na NR-1. Conheça as exigências do PGR/GRO e o ROI da prevenção jurídica.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Dra. Flávia, Dr. Murilo Gouvêa dos Reis e Dr. Mauro Moraes",
    authorRole: "Psicóloga Organizacional • Advogados Especialistas em Direito do Trabalho",
    authorBio: "Equipe multidisciplinar combinando psicologia do trabalho e advocacia corporativa para implementação de programas de conformidade à NR-1, prevenção de passivos trabalhistas e saúde ocupacional.",
    authorImage: "https://cdn.sanity.io/images/xkc900rm/production/1620b08205fc2eefe21cb6ac6c3b0f45d2e5cd8b-2640x2654.jpg",
    authors: [
      {
        name: "Dra. Flávia",
        role: "Psicóloga Organizacional • Fatores Psicossociais",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        bio: "Psicóloga especialista em Psicologia Organizacional e do Trabalho, atuando no diagnóstico e mapeamento de fatores psicossociais corporativos, treinamentos de lideranças e bem-estar preventivo sob a nova NR-1."
      },
      {
        name: "Dr. Murilo Gouvêa dos Reis",
        role: "Advogado Trabalhista e Empresarial • Sócio-Diretor Geral",
        image: "https://cdn.sanity.io/images/xkc900rm/production/9729452190d4d3869eecafefbc3c9db5a230e50d-2640x3960.jpg",
        bio: "Mestre em Relações Internacionais e Especialista em Direito do Trabalho. Assessor de grandes entidades empresariais, com foco na mitigação preventiva de passivos trabalhistas estratégicos e SST."
      },
      {
        name: "Dr. Mauro de Moraes",
        role: "Advogado Trabalhista • Defesa Patronal e SST",
        image: "https://cdn.sanity.io/images/xkc900rm/production/1620b08205fc2eefe21cb6ac6c3b0f45d2e5cd8b-2640x2654.jpg",
        bio: "Graduado pela PUCRS e pós-graduado em Direito do Trabalho, Processo do Trabalho e Seguridade Social pela FMP, atuando na seara trabalhista preventiva e no contencioso patronal qualificado."
      }
    ],
    readTimeOrDuration: "8 min de leitura",
    imageUrl: "https://i.ibb.co/8DRJyHht/NR1.jpg",
    youtubeVideoUrl: "https://youtu.be/S6Z5W8ZrHks",
    youtubeVideoTitle: "NR-1: a saúde mental virou obrigação na sua empresa",
    whatsappMessage: "Olá! Li o artigo sobre 'NR-1 e Riscos Psicossociais' no portal GDR e gostaria de informações sobre conformidade e assessoria trabalhista.",
    sections: [
      {
        heading: "A saúde mental como obrigação legal estrita",
        content: [
          "Com mais de 400 mil afastamentos anuais por transtornos mentais e comportamentais no Brasil (incluindo Burnout, depressão e crises de pânico), a saúde mental corporativa deixou de ser mera pauta de RH e passou a configurar obrigação legal estrita.",
          "A integração entre Medicina do Trabalho, Psicologia e Direito é a única forma de garantir conformidade real e proteção ao balanço da empresa."
        ]
      },
      {
        heading: "1. A Exigência Legal dos Fatores Psicossociais",
        content: [
          "A atualização da NR-1 impõe que as organizações incluam os riscos psicossociais no seu Programa de Gerenciamento de Riscos (PGR) e no Gerenciamento de Riscos Ocupacionais (GRO):"
        ],
        bullets: [
          {
            title: "Fatores de Risco no Ambiente",
            text: "Cobrança desmedida por metas inatingíveis, jornadas excessivas, comunicação violenta, ausência de autonomia, assédio moral e conflitos de liderança."
          },
          {
            title: "A Falácia do \"PGR de Prateleira\"",
            text: "Modelos genéricos baixados na internet não possuem validade técnica. A norma exige metodologia científica de mapeamento, laudo emitido por especialistas em psicologia do trabalho e implementação de um plano de ação contínuo."
          }
        ]
      },
      {
        heading: "2. A Conexão Multidisciplinar (Psicologia + Jurídico 360°)",
        content: [
          "A blindagem jurídica efetiva depende do registro documental consistente de todas as ações corporativas:"
        ],
        bullets: [
          {
            title: "Mapeamento Clínico-Organizacional",
            text: "A psicologia atua no diagnóstico do clima, treinamento de líderes em comunicação não violenta e desenho de ações preventivas."
          },
          {
            title: "Blindagem e Registro Documental",
            text: "O jurídico formaliza contratos, manuais internos de conduta, canais de denúncia idôneos e registros probatórios das ações de mitigação tomadas pela empresa."
          },
          {
            title: "Desmotivação da Condenação Judicial",
            text: "Em eventuais reclamatórias trabalhistas ou inquéritos do Ministério Público do Trabalho (MPT), o juiz exigirá a prova documental de que a empresa agiu ativamente para prevenir e coibir o adoecimento do trabalhador."
          }
        ]
      },
      {
        heading: "3. O Retorno sobre o Investimento (ROI) da Prevenção",
        content: [
          "Investir no cumprimento técnico da NR-1 gera impactos diretos no balanço:"
        ],
        bullets: [
          {
            title: "Evita multas administrativas",
            text: "Impede autuações fiscais do Ministério do Trabalho e execuções de Termos de Ajustamento de Conduta (TACs)."
          },
          {
            title: "Previne condenações judiciais",
            text: "Afastamento de pensões vitalícias em ações trabalhistas com alegação de nexo concausal de adoecimento."
          },
          {
            title: "Redução de custos ocultos",
            text: "Diminui absenteísmo, turnover, encargos de FGTS durante afastamentos e despesas de treinamento de substitutos, elevando a produtividade e a reputação da marca empregadora."
          }
        ]
      }
    ],
    references: [
      "MINISTÉRIO DO TRABALHO E EMPREGO (MTE). Norma Regulamentadora nº 1 (NR-1) — Disposições Gerais e Gerenciamento de Riscos Ocupacionais.",
      "ORGANIZAÇÃO INTERNACIONAL DO TRABALHO (OIT). Diretrizes sobre segurança, saúde no trabalho e fatores psicossociais.",
      "TRIBUNAL SUPERIOR DO TRABALHO (TST). Jurisprudência consolidada sobre responsabilidade civil por assédio moral e doenças ocupacionais concausais."
    ]
  },
  {
    id: "a-cotas-pcd-hospitais",
    slug: "cotas-de-pcd-em-hospitais-o-desafio-juridico-de-conciliar-a-inclusao-com-a-seguranca-assistencial",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Saúde e Hospitalar",
    title: "Cotas de PCD em Hospitais: O Desafio Jurídico de Conciliar a Inclusão com a Segurança Assistencial",
    lead: "A importância de adequar a base de cálculo da Lei nº 8.213/1991 à realidade dos setores críticos de saúde por meio de perícia técnica individualizada.",
    description: "No ambiente hospitalar, a aplicação genérica e linear dos percentuais de cota de PCD enfrenta obstáculos operacionais singulares em setores críticos de saúde. Conheça as estratégias de defesa e flexibilização da base de cálculo.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Dr. Renato Gouvêa dos Reis",
    authorRole: "Advogado Empresarial e Especialista em Relações de Trabalho na Saúde",
    authorBio: "Dr. Renato Gouvêa dos Reis possui 27 anos de experiência em consultoria estratégica para grandes corporações e operadoras de saúde, atuando em negociações com MPT, conformidade regulatória e gestão de riscos assistenciais.",
    authorImage: "https://cdn.sanity.io/images/xkc900rm/production/a969db5f64f0576f00c6bb17feabc587c6d5d3a4-1080x1350.png",
    authors: [
      {
        name: "Dr. Renato Gouvêa dos Reis",
        role: "Advogado Empresarial • Relações de Trabalho na Saúde",
        image: "https://cdn.sanity.io/images/xkc900rm/production/a969db5f64f0576f00c6bb17feabc587c6d5d3a4-1080x1350.png",
        bio: "Dr. Renato Gouvêa dos Reis possui 27 anos de experiência em consultoria estratégica para grandes corporações e operadoras de saúde, atuando em negociações com MPT, conformidade regulatória e gestão de riscos assistenciais."
      }
    ],
    readTimeOrDuration: "8 min de leitura",
    imageUrl: "https://i.ibb.co/jndQR07/PCD.jpg",
    youtubeVideoUrl: "https://youtu.be/gHpjJxndBgs",
    youtubeVideoTitle: "Cotas PCD em Hospitais: quando a exigência ignora a realidade assistencial",
    whatsappMessage: "Olá! Li o artigo sobre 'Cotas de PCD em Hospitais' e gostaria de consultar a equipe de Direito da Saúde e Hospitalar.",
    sections: [
      {
        heading: "Inclusão social e os desafios singulares do setor de saúde",
        content: [
          "A inclusão social e a contratação de Pessoas com Deficiência (PCD) e beneficiários reabilitados da Previdência Social é um dever legal e corporativo fundamental. Contudo, no ambiente hospitalar, a aplicação genérica e linear dos percentuais de cota enfrenta obstáculos operacionais singulares.",
          "A compatibilização entre a exigência fiscalizatória e a salvaguarda inegociável da segurança do paciente exige embasamento técnico e teses jurídicas sólidas."
        ]
      },
      {
        heading: "1. A Singularidade do Setor de Saúde",
        content: [
          "Hospitais atuam diretamente na salvaguarda da vida humana em ambientes de altíssima complexidade e criticidade:"
        ],
        bullets: [
          {
            title: "Setores Críticos",
            text: "Unidades de Terapia Intensiva (UTI), Centros Cirúrgicos, Unidades de Hemodiálise e Bancos de Transfusão de Sangue exigem profissionais com habilitações técnicas rigorosas e pleno domínio de equipamentos médicos de suporte à vida."
          },
          {
            title: "A Regra da Igualdade Material",
            text: "Tratar de forma igual setores com naturezas completamente distintas gera riscos sanitários e operacionais involuntários."
          }
        ]
      },
      {
        heading: "2. Os Quatro Principais Obstáculos Hospitalares",
        content: [
          "A realidade cotidiana das instituições de saúde impõe barreiras objetivas ao preenchimento indistinto das vagas:"
        ],
        numberedList: [
          {
            number: "1",
            title: "Escassez de Candidatos Especializados",
            text: "Dificuldade real em encontrar profissionais PCDs com qualificações técnicas de saúde específicas (enfermagem intensivista, instrumentação cirúrgica, etc.) disponíveis no mercado."
          },
          {
            number: "2",
            title: "Exigência de Certificações e Registros de Classe",
            text: "Impossibilidade legal de alocar profissionais não habilitados em funções privativas de saúde (COREN, CRM, etc.)."
          },
          {
            number: "3",
            title: "Complexidade do Aparelhamento Hospitalar",
            text: "Equipamentos que demandam treinamentos e destrezas específicas sem margem para adaptação em situações de emergência médica."
          },
          {
            number: "4",
            title: "Responsabilidade Civil Objetiva",
            text: "A obrigação prioritária do hospital em zelar pela vida e integridade de todos os pacientes internados."
          }
        ]
      },
      {
        heading: "3. Estratégia de Defesa e Flexibilização da Base de Cálculo",
        content: [
          "Para evitar autuações do Ministério do Trabalho, imposição de TACs pelo Ministério Público do Trabalho ou restrições cadastrais (CADIN) que inviabilizem convênios públicos (SUS) e privados:"
        ],
        bullets: [
          {
            title: "Perícia Técnica In Loco Setor por Setor",
            text: "Elaboração de laudos periciais e pareceres ergonômicos detalhados em cada unidade do hospital."
          },
          {
            title: "Segregação das Funções",
            text: "Demonstração técnica em juízo de quais postos possuem viabilidade de inclusão e quais são estritamente assistenciais e incompatíveis."
          },
          {
            title: "Redefinição Judicial da Base de Cálculo",
            text: "Obtenção de provimentos jurisdicionais que excluam os cargos assistenciais de alta criticidade da base de cálculo das cotas, permitindo que a instituição cumpra a lei de forma responsável, segura e sustentável."
          }
        ]
      }
    ],
    references: [
      "BRASIL. Lei nº 8.213, de 24 de julho de 1991, art. 93 (Cota de contratação de beneficiários reabilitados e pessoas com deficiência).",
      "BRASIL. Lei nº 13.146, de 6 de julho de 2015 (Estatuto da Pessoa com Deficiência).",
      "TRIBUNAL REGIONAL DO TRABALHO (TRTs) E TST. Precedentes sobre a exclusão de cargos técnicos e assistenciais da base de cálculo de cotas de PCD em estabelecimentos hospitalares."
    ]
  },
  {
    id: "a1",
    slug: "os-limites-constitucionais-da-reforma-da-tributacao-sobre-o-consumo",
    category: "artigos",
    categoryLabel: "Artigo",
    subcategory: "Tributário",
    title: "OS LIMITES CONSTITUCIONAIS DA REFORMA DA TRIBUTAÇÃO SOBRE O CONSUMO",
    lead: "A reforma da tributação sobre o consumo representa uma das mais profundas transformações do Sistema Tributário Nacional desde a Constituição de 1988. A simplificação do modelo anterior e a busca por maior racionalidade econômica são objetivos legítimos, mas nenhum deles autoriza o afastamento dos limites impostos pela própria Constituição.",
    description: "A reforma da tributação sobre o consumo representa uma das mais profundas transformações do Sistema Tributário Nacional desde a Constituição de 1988. Analisamos os limites constitucionais, neutralidade, CBS/IBS e seus impactos.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Luciano Daniel da Veiga",
    authorRole: "Advogado Tributarista • Sócio e Coordenador da Área Tributária",
    authorBio: "Luciano Daniel da Veiga é advogado tributarista, especialista e pós-graduado em Direito Tributário, com 20 anos de experiência nas áreas Tributária e Empresarial. É sócio e Coordenador da área tributária do escritório Gouvêa dos Reis Advogados e Assessor Jurídico Tributário da FACISC.",
    authorImage: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
    authors: [
      {
        name: "Luciano Daniel da Veiga",
        role: "Advogado Tributarista • Sócio e Coordenador Tributário GDR",
        image: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
        bio: "Luciano Daniel da Veiga é advogado tributarista, especialista e pós-graduado em Direito Tributário, com 20 anos de experiência nas áreas Tributária e Empresarial. É sócio e Coordenador da área tributária do escritório Gouvêa dos Reis Advogados e Assessor Jurídico Tributário da FACISC."
      }
    ],
    readTimeOrDuration: "12 min de leitura",
    imageUrl: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
    whatsappMessage: "Olá! Li o artigo 'Os Limites Constitucionais da Reforma da Tributação sobre o Consumo' e gostaria de consultar a equipe tributária.",
    sections: [
      {
        heading: "O nome não muda a natureza do tributo",
        content: [
          "Antes de examinar os efeitos econômicos da reforma, é preciso enfrentar sua identidade jurídica. O legislador batizou a CBS de contribuição, mas essa opção terminológica não vincula o intérprete: o regime jurídico de um tributo decorre de sua estrutura normativa de hipótese de incidência, base de cálculo e destinação, não do nome que lhe é atribuído.",
          "A doutrina majoritária converge nesse sentido: a natureza jurídica do tributo se revela pelo binômio hipótese de incidência e base de cálculo, sendo irrelevante o nomen juris que o legislador lhe atribui (art. 4º do Código Tributário Nacional).",
          "Submetida a esse exame, a CBS não se enquadra em nenhuma espécie de contribuição prevista pela Constituição. O que se tem, na essência, é um imposto, e compartilha com o IBS a mesma hipótese de incidência, base de cálculo e contribuintes."
        ]
      },
      {
        heading: "Neutralidade e isonomia sob tensão",
        content: [
          "A neutralidade é um dos principais fundamentos dos impostos sobre valor agregado: não apenas evita a tributação em cascata, mas impede que o tributo influencie artificialmente as decisões econômicas dos agentes. Em um IVA plenamente funcional, a não cumulatividade assegura o aproveitamento integral dos créditos ao longo da cadeia.",
          "Embora apresentado como neutro, o modelo produz efeitos distintos conforme a estrutura de custos de cada atividade. Setores cujo principal fator é a mão de obra — como tecnologia, construção civil e consultorias — enfrentam limitações ao crédito, suportando carga proporcionalmente superior."
        ],
        callout: {
          title: "O estorno de créditos e a cumulatividade residual",
          text: "O regime de estorno de créditos do art. 51 da LC 214/2025 determina o estorno proporcional de créditos sempre que a operação seja beneficiada por isenção ou imunidade. Forma-se, assim, uma cumulatividade residual incompatível com a lógica clássica do IVA."
        }
      },
      {
        heading: "Os limites da materialidade do IBS e da CBS",
        content: [
          "O mesmo cuidado se impõe à delimitação do fato gerador do IBS e da CBS. A simplificação do sistema não amplia, por si só, a competência constitucional para instituir novas hipóteses de incidência.",
          "A incidência sobre operações não onerosas é exemplo eloquente: o IVA tributa o valor acrescido na circulação de bens e serviços, e nas operações gratuitas esse pressuposto não se verifica.",
          "A repartição constitucional de competências não é mera técnica administrativa — é garantia do pacto federativo e limite ao poder de tributar."
        ]
      }
    ],
    conclusionTitle: "Conclusão",
    conclusion: "A modernização do consumo não dispensa a observância dos princípios constitucionais que limitam o poder de tributar. Mais do que substituir tributos, a EC 132/2023 recolocou no centro do debate uma questão permanente: até que ponto a busca por eficiência fiscal pode avançar sem comprometer as garantias constitucionais do contribuinte?",
    references: [
      "BRASIL. Constituição da República Federativa do Brasil de 1988. Brasília, DF: Presidência da República, 1988.",
      "BRASIL. Emenda Constitucional nº 132, de 20 de dezembro de 2023. Altera o Sistema Tributário Nacional.",
      "BRASIL. Lei Complementar nº 214, de 16 de janeiro de 2025. Institui o IBS, a CBS e o Imposto Seletivo.",
      "CARVALHO, Paulo de Barros. Curso de Direito Tributário. 32. ed. São Paulo: Noeses, 2023.",
      "CARRAZZA, Roque Antônio. Curso de Direito Constitucional Tributário. 36. ed. São Paulo: Malheiros/JusPodivm, 2025."
    ]
  }
];

export function getArticleBySlug(slug?: string): ArticleData | undefined {
  if (!slug) return ARTICLES_DATA[0];
  const cleanSlug = slug.toLowerCase().trim();
  return (
    ARTICLES_DATA.find((a) => a.slug.toLowerCase() === cleanSlug || a.id.toLowerCase() === cleanSlug) ||
    ARTICLES_DATA[0]
  );
}
