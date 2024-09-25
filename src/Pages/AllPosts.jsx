import React, { useEffect, useState } from 'react'
import { PostCard, Container } from '../components'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'

function AllPosts() {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    

    useEffect(() => {
        service.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            } else {
                navigate("/")
            }
        })
    }, [navigate])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                       <div key={post.$id} className='p-2 w-1/4' >
                                <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts