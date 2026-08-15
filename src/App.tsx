import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import HomePage from "./pages/HomePage";
import MaterialsPage from "./pages/MaterialsPage";
import ArticlePage from "./pages/ArticlePage";
import BioPage from "./pages/BioPage";

function AppLayout() {
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();

  const isBioPage =
    location.pathname === "/bio" ||
    location.pathname === "/links" ||
    location.pathname === "/link-in-bio";

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Gouvêa dos Reis — GDR Advogados";
    } else if (location.pathname === "/materiais") {
      document.title = "Materiais | Gouvêa dos Reis";
    } else if (isBioPage) {
      document.title = "Links Oficiais | Gouvêa dos Reis Advogados";
    }
    
    const handleScroll = () => {
      if (location.pathname !== "/") return;
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
  }, [location.pathname, isBioPage]);

  if (isBioPage) {
    return (
      <Routes>
        <Route path="/bio" element={<BioPage />} />
        <Route path="/links" element={<BioPage />} />
        <Route path="/link-in-bio" element={<BioPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gdr-dark font-sans overflow-x-hidden selection:bg-gdr-beige selection:text-gdr-dark">
      <Header activeSection={activeSection} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materiais" element={<MaterialsPage />} />
        <Route path="/artigo/:slug" element={<ArticlePage />} />
        <Route path="/materiais/:slug" element={<ArticlePage />} />
        <Route path="/bio" element={<BioPage />} />
        <Route path="/links" element={<BioPage />} />
        <Route path="/link-in-bio" element={<BioPage />} />
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
