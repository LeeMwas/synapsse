import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { Portfolio } from '../sections/Portfolio';
import { Blog } from '../sections/Blog'; // Import the new Blog component
import { Contact } from '../sections/Contact';
import { Footer } from './Footer';
import { SocialLinks } from './SocialLinks';
import { TechLogoScroller } from './TechLogoScroller';
import { SynapseSpinner } from './SynapseSpinner';
import { QuoteHero } from '../sections/QuoteForm';
import { Testimonials } from '../sections/Testimonials';


export function Home() {  
  // Otherwise, show the main application
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main>
        <section id="home" className="snap-start">
          <Hero />
        </section>

        <section id="tech-stack" className="snap-start pt-16 pb-10">
          <TechLogoScroller />
        </section>

        <section id="services" className="snap-start py-16">
          <Services />
        </section>

        <section id="portfolio" className="snap-start py-20 bg-gray-800/20">
          <Portfolio />
        </section>

        <section id="quote-form" className="snap-start py-20 bg-gray-800/20">
          <QuoteHero />
        </section>

        {/* New Blog section */}
        {/* <section id="blog" className="snap-start py-20 bg-gray-950">
          <Blog />
        </section> */}

        <section id="contact" className="snap-start py-20">
          <Contact />
        </section>
        <SocialLinks />
      </main>

      <section id="quote-form" className="snap-start py-20 bg-gray-800/20">
          <Testimonials />
        </section>

      <Footer id="footer" />
    </div>
  );
}