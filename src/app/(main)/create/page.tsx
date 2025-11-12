'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema } from "../../../../actions/schemas"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../../actions/create-post"
import z from "zod"
import ErrorMessage from "@/components/ErrorMessage"


const CreatePage = () => {

    const schemaWithImage = postSchema.omit({image: true})
    .extend({image: z.unknown().transform(value => {return value as (FileList)}) .optional()})

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver:zodResolver(schemaWithImage)
    })
    
    const {mutate,error} = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div className="border-1 rounded-xl p-4 w-[700px] mx-auto">
            <h4 className="font-bold text-3xl mb-4">Got Something To Say!</h4>
        
        <form className="flex flex-col m-4 "  onSubmit={handleSubmit(values => {
            let imageForm = new FormData();

            if(values.image?.length) {imageForm.append('image', values.image[0])}
                
            mutate({title: values.title, content: values.content, image: imageForm })
          })}>
              
            <fieldset className="m-4">
                <label htmlFor="title">Post Title</label>
                <input className="ml-2 mb-4 px-2"{...register("title")} id="title" placeholder="Create Your Post Here!"></input>
            </fieldset>

            <fieldset className="m-4">
                <label htmlFor="content">What are you going to talk about?</label>
                <textarea className="ml-2 mb-4 px-2 border-1 rounded-xl w-full" {...register("content")} id="content" placeholder="Start talking..."></textarea>
            </fieldset>

            <fieldset className="m-4">
                <label htmlFor="image">Upload Image Here!</label>
                <input type="file" className="ml-2 mb-4 px-2 border-1 rounded-xl w-full" {...register("image")} id="image" placeholder="Upload picture"></input>
                {errors.image &&  <ErrorMessage message={errors.image.message!}/>}
            </fieldset>

            <button className="button-secondary w-1/2 m-auto">Create Post</button>
        </form>

        </div>
    )
}

export default CreatePage