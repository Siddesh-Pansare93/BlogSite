import React from 'react'
import {Button , Input , Logo } from '../components'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useNavigate , Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Login() {

    const navigate  = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const [error , setError] = React.useState('');
    const { register , handleSubmit  } = useForm() ;

    const login = async function (data) {
      setError('')
      try {
        const session = await authService.login({data})
        if (session) {
          const userData = await authService.getCurrentUser()
          if (userData) {
            dispatch(authLogin(userData))
          }
        } 
      } catch (error) {
        setError(error.message)
      }
    }
  
  
  
  
    return (
    <div>Login</div>
  )
}

export default Login