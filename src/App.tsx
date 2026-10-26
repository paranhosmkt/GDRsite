import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import HomePage from "./pages/HomePage";
import MaterialsPage from "./pages/MaterialsPage";
import ArticlePage from "./pages/ArticlePage";
import MaterialRouteHandler from "./pages/MaterialRouteHandler";
import BioPage from "./pages/BioPage";
import { ArrowLeft, BookOpen, Users, Compass, Home } from "lucide-react";

function checkIsBioRoute(pathname: string, hash: string, search: string): boolean {
  const normPath = (pathname || "").toLowerCase().replace(/\/+$/, "");
  const normHash = (hash || "").toLowerCase().replace(/^#\/?/, "").split("?")[0].replace(/\/+$/, "");
  
  // Direct path matching
  const validPaths = [
    "/link",
    "/links",
    "/linktree",
    "/bio",
    "/link-in-bio",
    "/links-oficiais",
    "/biolink",
  ];

  if (validPaths.includes(normPath)) return true;

  // Hash matching (e.g. #link, #/link)
  const validHashes = [
    "link",
    "links",
    "linktree",
    "bio",
    "link-in-bio",
    "links-oficiais",
    "biolink",
  ];
  if (validHashes.includes(normHash)) return true;

  // Query parameter matching (e.g. ?link or ?page=link or ?spa_path=/link)
  try {
    const params = new URLSearchParams(search);
    if (params.has("link") || params.has("bio") || params.has("linktree")) return true;
    const pageParam = (params.get("page") || params.get("p") || "").toLowerCase();
    if (["link", "links", "linktree", "bio"].includes(pageParam)) return true;
    
    const spaParam = (params.get("spa_path") || "").toLowerCase();
    if (validPaths.some(p => spaParam.startsWith(p))) return true;
  } catch (e) {}

  return false;
}

/**
 * Intelligent Fallback for unrecognized routes, trailing slashes, and legacy section URLs
 */
function RouteFallback() {
  const location = useLocation();
  const rawPath = (location.pathname || "").toLowerCase().replace(/^\/+|\/+$/g, "");

  // Section aliases typed directly into the URL bar (e.g. /sobre, /equipe, /contato)
  const sectionMap: Record<string, string> = {
    "sobre": "sobre",
    "sobre-nos": "sobre",
    "quem-somos": "sobre",
    "quemsomos": "sobre",
    "historia": "sobre",
    "atuacao": "atuacao",
    "areas": "atuacao",
    "areas-de-atuacao": "atuacao",
    "servicos": "atuacao",
    "pratica": "atuacao",
    "equipe": "equipe",
    "advogados": "equipe",
    "corpo-juridico": "equipe",
    "time": "equipe",
    "socios": "equipe",
    "portfolio": "portfolio",
    "casos": "portfolio",
    "clientes": "portfolio",
    "contato": "contato",
    "fale-conosco": "contato",
    "agendar": "contato",
    "atendimento": "contato",
    "inicio": "hero",
    "home": "hero",
  };

  if (sectionMap[rawPath]) {
    return <HomePage defaultSection={sectionMap[rawPath]} />;
  }

  // Blog and material aliases (e.g. /blog, /materiais, /artigos, /conteudo)
  if (["blog", "materiais", "artigos", "artigo", "conteudo", "noticias", "ebooks"].includes(rawPath)) {
    return <MaterialsPage />;
  }

  // Dynamic slug routes with trailing slashes or subpaths
  if (rawPath.startsWith("blog/") || rawPath.startsWith("materiais/") || rawPath.startsWith("artigos/")) {
    const parts = rawPath.split("/");
    const slug = parts[1];
    if (slug) {
      return <MaterialRouteHandler />;
    }
    return <MaterialsPage />;
  }

  if (rawPath.startsWith("artigo/")) {
    const parts = rawPath.split("/");
    const slug = parts[1];
    if (slug) {
      return <ArticlePage />;
    }
    return <MaterialsPage />;
  }

  // Bio link aliases
  if (["link", "links", "linktree", "bio", "link-in-bio", "links-oficiais", "biolink"].includes(rawPath)) {
    return <BioPage />;
  }

  // Branded 404 page guaranteeing that a blank white page is never presented
  return (
    <main className="pt-36 pb-24 min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-xl w-full text-center border border-gdr-border p-8 sm:p-12 shadow-sm bg-stone-50/50">
        <span className="text-xs uppercase tracking-widest font-semibold text-gdr-beige block mb-3">
          Gouvêa dos Reis Advogados
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gdr-dark mb-4">
          Página não encontrada
        </h1>
        <p className="text-sm text-gdr-dark/70 mb-8 leading-relaxed">
          O endereço <span className="bg-stone-200/70 px-2 py-0.5 rounded text-gdr-dark font-mono text-xs">{location.pathname}</span> não foi localizado ou foi movido. Navegue pelas seções principais abaixo:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 bg-white border border-gdr-border hover:border-gdr-dark hover:bg-gdr-dark hover:text-white transition-all text-xs uppercase tracking-wider font-medium text-gdr-dark group"
          >
            <Home className="w-4 h-4 text-gdr-beige flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Página Inicial</span>
          </Link>
          <Link
            to="/blog"
            className="flex items-center space-x-3 p-3 bg-white border border-gdr-border hover:border-gdr-dark hover:bg-gdr-dark hover:text-white transition-all text-xs uppercase tracking-wider font-medium text-gdr-dark group"
          >
            <BookOpen className="w-4 h-4 text-gdr-beige flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Blog & Materiais</span>
          </Link>
          <Link
            to="/#atuacao"
            className="flex items-center space-x-3 p-3 bg-white border border-gdr-border hover:border-gdr-dark hover:bg-gdr-dark hover:text-white transition-all text-xs uppercase tracking-wider font-medium text-gdr-dark group"
          >
            <Compass className="w-4 h-4 text-gdr-beige flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Áreas de Atuação</span>
          </Link>
          <Link
            to="/#equipe"
            className="flex items-center space-x-3 p-3 bg-white border border-gdr-border hover:border-gdr-dark hover:bg-gdr-dark hover:text-white transition-all text-xs uppercase tracking-wider font-medium text-gdr-dark group"
          >
            <Users className="w-4 h-4 text-gdr-beige flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Corpo Jurídico</span>
          </Link>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gdr-dark hover:bg-gdr-beige text-white hover:text-gdr-dark text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Portal Principal</span>
        </Link>
      </div>
    </main>
  );
}

function AppLayout() {
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();

  const isBioPage = checkIsBioRoute(location.pathname, location.hash, location.search) ||
                    checkIsBioRoute(window.location.pathname, window.location.hash, window.location.search);

  useEffect(() => {
    const norm = (location.pathname || "").toLowerCase().replace(/\/+$/, "");
    if (isBioPage) {
      document.title = "Conheça os materiais do Gouvêa dos Reis Advogados";
    } else if (norm === "/materiais" || norm === "/blog" || norm === "/artigos") {
      document.title = "Blog & Materiais Jurídicos | GDR Advogados";
    } else if (norm === "/sobre") {
      document.title = "Sobre a GDR | Gouvêa dos Reis Advogados";
    } else if (norm === "/atuacao" || norm === "/areas" || norm === "/areas-de-atuacao") {
      document.title = "Áreas de Atuação | GDR Advogados";
    } else if (norm === "/equipe" || norm === "/advogados") {
      document.title = "Nossa Equipe | GDR Advogados";
    } else if (norm === "/portfolio") {
      document.title = "Portfólio | GDR Advogados";
    } else if (norm === "/contato" || norm === "/fale-conosco") {
      document.title = "Contato | GDR Advogados";
    } else if (norm === "" || norm === "/") {
      document.title = "Gouvêa dos Reis — GDR Advogados";
    }
    
    const handleScroll = () => {
      const isHome = location.pathname === "/" || ["/sobre", "/atuacao", "/areas", "/equipe", "/advogados", "/portfolio", "/contato"].includes(norm);
      if (!isHome || isBioPage) return;
      const sections = ["hero", "sobre", "atuacao", "equipe", "portfolio", "contato"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, location.hash, location.search, isBioPage]);

  if (isBioPage) {
    return <BioPage />;
  }

  return (
    <div className="min-h-screen bg-white text-gdr-dark font-sans overflow-x-hidden selection:bg-gdr-beige selection:text-gdr-dark">
      <Header activeSection={activeSection} />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Blog & Materiais Routes */}
        <Route path="/blog" element={<MaterialsPage />} />
        <Route path="/blog/:slug" element={<MaterialRouteHandler />} />
        <Route path="/materiais" element={<MaterialsPage />} />
        <Route path="/materiais/:slug" element={<MaterialRouteHandler />} />
        <Route path="/artigos" element={<MaterialsPage />} />
        <Route path="/artigos/:slug" element={<MaterialRouteHandler />} />
        <Route path="/artigo" element={<MaterialsPage />} />
        <Route path="/artigo/:slug" element={<ArticlePage />} />

        {/* Section Routes Accessible via Direct URL */}
        <Route path="/sobre" element={<HomePage defaultSection="sobre" />} />
        <Route path="/atuacao" element={<HomePage defaultSection="atuacao" />} />
        <Route path="/areas" element={<HomePage defaultSection="atuacao" />} />
        <Route path="/areas-de-atuacao" element={<HomePage defaultSection="atuacao" />} />
        <Route path="/equipe" element={<HomePage defaultSection="equipe" />} />
        <Route path="/advogados" element={<HomePage defaultSection="equipe" />} />
        <Route path="/portfolio" element={<HomePage defaultSection="portfolio" />} />
        <Route path="/contato" element={<HomePage defaultSection="contato" />} />
        <Route path="/fale-conosco" element={<HomePage defaultSection="contato" />} />

        {/* Bio Link Routes */}
        <Route path="/link" element={<BioPage />} />
        <Route path="/links" element={<BioPage />} />
        <Route path="/linktree" element={<BioPage />} />
        <Route path="/bio" element={<BioPage />} />
        <Route path="/link-in-bio" element={<BioPage />} />
        <Route path="/links-oficiais" element={<BioPage />} />
        <Route path="/biolink" element={<BioPage />} />

        {/* Fallback for Trailing Slashes, Custom URLs & 404 */}
        <Route path="*" element={<RouteFallback />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
