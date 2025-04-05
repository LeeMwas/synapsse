import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { FaCode, FaBlog, FaRocket } from 'react-icons/fa'
import * as THREE from 'three'

export function Services() {
  const [activeService, setActiveService] = useState(null)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const controls = useAnimation()
  
  // Scene setup for Three.js
  useEffect(() => {
    if (!canvasRef.current) return
    
    // Initialize Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Add particles for background effect
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    
    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8a2be2,
      transparent: true,
      opacity: 0.8
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    camera.position.z = 3
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      particlesMesh.rotation.y += 0.0005
      particlesMesh.rotation.x += 0.0001
      renderer.render(scene, camera)
    }
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    animate()
    
    sceneRef.current = {
      scene,
      particlesMesh,
      renderer
    }
    
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])
  
  // Change particle color based on active service
  useEffect(() => {
    if (!sceneRef.current || !activeService) return
    
    let targetColor
    switch(activeService) {
      case 'web-dev': 
        targetColor = new THREE.Color(0x2dd4bf); // teal
        break;
      case 'blog': 
        targetColor = new THREE.Color(0x8b5cf6); // violet
        break;
      case 'seo': 
        targetColor = new THREE.Color(0xff6f61); // coral
        break;
      default: 
        targetColor = new THREE.Color(0x8a2be2);
    }
    
    if (sceneRef.current.particlesMesh) {
      sceneRef.current.particlesMesh.material.color = targetColor;
    }
  }, [activeService])
  
  const services = [
    {
      id: "web-dev",
      icon: <FaCode className="text-5xl" />,
      title: "Custom Web Development",
      shortDescription: "Bespoke, lightning-fast websites built with cutting-edge tech.",
      fullDescription: "Dive into a digital renaissance where websites pulse with life. We sculpt bespoke platforms with React, Next.js, and wizardry—think holographic layouts, real-time interactivity, and speed that defies physics.",
      accentColor: "teal",
      details: [
        "Holographic UI/UX design",
        "Real-time data syncing",
        "3D interactive elements",
        "Voice-command integration"
      ]
    },
    {
      id: "blog",
      icon: <FaBlog className="text-5xl" />,
      title: "Blog Websites",
      shortDescription: "Dynamic blog platforms designed to captivate and engage.",
      fullDescription: "Your words ignite the cosmos on blogs that hum with energy. Picture neon-lit archives that scroll forever, posts that shimmer with embedded holograms, and a CMS so intuitive it feels like telepathy.",
      accentColor: "violet",
      details: [
        "Neon typography skins",
        "AI-powered content suggestions",
        "Live reader reaction feeds",
        "Augmented reality post previews"
      ]
    },
    {
      id: "seo",
      icon: <FaRocket className="text-5xl" />,
      title: "SEO Marketing",
      shortDescription: "Boost your visibility with top-tier SEO strategies.",
      fullDescription: "Launch your presence into orbit with SEO that's pure rocket fuel. We hack the matrix of search algorithms—laser-focused keywords, quantum-speed optimizations, and backlinks that ripple across the web.",
      accentColor: "coral",
      details: [
        "Quantum keyword mapping",
        "Holographic traffic dashboards",
        "AI-driven competitor tracking",
        "Interstellar link-building"
      ]
    }
  ]
  
  const getServiceStyles = (service) => {
    const colors = {
      teal: {
        bg: "from-teal-900/30 to-teal-800/10",
        text: "text-teal-300",
        border: "border-teal-500/30",
        shadow: "shadow-teal-500/20",
        glow: "shadow-teal-400/40"
      },
      violet: {
        bg: "from-violet-900/30 to-violet-800/10",
        text: "text-violet-300",
        border: "border-violet-500/30",
        shadow: "shadow-violet-500/20",
        glow: "shadow-violet-400/40"
      },
      coral: {
        bg: "from-rose-900/30 to-orange-800/10",
        text: "text-rose-300",
        border: "border-rose-500/30", 
        shadow: "shadow-rose-500/20",
        glow: "shadow-rose-400/40"
      }
    }
    
    return colors[service.accentColor]
  }
  
  const selectService = (id) => {
    setActiveService(id === activeService ? null : id)
    controls.start({ opacity: 1 })
  }
  
  // Card variants for animations
  const cardVariants = {
    inactive: { 
      scale: 0.95, 
      opacity: 0.7,
      y: 0,
      transition: { duration: 0.5 }
    },
    active: { 
      scale: 1,
      opacity: 1,
      y: -20,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    initial: { 
      opacity: 0, 
      y: 50 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section className="relative min-h-screen w-full py-16 overflow-hidden">
      {/* Canvas background with Three.js */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full -z-10"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black -z-10"></div>
      
      <div className="container mx-auto px-4 pt-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl font-bold mb-16 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-violet-400 to-rose-400 tracking-tight">
            Transcend Digital Boundaries
          </span>
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center justify-center">
          {services.map((service, index) => {
            const styles = getServiceStyles(service)
            const isActive = activeService === service.id
            
            return (
              <motion.div
                key={service.id}
                initial="initial"
                animate={activeService ? (isActive ? "active" : "inactive") : "animate"}
                exit="exit"
                variants={cardVariants}
                className={`w-full lg:w-1/3 relative cursor-pointer max-w-md ${isActive ? "z-20" : "z-10"}`}
                onClick={() => selectService(service.id)}
              >
                <div className={`
                  relative rounded-2xl overflow-hidden
                  bg-gradient-to-br ${styles.bg}
                  border ${styles.border}
                  shadow-lg ${styles.shadow}
                  transition-all duration-500
                  ${isActive ? "h-auto" : "h-80"}
                `}>
                  {/* Animated border glow effect */}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 -z-10 rounded-2xl blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-full h-full ${styles.glow} rounded-xl`}></div>
                    </motion.div>
                  )}
                  
                  <div className="p-6 pt-8">
                    {/* Icon section with orb effect */}
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className={`relative p-6 rounded-full bg-gradient-to-br ${styles.bg} ${styles.border}`}
                        animate={{ 
                          boxShadow: isActive 
                            ? [
                                `0 0 10px rgba(0,0,0,0)`,
                                `0 0 30px ${service.accentColor === 'teal' ? '#2dd4bf' : service.accentColor === 'violet' ? '#8b5cf6' : '#ff6f61'}`
                              ]
                            : `0 0 0px rgba(0,0,0,0)`
                        }}
                        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
                      >
                        <div className={styles.text}>
                          {service.icon}
                        </div>
                        
                        {/* Orbiting particles */}
                        {isActive && (
                          <>
                            <motion.div 
                              className={`absolute w-2 h-2 rounded-full ${styles.text.replace('text', 'bg')}`}
                              animate={{ 
                                rotate: [0, 360],
                                translateX: [0, 20, 0, -20, 0],
                                translateY: [0, -20, 0, 20, 0],
                              }}
                              transition={{ 
                                duration: 5, 
                                ease: "linear",
                                repeat: Infinity,
                              }}
                            />
                            <motion.div 
                              className={`absolute w-1 h-1 rounded-full ${styles.text.replace('text', 'bg')}`}
                              animate={{ 
                                rotate: [0, -360],
                                translateX: [0, -15, 0, 15, 0],
                                translateY: [0, 15, 0, -15, 0],
                              }}
                              transition={{ 
                                duration: 3, 
                                ease: "linear",
                                repeat: Infinity,
                              }}
                            />
                          </>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-2xl font-bold mb-3 text-center ${styles.text}`}>
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-center mb-6">
                      {service.shortDescription}
                    </p>
                    
                    {/* Indicator */}
                    <div className="flex justify-center">
                      <motion.span
                        animate={{ y: [0, 5, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: isActive ? 0 : Infinity,
                          repeatType: "loop" 
                        }}
                        className={`${styles.text} text-sm opacity-80`}
                      >
                        {isActive ? "Explore Features" : "Click to Expand"}
                      </motion.span>
                    </div>
                    
                    {/* Expanded content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5 }}
                          className="mt-6 overflow-hidden"
                        >
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-400/30 to-transparent my-6" />
                          
                          <p className="text-gray-200 mb-8 leading-relaxed">
                            {service.fullDescription}
                          </p>
                          
                          <h4 className={`${styles.text} font-semibold mb-4`}>Key Features:</h4>
                          <ul className="space-y-4 mb-6">
                            {service.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="text-gray-200 flex items-center gap-3"
                              >
                                <motion.span 
                                  className={`w-2 h-2 rounded-full ${styles.text.replace('text', 'bg')}`}
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* Action button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r 
                              ${service.accentColor === 'teal' 
                                ? 'from-teal-600 to-teal-400' 
                                : service.accentColor === 'violet' 
                                  ? 'from-violet-600 to-violet-400' 
                                  : 'from-rose-600 to-rose-400'
                              } 
                              text-white font-medium mt-4`}
                          >
                            Get Started
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}