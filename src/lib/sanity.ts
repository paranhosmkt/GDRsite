import { CLIENT_SECTORS, PRACTICE_AREAS, TESTIMONIALS, OFFICE_ADDRESSES } from "../data";
import { ClientSector, PracticeArea, Testimonial, OfficeAddress } from "../types";

// Dynamic Sanity Configuration (Compatible with standard environment variables on Vercel)
const SANITY_PROJECT_ID = (import.meta as any).env?.VITE_SANITY_PROJECT_ID || "xkc900rm";
const SANITY_DATASET = (import.meta as any).env?.VITE_SANITY_DATASET || "production";
const SANITY_API_VERSION = "v2023-05-25";

/**
 * Standard utility to run high-availability GROQ queries directly against the Sanity CDN API.
 * This has zero external dependencies, bypasses React 19 peer conflict issues,
 * and maintains extremely fast load times.
 */
async function fetchSanityData<T>(groqQuery: string, fallbackData: T): Promise<T> {
  const encodedQuery = encodeURIComponent(groqQuery);
  const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      // Keep it highly cached for fast client experiences
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Sanity CDN returned status: ${response.status}`);
    }

    const { result } = await response.json();
    if (result && (!Array.isArray(result) || result.length > 0)) {
      return result as T;
    }
    return fallbackData;
  } catch (error) {
    console.warn(`Sanity fetch failed. Operating with offline high-fidelity fallback. Error:`, error);
    return fallbackData;
  }
}

/**
 * Image helper that turns Sanity image references or assets into high quality CDN image links.
 */
export function getSanityImageUrl(source: any, defaultUrl: string = ""): string {
  if (!source) return defaultUrl;

  // If already an absolute URL string
  if (typeof source === "string" && source.startsWith("http")) return source;
  
  if (typeof source === "string" && (source.startsWith("/") || source.includes("."))) {
      return source.startsWith("/") ? source : (!source.startsWith("http") && !source.startsWith("image-") ? `/${source}` : source);
  }

  // Handle Sanity asset references (e.g. image-abcdef-1200x800-jpg)
  if (source.asset && source.asset._ref) {
    const ref = source.asset._ref;
    const parts = ref.split("-");
    if (parts.length >= 4) {
      const id = parts[1];
      const dimensions = parts[2];
      const format = parts[3];
      return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`;
    }
  }

  // Handle direct string asset paths
  if (source._ref) {
    const parts = source._ref.split("-");
    if (parts.length >= 4) {
      const id = parts[1];
      const dimensions = parts[2];
      const format = parts[3];
      return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`;
    }
  }

  return defaultUrl;
}

/* ==========================================
 * HIGH PERFORMANCE CONTENT FETCH SERVICES
 * ========================================== */

/**
 * Helper to fetch local Git-based Decap CMS JSON data from the build/public directory.
 */
async function fetchLocalCMSData<T>(fileName: string): Promise<T | null> {
  try {
    const response = await fetch(`/admin/data/${fileName}`);
    if (response.ok) {
      const data = await response.json();
      return data as T;
    }
  } catch (e) {
    // Fail silently to trigger fallback
  }
  return null;
}

/**
 * Fetches Practice Areas (Áreas de Atuação) from Decap CMS or Sanity, or returns fallbacks.
 */
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  const localData = await fetchLocalCMSData<{ areas: PracticeArea[] }>("practice_areas.json");
  if (localData?.areas && localData.areas.length > 0) {
    return localData.areas;
  }

  const query = `*[_type == "practiceArea"] {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    extendedDescription,
    howWeAct
  }`;
  return fetchSanityData<PracticeArea[]>(query, PRACTICE_AREAS);
}

/**
 * Fetches Portfolio corporate cases from Decap CMS or Sanity, or returns our updated 8 cases.
 */
export async function getPortfolioCases(): Promise<ClientSector[]> {
  const localData = await fetchLocalCMSData<{ cases: ClientSector[] }>("portfolio_cases.json");
  if (localData?.cases && localData.cases.length > 0) {
    return localData.cases;
  }

  const query = `*[_type == "portfolioCase"] | order(_createdAt asc) {
    "id": _id,
    name,
    description,
    representativeness,
    highlights,
    buttonLabel,
    buttonLink
  }`;
  return fetchSanityData<ClientSector[]>(query, CLIENT_SECTORS);
}

/**
 * Fetches client testimonials.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const localData = await fetchLocalCMSData<{ testimonials: Testimonial[] }>("testimonials.json");
  if (localData?.testimonials && localData.testimonials.length > 0) {
    return localData.testimonials;
  }

  const query = `*[_type == "testimonial"] {
    "id": _id,
    author,
    position,
    company,
    text,
    isAnonymized
  }`;
  return fetchSanityData<Testimonial[]>(query, TESTIMONIALS);
}

/**
 * Fetches office addresses.
 */
export async function getOfficeAddresses(): Promise<OfficeAddress[]> {
  const localData = await fetchLocalCMSData<{ addresses: OfficeAddress[] }>("office_addresses.json");
  if (localData?.addresses && localData.addresses.length > 0) {
    return localData.addresses;
  }

  const query = `*[_type == "officeAddress"] {
    city,
    state,
    street,
    suite,
    zipCode,
    phone,
    email,
    workingHours
  }`;
  return fetchSanityData<OfficeAddress[]>(query, OFFICE_ADDRESSES);
}

/**
 * Dynamic content interface for materials (materiais/blog).
 */
export interface SanityMaterial {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  badge: string;
  date: string;
  author: string;
  readTimeOrDuration: string;
  imageUrl?: string; // Optative link directly inside materials schema for user replacements
  buttonLink?: string;
  subcategory?: string;
  videoEmbed?: string;
  slug?: string;
}

const localDefaultMaterials: SanityMaterial[] = [
  {
    id: "a1",
    category: "artigos",
    categoryLabel: "Artigo",
    title: "OS LIMITES CONSTITUCIONAIS DA REFORMA DA TRIBUTAÇÃO SOBRE O CONSUMO",
    description: "A reforma da tributação sobre o consumo representa uma das mais profundas transformações do Sistema Tributário Nacional desde a Constituição de 1988. Analisamos os limites constitucionais, neutralidade, CBS/IBS e seus impactos.",
    badge: "Ler Artigo",
    date: "2026",
    author: "Luciano Daniel da Veiga",
    readTimeOrDuration: "12 min de leitura",
    imageUrl: "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg",
    slug: "os-limites-constitucionais-da-reforma-da-tributacao-sobre-o-consumo"
  },
  {
    id: "e1",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "A importância da DUE DILIGENCE imobiliária",
    description: "A documentação imobiliária é de extrema importância na compra e venda de imóveis, tanto para o comprador quanto para o vendedor. Uma documentação correta e completa garante a segurança jurídica da transação e evita futuros problemas.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/mVz43R0S/A-Import-ncia-da-Due-Dilligence.png",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQADQnxYEgaXQKxubvJZm3GjAT6u4oTyhzyHlhDcPetiNlY?e=z5wO9m"
  },
  {
    id: "e2",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Contratos Imobiliários",
    description: "No mercado imobiliário, a segurança jurídica e a proteção dos negócios são aspectos fundamentais e estão diretamente ligadas a elaboração de contratos que assegurem os interesses das partes envolvidas no negócio.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/DPY7kZnK/Contratos-Imobili-rios.png",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQDLcOQSUdTdR6ThC0QJUEWYARCkWnCMUy23TvOyWo4LyG8?e=bmtBFF"
  },
  {
    id: "e3",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Fortalecendo os sindicatos patronais",
    description: "É com grande entusiasmo que apresentamos esta introdução ao e-book \"Fortalecendo os Sindicatos Patronais: Financiamento e Atuação Efetiva\". Neste material, buscamos abordar de forma concisa e informativa um tema de extrema relevância para fortalecer o papel dos sindicatos patronais e garantir uma atuação efetiva em favor do desenvolvimento econômico e das relações de trabalho.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/5ghx45WY/Fortalecendo-os-sindicatos.png",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQBB017eFvs5QIvFNGmK5NNmAQP_JXnNYLox2lvAhk6oOB8?e=rMWVKZ"
  },
  {
    id: "e4",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Guia contra crimes cibernéticos",
    description: "No passado, ouvíamos falar do golpe do bilhete premiado, falsos funcionários e empréstimos fraudulentos. Hoje, os criminosos continuam com essas práticas, mas adaptadas ao mundo digital. Entenda como se proteger.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/1GX31kht/Penal.jpg",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQCatucgVk_TRLJLK2t5r8FtASdNuJzfhykYOezd9gRyjLU?e=i9mYfa"
  },
  {
    id: "e5",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Hora de fortalecer nosso sindicato",
    description: "Aqui, de forma clara e informativa, abordaremos um assunto de extrema importância para fortalecer os sindicatos dos trabalhadores, garantindo uma atuação efetiva em prol do desenvolvimento econômico e das relações de trabalho.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/C31C2mry/Capas-ebooks-formato-quadrado.jpg",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQCjEIZmjilXQIDOFEGUP8Z5ARaIlo5fE-IlemYvLZ_Z2nE?e=vMsZO5"
  },
  {
    id: "e6",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Perguntas frequentes sobre a LGPD",
    description: "Qualquer informação que possa ser usada para identificar diretamente ou indiretamente uma pessoa física é considerada um dado pessoal. Entenda o que é considerado dado pessoal e como proteger seus dados.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/fzVXkpmL/Capas-ebooks-formato-quadrado-1.jpg",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQBjXWB8YG3hTbSID_WTHf7PAfoT5jesECvyKyh0cSIheo0?e=9bkh8h"
  },
  {
    id: "e7",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Planejamento Sucessório",
    description: "O planejamento sucessório é uma ferramenta essencial para organizar a transferência do patrimônio entre gerações. Ele visa evitar conflitos familiares, reduzir custos com impostos e garantir que os desejos do titular sejam respeitados.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/RTjdNRPw/Capas-ebooks-formato-quadrado-2.jpg",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQDXGesLX3EnQaYvEyYTqS0aAWDxH_sYRjihwMD_AJbKCB4?e=ZgnJcZ"
  },
  {
    id: "e8",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Simplificando a regularização de imóveis",
    description: "Problema histórico no Brasil, a maioria dos imóveis em nosso território nacional são irregulares o que gera uma permanente insegurança para quem os detêm.",
    badge: "Baixar E-book",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://i.ibb.co/Pzw3SLCc/Capas-ebooks-formato-quadrado-4.jpg",
    buttonLink: "https://gouveadosreis-my.sharepoint.com/:b:/g/personal/drive_gdr_adv_br/IQD41jntswdjR5ekrU1luRgUAT_tlvACKK2BQFUbobaI9wM?e=yjm9K8"
  },
  {
    id: "v-nr1-saude-mental-empresa",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "NR-1: a saúde mental virou obrigação na sua empresa",
    description: "A nova NR-1 colocou os riscos psicossociais — sobrecarga, metas inalcançáveis, assédio, lideranças tóxicas — dentro das obrigações legais de toda empresa com funcionários. E a fiscalização já começou.\n\nNeste episódio unimos Direito, gestão e saúde mental para explicar, de forma clara e sem juridiquês: o que mudou na NR-1, qual é o risco real para o seu negócio (multas, impacto no FAP, ações de adoecimento) e, principalmente, o caminho para se adequar de verdade — não com um \"PGR de prateleira\", mas com um diagnóstico que protege.",
    badge: "Assistir Vídeo",
    date: "2026",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "Vídeo",
    imageUrl: "https://img.youtube.com/vi/S6Z5W8ZrHks/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/S6Z5W8ZrHks?autoplay=1"
  },
  {
    id: "v-reforma-tributaria-2026",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Reforma Tributária: Por que 2026 não é ano de espera?",
    description: "A Reforma Tributária continua avançando e novas regras já começam a impactar as empresas brasileiras.\n\nNeste episódio, o Dr. Luciano Daniel da Veiga, especialista em Direito Tributário do Gouvêa dos Reis Advogados, explica de forma objetiva as principais atualizações envolvendo o novo cronograma de implementação da Reforma Tributária.",
    badge: "Assistir Vídeo",
    date: "2026",
    author: "Dr. Luciano Daniel da Veiga",
    readTimeOrDuration: "Vídeo",
    imageUrl: "https://img.youtube.com/vi/7_Nbqn6UHfE/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/7_Nbqn6UHfE?autoplay=1"
  },
  {
    id: "v-holding-quando-vale-a-pena",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Holding",
    title: "Holding: quando vale a pena — e quando NÃO vale",
    description: "Você provavelmente já ouviu duas frases sobre holding: que ela \"economiza imposto\" e que \"todo empresário precisa de uma\". As duas são meias-verdades perigosas.\n\nNeste episódio, reunimos três olhares — jurídico e sucessório, contábil e tributário, e patrimonial/imobiliário — para mostrar, na prática, o que faz uma holding proteger de verdade: quando ela vale a pena e quando vira armadilha, holding ou inventário, os erros que transformam uma holding em \"só um CNPJ\" e como a Reforma Tributária pode mudar esse cálculo.",
    badge: "Assistir Vídeo",
    date: "2026",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "Vídeo",
    imageUrl: "https://img.youtube.com/vi/uR8Vi3g2EH0/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/uR8Vi3g2EH0?autoplay=1"
  },
  {
    id: "v-corretor-associado-pratica",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Imobiliário",
    title: "Corretor Associado na prática: o que imobiliárias precisam saber",
    description: "O modelo de Corretor Associado transformou a dinâmica entre imobiliárias e profissionais do mercado imobiliário. Mas será que todas as empresas estão aplicando essa estrutura da forma correta?\n\nNeste episódio, Dr. Murilo Gouvêa dos Reis e Marcelo Brognoli conversam sobre a realidade do Corretor Associado no mercado imobiliário, os cuidados que as imobiliárias precisam ter e os riscos existentes quando o contrato e a operação não caminham juntos.",
    badge: "Assistir Vídeo",
    date: "2026",
    author: "Dr. Murilo Gouvêa dos Reis e Marcelo Brognoli",
    readTimeOrDuration: "Vídeo",
    imageUrl: "https://img.youtube.com/vi/0nl8SLGGuxs/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/0nl8SLGGuxs?autoplay=1"
  },
  {
    id: "v-lei-maria-da-penha-20-anos",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Criminal",
    title: "Lei Maria da Penha Completa 20 Anos: O Que Mudou na Proteção das Mulheres?",
    description: "Há 20 anos, a Lei Maria da Penha transformou a proteção das mulheres no Brasil e se tornou um dos principais instrumentos de combate à violência doméstica.\n\nNeste episódio especial do Podcast GDR, a Dra. Paula e o Dr. Luciano conversam sobre os avanços da legislação, os diferentes tipos de violência, as medidas protetivas, os direitos das vítimas, os desafios enfrentados na prática e a importância da informação como ferramenta de prevenção.\n\nSe você deseja entender melhor seus direitos, conhecer como a lei funciona e saber quais medidas podem ser adotadas em situações de violência doméstica, este episódio é para você.",
    badge: "Assistir Vídeo",
    date: "2026",
    author: "Dra. Paula e Dr. Luciano",
    readTimeOrDuration: "Vídeo",
    imageUrl: "https://img.youtube.com/vi/f9vNH7MppZE/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/f9vNH7MppZE?autoplay=1"
  },
  {
    id: "v1",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Direito de Família em Foco",
    description: "Uma discussão aprofundada sobre assuntos cruciais que impactam as famílias, abordando melhores práticas, proteção patrimonial e segurança jurídica.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/VkSbbPl-mvE/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/VkSbbPl-mvE?autoplay=1"
  },
  {
    id: "v2",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Aspectos Práticos do Direito de Família",
    description: "Análise das principais abordagens e resolução de conflitos, garantindo resguardo aos envolvidos.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/EPF7BWN0Lzk/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/EPF7BWN0Lzk?autoplay=1"
  },
  {
    id: "v3",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Insights e Estratégias",
    description: "Compreenda como se prevenir juridicamente no cenário do direito familiar com as orientações de nossos especialistas.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/sY3trc9lN9k/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/sY3trc9lN9k?autoplay=1"
  },
  {
    id: "v4",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Atualizações e Tendências",
    description: "Acompanhe as mais recentes decisões e entendimentos que moldam as relações e a sucessão familiar.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/QybLulhn8g8/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/QybLulhn8g8?autoplay=1"
  },
  {
    id: "v5",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Prevenção de Litígios no Direito de Família",
    description: "Explicação detalhada sobre acordos, divisões de bens e estruturação adequada desde o princípio.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/wTERXmM4V3g/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/wTERXmM4V3g?autoplay=1"
  },
  {
    id: "v6",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Questões sobre Herança e Planejamento",
    description: "Como organizar um patrimônio e protegê-lo efetivamente a longo prazo das complexidades legais.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/JyRCDflb9Hc/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/JyRCDflb9Hc?autoplay=1"
  },
  {
    id: "v7",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Direito de Família: O Que Você Precisa Saber",
    description: "Informações fundamentais, destacando os direitos e obrigações no amparo a relacionamentos e matrimônios.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/nwfMYJqSs88/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/nwfMYJqSs88?autoplay=1"
  },
  {
    id: "v8",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Desafios Contemporâneos",
    description: "Uma visão moderna dos desafios relacionados à guarda, partilha e pensão nas relações de hoje.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/840toETL6Bw/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/840toETL6Bw?autoplay=1"
  },
  {
    id: "v9",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Resoluções e Mediações Profissionais",
    description: "Dicas e esclarecimentos sobre o porquê preferir soluções consensuais aos litígios agressivos.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/gHpjJxndBgs/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/gHpjJxndBgs?autoplay=1"
  },
  {
    id: "v10",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Família",
    title: "Orientação e Segurança Jurídica",
    description: "Tire suas dúvidas e acompanhe um rico debate sobre a importância de profissionais experientes ao seu lado.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/fD1Qr3Hc8CE/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/fD1Qr3Hc8CE?autoplay=1"
  },
  {
    id: "v11",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Empresarial",
    title: "Direito Empresarial: Estruturação e Governança",
    description: "Uma discussão aprofundada sobre as melhores práticas de governança e estruturação de empresas.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/TWmtb-J_dDQ/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/TWmtb-J_dDQ?autoplay=1"
  },
  {
    id: "v12",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Empresarial",
    title: "Desafios do Direito Empresarial Moderno",
    description: "Análise dos principais desafios e adaptações necessárias para as empresas modernas no cenário jurídico atual.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/Lj3ZzKwZ4RA/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/Lj3ZzKwZ4RA?autoplay=1"
  },
  {
    id: "v13",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Holding",
    title: "Holding Familiar e Proteção Patrimonial",
    description: "Entenda como a constituição de uma holding e o planejamento sucessório podem proteger o patrimônio da sua família.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/DBWdgIMkRgc/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/DBWdgIMkRgc?autoplay=1"
  },
  {
    id: "v14",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Atualizações em Direito Tributário",
    description: "Discussão sobre as principais atualizações e impactos no cenário tributário atual.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/uoA4eO1_9-k/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/uoA4eO1_9-k?autoplay=1"
  },
  {
    id: "v15",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Aspectos Práticos do Direito Tributário",
    description: "Análise prática e considerações importantes no direito tributário para sua empresa.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/W25vggbVVOQ/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/W25vggbVVOQ?autoplay=1"
  },
  {
    id: "v16",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Planejamento Tributário e Oportunidades",
    description: "Descubra como o planejamento tributário pode trazer oportunidades e segurança para seus negócios.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/QQt_6EG4t2Y/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/QQt_6EG4t2Y?autoplay=1"
  },
  {
    id: "v17",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Tendências da Tributação no Brasil",
    description: "Acompanhe as tendências e prepare-se para as mudanças na tributação.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/jjypZnk7pOk/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/jjypZnk7pOk?autoplay=1"
  },
  {
    id: "v18",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Desmistificando a Reforma Tributária",
    description: "Entenda de forma clara e objetiva os pontos principais da reforma tributária e como ela te afeta.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/mI4fgDzS7M4/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/mI4fgDzS7M4?autoplay=1"
  },
  {
    id: "v19",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Mitigação de Riscos Fiscais",
    description: "Estratégias e práticas essenciais para a mitigação de riscos fiscais.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/h99v5KldexM/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/h99v5KldexM?autoplay=1"
  },
  {
    id: "v20",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Tributação em Foco",
    description: "Reflexões e informações essenciais para a melhor tomada de decisão tributária.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/I2N5rXmYdYM/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/I2N5rXmYdYM?autoplay=1"
  },
  {
    id: "v21",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Tributário",
    title: "Estratégias para Governança Tributária",
    description: "Melhore os fluxos e garanta governança nas operações tributárias da sua empresa.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/twbxoAIvW5w/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/twbxoAIvW5w?autoplay=1"
  },
  {
    id: "v22",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Atualizações em Direito Trabalhista",
    description: "Discussão sobre as principais atualizações e impactos no cenário trabalhista atual.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/ve9FXK3mrME/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/ve9FXK3mrME?autoplay=1"
  },
  {
    id: "v23",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Práticas no Direito Trabalhista",
    description: "Análise prática e considerações essenciais para empresas e empregados.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/B4bWy5cGRb0/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/B4bWy5cGRb0?autoplay=1"
  },
  {
    id: "v24",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Prevenção de Passivos Trabalhistas",
    description: "Como estruturar a empresa para evitar riscos trabalhistas de forma eficiente.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/r4xCszNfLvQ/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/r4xCszNfLvQ?autoplay=1"
  },
  {
    id: "v25",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Nova Legislação Trabalhista e Impactos",
    description: "Entenda as mudanças da nova legislação e como se adequar a elas.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/5k6vpPJRaA4/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/5k6vpPJRaA4?autoplay=1"
  },
  {
    id: "v26",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Relações de Trabalho na Atualidade",
    description: "A evolução das relações de trabalho e o papel da advocacia preventiva.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/R_8ZWEnOA-Y/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/R_8ZWEnOA-Y?autoplay=1"
  },
  {
    id: "v27",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Desafios do Contrato de Trabalho",
    description: "Os principais pontos de atenção nos contratos trabalhistas.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/q_QWD8MlsHw/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/q_QWD8MlsHw?autoplay=1"
  },
  {
    id: "v28",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Cenário Trabalhista Pós-Reforma",
    description: "Reflexões e orientações sobre a aplicação da Reforma Trabalhista.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/n2NXKRXK5II/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/n2NXKRXK5II?autoplay=1"
  },
  {
    id: "v29",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Tendências Jurisprudenciais Trabalhistas",
    description: "Quais são as posições dos tribunais superiores atualmente sobre questões trabalhistas.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/U0KyULY-RyU/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/U0KyULY-RyU?autoplay=1"
  },
  {
    id: "v30",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Gestão de Equipes e RH Jurídico",
    description: "Dicas essenciais para o setor de Recursos Humanos de sua empresa.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/WShBg62GnGU/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/WShBg62GnGU?autoplay=1"
  },
  {
    id: "v31",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Inovações no Direito do Trabalho",
    description: "Como a tecnologia e as novas dinâmicas de trabalho estão moldando o direito trabalhista.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/gX9WexkDI6k/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/gX9WexkDI6k?autoplay=1"
  },
  {
    id: "v32",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Segurança e Medicina do Trabalho",
    description: "Importância do compliance e dos programas de saúde ocupacional.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/vS86D-drdMk/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/vS86D-drdMk?autoplay=1"
  },
  {
    id: "v33",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Acordos e Negociações Coletivas",
    description: "Estratégias para garantir bons resultados em negociações sindicais.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/Cia0Xnbz3jM/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/Cia0Xnbz3jM?autoplay=1"
  },
  {
    id: "v34",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Trabalho Home Office e Teletrabalho",
    description: "Normas, controle de jornada e direitos no cenário de trabalho remoto.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/5SREm36zjck/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/5SREm36zjck?autoplay=1"
  },
  {
    id: "v35",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Terceirização no Direito do Trabalho",
    description: "Impactos da terceirização ampla e irrestrita no modelo atual.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/OMQqC8umcig/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/OMQqC8umcig?autoplay=1"
  },
  {
    id: "v36",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Dano Moral nas Relações de Trabalho",
    description: "Aspectos legais sobre o assédio e o dano moral no ambiente corporativo.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/VEN679e1bbM/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/VEN679e1bbM?autoplay=1"
  },
  {
    id: "v37",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Compliance Trabalhista na Prática",
    description: "Como alinhar a cultura da empresa com as normas da legislação em vigor.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/nLTlnOfpc8M/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/nLTlnOfpc8M?autoplay=1"
  },
  {
    id: "v38",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Remuneração e Benefícios",
    description: "Aspectos sobre pagamentos, prêmios, comissões de forma segura.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/wlI4guIrtTE/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/wlI4guIrtTE?autoplay=1"
  },
  {
    id: "v39",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Trabalhista",
    title: "Aspectos do Desligamento",
    description: "Cuidados cruciais no momento de rescindir o contrato de trabalho.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/bNr-PtfPHq0/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/bNr-PtfPHq0?autoplay=1"
  },
  {
    id: "v40",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Imobiliário",
    title: "Direito Imobiliário em Debate",
    description: "Discussões e análises sobre o mercado e o direito imobiliário.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/LIT1CTucQYw/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/LIT1CTucQYw?autoplay=1"
  },
  {
    id: "v41",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Imobiliário",
    title: "Aspectos Práticos do Direito Imobiliário",
    description: "Análise prática e considerações essenciais para o mercado imobiliário.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/ufGVmK6mIHE/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/ufGVmK6mIHE?autoplay=1"
  },
  {
    id: "v42",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Imobiliário",
    title: "Contratos e Negócios Imobiliários",
    description: "Orientações importantes para a formulação de contratos e negócios imobiliários.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/FyrTJLhFnm0/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/FyrTJLhFnm0?autoplay=1"
  },
  {
    id: "v43",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Imobiliário",
    title: "Atualizações em Direito Imobiliário",
    description: "Fique por dentro das atualizações mais recentes no ramo do direito imobiliário.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/GaJtsJrwgfI/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/GaJtsJrwgfI?autoplay=1"
  },
  {
    id: "v44",
    category: "videos",
    categoryLabel: "Vídeo",
    subcategory: "Imobiliário",
    title: "Due Diligence Imobiliária",
    description: "A importância e como conduzir uma due diligence imobiliária com segurança.",
    badge: "Assistir Vídeo",
    date: "",
    author: "Gouvêa dos Reis",
    readTimeOrDuration: "",
    imageUrl: "https://img.youtube.com/vi/z4qZTKCwgzk/hqdefault.jpg",
    videoEmbed: "https://www.youtube.com/embed/z4qZTKCwgzk?autoplay=1"
  }
];

/**
 * Fetches materials list.
 */
export async function getMaterials(): Promise<SanityMaterial[]> {
  const localData = await fetchLocalCMSData<{ materials: SanityMaterial[] }>("materials.json");
  if (localData?.materials && localData.materials.length > 0) {
    return localData.materials;
  }

  const query = `*[_type == "material"] | order(date desc) {
    "id": _id,
    category,
    categoryLabel,
    title,
    description,
    badge,
    date,
    author,
    readTimeOrDuration,
    buttonLink,
    "imageUrl": image.asset->url
  }`;
  
  return fetchSanityData<SanityMaterial[]>(query, localDefaultMaterials);
}

export interface SanityTeamMember {
  name: string;
  role: string;
  email: string;
  phone?: string;
  imageRef: any;
  area: string;
  isHonorary?: boolean;
  bio: string;
  credentials?: string[];
  category: "juridico" | "conselho" | "founder" | "administrativo";
}

/**
 * Fetches Team Members (Equipe) from Decap CMS or Sanity, or returns an empty list to fall back local.
 */
export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  const localData = await fetchLocalCMSData<{ team: SanityTeamMember[] }>("team_members.json");
  if (localData?.team && localData.team.length > 0) {
    return localData.team;
  }

  const query = `*[_type == "teamMember"] | order(_createdAt asc) {
    name,
    role,
    email,
    phone,
    "imageRef": image,
    area,
    isHonorary,
    bio,
    credentials,
    category
  }`;
  return fetchSanityData<SanityTeamMember[]>(query, []);
}

/**
 * Fetches general text definitions from Decap CMS or Sanity, supporting real-time customized headings.
 */
export async function getPageTexts(): Promise<Record<string, string>> {
  const localDefault: Record<string, string> = {
    hero_title: "Segurança para avançar. Clareza para decidir. Parceria para crescer."
  };

  const localData = await fetchLocalCMSData<Record<string, string>>("page_texts.json");
  if (localData && Object.keys(localData).length > 0) {
    return { ...localDefault, ...localData };
  }

  const query = `*[_type == "pageText"] {
    key,
    textValue
  }`;
  
  try {
    const data = await fetchSanityData<{key: string; textValue: string}[]>(query, []);
    const map: Record<string, string> = { ...localDefault };
    if (data && data.length > 0) {
      data.forEach(item => {
        if (item.key && item.textValue) {
          map[item.key] = item.textValue;
        }
      });
    }
    return map;
  } catch (error) {
    return localDefault;
  }
}

export interface SanitySeal {
  image: any;
  label?: string;
}

export interface SanityPageAssets {
  heroImage?: any;
  aboutImage?: any;
  headerLogo?: any;
  footerLogo?: any;
  seals?: SanitySeal[];
}

/**
 * Fetches dynamic page assets (logos and stamps/seals) from Decap CMS or Sanity.
 */
export async function getPageAssets(): Promise<SanityPageAssets> {
  const localData = await fetchLocalCMSData<SanityPageAssets>("page_assets.json");
  if (localData && (localData.heroImage || localData.aboutImage || localData.headerLogo || localData.footerLogo || (localData.seals && localData.seals.length > 0))) {
    return localData;
  }

  const query = `*[_type == "pageAsset"][0] {
    heroImage,
    aboutImage,
    headerLogo,
    footerLogo,
    seals[] {
      image,
      label
    }
  }`;
  return fetchSanityData<SanityPageAssets>(query, {});
}
