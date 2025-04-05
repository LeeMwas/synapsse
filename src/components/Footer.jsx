import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebookF, FaYoutube, FaDiscord } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone, MdArrowUpward } from 'react-icons/md';
import { BiCodeAlt, BiSolidRocket, BiSupport } from 'react-icons/bi';

export function Footer() {
  const [hoverQuickLink, setHoverQuickLink] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const socialLinks = [
    { icon: <FaGithub />, url: '#', name: 'GitHub', color: '#333' },
    { icon: <FaTwitter />, url: '#', name: 'Twitter', color: '#1DA1F2' },
    { icon: <FaLinkedin />, url: '#', name: 'LinkedIn', color: '#0A66C2' },
    { icon: <FaInstagram />, url: '#', name: 'Instagram', color: '#E1306C' },
    { icon: <FaFacebookF />, url: '#', name: 'Facebook', color: '#1877F2' },
    { icon: <FaDiscord />, url: '#', name: 'Discord', color: '#5865F2' },
    { icon: <FaYoutube />, url: '#', name: 'YouTube', color: '#FF0000' },
  ];

  const quickLinks = [
    { name: 'Home', url: '#' },
    { name: 'About', url: '#' },
    { name: 'Services', url: '#' },
    { name: 'Portfolio', url: '#' },
    { name: 'Blog', url: '#' },
    { name: 'Contact', url: '#' },
  ];

  const services = [
    { name: 'Web Development', url: '#', icon: <BiCodeAlt /> },
    { name: 'UX/UI Design', url: '#', icon: <BiSolidRocket /> },
    { name: 'Support & Maintenance', url: '#', icon: <BiSupport /> },
  ];
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setNewsletterEmail('');
    }, 3000);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Accent Wave Design */}
      <div className="absolute top-0 inset-x-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-gray-800 fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mb-6 inline-block"
            >
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">S</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Synnapse</span>
              </div>
            </motion.div>
            
            <p className="text-gray-400 mb-6">
              Transforming ideas into digital reality. We create exceptional web experiences that captivate and convert.
            </p>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <MdLocationOn className="text-cyan-400" />
                </div>
                <span className="text-gray-300">123 Innovation Street, Tech Valley</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <MdPhone className="text-cyan-400" />
                </div>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <MdEmail className="text-cyan-400" />
                </div>
                <span className="text-gray-300">hello@synnapse.com</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1"
          >
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
            </h3>
            
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  onHoverStart={() => setHoverQuickLink(index)}
                  onHoverEnd={() => setHoverQuickLink(null)}
                  whileHover={{ x: 5 }}
                >
                  <a href={link.url} className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <motion.span
                      animate={{ x: hoverQuickLink === index ? 5 : 0 }}
                      className="inline-block mr-2"
                    >
                      {hoverQuickLink === index ? '→' : '•'}
                    </motion.span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1"
          >
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Our Services
              <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
            </h3>
            
            <ul className="space-y-4">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ scale: 1.05, x: 5 }}>
                  <a href={service.url} className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-pink-500 flex items-center justify-center transition-all duration-300">
                      <span className="text-cyan-400 group-hover:text-white transition-colors">{service.icon}</span>
                    </div>
                    <span className="text-gray-400 group-hover:text-white transition-colors">{service.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1"
          >
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Newsletter
              <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
            </h3>
            
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800 p-4 rounded-lg text-center"
              >
                <div className="inline-block mx-auto p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h4 className="text-white text-lg mb-1">Subscribed!</h4>
                <p className="text-gray-400 text-sm">Thank you for subscribing to our newsletter</p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:border-cyan-500"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 w-0 group-focus-within:w-full transition-all duration-300"></div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-medium transition-transform"
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
        
        {/* Social Links & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-500 mb-6 md:mb-0"
            >
              © {new Date().getFullYear()} <span className="text-white">Synnapse</span>. All rights reserved.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.15, 
                    backgroundColor: link.color,
                    color: '#ffffff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)' 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.8 + (index * 0.1) 
                  }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 transition-all"
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-white shadow-lg"
      >
        <MdArrowUpward size={24} />
      </motion.button>
      
      {/* Bottom Wave Design */}
      <div className="absolute bottom-0 inset-x-0 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-black fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </footer>
  );
}