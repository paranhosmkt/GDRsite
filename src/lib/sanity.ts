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
}

const localDefaultMaterials: SanityMaterial[] = [
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
