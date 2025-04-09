import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useRef } from 'react';

// Enhanced platform data with descriptions and more prominent styling
const platforms = [
  { 
    name: 'WordPress', 
    iconSrc: 'https://cdn.iconscout.com/icon/free/png-512/free-wordpress-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-675858.png?f=webp&w=512',
    color: '#21759b',
    description: 'Content-rich websites & blogs'
  },
  { 
    name: 'Webflow', 
    iconSrc: 'https://logotyp.us/file/webflow.svg',
    color: '#4353ff',
    description: 'Visual design-led experiences'
  },
  { 
    name: 'Shopify', 
    iconSrc: 'https://www.ecommerce-nation.com/wp-content/uploads/2018/01/Shopify-ecommerce-platform.png.webp',
    color: '#7ab55c',
    description: 'Powerful e-commerce solutions'
  },
  { 
    name: 'Odoo', 
    iconSrc: 'https://lowendbox.com/wp-content/uploads/2022/09/odoo_logo_1200-768x768.png',
    color: '#714b67',
    description: 'All-in-one business platforms'
  },
];

// Enhanced animations for platform cards
const platformContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const platformItemVariants = {
  hidden: { opacity: 0, y: 30, rotateY: 30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

// Subtle floating animation for background elements
const floatAnimation = {
  y: [0, -10, 0],
  transition: { 
    duration: 5, 
    repeat: Infinity, 
    ease: "easeInOut" 
  }
};

export function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 300], [0, 50]);
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-gray-900"
    >
      {/* 3D Background with Parallax */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 z-0"
      >
        <motion.img
          src="https://www.womenintech.co.uk/wp-content/uploads/2021/11/Tech-skills-2022-1-1536x864.png.webp"
          alt="Technical Background"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        {/* Enhanced gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </motion.div>

      {/* Floating particles with platform colors */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {platforms.map((platform, platformIndex) => (
          [...Array(3)].map((_, i) => (
            <motion.div
              key={`${platformIndex}-${i}`}
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
                delay: i * 0.4 + platformIndex * 0.5,
                ease: 'easeInOut',
              }}
              className="absolute w-3 h-3 rounded-full blur-md"
              style={{ backgroundColor: platform.color }}
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
            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            >
              Expert Solutions With{' '}
              <motion.span
                className="text-indigo-400 inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.05 }}
              >
                Leading Platforms
              </motion.span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
              style={{ textShadow: '0 0 10px rgba(129, 140, 248, 0.3)' }}
            >
              Transform your business with custom digital experiences powered by industry-leading technologies.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg font-medium flex items-center gap-3 text-white shadow-lg transform-gpu group text-lg"
            >
              Discover Our Solutions <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Column: Platform Cards */}
          <motion.div
            variants={platformContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {platforms.map((platform) => (
              <motion.div
                key={platform.name}
                variants={platformItemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 0 15px 5px ${platform.color}40`,
                  y: -5
                }}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 flex flex-col items-center p-6 transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Platform Icon */}
                <motion.div 
                  className="w-16 h-16 md:w-20 md:h-20 mb-4 relative"
                  animate={floatAnimation}
                >
                  <div 
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{ backgroundColor: platform.color }}
                  />
                  <img
                    src={platform.iconSrc}
                    alt={`${platform.name} platform`}
                    className="w-full h-full object-contain relative z-10"
                  />
                </motion.div>
                
                {/* Platform Name */}
                <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                
                {/* Platform Description */}
                <p className="text-gray-300 text-center text-sm">{platform.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced 3D Grid Overlay */}
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