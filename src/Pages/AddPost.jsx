import React from 'react'
import { PostForm } from '../components'
import {Container} from '../components'
import { useSelector } from 'react-redux'

function AddPost() {

  const user = useSelector(state => state.auth.userData)
  console.log(user);
  
  return (
    <Container>
        <PostForm />
    </Container>
  )
}

export default AddPost