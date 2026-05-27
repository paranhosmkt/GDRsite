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
    id: "r1",
    category: "ebooks",
    categoryLabel: "E-book",
    title: "Planejamento Sucessório & Holdings Familiares: Manual Prático",
    description: "Guia completo de engenharia societária focada na perpetuidade de bens familiares, elisão fiscal e governança intergeracional.",
    badge: "Baixar PDF gratuito",
    date: "Maio de 2026",
    author: "Murilo Gouvêa dos Reis",
    readTimeOrDuration: "42 páginas"
  },
  {
    id: "r2",
    category: "artigos",
    categoryLabel: "Artigo Técnico",
    title: "Impacto da Reforma Tributária sobre a Distribuição de Dividendos",
    description: "Uma análise analítica detalhada dos impactos práticos imediatos do novo texto de emendas constitucionais na contabilidade corporativa do Sul.",
    badge: "Ler Artigo Inteiro",
    date: "Abril de 2026",
    author: "Dr. Marcus Vinícius Abreu",
    readTimeOrDuration: "10 min de leitura"
  },
  {
    id: "r3",
    category: "videos",
    categoryLabel: "Vídeo Exclusivo",
    title: "Compliance Trabalhista em Grandes Indústrias: Redução de Passivo",
    description: "Painel gravado sobre ações preventivas de auditagem e negociações coletivas para evitar custos pecuniários de alta relevância.",
    badge: "Assistir Vídeo (Exclusivo)",
    date: "Março de 2026",
    author: "Dra. Carolina Mendes Ramos",
    readTimeOrDuration: "25 minutos"
  },
  {
    id: "r4",
    category: "palestras",
    categoryLabel: "Palestra",
    title: "Governança e ESG no Lançamento de Ativos de Alto Padrão",
    description: "Palestra Magna ministrada aos investidores no Fórum de Incorporações Imobiliárias de Santa Catarina sobre regularização patrimonial focado.",
    badge: "Solicitar Gravação",
    date: "Fevereiro de 2026",
    author: "Dr. Arthur Pamplona Silva",
    readTimeOrDuration: "1h 15min"
  },
  {
    id: "r5",
    category: "publicacoes",
    categoryLabel: "Publicação Acadêmica",
    title: "O Princípio do 'Privacy by Design' sob as diretrizes vigentes da ANPD",
    description: "Estudo científico publicado sobre conformidade jurídica em fluxo contínuo de dados de empresas de logística nacional.",
    badge: "Ver Publicação",
    date: "Janeiro de 2026",
    author: "Dra. Carolina Mendes Ramos",
    readTimeOrDuration: "8 pág. de Pareceres"
  },
  {
    id: "r6",
    category: "noticias",
    categoryLabel: "Notícias GDR",
    title: "Gouvêa dos Reis Advogados estabelece nova sede executiva no Centro de Florianópolis",
    description: "O escritório consolida sua unridade operacional na Avenida Rio Branco, Centro Executivo Atlantis, qualificando o atendimento de alta confidencialidade.",
    badge: "Ler Nota Oficial",
    date: "Maio de 2026",
    author: "Conselho GDR",
    readTimeOrDuration: "3 min"
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
