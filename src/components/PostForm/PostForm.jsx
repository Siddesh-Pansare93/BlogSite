import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Upload, Image as ImageIcon, Save, Edit3, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null);
    
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadfile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadfile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit(submit)}
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Form Header */}
            <div className="text-center mb-8">
                <motion.div
                    className="flex items-center justify-center space-x-2 mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Edit3 size={24} className="text-primary-600" />
                    <h2 className="text-2xl font-bold text-dark-800">
                        {post ? "Edit Your Story" : "Write Your Story"}
                    </h2>
                </motion.div>
                <p className="text-dark-600">
                    {post ? "Update your existing post" : "Create something amazing for your readers"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Section */}
                <motion.div
                    className="lg:col-span-2 space-y-6"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-dark-700 flex items-center space-x-2">
                            <span>Post Title</span>
                            <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="Enter an engaging title for your post..."
                            className="text-lg font-medium"
                            error={errors.title?.message}
                            {...register("title", { 
                                required: "Title is required",
                                minLength: { value: 5, message: "Title must be at least 5 characters" }
                            })}
                        />
                    </div>

                    {/* Slug Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-dark-700 flex items-center space-x-2">
                            <span>URL Slug</span>
                            <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="post-url-slug"
                            className="font-mono text-sm"
                            error={errors.slug?.message}
                            {...register("slug", { 
                                required: "Slug is required",
                                pattern: { 
                                    value: /^[a-zA-Z0-9-]+$/, 
                                    message: "Slug can only contain letters, numbers, and hyphens" 
                                }
                            })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        <p className="text-xs text-dark-500">
                            Your post will be available at: /post/{watch("slug") || "your-slug"}
                        </p>
                    </div>

                    {/* Content Editor */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-dark-700 flex items-center space-x-2">
                            <span>Content</span>
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="border border-dark-200 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                            <RTE 
                                name="content" 
                                control={control} 
                                defaultValue={getValues("content")} 
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar Section */}
                <motion.div
                    className="lg:col-span-1 space-y-6"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Featured Image */}
                    <div className="card-modern p-6">
                        <label className="text-sm font-medium text-dark-700 flex items-center space-x-2 mb-4">
                            <ImageIcon size={16} />
                            <span>Featured Image</span>
                            {!post && <span className="text-red-500">*</span>}
                        </label>
                        
                        <div className="space-y-4">
                            {imagePreview && (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                    <div className="absolute inset-0 bg-dark-900/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                        <p className="text-white text-sm font-medium">Click to change</p>
                                    </div>
                                </div>
                            )}
                            
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    {...register("image", { required: !post && "Featured image is required" })}
                                    onChange={(e) => {
                                        handleImageChange(e);
                                        register("image").onChange(e);
                                    }}
                                />
                                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 ${
                                    imagePreview 
                                        ? 'border-primary-300 bg-primary-50/50' 
                                        : 'border-dark-300 hover:border-primary-400 hover:bg-primary-50/30'
                                }`}>
                                    <Upload size={32} className="mx-auto mb-2 text-dark-400" />
                                    <p className="text-sm text-dark-600 font-medium">
                                        {imagePreview ? 'Change Image' : 'Upload Image'}
                                    </p>
                                    <p className="text-xs text-dark-500 mt-1">
                                        PNG, JPG, JPEG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                            
                            {errors.image && (
                                <p className="text-sm text-red-600">{errors.image.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Post Settings */}
                    <div className="card-modern p-6">
                        <label className="text-sm font-medium text-dark-700 flex items-center space-x-2 mb-4">
                            <Eye size={16} />
                            <span>Post Status</span>
                        </label>
                        
                        <Select
                            options={["active", "inactive"]}
                            className="w-full"
                            {...register("status", { required: true })}
                        />
                        
                        <div className="mt-4 p-3 bg-dark-50 rounded-lg">
                            <div className="flex items-center space-x-2 text-sm">
                                <div className={`w-2 h-2 rounded-full ${
                                    watch("status") === "active" ? "bg-green-500" : "bg-gray-400"
                                }`}></div>
                                <span className="text-dark-600">
                                    {watch("status") === "active" 
                                        ? "This post will be visible to readers" 
                                        : "This post will be hidden from readers"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                                <Loader2 size={18} className="animate-spin" />
                                <span>{post ? "Updating..." : "Publishing..."}</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Save size={18} />
                                <span>{post ? "Update Post" : "Publish Post"}</span>
                            </div>
                        )}
                    </Button>
                </motion.div>
            </div>
        </motion.form>
    );
}