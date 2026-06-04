import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import PracticeAreas from "./components/PracticeAreas";
import Team from "./components/Team";
import Portfolio from "./components/Portfolio";
import Blog from "./components/Blog";
import KeyFeatures from "./components/KeyFeatures";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Dynamic viewport scroll tracking to update Header links automatically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "sobre", "atuacao", "equipe", "portfolio", "blog", "contato"];
      const scrollPosition = window.scrollY + 250; // offset for floating header

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
  }, []);

  // Smooth scrolling transition driver
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 85; // header height offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gdr-dark font-sans overflow-x-hidden selection:bg-gdr-beige selection:text-gdr-dark">
      {/* Dynamic Floating Navigation Header */}
      <Header onNavigate={handleScrollToSection} activeSection={activeSection} />

      {/* Main Sections Cascade */}
      <main>
        {/* HERO HEADER */}
        <Hero
          onLearnMore={() => handleScrollToSection("atuacao")}
          onContact={() => handleScrollToSection("contato")}
        />

        {/* PRESENTATION / ABOUT AT 57+ YEARS */}
        <About />

        {/* INTERACTIVE PRACTICE AREAS */}
        <PracticeAreas />

        {/* TEAM & LEADERSHIP */}
        <Team />

        {/* PORTFOLIO & SECTORS */}
        <Portfolio />

        {/* UNIQUE STRATEGIC DIFFERENTIATORS */}
        <KeyFeatures />

        {/* BLOG / RECURSOS EDUCATIVOS */}
        <Blog />

        {/* EXECUTIVE INQUIRY REUNIONS */}
        <ContactForm />
      </main>

      {/* FOOTER & ADDRESSES & SEALS */}
      <Footer onNavigate={handleScrollToSection} />

      <WhatsAppButton />
    </div>
  );
}
