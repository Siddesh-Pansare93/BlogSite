import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, TrendingUp, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../appwrite/config'
import { Container, PostCard, Button } from '../components'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const status = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  useEffect(() => {
    service.getAllPosts()
      .then((post) => {
        if (post) {
          setPosts(post.documents)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  if (!status) {
    return (
      <div className="min-h-screen">
        {/* Hero Section for Guests */}
        <motion.section
          className="relative py-32 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                  Welcome to{' '}
                  <span className="gradient-text">BlogSpace</span>
                </h1>
                <p className="text-xl text-dark-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Discover amazing stories, insights, and ideas from our community of writers. 
                  Join us to start your blogging journey.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="group"
                >
                  <span>Start Reading</span>
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </Button>
              </motion.div>
            </div>
          </Container>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </motion.section>

        {/* Features Section */}
        <section className="py-20">
          <Container>
            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: BookOpen,
                  title: "Rich Content",
                  description: "Create and discover beautifully formatted blog posts with our modern editor."
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Connect with fellow writers and readers in our growing community."
                },
                {
                  icon: TrendingUp,
                  title: "Growth",
                  description: "Grow your audience and improve your writing with our platform tools."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-800 mb-2">{feature.title}</h3>
                  <p className="text-dark-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-dark-800 mb-4">
                Latest <span className="gradient-text">Stories</span>
              </h1>
              <p className="text-lg text-dark-600 max-w-2xl">
                Explore the newest posts from our community of talented writers
              </p>
            </div>
            <Button
              onClick={() => navigate('/add-post')}
              size="lg"
              className="shrink-0"
            >
              <Plus size={18} className="mr-2" />
              Write New Post
            </Button>
          </div>
        </Container>
      </motion.section>

      {/* Posts Grid */}
      <section className="pb-20">
        <Container>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 card-modern animate-pulse">
                  <div className="h-48 bg-dark-200 rounded-t-2xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-dark-200 rounded mb-4"></div>
                    <div className="h-4 bg-dark-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.$id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard {...post} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && posts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <BookOpen size={48} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-dark-800 mb-4">No Posts Yet</h2>
              <p className="text-dark-600 mb-8">Be the first to share your story with the community!</p>
              <Button onClick={() => navigate('/add-post')} size="lg">
                <Plus size={18} className="mr-2" />
                Create First Post
              </Button>
            </motion.div>
          )}
        </Container>
      </section>
    </div>
  )
}

export default Home