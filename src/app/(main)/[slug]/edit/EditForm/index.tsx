'use client'
import { useMutation } from "@tanstack/react-query"
import { EditPost } from "../../../../../../actions/edit-post"
import { Tables } from "../../../../../../utils/supabase/database.types"
import { useForm } from "react-hook-form"
import { postSchema } from "../../../../../../actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import ErrorMessage from "@/components/ErrorMessage"

const EditForm = ({postId,initialValues}:{postId:number,initialValues:Pick<Tables<'posts'>,"title"|"content"|"image">}) => {

const schemaWithImage = postSchema.omit({image:true})
                                  .extend({image:z.unknown().transform(value =>
                                  {return value as(FileList)}).optional()})

const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:zodResolver(schemaWithImage),
        defaultValues:{
          title:initialValues.title,
          content:initialValues.content || undefined,
          image:initialValues.image
        }
})

const {mutate,isPending,error} = useMutation({
    mutationFn: EditPost
})

return (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <div className="card p-8 animate-fadeInUp">
      <div className="mb-8">
       <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <p className="text-gray-600">Update your post details</p>
     </div>

  <form onSubmit={handleSubmit(values => {
        let imageForm = undefined;
        if(values.image?.length && typeof values.image !== 'string') {
           imageForm= new FormData()
           imageForm.append('image',values.image[0])
        }
  mutate({postId, userdata:{title:values.title,content:values.content,image:imageForm}})})} className="space-y-6">

  <div>
    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
      Post Title
   </label>

    <input id="title" {...register("title")}
                      className="input-field"
                      placeholder="What's your post called?"
                      disabled={isPending}
                      />
    {errors.title && <ErrorMessage message={errors.title.message!} />}
  </div>

  <div>
  <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
    Content
  </label>
                        
  <textarea id="content" {...register("content")}
                          className="input-field min-h-[200px] resize-y"
                          placeholder="Share your story..."
                          disabled={isPending}
                        />
  {errors.content && <ErrorMessage message={errors.content.message!} />}
  </div>

  <div>
  {initialValues.image && (
  <div className="mb-4">
  <p className="text-sm font-semibold text-gray-700 mb-2">Current Image</p>
  <img className="w-full h-auto rounded-xl shadow-md" src={initialValues.image} alt="Current post image"/>
  </div>
  )}
                        
  <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
        {initialValues.image ? "Upload New Image (Optional)" : "Upload an Image (Optional)"}
  </label>
                        
  <input type="file" id="image"
                  {...register("image")} className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            accept="image/*"
                            disabled={isPending}
                        />
                        {errors.image && <ErrorMessage message={errors.image.message!} />}
                    </div>

  <button type="submit" className="button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
         disabled={isPending}
  >
  {isPending ? "Updating Post..." : "Update Post"}
  </button>

  {error && (<div className="mt-4">
  <ErrorMessage message={error.message} />
  </div>
  )}
  </form>
  </div>
  </div>
  )
}

export default EditForm