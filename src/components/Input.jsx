import React, { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../utils/cn'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    error = '',
    required = false,
    ...props
}, ref) {
    const id = useId()
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
        <div className="w-full space-y-2">
            {label && (
                <motion.label
                    htmlFor={id}
                    className={cn(
                        "block text-sm font-medium transition-colors duration-200",
                        isFocused ? "text-primary-600" : "text-dark-700",
                        error ? "text-red-600" : ""
                    )}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </motion.label>
            )}
            
            <div className="relative">
                <motion.input
                    type={inputType}
                    className={cn(
                        "w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none bg-white/80 backdrop-blur-sm",
                        isFocused 
                            ? "border-primary-500 ring-2 ring-primary-500/20 bg-white shadow-lg" 
                            : "border-dark-200 hover:border-dark-300",
                        error 
                            ? "border-red-500 ring-2 ring-red-500/20" 
                            : "",
                        "placeholder:text-dark-400",
                        className
                    )}
                    ref={ref}
                    {...props}
                    id={id}
                    onFocus={(e) => {
                        setIsFocused(true)
                        props.onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        props.onBlur?.(e)
                    }}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                />
                
                {isPassword && (
                    <motion.button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-500 hover:text-dark-700 transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                )}
            </div>
            
            {error && (
                <motion.p
                    className="text-sm text-red-600"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    )
})

export default Input