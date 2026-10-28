import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function whatsappOpenGraphPlugin(): Plugin {
  return {
    name: 'vite-plugin-whatsapp-og',
    transformIndexHtml(html, ctx) {
      const url = ctx.originalUrl || ctx.path || '';
      const match = url.match(/^\/(?:artigo|materiais)\/([^/?#]+)/i);
      if (match) {
        const slug = decodeURIComponent(match[1]).toLowerCase().trim();
        try {
          const materialsPath = path.resolve(__dirname, 'public/admin/data/materials.json');
          let title = '';
          let description = '';
          let imageUrl = '';

          if (fs.existsSync(materialsPath)) {
            const parsed = JSON.parse(fs.readFileSync(materialsPath, 'utf-8'));
            const list = Array.isArray(parsed) ? parsed : parsed.materials || [];
            const found = list.find(
              (m: any) =>
                (m.slug && m.slug.toLowerCase() === slug) ||
                (m.id && m.id.toLowerCase() === slug)
            );
            if (found) {
              title = found.title;
              description = found.description || found.lead || '';
              imageUrl = found.imageUrl || '';
            }
          }

          if (title && imageUrl) {
            const safeTitle = title.replace(/"/g, '&quot;');
            const safeDesc = description.replace(/"/g, '&quot;');
            const safeImg = imageUrl.trim();

            return html
              .replace(/<title>.*?<\/title>/i, `<title>${safeTitle} | GDR Advogados</title>`)
              .replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${safeTitle}"`)
              .replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${safeDesc}"`)
              .replace(/<meta property="og:image" content="[^"]*"/i, `<meta property="og:image" content="${safeImg}"`)
              .replace(/<meta property="og:image:secure_url" content="[^"]*"/i, `<meta property="og:image:secure_url" content="${safeImg}"`)
              .replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="https://www.gdr.adv.br/artigo/${slug}"`)
              .replace(/<link rel="image_src" href="[^"]*"/i, `<link rel="image_src" href="${safeImg}"`)
              .replace(/<meta itemprop="image" content="[^"]*"/i, `<meta itemprop="image" content="${safeImg}"`)
              .replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${safeTitle}"`)
              .replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${safeDesc}"`)
              .replace(/<meta name="twitter:image" content="[^"]*"/i, `<meta name="twitter:image" content="${safeImg}"`);
          }
        } catch (e) {
          // ignore
        }
      }
      return html;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), whatsappOpenGraphPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
