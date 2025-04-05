import { motion } from 'framer-motion';

// Expanded list of technologies with logo URLs
const techLogos = [
  { name: "Next.js", src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
  { name: "React", src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Vite", src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" },
  { name: "Tailwind CSS", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Node.js", src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
  { name: "MongoDB", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
  { name: "TypeScript", src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
  { name: "GraphQL", src: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
  { name: "Firebase", src: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" },
  { name: "AWS", src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Docker", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { name: "GitHub", src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
 
];

// Duplicate the logos multiple times for a longer scroll
const duplicatedLogos = [...techLogos, ...techLogos, ...techLogos, ...techLogos]; // 4x for longer duration

export function TechLogoScroller() {
  return (
    <section className=" py-12 bg-gradient-to-b from-gray-900 to-[#0A1A2F] overflow-hidden relative">
      {/* Futuristic Neon City Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Neon Glows */}
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse delay-500" />
        {/* Reflective Ground Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-center text-white"
        >
          
        </motion.h2>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-75%"], // Adjusted to -75% since we duplicated 4x (100% / 4 = 25% per set)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // Slower scroll for more logos
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`} // Unique key for each logo instance
                className="flex-shrink-0 mx-6"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="h-12 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.7)] transition-all duration-300 md:h-14"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/48?text=" + logo.name;
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}