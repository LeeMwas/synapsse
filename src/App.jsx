import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Portfolio } from './sections/Portfolio';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { SocialLinks } from './components/SocialLinks';
import { TechLogoScroller } from './components/TechLogoScroller'; // Import the new component

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main>
        <section id="home" className="snap-start">
          <Hero />
        </section>

        {/* Add TechLogoScroller Section Here */}
        <section id="tech-stack" className="snap-start pt-16 pb-10">
          <TechLogoScroller />
        </section>

        <section id="services" className="snap-start py-16">
          <Services />
        </section>

        <section id="portfolio" className="snap-start py-20 bg-gray-800/20">
          <Portfolio />
        </section>

        <section id="contact" className="snap-start py-20">
          <Contact />
        </section>
        <SocialLinks />
      </main>

      <Footer id="footer" />
    </div>
  );
}