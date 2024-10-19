import React from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-xl focus:ring-primary-500",
        secondary: "bg-white/80 backdrop-blur-sm border border-dark-200 text-dark-700 hover:bg-white hover:shadow-lg focus:ring-primary-500",
        accent: "bg-gradient-to-r from-accent-600 to-accent-700 text-white hover:shadow-xl focus:ring-accent-500",
        ghost: "text-dark-600 hover:bg-dark-100 hover:text-dark-800 focus:ring-dark-500",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl focus:ring-red-500",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  children,
  className = '',
  variant,
  size,
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size }), className)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">
        {children}
      </span>
      {/* Gradient overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
    </motion.button>
  )
}

export default Button