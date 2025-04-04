import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 300], [0, 50]); // Parallax effect for background
  const yText = useTransform(scrollY, [0, 300], [0, 20]); // Subtle text movement

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-gray-900"
    >
      {/* 3D Background Image with Parallax */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 z-0"
      >
        <motion.img
          src="https://www.womenintech.co.uk/wp-content/uploads/2021/11/Tech-skills-2022-1-1536x864.png.webp"
          alt="Tech Skills 2022"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent" />
      </motion.div>

      {/* Floating 3D Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 1000 - 500,
              y: Math.random() * 600 - 300,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-sm"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ x: -100, rotateX: -15 }}
          animate={{ x: 0, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }}
          style={{ perspective: 1000 }} // Adds 3D depth
        >
          {/* 3D Animated Title */}
          <motion.h2
            initial={{ opacity: 0, y: 50, rotateY: -20 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            style={{ transformStyle: 'preserve-3d' }}
          >
            We Build{' '}
            <motion.span
              className="text-indigo-400 inline-block"
              initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.05, rotateZ: 5 }}
            >
              Digital Experiences
            </motion.span>
          </motion.h2>

          {/* Subtitle with Glow */}
          <motion.p
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl drop-shadow-md"
            style={{ textShadow: '0 0 10px rgba(129, 140, 248, 0.3)' }}
          >
            Crafting stunning websites, tech blogs, and software solutions that{' '}
            <span className="text-indigo-300">spark imagination</span>.
          </motion.p>

          {/* 3D Button with Hover Effect */}
          <motion.button
            whileHover={{ scale: 1.1, rotateX: 10, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.95, rotateX: -10 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 100 }}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 text-white shadow-lg transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            Explore Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle 3D Grid Overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#818cf8_1px,transparent_1px),linear-gradient(to_bottom,#818cf8_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>
    </motion.section>
  );
}