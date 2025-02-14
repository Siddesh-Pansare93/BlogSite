import React from 'react'
import { motion } from 'framer-motion'
import { Edit3, Plus, Sparkles } from 'lucide-react'
import { PostForm } from '../components'
import { Container } from '../components'
import { useSelector } from 'react-redux'

function AddPost() {
  const user = useSelector(state => state.auth.userData)
  
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.section
        className="py-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl"></div>
        </div>

        <Container>
          <div className="relative z-10 text-center mb-12">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl">
                <Edit3 size={32} className="text-white" />
              </div>
              <Sparkles size={24} className="text-accent-500 animate-pulse" />
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-dark-800 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Create Your <span className="gradient-text">Story</span>
            </motion.h1>
            
            <motion.p
              className="text-lg text-dark-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Share your thoughts, ideas, and experiences with our community. 
              Craft compelling content that inspires and engages readers.
            </motion.p>
          </div>
        </Container>
      </motion.section>

      {/* Post Form Section */}
      <section className="pb-20">
        <Container>
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="card-modern p-8 md:p-12 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 opacity-50 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-100 to-primary-100 opacity-50 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
              
              <div className="relative z-10">
                <PostForm />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}

export default AddPost