import React from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <motion.button
            onClick={logoutHandler}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <LogOut size={16} />
            <span>Logout</span>
        </motion.button>
    )
}

export default LogoutBtn