import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Input, Logo } from '../components'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid } 
    } = useForm({
        mode: 'onChange'
    })

    const login = async function (data) {
        setError('')
        setIsLoading(true)
        
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
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
        <div className="min-h-screen flex items-center justify-center px-4">
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
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Logo width="80px" />
                            </motion.div>
                        </div>
                        <h1 className="text-3xl font-bold text-dark-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-dark-600">
                            Sign in to your account to continue
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

                    {/* Login Form */}
                    <motion.form
                        onSubmit={handleSubmit(login)}
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="space-y-4">
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
                                    placeholder="Enter your password"
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
                                    <span>Signing In...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <LogIn size={18} />
                                    <span>Sign In</span>
                                </div>
                            )}
                        </Button>
                    </motion.form>

                    {/* Sign Up Link */}
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <p className="text-dark-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-200/30 rounded-full blur-3xl -z-10" />
            </motion.div>
        </div>
    )
}

export default Login