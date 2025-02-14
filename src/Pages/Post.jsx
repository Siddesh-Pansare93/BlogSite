import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Calendar, User, Edit, Trash2, ArrowLeft, Share2, Bookmark, Eye } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Container, Button } from '../components'
import service from '../appwrite/config'
import parse from "html-react-parser"

function Post() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const { slug } = useParams()

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    } else {
                        navigate("/")
                    }
                })
                .finally(() => setLoading(false))
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            service.deletePost(post.$id).then((status) => {
                if (status) {
                    service.deleteFile(post.featuredImage)
                    navigate("/")
                }
            })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen">
                <Container>
                    <div className="max-w-4xl mx-auto py-16">
                        <motion.div
                            className="animate-pulse space-y-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="h-8 bg-dark-200 rounded w-3/4"></div>
                            <div className="h-64 bg-dark-200 rounded-2xl"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-dark-200 rounded w-full"></div>
                                <div className="h-4 bg-dark-200 rounded w-5/6"></div>
                                <div className="h-4 bg-dark-200 rounded w-4/6"></div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </div>
        )
    }

    if (!post) return null

    return (
        <div className="min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Back Navigation */}
                    <motion.div
                        className="py-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="group"
                        >
                            <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
                            Back to Posts
                        </Button>
                    </motion.div>

                    {/* Article Header */}
                    <motion.article
                        className="pb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Title and Meta */}
                        <header className="mb-8">
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-800 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {post.title}
                            </motion.h1>

                            {/* Article Meta */}
                            <motion.div
                                className="flex flex-wrap items-center gap-6 text-dark-600 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                        <User size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-dark-800">Author</p>
                                        <p className="text-sm text-dark-600">
                                            {userData?.name || 'Anonymous'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Calendar size={18} className="text-dark-400" />
                                    <div>
                                        <p className="font-medium text-dark-800">Published</p>
                                        <p className="text-sm text-dark-600">
                                            {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {post.$updatedAt !== post.$createdAt && (
                                    <div className="flex items-center space-x-2">
                                        <Edit size={18} className="text-dark-400" />
                                        <div>
                                            <p className="font-medium text-dark-800">Updated</p>
                                            <p className="text-sm text-dark-600">
                                                {new Date(post.$updatedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                className="flex items-center justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <Button variant="secondary" size="sm">
                                        <Share2 size={16} className="mr-2" />
                                        Share
                                    </Button>
                                    <Button variant="secondary" size="sm">
                                        <Bookmark size={16} className="mr-2" />
                                        Save
                                    </Button>
                                </div>

                                {isAuthor && (
                                    <div className="flex items-center space-x-3">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button variant="secondary" size="sm">
                                                <Edit size={16} className="mr-2" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={deletePost}
                                        >
                                            <Trash2 size={16} className="mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        </header>

                        {/* Featured Image */}
                        <motion.div
                            className="mb-12 relative overflow-hidden rounded-3xl"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <img
                                src={service.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-[400px] md:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 via-transparent to-transparent"></div>
                        </motion.div>

                        {/* Article Content */}
                        <motion.div
                            className="prose prose-lg prose-dark max-w-none"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <div className="text-lg leading-relaxed text-dark-700 space-y-6">
                                {parse(post.content)}
                            </div>
                        </motion.div>

                        {/* Article Footer */}
                        <motion.footer
                            className="mt-16 pt-8 border-t border-dark-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                        <User size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark-800">
                                            {userData?.name || 'Anonymous Author'}
                                        </h3>
                                        <p className="text-dark-600">Content Creator</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Button variant="secondary">
                                        <ArrowLeft size={16} className="mr-2" />
                                        Previous Post
                                    </Button>
                                    <Button variant="secondary">
                                        Next Post
                                        <ArrowLeft size={16} className="ml-2 rotate-180" />
                                    </Button>
                                </div>
                            </div>
                        </motion.footer>
                    </motion.article>
                </div>
            </Container>
        </div>
    )
}

export default Post