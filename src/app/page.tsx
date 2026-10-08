import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBar } from "@/components/ContactBar";
import { Hero } from "@/sections/Hero";
import { Simulator } from "@/sections/Simulator";
import { HowItWorks } from "@/sections/HowItWorks";
import { WhyArt } from "@/sections/WhyArt";
import { Reviews } from "@/sections/Reviews";
import { Services } from "@/sections/Services";
import { Works } from "@/sections/Works";
import { Faq } from "@/sections/Faq";
import { Contact } from "@/sections/Contact";
import { FinalCta } from "@/sections/FinalCta";

/**
 * Funil: impacto (vídeo) → "quanto estou perdendo" (simulador) → "é simples, inclusive a Enel"
 * (como funciona) → confiança (por que a Art + avaliações) → o que fazemos → obras → objeções
 * (dúvidas) → contato → empurrão final. WhatsApp a um toque em todas as etapas.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Simulator />
        <HowItWorks />
        <WhyArt />
        <Reviews />
        <Services />
        <Works />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <ContactBar />
    </>
  );
}
