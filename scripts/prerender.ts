import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ARTICLES_DATA, getArticleBySlug } from "../src/data/articlesData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const templatePath = path.resolve(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("Dist index.html not found. Run 'npm run build' first.");
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, "utf-8");

interface MetaData {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  type?: string;
  author?: string;
  publishDate?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generateHtmlWithMeta(template: string, meta: MetaData): string {
  const safeTitle = escapeHtml(meta.title);
  const safeDesc = escapeHtml(meta.description || "Gouvêa dos Reis Advogados — Advocacia Estratégica");
  const safeImg = meta.imageUrl.trim();
  const safeUrl = meta.url.trim();
  const safeType = meta.type || "article";
  const fullTitle = `${safeTitle} | GDR Advogados`;

  let html = template;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`);

  // Meta tags to inject or replace
  const ogTags = `
    <!-- Primary SEO & Social Meta (Prerendered for WhatsApp & Crawlers) -->
    <meta name="title" content="${safeTitle}" />
    <meta name="description" content="${safeDesc}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:site_name" content="Gouvêa dos Reis Advogados" />
    <meta property="og:type" content="${safeType}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:image" content="${safeImg}" />
    <meta property="og:image:secure_url" content="${safeImg}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${safeTitle}" />

    <!-- WhatsApp / Microdata Fallback -->
    <meta itemprop="name" content="${safeTitle}" />
    <meta itemprop="description" content="${safeDesc}" />
    <meta itemprop="image" content="${safeImg}" />
    <link rel="image_src" href="${safeImg}" />
    <link rel="canonical" href="${safeUrl}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${safeImg}" />

    <!-- Schema.org JSON-LD Structured Data for Rich Snippets -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${safeType === "article" ? "Article" : "WebPage"}",
      "headline": "${safeTitle}",
      "description": "${safeDesc}",
      "image": ["${safeImg}"],
      "url": "${safeUrl}",
      "publisher": {
        "@type": "Organization",
        "name": "Gouvêa dos Reis Advogados",
        "url": "https://www.gdr.adv.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/sejeqnlu/image/upload/f_auto/q_auto/Gemini_Generated_Image_mj9hm9mj9hm9mj9h.jpg"
        }
      }${meta.author ? `,\n      "author": { "@type": "Person", "name": "${escapeHtml(meta.author)}" }` : ""}
    }
    </script>
  `;

  // Remove existing static OG and Twitter meta tags to prevent duplicates
  html = html
    .replace(/<meta\s+name="title"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+itemprop="[^"]+"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="image_src"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");

  // Insert before </head>
  html = html.replace("</head>", `${ogTags}\n  </head>`);

  return html;
}

function ensureDirAndWriteFile(filePath: string, content: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf-8");
}

console.log("Starting static prerender of article and material pages for WhatsApp/OpenGraph...");

let count = 0;

// 1. Process all hardcoded articles in ARTICLES_DATA
for (const article of ARTICLES_DATA) {
  const meta: MetaData = {
    title: article.title,
    description: article.description || article.lead,
    imageUrl: article.imageUrl,
    url: `https://www.gdr.adv.br/artigo/${article.slug}`,
    type: "article",
    author: article.author,
    publishDate: article.date,
  };

  const renderedHtml = generateHtmlWithMeta(templateHtml, meta);

  // Write to /artigo/[slug]/index.html and /artigo/[slug].html
  ensureDirAndWriteFile(path.join(distDir, "artigo", article.slug, "index.html"), renderedHtml);
  ensureDirAndWriteFile(path.join(distDir, "artigo", `${article.slug}.html`), renderedHtml);

  // Also write for article.id if different from slug (e.g. a-fim-escala-6x1)
  if (article.id && article.id !== article.slug) {
    ensureDirAndWriteFile(path.join(distDir, "artigo", article.id, "index.html"), renderedHtml);
    ensureDirAndWriteFile(path.join(distDir, "artigo", `${article.id}.html`), renderedHtml);
  }

  // Also write to /materiais/[slug]
  ensureDirAndWriteFile(path.join(distDir, "materiais", article.slug, "index.html"), renderedHtml);
  ensureDirAndWriteFile(path.join(distDir, "materiais", `${article.slug}.html`), renderedHtml);
  if (article.id && article.id !== article.slug) {
    ensureDirAndWriteFile(path.join(distDir, "materiais", article.id, "index.html"), renderedHtml);
    ensureDirAndWriteFile(path.join(distDir, "materiais", `${article.id}.html`), renderedHtml);
  }

  count++;
}

// 2. Process materials from public/admin/data/materials.json if present
const materialsJsonPath = path.resolve(rootDir, "public/admin/data/materials.json");
if (fs.existsSync(materialsJsonPath)) {
  try {
    const raw = fs.readFileSync(materialsJsonPath, "utf-8");
    const parsed = JSON.parse(raw);
    const materials = Array.isArray(parsed) ? parsed : parsed.materials || [];
    for (const item of materials) {
      if (!item.slug && !item.id) continue;
      const targetSlug = item.slug || item.id;
      const alreadyHandled = ARTICLES_DATA.some(
        (a) => a.slug === targetSlug || a.id === targetSlug
      );
      if (alreadyHandled) continue;

      const meta: MetaData = {
        title: item.title,
        description: item.description || item.lead || "Material exclusivo Gouvêa dos Reis Advogados",
        imageUrl: item.imageUrl || "https://res.cloudinary.com/sejeqnlu/image/upload/f_auto/q_auto/Gemini_Generated_Image_mj9hm9mj9hm9mj9h.jpg",
        url: `https://www.gdr.adv.br/artigo/${targetSlug}`,
        type: "article",
        author: item.author,
        publishDate: item.date,
      };

      const renderedHtml = generateHtmlWithMeta(templateHtml, meta);

      ensureDirAndWriteFile(path.join(distDir, "artigo", targetSlug, "index.html"), renderedHtml);
      ensureDirAndWriteFile(path.join(distDir, "artigo", `${targetSlug}.html`), renderedHtml);
      ensureDirAndWriteFile(path.join(distDir, "materiais", targetSlug, "index.html"), renderedHtml);
      ensureDirAndWriteFile(path.join(distDir, "materiais", `${targetSlug}.html`), renderedHtml);

      count++;
    }
  } catch (e) {
    console.warn("Could not parse materials.json for prerendering:", e);
  }
}

// 3. Process top-level pages
const staticPages: { route: string; title: string; description: string }[] = [
  {
    route: "materiais",
    title: "Materiais Educativos, Artigos e E-books",
    description: "Acesse e-books, artigos técnicos trabalhistas, tributários e imobiliários produzidos pelo Gouvêa dos Reis Advogados.",
  },
  {
    route: "blog",
    title: "Artigos e Análises Jurídicas",
    description: "Publicações técnicas, notícias jurídicas e análises sobre o cenário empresarial pelo GDR Advogados.",
  },
  {
    route: "equipe",
    title: "Corpo Jurídico e Especialistas",
    description: "Conheça a equipe de advogados especialistas e diretores do Gouvêa dos Reis Advogados.",
  },
  {
    route: "sobre",
    title: "Sobre o Escritório",
    description: "Mais de 25 anos de atuação jurídica estratégica, governança e defesa empresarial.",
  },
  {
    route: "contato",
    title: "Fale com Nossos Especialistas",
    description: "Canais de atendimento direto e consultoria jurídica personalizada do GDR Advogados.",
  },
  {
    route: "link",
    title: "Links Oficiais e Atendimento",
    description: "Canais rápidos de atendimento, WhatsApp e materiais do Gouvêa dos Reis Advogados.",
  },
  {
    route: "bio",
    title: "Links Oficiais e Atendimento",
    description: "Canais rápidos de atendimento, WhatsApp e materiais do Gouvêa dos Reis Advogados.",
  },
];

for (const page of staticPages) {
  const pageMeta: MetaData = {
    title: page.title,
    description: page.description,
    imageUrl: "https://res.cloudinary.com/sejeqnlu/image/upload/f_auto/q_auto/Gemini_Generated_Image_mj9hm9mj9hm9mj9h.jpg",
    url: `https://www.gdr.adv.br/${page.route}`,
    type: "website",
  };
  const rendered = generateHtmlWithMeta(templateHtml, pageMeta);
  ensureDirAndWriteFile(path.join(distDir, page.route, "index.html"), rendered);
  ensureDirAndWriteFile(path.join(distDir, `${page.route}.html`), rendered);
}

console.log(`Prerender complete! Successfully generated ${count} article/material static pages with OpenGraph metadata.`);
