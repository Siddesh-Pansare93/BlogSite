import React  ,{useState , useEffect, Children} from 'react'
import {  useNavigate } from 'react-router-dom'; 
import { login } from '../store/authSlice';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';


function Protected({children} , authentication) {
    const authStatus = useSelector(state => state.Status)
    const [loader, setLoader] = useState(second)
    const navigate = useNavigate()

   
    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return (
    <div>{loader ? <h1>Loading....</h1> : <>{Children}</> } </div>
  )
}

export default Protected