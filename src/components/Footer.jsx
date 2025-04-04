import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  const socialLinks = [
    { icon: <FaGithub />, url: '#' },
    { icon: <FaTwitter />, url: '#' },
    { icon: <FaLinkedin />, url: '#' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/80 border-t border-gray-700 py-6"  // Reduced padding here
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 mb-6 md:mb-0"
          >
            <span className="text-xl font-bold text-white">Synnapse</span>
          </motion.div>

          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                whileHover={{ y: -3, color: '#818cf8' }}
                transition={{ duration: 0.3 }}
                className="text-gray-400 text-xl"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-6"  // Reduced margin here
        >
          © {new Date().getFullYear()} Synnapse. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
