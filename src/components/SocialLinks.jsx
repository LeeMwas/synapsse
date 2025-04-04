import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export function SocialLinks() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInitialText, setShowInitialText] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Handle initial load and text timeout
  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setShowInitialText(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Observe footer visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% of the footer is visible
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

  const links = [
    {
      icon: <FaWhatsapp className="text-2xl" />,
      url: "https://wa.me/YOUR_PHONE_NUMBER",
      color: "bg-green-500",
      hoverColor: "bg-green-600",
      initialText: "Your VIP Chat Awaits!",
      hoverText: "Dive In Now!",
      pulseColor: "bg-green-300",
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      url: "mailto:your@email.com",
      color: "bg-red-500",
      hoverColor: "bg-red-600",
      initialText: "Secrets to Success Inside!",
      hoverText: "Open the Door!",
      pulseColor: "bg-red-300",
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      url: "https://linkedin.com/company/your-profile",
      color: "bg-blue-600",
      hoverColor: "bg-blue-700",
      initialText: "Step Into Our Network!",
      hoverText: "Link Up Fast!",
      pulseColor: "bg-blue-400",
    },
  ];

  return (
    <AnimatePresence>
      {!isFooterVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-50 flex flex-col space-y-4 md:space-y-6 items-end"
        >
          {links.map((link, index) => (
            <div key={index} className="relative flex items-center">
              {/* Initial Descriptive Text on Page Load */}
              <AnimatePresence>
                {isLoaded && showInitialText && hoveredIndex !== index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: index * 0.2,
                    }}
                    className="absolute right-full mr-2 md:mr-4 px-3 py-1.5 bg-gray-900/90 text-white rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50 whitespace-nowrap"
                  >
                    <span className="text-xs md:text-sm font-bold tracking-wide">{link.initialText}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Call-to-Action Text */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute right-full mr-2 md:mr-4 px-3 py-1.5 bg-gray-900/90 text-white rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/50 whitespace-nowrap"
                  >
                    <span className="text-xs md:text-sm font-semibold tracking-wide">{link.hoverText}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Icon Button */}
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 60, opacity: 0, scale: 0.7 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.2 + 0.5,
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.2,
                  y: -10,
                  rotate: [0, 5, -5, 0],
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`${link.color} ${hoveredIndex === index ? link.hoverColor : ''} text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 group relative overflow-hidden w-12 h-12 md:w-14 md:h-14 flex items-center justify-center`}
                aria-label={link.initialText}
              >
                {/* Pulsing Effect */}
                <motion.span
                  className={`absolute inset-0 ${link.pulseColor} rounded-full`}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0.3, 0.6],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Icon with Bounce */}
                <motion.div
                  className="relative z-10"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  {link.icon}
                </motion.div>
              </motion.a>
            </div>
          ))}

          {/* Bonus Floating CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-full shadow-xl mt-4 text-xs md:text-sm"
            whileHover={{ scale: 1.1, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)" }}
          >
            <span className="font-bold tracking-wide">Ready? Reach Out!</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}