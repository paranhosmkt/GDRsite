import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import PracticeAreas from "../components/PracticeAreas";
import Team from "../components/Team";
import Portfolio from "../components/Portfolio";
import KeyFeatures from "../components/KeyFeatures";
import ContactForm from "../components/ContactForm";

export const scrollToSection = (sectionId: string) => {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 85; // header height offset
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <Hero
        onLearnMore={() => scrollToSection("atuacao")}
        onContact={() => scrollToSection("contato")}
      />
      <About />
      <PracticeAreas />
      <Team />
      <Portfolio />
      <KeyFeatures />
      <ContactForm />
    </main>
  );
}
