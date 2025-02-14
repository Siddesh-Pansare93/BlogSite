import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid3X3, List, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PostCard, Container, Input, Button } from '../components'
import service from '../appwrite/config'

function AllPosts() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

    useEffect(() => {
        service.getAllPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                } else {
                    navigate("/")
                }
            })
            .finally(() => setLoading(false))
    }, [navigate])

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-dark-800 mb-4">
                            All <span className="gradient-text">Posts</span>
                        </h1>
                        <p className="text-lg text-dark-600 max-w-2xl mx-auto">
                            Browse through our complete collection of articles and stories
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                        <div className="relative w-full md:w-96">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
                            <Input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-dark-600 mr-2">View:</span>
                            <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-dark-200">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                        viewMode === 'grid'
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-dark-600 hover:text-primary-600'
                                    }`}
                                >
                                    <Grid3X3 size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                        viewMode === 'list'
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-dark-600 hover:text-primary-600'
                                    }`}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-dark-600">
                            {loading ? 'Loading...' : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'} found`}
                        </p>
                    </div>
                </Container>
            </motion.section>

            {/* Posts Grid/List */}
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
                    ) : filteredPosts.length > 0 ? (
                        <motion.div
                            className={
                                viewMode === 'grid'
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    : "space-y-6"
                            }
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.$id}
                                    variants={itemVariants}
                                    transition={{ delay: index * 0.1 }}
                                    className={viewMode === 'list' ? 'max-w-none' : ''}
                                >
                                    <PostCard {...post} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <BookOpen size={48} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-dark-800 mb-4">
                                {searchTerm ? 'No posts found' : 'No posts available'}
                            </h2>
                            <p className="text-dark-600 mb-8">
                                {searchTerm 
                                    ? `Try adjusting your search term "${searchTerm}"` 
                                    : 'There are no posts available at the moment.'
                                }
                            </p>
                            {searchTerm && (
                                <Button 
                                    variant="secondary" 
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear Search
                                </Button>
                            )}
                        </motion.div>
                    )}
                </Container>
            </section>
        </div>
    )
}

export default AllPosts