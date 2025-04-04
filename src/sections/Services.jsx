import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaBlog, FaRocket } from 'react-icons/fa'
import { useState } from 'react'

export function Services() {
  // Separate state for each service's expansion
  const [expandedStates, setExpandedStates] = useState({})

  const services = [
    {
      id: "web-dev",
      icon: <FaCode className="text-4xl text-teal-400 glow" />,
      title: "Custom Web Development",
      shortDescription: "Bespoke, lightning-fast websites built with cutting-edge tech.",
      fullDescription: "Dive into a digital renaissance where websites pulse with life. We sculpt bespoke platforms with React, Next.js, and wizardry—think holographic layouts, real-time interactivity, and speed that defies physics. Your brand becomes a living ecosystem, thriving across devices with animations that dance and designs that mesmerize.",
      accentColor: "teal",
      details: [
        "Holographic UI/UX design",
        "Real-time data syncing",
        "3D interactive elements",
        "Voice-command integration"
      ],
      particleEffect: "code-rain"
    },
    {
      id: "blog",
      icon: <FaBlog className="text-4xl text-violet-400 glow" />,
      title: "Blog Websites",
      shortDescription: "Dynamic blog platforms designed to captivate and engage.",
      fullDescription: "Your words ignite the cosmos on blogs that hum with energy. Picture neon-lit archives that scroll forever, posts that shimmer with embedded holograms, and a CMS so intuitive it feels like telepathy. We weave social reactors, AI-curated tags, and reader heatmaps into a platform that’s alive—your narrative, electrified.",
      accentColor: "violet",
      details: [
        "Neon typography skins",
        "AI-powered content suggestions",
        "Live reader reaction feeds",
        "Augmented reality post previews",
        "Voice-to-text publishing",
        "Galactic comment threads"
      ],
      particleEffect: "star-burst"
    },
    {
      id: "seo",
      icon: <FaRocket className="text-4xl text-coral-400 glow" />,
      title: "SEO Marketing",
      shortDescription: "Boost your visibility with top-tier SEO strategies.",
      fullDescription: "Launch your presence into orbit with SEO that’s pure rocket fuel. We hack the matrix of search algorithms—laser-focused keywords, quantum-speed optimizations, and backlinks that ripple across the web. Your site doesn’t just rank; it dominates with analytics that glow and strategies that evolve in real-time.",
      accentColor: "coral",
      details: [
        "Quantum keyword mapping",
        "Holographic traffic dashboards",
        "AI-driven competitor tracking",
        "Interstellar link-building"
      ],
      particleEffect: "rocket-trail"
    }
  ]

  const toggleExpand = (id) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id] // Toggle only the clicked service
    }))
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
    hover: { y: -10, scale: 1.03, transition: { duration: 0.3 } }
  }

  const expandVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-950 to-black relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 bg-teal-500/10 rounded-full blur-2xl top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-64 h-64 bg-violet-500/10 rounded-full blur-2xl bottom-1/4 right-1/4 animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-violet-400 to-coral-400">
            Our Services
          </span>
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              className={`bg-gray-800/40 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-${service.accentColor}-400 transition-all duration-300 relative`}
            >
              <div className={`mb-6 text-${service.accentColor}-400`}>{service.icon}</div>
              <h3 className={`text-xl font-bold mb-4 text-${service.accentColor}-300`}>{service.title}</h3>
              <p className="text-gray-200 mb-6">{service.shortDescription}</p>

              {/* Expand Button */}
              <button
                onClick={() => toggleExpand(service.id)}
                className={`text-${service.accentColor}-400 hover:text-${service.accentColor}-300 text-sm font-medium flex items-center gap-2 transition-colors`}
              >
                {expandedStates[service.id] ? "Collapse" : "Discover More"}
                <motion.span
                  animate={{ rotate: expandedStates[service.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedStates[service.id] && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-6 overflow-hidden"
                  >
                    <p className="text-gray-100 text-base leading-relaxed mb-6">{service.fullDescription}</p>
                    <ul className="space-y-3">
                      {service.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`text-${service.accentColor}-100 text-sm flex items-center`}
                        >
                          <span className={`w-2 h-2 bg-${service.accentColor}-400 rounded-full mr-3 glow-sm`} />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div 
                      className={`w-full h-1 bg-${service.accentColor}-400 mt-6 rounded-full glow-sm`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    {/* Particle Effect Placeholder */}
                    <motion.div
                      className={`absolute inset-0 opacity-0 ${service.particleEffect} pointer-events-none`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}