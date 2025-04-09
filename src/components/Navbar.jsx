import { motion } from 'framer-motion';
import { FiCode, FiMenu, FiX, FiHome, FiTool, FiFolder, FiMail, FiBookOpen } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Debounce utility to limit scroll event frequency
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Define navigation items with clear distinction between in-page and route items
  const navItems = [
    { name: 'Home', id: 'home', icon: <FiHome size={20} />, type: 'section' },
    { name: 'Services', id: 'services', icon: <FiTool size={20} />, type: 'section' },
    { name: 'Portfolio', id: 'portfolio', icon: <FiFolder size={20} />, type: 'section' },
    { name: 'Blog', id: 'blog', icon: <FiBookOpen size={20} />, type: 'route' },
    { name: 'Contact', id: 'contact', icon: <FiMail size={20} />, type: 'section' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  // Handle navigation clicks
  const handleNavClick = (item) => {
    setIsOpen(false);
    
    if (item.type === 'route') {
      // Use navigate with replace: false to ensure proper history
      navigate(`/${item.id}`, { replace: false });
    } else if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/', { replace: false });
      // Use a slightly longer timeout to ensure navigation completes
      setTimeout(() => {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveItem(item.id);
        }
      }, 300); // Increased timeout
    } else {
      // Regular in-page navigation
      setActiveItem(item.id);
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Update active item based on scroll position and current route
  useEffect(() => {
    // Reset active state when route changes
    if (location.pathname === '/') {
      // On home page, track scroll position
      const updateActiveItem = () => {
        const scrollPosition = window.scrollY;
        let newActiveItem = 'home'; // Default to 'home'

        // Add shadow when scrolled
        if (scrollPosition > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }

        // Only check section items (not routes)
        const sectionItems = navItems.filter(item => item.type === 'section');
        
        for (const item of sectionItems) {
          const section = document.getElementById(item.id);
          if (section) {
            const { top, height } = section.getBoundingClientRect();
            const sectionTop = top + window.scrollY;
            const sectionBottom = sectionTop + height;

            if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionBottom - 50) {
              newActiveItem = item.id;
              break;
            }
          }
        }

        setActiveItem(newActiveItem);
      };

      const handleScroll = debounce(updateActiveItem, 100);
      window.addEventListener('scroll', handleScroll);
      updateActiveItem(); // Set initial state

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else if (location.pathname === '/blog') {
      // Set active item to 'blog' when on blog page
      setActiveItem('blog');
      // Still handle navbar background/shadow based on scroll
      const handleScroll = debounce(() => {
        setScrolled(window.scrollY > 50);
      }, 100);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [location.pathname, navItems]);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700 p-4 sticky top-0 z-50 ${
        scrolled ? 'shadow-xl backdrop-blur-md' : ''
      } transition-all duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo - navigates to home */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname !== '/') {
              navigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setActiveItem('home');
          }}
          className="flex items-center space-x-2 text-white hover:text-blue-100 transition"
        >
          <FiCode className="text-2xl" />
          <span className="text-2xl font-semibold tracking-wide">Synnapse</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`relative flex items-center space-x-2 text-gray-200 hover:text-white font-medium transition duration-300 px-3 py-2 rounded-lg ${
                activeItem === item.id ? 'text-white bg-indigo-900' : ''
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
              onClick={() => handleNavClick(item)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center space-x-2 py-3 px-6 text-gray-200 hover:bg-indigo-700 hover:text-white transition text-left border-b border-indigo-700 last:border-b-0 w-full ${
                activeItem === item.id ? 'bg-indigo-700 text-white' : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {activeItem === item.id && (
                <motion.div
                  className="absolute left-1 w-1 h-full bg-cyan-300 rounded-r"
                  layoutId="mobileActiveIndicator"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}