import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'

export function Portfolio() {
  const projects = [
    {
      title: "E-commerce Site",
      description: "A full-featured online store with secure payment integration, product filtering, and user authentication. Implements cart functionality with local storage.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/project-ecommerce.jpg" // Add actual image paths
    },
    {
      title: "Corporate Website",
      description: "Modern responsive business website with content management system. Features blog section, team profiles, and automated contact form with email notifications.",
      tags: ["Next.js", "Tailwind CSS", "Sanity CMS", "Vercel"],
      image: "/project-corporate.jpg" // Add actual image paths
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
          >
            Our Featured Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300"
          >
            Explore our latest projects where creativity meets functionality
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden backdrop-blur-sm shadow-lg shadow-black/20 hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div className="h-56 bg-gray-700/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500">Project Preview</span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-gray-700/70 text-indigo-300 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-6">
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-indigo-400 flex items-center gap-2 transition-colors font-medium"
                  >
                    <FiGithub className="text-lg" /> 
                    <span>View Code</span>
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-indigo-400 flex items-center gap-2 transition-colors font-medium group"
                  >
                    <FiExternalLink className="text-lg" /> 
                    <span>Live Demo</span>
                    <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20"
          >
            View All Projects <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  )
}