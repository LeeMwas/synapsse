import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      rating: 5,
      quote: "The team transformed our vision into an amazing reality. Their attention to detail and creativity exceeded all expectations!",
      image: "https://via.placeholder.com/100"
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateX",
      rating: 5,
      quote: "Working with them was a game-changer. Professional, responsive, and delivered ahead of schedule.",
      image: "https://via.placeholder.com/100"
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director",
      company: "BrandPeak",
      rating: 4.5,
      quote: "Exceptional quality and service. Our project came to life exactly as we imagined!",
      image: "https://via.placeholder.com/100"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            What Our Clients Say
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
            Discover why our clients love working with us and how we've helped them succeed.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-gray-900/70 p-8 rounded-2xl border border-gray-700 backdrop-blur-lg shadow-xl hover:shadow-cyan-500/10 transition-all duration-500"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gradient relative group">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className="text-center">
                <FaQuoteLeft className="text-3xl text-cyan-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-200 text-lg mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </p>

                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        i < Math.floor(testimonials[currentTestimonial].rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-gray-400">
                  {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 scale-125' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="relative inline-block overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
            <span className="relative z-10 flex items-center">
              Share Your Experience
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </a>
        </motion.div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .border-gradient {
          border-image: linear-gradient(to right, #0891b2, #8b5cf6, #ec4899);
          border-image-slice: 1;
        }

        @media (max-width: 640px) {
          .text-5xl {
            font-size: 2.5rem;
          }
          .text-lg {
            font-size: 1rem;
          }
          .p-8 {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}