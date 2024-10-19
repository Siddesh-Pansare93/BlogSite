import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'

function PostCard({
    $id,
    title,
    featuredImage,
    $createdAt,
    $updatedAt
}) {
    return (
        <motion.div
            className="group h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
        >
            <Link to={`/post/${$id}`} className="block h-full">
                <div className="h-full card-modern group-hover:shadow-2xl overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                        <motion.img
                            src={service.getFileView(featuredImage)}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Floating read more button */}
                        <motion.div
                            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0, rotate: -45 }}
                            whileHover={{ scale: 1.1, rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                                <ArrowRight size={16} className="text-primary-600" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                            <motion.h3
                                className="text-xl font-bold text-dark-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300"
                                layoutId={`title-${$id}`}
                            >
                                {title}
                            </motion.h3>
                            
                            {/* Metadata */}
                            <div className="flex items-center text-sm text-dark-500 space-x-4">
                                <div className="flex items-center space-x-1">
                                    <Calendar size={14} />
                                    <span>
                                        {$createdAt ? new Date($createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        }) : 'Recent'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Read More Link */}
                        <motion.div
                            className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span>Read More</span>
                            <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.div>
                    </div>

                    {/* Decorative border */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </div>
            </Link>
        </motion.div>
    )
}

export default PostCard