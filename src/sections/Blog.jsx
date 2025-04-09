import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCalendar, FiUser, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi';
import { Navbar } from '../components/Navbar';

// Sample blog posts data - you would fetch this from your API or CMS
const sampleBlogPosts = [
  {
    id: 1,
    title: 'How to Build Modern Web Applications in 2025',
    excerpt: 'Learn the latest trends and technologies for building high-performance web applications.',
    category: 'Web Development',
    author: 'Harry Kirigwi',
    date: 'April 2, 2025',
    image: '/images/blog/web-dev.jpg', // Replace with your image path
    tags: ['React', 'NextJS', 'Performance']
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Framer Motion Animations',
    excerpt: 'Master the art of creating stunning animations with Framer Motion in your React projects.',
    category: 'UI/UX',
    author: 'Harry Kirigwi',
    date: 'March 25, 2025',
    image: '/images/blog/animations.jpg', // Replace with your image path
    tags: ['Animation', 'React', 'UI']
  },
  {
    id: 3,
    title: 'Optimizing Your Website for Search Engines in 2025',
    excerpt: 'Stay ahead of the competition with these advanced SEO techniques for modern websites.',
    category: 'SEO',
    author: 'Harry Kirigwi',
    date: 'March 18, 2025',
    image: '/images/blog/seo.jpg', // Replace with your image path
    tags: ['SEO', 'Marketing', 'Growth']
  }
];

const categories = [
  { name: 'All', count: sampleBlogPosts.length },
  { name: 'Web Development', count: 1 },
  { name: 'UI/UX', count: 1 },
  { name: 'SEO', count: 1 }
];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on active category and search query
  const filteredPosts = sampleBlogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
  <>
  <Navbar/>
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Latest Insights & Articles</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my latest thoughts, tutorials, and insights on web development, design, and technology.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="relative w-full md:w-72"
          >
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  activeCategory === category.name
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-gray-300"
                  >
                    <img
                      src={post.image || `/api/placeholder/600/400?text=${encodeURIComponent(post.title)}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `/api/placeholder/600/400?text=${encodeURIComponent(post.title)}`;
                      }}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="flex items-center mr-4">
                      <FiCalendar className="mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <FiUser className="mr-1" />
                      {post.author}
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full mb-3">
                    {post.category}
                  </span>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={`/blog/${post.id}`}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    Read More <FiArrowRight className="ml-1" />
                  </motion.a>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with My Latest Articles</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to my newsletter and never miss new articles, tutorials, and insights.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition shadow-md"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
    </>
  );
}