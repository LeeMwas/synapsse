import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export function SocialLinks() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInitialText, setShowInitialText] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Handle initial load and text timeout
  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setShowInitialText(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Observe footer visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const footerElement = document.querySelector('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  // Add interaction tracking
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('click', handleInteraction);
    
    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  const links = [
    {
      icon: <FaWhatsapp className="text-2xl" />,
      url: "https://wa.me/+254705483375",
      color: "bg-green-500",
      hoverColor: "bg-green-600",
      initialText: "Let's Chat on WhatsApp!",
      hoverText: "One Click Connect!",
      pulseColor: "bg-green-300",
      animationDelay: 0,
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      url: "mailto:kirigwingash@gmail.com",
      color: "bg-red-500",
      hoverColor: "bg-red-600",
      initialText: "Send a Direct Message",
      hoverText: "Reach Out Now!",
      pulseColor: "bg-red-300",
      animationDelay: 0.15,
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      url: "https://www.linkedin.com/in/harrykirigwi/",
      color: "bg-blue-600",
      hoverColor: "bg-blue-700",
      initialText: "Connect on LinkedIn",
      hoverText: "Let's Network!",
      pulseColor: "bg-blue-400",
      animationDelay: 0.3,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.1,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 150,
        damping: 12,
      }
    }),
    exit: { y: 50, opacity: 0, scale: 0.8 }
  };

  // Attention-grabbing animations that trigger periodically
  const triggerAttentionAnimation = !hasInteracted && isLoaded;

  return (
    <AnimatePresence>
      {!isFooterVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-50 flex flex-col space-y-4 md:space-y-5 items-end"
        >
          {links.map((link, index) => (
            <motion.div 
              key={index} 
              className="relative flex items-center"
              custom={index}
              variants={itemVariants}
            >
              {/* Initial Descriptive Text on Page Load */}
              <AnimatePresence>
                {isLoaded && showInitialText && hoveredIndex !== index && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: index * 0.2,
                    }}
                    className="absolute right-full mr-3 md:mr-4 px-3 py-1.5 bg-gray-800/95 text-white rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50 whitespace-nowrap"
                  >
                    <span className="text-xs md:text-sm font-bold tracking-wide">{link.initialText}</span>
                    <motion.span 
                      className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-800 rotate-45"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Call-to-Action Text */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute right-full mr-3 md:mr-4 px-3 py-1.5 bg-gray-800/95 text-white rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50 whitespace-nowrap"
                  >
                    <span className="text-xs md:text-sm font-semibold tracking-wide">{link.hoverText}</span>
                    <motion.span 
                      className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-800 rotate-45"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Icon Button */}
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  y: -8,
                  rotate: [0, 5, -5, 0],
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`${link.color} ${hoveredIndex === index ? link.hoverColor : ''} text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 group relative overflow-hidden w-12 h-12 md:w-14 md:h-14 flex items-center justify-center`}
                aria-label={link.initialText}
              >
                {/* Enhanced Pulsing Effect */}
                <motion.span
                  className={`absolute inset-0 ${link.pulseColor} rounded-full`}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
                
                {/* Attention-grabbing animation */}
                {triggerAttentionAnimation && index === 0 && (
                  <motion.span
                    className="absolute inset-0 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: 2,
                      repeatDelay: 5,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  />
                )}
                
                {/* Icon with Enhanced Bounce */}
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    y: [0, -4, 0],
                    scale: hoveredIndex === index ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    y: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    },
                    scale: {
                      duration: 0.5,
                      repeat: hoveredIndex === index ? 2 : 0,
                      ease: "easeInOut",
                    }
                  }}
                >
                  {link.icon}
                </motion.div>
              </motion.a>
            </motion.div>
          ))}

          {/* Enhanced Floating CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: ['0px 4px 12px rgba(0, 0, 0, 0.2)', '0px 8px 20px rgba(79, 70, 229, 0.4)', '0px 4px 12px rgba(0, 0, 0, 0.2)'],
            }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ 
              delay: 1.2, 
              type: "spring", 
              stiffness: 100,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-xl mt-4 text-xs md:text-sm relative overflow-hidden"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0px 5px 20px rgba(79, 70, 229, 0.5)",
              backgroundPosition: ['0% 50%', '100% 50%'], 
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Subtle gradient animation */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 opacity-50"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="font-bold tracking-wide relative z-10">Ready to Connect? Click Now!</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}