import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export function Portfolio() {
  const projects = [
    {
      title: "E-commerce Site",
      description: "Online store with payment integration",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Corporate Website",
      description: "Modern business website with CMS",
      tags: ["Next.js", "Tailwind CSS"]
    }
  ]

  return (
    <section className="py-16 bg-gray-800/20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Our Work
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all"
            >
              <div className="h-48 bg-gray-700/30 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-500">Project Preview</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-700/50 text-indigo-400 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-indigo-400 flex items-center gap-1">
                  <FiGithub /> Code
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 flex items-center gap-1">
                  <FiExternalLink /> Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}