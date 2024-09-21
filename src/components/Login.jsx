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
      <div
      className='flex items-center justify-center w-full'
      >
          <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
                      <span className="inline-block w-full max-w-[100px]">
                          <Logo width="100%" />
                      </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
          <p className="mt-2 text-center text-base text-black/60">
                      Don&apos;t have any account?&nbsp;
                      <Link
                          to="/signup"
                          className="font-medium text-primary transition-all duration-200 hover:underline"
                      >
                          Sign Up
                      </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
         <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
            type="email" 
            name="email"
            placeholder="Please enter your Email"
            label="Email"
            {...register("email", {
              required: true,
              validate : {
                matchPatern : (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test (value) || "Please enter a valid email address"
              }
            })}
            />

            <Input
              label = "Password"
              type="password"
              placeholder = "Please Enter your Password"
              name="password"
              {...register("password" , {
                required: true ,
                minLength: {
                  value:8 ,
                  message : "Password must contain atleast 8 characters "
                },
                validate : {
                  matchPatern : (value)=>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Password must contain atleast one uppercase letter and one number "
                }
              })}
            />
            <Button
              type='submit'
              className='w-full'
            >Sign In </Button>
          </div>
         </form>
          </div>
      </div>
    )
  }
  


export default Login