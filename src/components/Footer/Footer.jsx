import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 bg-dark-900/95 backdrop-blur-lg border-t border-dark-700/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Logo width="50px" />
                <span className="text-2xl font-bold text-white">BlogSpace</span>
              </div>
              <p className="text-dark-300 leading-relaxed mb-6">
                A modern platform for writers and readers to connect and share amazing stories.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="p-2 bg-dark-800/50 border border-dark-700 rounded-lg text-dark-300 hover:text-white hover:bg-primary-600/20 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Platform Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-6">Platform</h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'API', 'Documentation'].map((item, index) => (
                  <li key={index}>
                    <Link to="/" className="text-dark-300 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Community Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-6">Community</h3>
              <ul className="space-y-3">
                {['Blog', 'Writers', 'Help Center', 'Contact Us'].map((item, index) => (
                  <li key={index}>
                    <Link to={item === 'Blog' ? '/all-posts' : '/'} className="text-dark-300 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-6">Legal</h3>
              <ul className="space-y-3">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'DMCA'].map((item, index) => (
                  <li key={index}>
                    <Link to="/" className="text-dark-300 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700/50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-dark-400 text-sm">
                © {currentYear} BlogSpace. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-dark-400 text-sm">
                <span>Made with</span>
                <Heart size={16} className="text-red-500 fill-current" />
                <span>for writers everywhere</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer