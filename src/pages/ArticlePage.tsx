import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  BookOpen,
  MessageSquare,
  Check,
  Copy,
  Play,
  ChevronRight,
  Sparkles,
  Bookmark,
  Users
} from "lucide-react";
import { getArticleBySlug, ARTICLES_DATA, ArticleAuthor } from "../data/articlesData";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const article = getArticleBySlug(slug);

  const articleTitle = article?.title || "Artigo Jurídico | Gouvêa dos Reis Advogados";
  const articleSummary = article?.description || article?.lead || "";
  const articleImage = article?.imageUrl || "https://i.ibb.co/v4pWJX5w/Whats-App-Image-2026-07-21-at-07-50-21.jpg";

  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic Meta Tags update for Social Media/WhatsApp share preview
    document.title = `${articleTitle} | GDR Advogados`;

    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMetaTag("property", "og:title", articleTitle);
    setMetaTag("property", "og:description", articleSummary);
    setMetaTag("property", "og:image", articleImage);
    setMetaTag("property", "og:image:width", "1200");
    setMetaTag("property", "og:image:height", "630");
    setMetaTag("property", "og:type", "article");
    setMetaTag("property", "og:url", window.location.href);

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", articleTitle);
    setMetaTag("name", "twitter:description", articleSummary);
    setMetaTag("name", "twitter:image", articleImage);
    setMetaTag("name", "description", articleSummary);
  }, [slug, articleTitle, articleSummary, articleImage]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: articleTitle,
          text: articleSummary,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const shareOnWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${articleTitle}\n\n${articleSummary}\n\nLeia o artigo completo em: ${window.location.href}`
  )}`;

  const whatsappConsultation = encodeURIComponent(
    article?.whatsappMessage ||
      `Olá! Li o artigo "${articleTitle}" no portal do GDR Advogados e gostaria de orientações jurídicas.`
  );

  // Other recommended articles (excluding current)
  const otherArticles = ARTICLES_DATA.filter((a) => a.slug !== article?.slug).slice(0, 3);

  if (!article) {
    return (
      <div className="pt-44 pb-20 min-h-screen bg-white text-gdr-dark font-sans flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-serif font-bold mb-4">Artigo não encontrado</h1>
        <p className="text-sm text-gdr-dark/70 mb-6">O artigo que você procura não existe ou foi movido.</p>
        <Link
          to="/materiais"
          className="bg-gdr-dark text-white px-6 py-3 text-xs uppercase font-semibold tracking-wider hover:bg-gdr-beige hover:text-gdr-dark transition-colors"
        >
          Voltar para Materiais
        </Link>
      </div>
    );
  }

  // Resolve authors list
  const authorsList: ArticleAuthor[] =
    article.authors && article.authors.length > 0
      ? article.authors
      : [
          {
            name: article.author,
            role: article.authorRole,
            image: article.authorImage,
            bio: article.authorBio,
          },
        ];

  const hasMultipleAuthors = authorsList.length > 1;

  return (
    <article className="pt-36 sm:pt-44 md:pt-48 pb-20 min-h-screen bg-white text-gdr-dark font-sans selection:bg-gdr-beige selection:text-gdr-dark">
      {/* Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="mb-8 flex items-center justify-between border-b border-gdr-border pb-4">
          <Link
            to="/materiais"
            className="inline-flex items-center space-x-2 text-xs uppercase font-semibold tracking-wider text-gdr-dark/70 hover:text-gdr-beige transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para Materiais</span>
          </Link>

          <div className="text-[11px] text-gdr-dark/50 tracking-wider uppercase font-medium">
            <span>Materiais</span>
            <span className="mx-2">•</span>
            <span className="text-gdr-dark/80">Artigo</span>
            {article.subcategory && (
              <>
                <span className="mx-2">•</span>
                <span className="text-gdr-beige font-semibold">{article.subcategory}</span>
              </>
            )}
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-block bg-gdr-beige/20 text-gdr-dark border border-gdr-beige/50 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase">
              {article.subcategory ? `${article.subcategory} • Artigo` : "Direito Empresarial • Artigo"}
            </div>

            {/* Quick Share Buttons */}
            <div className="flex items-center space-x-2">
              <a
                href={shareOnWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartilhar no WhatsApp"
                className="inline-flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 bg-gdr-gray hover:bg-gdr-dark hover:text-white text-gdr-dark text-[11px] font-semibold px-3 py-1.5 rounded transition-colors border border-gdr-border cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gdr-dark leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-gdr-dark/70 border-y border-gdr-border/60 py-4 font-sans">
            <div className="flex items-center space-x-2">
              {hasMultipleAuthors ? (
                <Users className="w-4 h-4 text-gdr-beige shrink-0" />
              ) : (
                <User className="w-4 h-4 text-gdr-beige shrink-0" />
              )}
              <div className="flex items-center space-x-1.5 flex-wrap">
                {authorsList.map((auth, idx) => (
                  <span key={idx} className="font-medium text-gdr-dark">
                    {auth.name}
                    {idx < authorsList.length - 1 && <span className="text-gdr-beige mx-1.5 font-bold">•</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gdr-beige" />
              <span>{article.readTimeOrDuration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gdr-beige" />
              <span>{article.date}</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Banner */}
        {article.imageUrl && (
          <div className="mb-10 w-full overflow-hidden border border-gdr-border bg-gdr-gray shadow-xs">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto max-h-[480px] object-cover aspect-video"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
        )}

        {/* Lead Box */}
        {article.lead && (
          <div className="mb-10 text-base sm:text-lg font-normal leading-relaxed text-gdr-dark bg-gdr-gray/40 border-l-4 border-gdr-beige p-5 sm:p-6 rounded-r-sm">
            {article.lead}
          </div>
        )}

        {/* Video reference card if linked to a GDR Podcast Episode */}
        {article.youtubeVideoUrl && (
          <div className="mb-10 bg-gdr-gray/30 border border-gdr-border/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-sm">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-full bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gdr-beige block">
                  Episódio em Vídeo Disponível
                </span>
                <span className="text-xs sm:text-sm font-medium text-gdr-dark line-clamp-1">
                  {article.youtubeVideoTitle || article.title}
                </span>
              </div>
            </div>
            <a
              href={article.youtubeVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-gdr-dark hover:bg-gdr-beige hover:text-gdr-dark text-white text-xs uppercase font-semibold tracking-wider px-4 py-2 rounded-xs transition-colors shrink-0"
            >
              <span>Assistir no YouTube</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-gdr-dark/85 font-sans leading-relaxed space-y-8">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4 pt-4">
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gdr-dark pt-2 border-b border-gdr-border/60 pb-2">
                  {section.heading}
                </h2>
              )}

              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
                  {p}
                </p>
              ))}

              {/* Bullet Points */}
              {section.bullets && section.bullets.length > 0 && (
                <div className="space-y-3 my-4 bg-gdr-gray/20 p-5 rounded-sm border border-gdr-border/50">
                  {section.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-3 text-sm sm:text-base">
                      <span className="w-2 h-2 rounded-full bg-gdr-beige mt-2 shrink-0" />
                      <div className="leading-relaxed">
                        {bullet.title && (
                          <strong className="font-semibold text-gdr-dark mr-1.5">{bullet.title}:</strong>
                        )}
                        <span className="text-gdr-dark/85">{bullet.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Numbered List */}
              {section.numberedList && section.numberedList.length > 0 && (
                <div className="space-y-4 my-4">
                  {section.numberedList.map((item, nIdx) => (
                    <div
                      key={nIdx}
                      className="bg-gdr-gray/25 border-l-2 border-gdr-beige p-4 sm:p-5 rounded-r-sm space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-gdr-beige px-2 py-0.5 bg-gdr-dark text-white rounded-xs">
                          {item.number}
                        </span>
                        {item.title && (
                          <h3 className="text-sm sm:text-base font-serif font-semibold text-gdr-dark">
                            {item.title}
                          </h3>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gdr-dark/80 leading-relaxed pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Callout Box */}
              {section.callout && (
                <div className="bg-gdr-gray/40 p-5 rounded-sm my-4 border-l-2 border-gdr-dark">
                  {section.callout.title && (
                    <h3 className="text-base font-serif font-semibold text-gdr-dark mb-2">
                      {section.callout.title}
                    </h3>
                  )}
                  <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85">
                    {section.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}

          {/* Recommendation / Support Box */}
          {article.recommendationBox && (
            <div className="bg-gradient-to-r from-gdr-gray/70 to-gdr-gray/30 border-l-4 border-gdr-dark p-5 sm:p-6 rounded-r-sm my-8">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-gdr-dark mb-2 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-gdr-beige" />
                <span>{article.recommendationBox.title}</span>
              </h3>
              <p className="text-sm sm:text-base font-medium text-gdr-dark/90 leading-relaxed">
                {article.recommendationBox.text}
              </p>
            </div>
          )}

          {/* Conclusion */}
          {article.conclusion && (
            <section className="pt-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gdr-dark pt-4 border-b border-gdr-border/60 pb-2">
                {article.conclusionTitle || "Conclusão"}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-gdr-dark/85 font-medium">
                {article.conclusion}
              </p>
            </section>
          )}

          {/* References Section */}
          {article.references && article.references.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gdr-border">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-gdr-dark/70 mb-4 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-gdr-beige" />
                <span>Referências Bibliográficas e Normativas</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gdr-dark/70 font-mono bg-gdr-gray/20 p-5 rounded-sm border border-gdr-border/50">
                {article.references.map((ref, rIdx) => (
                  <li key={rIdx}>{ref}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Authors Section (Divided into distinct boxes for multiple professionals) */}
        <section className="mt-16">
          <div className="flex items-center justify-between border-b border-gdr-border pb-3 mb-8">
            <div className="text-xs uppercase font-semibold tracking-widest text-gdr-beige flex items-center space-x-2">
              {authorsList.length > 1 ? (
                <>
                  <Users className="w-4 h-4 text-gdr-beige" />
                  <span>Sobre os Autores / Especialistas ({authorsList.length})</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-gdr-beige" />
                  <span>Sobre o Autor / Especialista</span>
                </>
              )}
            </div>
            <span className="text-[11px] text-gdr-dark/50 uppercase tracking-wider font-medium">
              Corpo Jurídico GDR
            </span>
          </div>

          {authorsList.length === 3 ? (
            /* 3 Authors: Divided into 3 separate distinct text boxes */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {authorsList.map((authorItem, aIdx) => (
                <div
                  key={aIdx}
                  className="bg-white border border-gdr-border hover:border-gdr-beige/80 transition-all duration-300 p-6 rounded-sm shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-gdr-border/40">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gdr-beige">
                        Especialista #{aIdx + 1}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-gdr-dark leading-snug pt-1">
                      {authorItem.name}
                    </h3>
                    {authorItem.role && (
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gdr-beige">
                        {authorItem.role}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  {authorItem.bio && (
                    <p className="text-xs text-gdr-dark/80 font-light leading-relaxed mt-4 pt-3 border-t border-gdr-border/40">
                      {authorItem.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : authorsList.length === 2 ? (
            /* 2 Authors: Divided into 2 separate distinct text boxes */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {authorsList.map((authorItem, aIdx) => (
                <div
                  key={aIdx}
                  className="bg-white border border-gdr-border hover:border-gdr-beige/80 transition-all duration-300 p-6 rounded-sm shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-gdr-border/40">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gdr-beige">
                        Especialista #{aIdx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-gdr-dark leading-snug pt-1">
                      {authorItem.name}
                    </h3>
                    {authorItem.role && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-gdr-beige">
                        {authorItem.role}
                      </p>
                    )}
                  </div>

                  {authorItem.bio && (
                    <p className="text-xs text-gdr-dark/80 font-light leading-relaxed mt-4 pt-3 border-t border-gdr-border/40">
                      {authorItem.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Single Author Card */
            <div className="bg-gradient-to-br from-gdr-gray/60 to-gdr-gray/20 border border-gdr-border/80 p-6 sm:p-8 rounded-sm shadow-sm">
              <div className="space-y-3">
                <h3 className="text-xl font-serif font-bold text-gdr-dark">{authorsList[0].name}</h3>
                {authorsList[0].role && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-gdr-beige">
                    {authorsList[0].role}
                  </p>
                )}
                {authorsList[0].bio && (
                  <p className="text-xs sm:text-sm text-gdr-dark/80 font-light leading-relaxed pt-2 border-t border-gdr-border/40">
                    {authorsList[0].bio}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Footer Actions / Call to Action */}
        <div className="mt-12 pt-8 border-t border-gdr-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/materiais"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gdr-gray hover:bg-gdr-dark hover:text-white text-gdr-dark border border-gdr-border px-6 py-3 text-xs uppercase font-semibold tracking-wider transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver Todos os Materiais</span>
          </Link>

          <a
            href={`https://wa.me/5547996320088?text=${whatsappConsultation}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gdr-dark hover:bg-gdr-beige hover:text-gdr-dark text-white border border-gdr-dark px-6 py-3 text-xs uppercase font-semibold tracking-wider transition-colors duration-300 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultar Equipe Especializada</span>
          </a>
        </div>

        {/* Recommended Articles Carousel / Grid */}
        {otherArticles.length > 0 && (
          <section className="mt-20 pt-10 border-t border-gdr-border">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gdr-dark flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-gdr-beige" />
                <span>Outros Artigos Recomendados</span>
              </h3>
              <Link
                to="/materiais"
                className="text-xs font-semibold uppercase tracking-wider text-gdr-beige hover:text-gdr-dark transition-colors"
              >
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map((item) => (
                <Link
                  key={item.id}
                  to={`/artigo/${item.slug}`}
                  className="bg-white border border-gdr-border hover:border-gdr-beige flex flex-col justify-between group transition-all duration-300 shadow-xs overflow-hidden"
                >
                  {item.imageUrl && (
                    <div className="w-full aspect-square overflow-hidden bg-gdr-gray border-b border-gdr-border">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-gdr-beige font-semibold block">
                        {item.subcategory}
                      </span>
                      <h4 className="text-sm font-sans font-medium text-gdr-dark group-hover:text-gdr-beige transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gdr-dark/65 font-light line-clamp-2">{item.lead || item.description}</p>
                    </div>
                    <div className="pt-3 border-t border-gdr-border/60 flex items-center justify-between text-[10px] text-gdr-dark/50 font-sans">
                      <span>{item.readTimeOrDuration}</span>
                      <span className="text-gdr-beige font-semibold inline-flex items-center">
                        Ler <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
