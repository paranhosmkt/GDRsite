import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import PracticeAreas from "../components/PracticeAreas";
import Team from "../components/Team";
import Portfolio from "../components/Portfolio";
import KeyFeatures from "../components/KeyFeatures";
import ContactForm from "../components/ContactForm";

export const scrollToSection = (sectionId: string, smooth: boolean = true) => {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = Math.max(0, elementPosition - 85); // header height offset
    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? "smooth" : "auto",
    });
  }
};

interface HomePageProps {
  defaultSection?: string;
}

export default function HomePage({ defaultSection }: HomePageProps = {}) {
  const location = useLocation();

  useEffect(() => {
    const targetSection = defaultSection || (location.hash ? location.hash.replace("#", "") : null);

    if (targetSection) {
      // Perform initial scroll and follow-up adjustments to counter layout shifts from async Sanity data
      scrollToSection(targetSection, false);

      const timeouts = [
        setTimeout(() => scrollToSection(targetSection, true), 150),
        setTimeout(() => scrollToSection(targetSection, true), 450),
        setTimeout(() => scrollToSection(targetSection, true), 900),
        setTimeout(() => scrollToSection(targetSection, true), 1600),
      ];

      return () => {
        timeouts.forEach(clearTimeout);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, defaultSection]);

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
