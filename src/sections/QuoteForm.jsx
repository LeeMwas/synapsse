import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useRef } from 'react';

// Colors for animated particles
const particleColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

// Subtle floating animation for elements
const floatAnimation = {
  y: [0, -10, 0],
  transition: { 
    duration: 5, 
    repeat: Infinity, 
    ease: "easeInOut" 
  }
};

export function QuoteHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 300], [0, 50]);
  
  // Function to scroll to quote form
  const scrollToQuoteForm = () => {
    const quoteFormSection = document.getElementById('contact');
    if (quoteFormSection) {
      quoteFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-gray-900"
    >
      {/* Dynamic Background with Parallax */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 z-0"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Digital Background"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </motion.div>

      {/* Floating particles with various colors */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particleColors.map((color, colorIndex) => (
          [...Array(3)].map((_, i) => (
            <motion.div
              key={`${colorIndex}-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
                x: Math.random() * 1200 - 600,
                y: Math.random() * 700 - 350,
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.4 + colorIndex * 0.5,
                ease: 'easeInOut',
              }}
              className="absolute w-3 h-3 rounded-full blur-md"
              style={{ backgroundColor: color }}
            />
          ))
        ))}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Main Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }}
          >
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            >
              Transform Your{' '}
              <motion.span
                className="text-indigo-400 inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.05 }}
              >
                Digital Presence
              </motion.span>
            </motion.h2>

            {/* Subtitle with gradient text */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
              style={{ textShadow: '0 0 10px rgba(129, 140, 248, 0.3)' }}
            >
              We craft innovative digital solutions tailored to your business needs, helping you stand out in today's competitive market.
            </motion.p>

            {/* CTA Button with hover and tap animations */}
            <motion.button
              onClick={scrollToQuoteForm}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg font-medium flex items-center gap-3 text-white shadow-lg transform-gpu group text-lg"
            >
              Get a Quote <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Column: Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 80, damping: 15 }}
            className="relative"
          >
            {/* Decorative glow behind image */}
            <div className="absolute inset-0 -m-6 rounded-full bg-indigo-600/20 blur-2xl"></div>
            
            {/* Floating image container */}
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700"
              animate={floatAnimation}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main image */}
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Digital Services Illustration" 
                className="w-full object-cover aspect-[4/3]"
              />
              
              {/* Overlay with gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent"></div>
              
              {/* Optional: Floating elements on top of the image */}
              <motion.div 
                className="absolute top-6 right-6 w-20 h-20 bg-indigo-600/30 backdrop-blur-md rounded-lg flex items-center justify-center"
                animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Grid Overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#818cf8_1px,transparent_1px),linear-gradient(to_bottom,#818cf8_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>
    </motion.section>
  );
}