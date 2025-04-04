import { motion } from 'framer-motion';
import { FiCode, FiMenu, FiX, FiHome, FiTool, FiFolder, FiMail } from 'react-icons/fi';
import { useState, useEffect } from 'react';

// Debounce utility to limit scroll event frequency
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const navItems = [
  { name: 'Home', id: 'home', icon: <FiHome size={20} /> }, // Hero section
  { name: 'Services', id: 'services', icon: <FiTool size={20} /> },
  { name: 'Portfolio', id: 'portfolio', icon: <FiFolder size={20} /> },
  { name: 'Contact', id: 'contact', icon: <FiMail size={20} /> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home'); // Default to 'home'

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  // Handle click navigation
  const handleNavClick = (id) => {
    setIsOpen(false);
    setActiveItem(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Update active item based on scroll position
  useEffect(() => {
    const updateActiveItem = () => {
      const scrollPosition = window.scrollY;
      let newActiveItem = 'home'; // Default to 'home'

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const { top, height } = section.getBoundingClientRect();
          const sectionTop = top + window.scrollY;
          const sectionBottom = sectionTop + height;

          // If the top of the viewport is within this section
          if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionBottom - 50) {
            newActiveItem = item.id;
            break; // Exit loop once we find the active section
          }
        }
      }

      setActiveItem(newActiveItem);
    };

    const handleScroll = debounce(updateActiveItem, 100); // Debounce to 100ms

    window.addEventListener('scroll', handleScroll);
    updateActiveItem(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700 p-4 sticky top-0 z-50 shadow-xl backdrop-blur-md"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo - scrolls to top */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveItem('home');
          }}
          className="flex items-center space-x-2 text-white hover:text-blue-100 transition"
        >
          <FiCode className="text-2xl" />
          <span className="text-2xl font-semibold tracking-wide">Synnapse</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative flex items-center space-x-2 text-gray-200 hover:text-white font-medium transition duration-300 ${
                activeItem === item.id ? 'text-white bg-indigo-900 rounded-lg px-4 py-2' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {activeItem === item.id && (
                <motion.div
                  className="absolute left-0 -bottom-1 w-full h-1 bg-cyan-300"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="md:hidden mt-4 bg-indigo-900 rounded-lg shadow-lg overflow-hidden"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center space-x-2 py-3 px-6 text-gray-200 hover:bg-indigo-700 hover:text-white transition text-left border-b border-indigo-700 last:border-b-0 w-full ${
                activeItem === item.id ? 'bg-indigo-700 text-white' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}