/*'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postSchema } from "../../../../actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../../actions/create-post"
import ErrorMessage from "@/components/ErrorMessage"
import z from "zod"

const CreatePage = () => {

    const schemaWithImage = postSchema.omit({image:true}).
                                        extend({image:z.unknown().transform(value =>
                                        {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState : {errors}} = useForm ({
        resolver:zodResolver(schemaWithImage)
    })

    const {mutate,isPending,error} = useMutation({
        mutationFn:CreatePost
    })

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <div className="card p-6 sm:p-8 lg:p-10 animate-fadeInUp">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black-900 mb-2">
                        Create New Post
                    </h1>
                    <p className="text-sm sm:text-base text-black-600">
                        Share your thoughts with the community
                    </p>
                </div>

                <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit(values =>{
                                                        let imageForm = new FormData();
                                                        if(values.image?.length) {
                                                            imageForm.append('image',values.image[0])
                                                        }
                                                        mutate({title:values.title,content:values.content,image:imageForm})
                                                        })}>

                    <div>
                        <label 
                            htmlFor="title" 
                            className="block text-xs sm:text-sm font-semibold text-black-700 mb-1.5 sm:mb-2"
                        >
                            Post Title
                        </label>
                        <input
                            id="title"
                            className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
                            {...register("title")}
                            placeholder="What's your post called?"
                            disabled={isPending}
                        />
                        {errors.title && (
                            <div className="mt-1.5 sm:mt-2">
                                <ErrorMessage message={errors.title.message!} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="content" 
                            className="block text-xs sm:text-sm font-semibold text-black-700 mb-1.5 sm:mb-2"
                        >
                            What's In Your Mind!
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 min-h-[150px] sm:min-h-[200px] lg:min-h-[250px] resize-y"
                            placeholder="Share your story..."
                            disabled={isPending}
                        />
                        {errors.content && (
                            <div className="mt-1.5 sm:mt-2">
                                <ErrorMessage message={errors.content.message!} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="image" 
                            className="block text-xs sm:text-sm font-semibold text-black-700 mb-1.5 sm:mb-2"
                        >
                            Upload an Image (Optional)
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register("image")}
                            className="input-field w-full text-xs sm:text-sm px-2 sm:px-3 py-2 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            accept="image/*"
                            disabled={isPending}
                        />
                        {errors.image && (
                            <div className="mt-1.5 sm:mt-2">
                                <ErrorMessage message={errors.image.message!} />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="button-secondary w-full text-sm sm:text-base py-2.5 sm:py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-6 sm:mt-8"
                        disabled={isPending}
                    >
                        {isPending ? "Creating Post..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage*/     



'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postSchema } from "../../../../actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../../actions/create-post"
import ErrorMessage from "@/components/ErrorMessage"
import z from "zod"
import { useRouter } from "next/navigation"

const CreatePage = () => {
    const router = useRouter()

    const schemaWithImage = postSchema.omit({image:true}).
                                        extend({image:z.unknown().transform(value =>
                                        {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState : {errors}, reset} = useForm ({
        resolver:zodResolver(schemaWithImage)
    })

    const {mutate,isPending,error} = useMutation({
        mutationFn:CreatePost,
        onSuccess: (data) => {
            console.log("✅ Post created successfully!", data)
            reset() // Reset form
            // Redirect to the new post or home page
            if (data.slug) {
                router.push(`/${data.slug}`)
            } else {
                router.push('/')
            }
            router.refresh() // Refresh to show new data
        },
        onError: (error) => {
            console.error("❌ Mutation error:", error)
            // Only show alert for real errors
            if (!error.message.includes('NEXT_REDIRECT')) {
                alert(`Error creating post: ${error.message}`)
            }
        }
    })

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <div className="card p-6 sm:p-8 lg:p-10 animate-fadeInUp">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black-900 mb-2">
                        Create New Post
                    </h1>
                    <p className="text-sm sm:text-base text-black-600">
                        Share your thoughts with the community
                    </p>
                </div>

                {/* Show error message if mutation fails */}
                {error && !error.message.includes('NEXT_REDIRECT') && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <ErrorMessage message={error.message} />
                    </div>
                )}

                <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit(values =>{
                                                        console.log("Form submitted with values:", values)
                                                        let imageForm = new FormData();
                                                        if(values.image?.length) {
                                                            imageForm.append('image',values.image[0])
                                                            console.log("Image added to FormData:", values.image[0].name)
                                                        }
                                                        mutate({title:values.title,content:values.content,image:imageForm})
                                                        })}>

                    <div>
                        <label 
                            htmlFor="title" 
                            className="block text-xs sm:text-sm font-semibold text-black-700 mb-1.5 sm:mb-2"
                        >
                            Post Title
                        </label>
                        <input
                            id="title"
                            className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
                            {...register("title")}
                            placeholder="What's your post called?"
                            disabled={isPending}
                        />
                        {errors.title && (
                            <div className="mt-1.5 sm:mt-2">
                                <ErrorMessage message={errors.title.message!} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="content" 
                            className="block text-xs sm:text-sm font-semibold text-black-700 mb-1.5 sm:mb-2"
                        >
                            What's In Your Mind!
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 min-h-[150px] sm:min-h-[200px] lg:min-h-[250px] resize-y"
                            placeholder="Share your story..."
                            disabled={isPending}
                        />
                        {errors.content && (
                            <div className="mt-1.5 sm:mt-2">
                                <ErrorMessage message={errors.content.message!} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="image" 
                            className="block text-xs sm:text-sm font-semibold text-black-700 mb-1.5 sm:mb-2"
                        >
                            Upload an Image (Optional)
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register("image")}
                            className="input-field w-full text-xs sm:text-sm px-2 sm:px-3 py-2 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            accept="image/*"
                            disabled={isPending}
                        />
                        {errors.image && (
                            <div className="mt-1.5 sm:mt-2">
                                <ErrorMessage message={errors.image.message!} />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="button-secondary w-full text-sm sm:text-base py-2.5 sm:py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-6 sm:mt-8"
                        disabled={isPending}
                    >
                        {isPending ? "Creating Post..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage  

