import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaPinterest,
  FaYoutube,
  FaTiktok,
  FaDiscord
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export function Contact() {
  const formRef = useRef();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("fj3taMZSNxkCDQCdr"); // Initialize with your public key
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.message) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Send email using EmailJS
    emailjs.send("service_8bvcafk", "template_sth534d", {
      from_name: formState.name,
      reply_to: formState.email,
      subject: formState.subject || "Website Inquiry",
      message: formState.message
    })
    .then(
      (response) => {
        console.log("Email sent successfully:", response);
        setIsLoading(false);
        setSubmitted(true);
        
        // Reset form after delay
        setTimeout(() => {
          setSubmitted(false);
          setFormState({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      },
      (error) => {
        console.error("Failed to send email:", error);
        setIsLoading(false);
        setError("Failed to send your message. Please try again later.");
        
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    );
  };

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <FaFacebookF />, 
      link: '#',
      color: '#1877F2',
      hoverEffect: 'wave'
    },
    { 
      name: 'Twitter', 
      icon: <FaTwitter />, 
      link: '#',
      color: '#1DA1F2',
      hoverEffect: 'spin'
    },
    { 
      name: 'Instagram', 
      icon: <FaInstagram />, 
      link: '#',
      color: '#C13584',
      hoverEffect: 'pulse'
    },
    { 
      name: 'LinkedIn', 
      icon: <FaLinkedinIn />, 
      link: '#',
      color: '#0A66C2',
      hoverEffect: 'bounce'
    },
    { 
      name: 'GitHub', 
      icon: <FaGithub />, 
      link: '#',
      color: '#333333',
      hoverEffect: 'wiggle'
    },
    { 
      name: 'Pinterest', 
      icon: <FaPinterest />, 
      link: '#',
      color: '#E60023',
      hoverEffect: 'pulse'
    },
    { 
      name: 'YouTube', 
      icon: <FaYoutube />, 
      link: '#',
      color: '#FF0000',
      hoverEffect: 'bounce'
    },
    { 
      name: 'TikTok', 
      icon: <FaTiktok />, 
      link: '#',
      color: '#000000',
      hoverEffect: 'spin'
    },
    { 
      name: 'Discord', 
      icon: <FaDiscord />, 
      link: '#',
      color: '#5865F2',
      hoverEffect: 'wave'
    }
  ];

  // Get animation class based on hover effect
  const getAnimationClass = (effect) => {
    switch(effect) {
      case 'bounce': return 'animate-bounce';
      case 'pulse': return 'animate-pulse';
      case 'spin': return 'animate-spin';
      case 'wave': return 'animate-wiggle';
      case 'wiggle': return 'animate-wiggle';
      default: return 'animate-pulse';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute left-2/3 top-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transition-all duration-700 transform ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-5xl font-bold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            Connect With Us
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-center text-gray-300 mb-12 max-w-xl mx-auto text-lg">
            Have a project in mind? We're excited to bring your ideas to life! Reach out and let's create something amazing together.
          </p>
        </div>

        <div className={`max-w-5xl mx-auto grid md:grid-cols-5 gap-8 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 delay-300`}>
          {/* Contact Info Section */}
          <div className="md:col-span-2 bg-gray-900/70 p-8 rounded-2xl border border-gray-700 backdrop-blur-lg shadow-xl hover:shadow-cyan-500/10 transition-all duration-500">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">Connect With Us</h3>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20 transform hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div>
                  <h4 className="text-gray-200 font-medium text-lg">Our Location</h4>
                  <p className="text-gray-400 mt-1 leading-relaxed">123 Innovation Avenue, Creative District, Tech City, 10101</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20 transform hover:scale-110 transition-transform duration-300">
                  <FaPhoneAlt className="text-white text-lg" />
                </div>
                <div>
                  <h4 className="text-gray-200 font-medium text-lg">Phone Number</h4>
                  <p className="text-gray-400 mt-1">+1 (555) 123-4567</p>
                  <p className="text-gray-400">+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/20 transform hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <h4 className="text-gray-200 font-medium text-lg">Email Address</h4>
                  <p className="text-gray-400 mt-1">hello@yourcompany.com</p>
                  <p className="text-gray-400">support@yourcompany.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-gray-200 font-medium text-lg mb-5">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.slice(0, 9).map((social, index) => (
                  <div key={index} className="relative">
                    <a 
                      href={social.link}
                      className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 text-gray-300 hover:text-white z-10 relative"
                      style={{ 
                        boxShadow: hoveredIcon === index ? `0 0 15px ${social.color}` : 'none',
                        background: hoveredIcon === index ? social.color : 'rgba(31, 41, 55, 0.8)'
                      }}
                      onMouseEnter={() => setHoveredIcon(index)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      title={social.name}
                    >
                      <span className={hoveredIcon === index ? getAnimationClass(social.hoverEffect) : ''}>
                        {social.icon}
                      </span>
                    </a>
                    {hoveredIcon === index && (
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 whitespace-nowrap">
                        {social.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="md:col-span-3 bg-gray-900/60 p-8 rounded-2xl border border-gray-700 backdrop-blur-lg shadow-xl relative overflow-hidden">
            {/* Form Background Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>

            {submitted ? (
              <div className="text-center py-20 transform transition-all duration-700 scale-105 relative z-10">
                <div className="inline-block p-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 animate-pulse">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Message Sent Successfully!</h4>
                <p className="text-gray-300 mb-8 text-lg max-w-md mx-auto">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto"></div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className={`space-y-6 relative z-10 ${shake ? 'animate-shake' : ''}`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'name' ? 'text-cyan-400' : 'text-gray-300'}`}>
                      Your Name
                    </label>
                    <div className={`relative transition-all duration-300 ${activeField === 'name' ? 'transform scale-105' : ''}`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        className={`w-full bg-gray-800/70 border-2 rounded-lg py-3 px-4 text-gray-200 focus:outline-none transition-all duration-300 ${activeField === 'name' ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-gray-700'}`}
                        placeholder="John Doe"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-700 ${activeField === 'name' ? 'w-full' : 'w-0'}`}></div>
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'email' ? 'text-purple-400' : 'text-gray-300'}`}>
                      Your Email
                    </label>
                    <div className={`relative transition-all duration-300 ${activeField === 'email' ? 'transform scale-105' : ''}`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        className={`w-full bg-gray-800/70 border-2 rounded-lg py-3 px-4 text-gray-200 focus:outline-none transition-all duration-300 ${activeField === 'email' ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-gray-700'}`}
                        placeholder="john@example.com"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ${activeField === 'email' ? 'w-full' : 'w-0'}`}></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'subject' ? 'text-pink-400' : 'text-gray-300'}`}>
                    Subject
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'subject' ? 'transform scale-105' : ''}`}>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={handleBlur}
                      className={`w-full bg-gray-800/70 border-2 rounded-lg py-3 px-4 text-gray-200 focus:outline-none transition-all duration-300 ${activeField === 'subject' ? 'border-pink-500 shadow-lg shadow-pink-500/20' : 'border-gray-700'}`}
                      placeholder="Project Inquiry"
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-700 ${activeField === 'subject' ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${activeField === 'message' ? 'text-cyan-400' : 'text-gray-300'}`}>
                    Your Message
                  </label>
                  <div className={`relative transition-all duration-300 ${activeField === 'message' ? 'transform scale-105' : ''}`}>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      rows="5"
                      className={`w-full bg-gray-800/70 border-2 rounded-lg py-3 px-4 text-gray-200 focus:outline-none transition-all duration-300 resize-none ${activeField === 'message' ? 'border-gradient shadow-lg shadow-cyan-500/20' : 'border-gray-700'}`}
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-700 ${activeField === 'message' ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {error}
                    </div>
                  </div>
                )}

                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-medium py-4 px-10 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 group disabled:opacity-70"
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Enhanced Call to Action Banner */}
        <div className={`mt-20 max-w-6xl mx-auto px-4 ${formVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-700`}>
          <div className="bg-gray-900/70 p-10 rounded-2xl border border-gray-700 backdrop-blur-lg shadow-xl relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl top-1/2 -left-48 animate-pulse"></div>
              <div className="absolute w-96 h-96 bg-gradient-to-l from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -bottom-48 right-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4">
                  Ready to Transform Your Ideas Into Reality?
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Join our creative community and let's build something extraordinary together. We're passionate about turning visions into impactful digital experiences.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                    <span className="relative z-10 flex items-center">
                      Start Your Project
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="relative overflow-hidden border-2 border-purple-500 text-purple-400 font-medium py-3 px-8 rounded-full hover:text-white transition-all duration-300 group"
                  >
                    <span className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Join Our Community</span>
                  </a>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-40 h-40 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-spin-slow opacity-30"></div>
                  <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                      24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add CSS for animations */}
        <style jsx>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
          
          @keyframes wiggle {
            0%, 100% {
              transform: rotate(-10deg);
            }
            50% {
              transform: rotate(10deg);
            }
          }
          
          .animate-wiggle {
            animation: wiggle 0.5s ease-in-out infinite;
          }
          
          @keyframes shake {
            0%, 100% {
              transform: translateX(0);
            }
            10%, 30%, 50%, 70%, 90% {
              transform: translateX(-5px);
            }
            20%, 40%, 60%, 80% {
              transform: translateX(5px);
            }
          }
          
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          
          .shadow-glow {
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
          }
          
          .shadow-glow-lg {
            box-shadow: 0 0 30px rgba(56, 189, 248, 0.5);
          }
          
          .border-gradient {
            border-image: linear-gradient(to right, #0891b2, #8b5cf6, #ec4899);
            border-image-slice: 1;
          }
        `}</style>
      </div>
    </section>
  );
}