import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, AlertCircle, UserPlus } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Logo, Input, Button } from '../components'
import authService from '../appwrite/auth'
import { login as AuthLogin } from '../store/authSlice'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid },
        watch 
    } = useForm({
        mode: 'onChange'
    })

    const create = async (data) => {
        setError("")
        setIsLoading(true)
        
        try {
            const response = await authService.createAccount(data)
            if (response) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(AuthLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4">
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="glass-effect rounded-3xl p-8 shadow-2xl">
                    {/* Logo and Header */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="flex justify-center mb-6">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Logo width="80px" />
                            </motion.div>
                        </div>
                        <h1 className="text-3xl font-bold text-dark-800 mb-2">
                            Create Account
                        </h1>
                        <p className="text-dark-600">
                            Join our community of writers and readers
                        </p>
                    </motion.div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-600"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AlertCircle size={18} />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    {/* SignUp Form */}
                    <motion.form
                        onSubmit={handleSubmit(create)}
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="space-y-4">
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 z-10" />
                                <Input
                                    type="text"
                                    placeholder="Enter your full name"
                                    label="Full Name"
                                    required
                                    className="pl-12"
                                    error={errors.name?.message}
                                    {...register("name", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z\s]+$/,
                                            message: "Name can only contain letters and spaces"
                                        }
                                    })}
                                />
                            </div>

                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 z-10" />
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    label="Email Address"
                                    required
                                    className="pl-12"
                                    error={errors.email?.message}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                />
                            </div>

                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 z-10" />
                                <Input
                                    type="password"
                                    placeholder="Create a strong password"
                                    label="Password"
                                    required
                                    className="pl-12"
                                    error={errors.password?.message}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        {/* Password Strength Indicator */}
                        {watch('password') && (
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-sm text-dark-600 font-medium">Password Requirements:</p>
                                <div className="space-y-1 text-xs">
                                    {[
                                        { test: (pwd) => pwd.length >= 8, text: "At least 8 characters" },
                                        { test: (pwd) => /[a-z]/.test(pwd), text: "One lowercase letter" },
                                        { test: (pwd) => /[A-Z]/.test(pwd), text: "One uppercase letter" },
                                        { test: (pwd) => /\d/.test(pwd), text: "One number" }
                                    ].map((req, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                req.test(watch('password')) ? 'bg-green-500' : 'bg-dark-300'
                                            }`} />
                                            <span className={
                                                req.test(watch('password')) ? 'text-green-600' : 'text-dark-500'
                                            }>
                                                {req.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isLoading || !isValid}
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <UserPlus size={18} />
                                    <span>Create Account</span>
                                </div>
                            )}
                        </Button>
                    </motion.form>

                    {/* Sign In Link */}
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <p className="text-dark-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-200/30 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-200/30 rounded-full blur-3xl -z-10" />
            </motion.div>
        </div>
    )
  
}

export default SignUp