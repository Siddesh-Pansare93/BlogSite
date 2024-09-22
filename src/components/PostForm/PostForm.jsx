import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Service } from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Logo, Input, Select, RTE } from '../Logo'
import authService from '../../appwrite/auth'


function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue,control ,  getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.$id || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)

    async function submit(data) {
        if (post) {
            const file = data.image[0] ? Service.uploadFile(data.image[0]) : undefined
            if (file) {
                Service.deleteFile(post.featuredImage)
            }

            const dbPost = Service.updatePost({ ...data }, userData.$id)
            if (dbPost) {
                navigate(`/posts/${post.$id}`)
            }
        }else{
            const file = data.image[0] ? Service.uploadFile(data.image[0]) : undefined
            data.featuredImage = file.$id
            const dbPost = Service.createPost({ ...data, featuredImage }, userData.$id)

            if (dbPost){
                navigate(`/posts/${dbPost.$id}`)
            }
            
    }
}

    const slugTransform = useCallback((value)=>{
        if(value && typeof(value)===String){
            value.
            trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

        }
    return ""
    }, [])

    React.useEffect(()=>{
        const subscription = watch((value)=>{
            setValue("slug" , slugTransform(value.title), {shouldValidate : true })
        }) 


        return ()=> subscription.unsubscribe()
    } , [watch , slugTransform , setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
);

}

export default PostForm