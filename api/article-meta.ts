import fs from "fs";
import path from "path";
import { ARTICLES_DATA, getArticleBySlug } from "../src/data/articlesData";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req: any, res: any) {
  try {
    const rawSlug = (req.query.slug as string) || "";
    const cleanSlug = rawSlug.trim().replace(/^\/+|\/+$/g, "");

    // 1. Try finding in ARTICLES_DATA
    let article = getArticleBySlug(cleanSlug);

    // 2. Try finding in materials.json if not found
    if (!article) {
      try {
        const materialsPath = path.resolve(process.cwd(), "public/admin/data/materials.json");
        if (fs.existsSync(materialsPath)) {
          const raw = fs.readFileSync(materialsPath, "utf-8");
          const parsed = JSON.parse(raw);
          const materials = Array.isArray(parsed) ? parsed : parsed.materials || [];
          const matched = materials.find(
            (m: any) =>
              (m.slug && m.slug.toLowerCase() === cleanSlug.toLowerCase()) ||
              (m.id && m.id.toLowerCase() === cleanSlug.toLowerCase())
          );
          if (matched) {
            article = {
              id: matched.id || cleanSlug,
              slug: matched.slug || matched.id || cleanSlug,
              category: "artigos",
              categoryLabel: matched.categoryLabel || "Artigo",
              subcategory: matched.subcategory || "Geral",
              title: matched.title,
              lead: matched.lead || matched.description || "",
              description: matched.description || matched.lead || "",
              badge: matched.badge || "Artigo",
              date: matched.date || "2026",
              author: matched.author || "GDR Advogados",
              authorRole: matched.authorRole || "",
              authorBio: matched.authorBio || "",
              authorImage: matched.authorImage || "",
              readTimeOrDuration: matched.readTimeOrDuration || "",
              imageUrl:
                matched.imageUrl ||
                "https://res.cloudinary.com/sejeqnlu/image/upload/f_auto/q_auto/Gemini_Generated_Image_mj9hm9mj9hm9mj9h.jpg",
              sections: [],
            };
          }
        }
      } catch (e) {
        console.warn("Could not read materials.json fallback in api handler:", e);
      }
    }

    const title = article?.title || "Artigo Jurídico | Gouvêa dos Reis Advogados";
    const description =
      article?.description ||
      article?.lead ||
      "Análise jurídica aprofundada, conformidade e estratégias corporativas pelo Gouvêa dos Reis Advogados.";
    const imageUrl =
      article?.imageUrl ||
      "https://res.cloudinary.com/sejeqnlu/image/upload/f_auto/q_auto/Gemini_Generated_Image_mj9hm9mj9hm9mj9h.jpg";
    const canonicalUrl = `https://www.gdr.adv.br/artigo/${article?.slug || cleanSlug}`;

    const safeTitle = escapeHtml(title);
    const safeDesc = escapeHtml(description);
    const safeImg = imageUrl.trim();
    const safeUrl = canonicalUrl;

    const html = `<!doctype html>
<html lang="pt-BR" prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb#">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle} | GDR Advogados</title>

    <meta name="title" content="${safeTitle}" />
    <meta name="description" content="${safeDesc}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:site_name" content="Gouvêa dos Reis Advogados" />
    <meta property="og:type" content="article" />
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

    <meta http-equiv="refresh" content="0;url=/artigo/${article?.slug || cleanSlug}" />
    <script>
      window.location.replace('/artigo/${article?.slug || cleanSlug}');
    </script>
  </head>
  <body style="font-family: sans-serif; padding: 2rem; background: #0b1526; color: #fff;">
    <p>Redirecionando para o artigo: <a href="/artigo/${article?.slug || cleanSlug}" style="color: #c5a059;">${safeTitle}</a>...</p>
  </body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    return res.status(200).send(html);
  } catch (error) {
    console.error("Error in article-meta API handler:", error);
    return res.status(500).send("Erro interno ao gerar preview do artigo");
  }
}
