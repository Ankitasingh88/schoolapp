/*'use server'
import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../utils/supabase/server-client";
import { slugify } from "../utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "../utils/supabase/upload-image";

export const CreatePost = async (userdata: z.infer<typeof postSchema>) => {
  console.log("Image Parameter",userdata.image)
  const parseData = postSchema.parse(userdata)
  const slug = slugify(parseData.title)
  const imageFile = userdata.image?.get("image")
   //console.log("image file",typeof imageFile)

    //const isValid = postSchema.safeParse(userdata);
    //if(!isValid) throw new Error('Malformed Image File')

  if(!(imageFile instanceof File) && imageFile !== null) {
      throw new Error("Malformed Image File")
  }
    //const publicImageUrl = typeof imageFile !== 'string' ? await uploadImage(imageFile as File): null
  const publicImageUrl = imageFile instanceof File ? await uploadImage(imageFile) : null
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();
  if(!user) { 
    throw new Error("Not Authorized")
  }
  const userId = user.id;
  await supabase.from('posts')
                .insert([{user_id: userId, slug: slug, ...parseData, image: publicImageUrl}])
                .throwOnError()
                revalidatePath("/")
                redirect(`/${slug}`)
}*/   




'use server'
import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../utils/supabase/server-client"
import { slugify } from "../utils/slugify"
import { revalidatePath } from "next/cache"
import { uploadImage } from "../utils/supabase/upload-image"

export const CreatePost = async (userdata: z.infer<typeof postSchema>) => {
  console.log("=== CREATE POST ACTION STARTED ===")
  
  try {
    // Parse and validate data
    const parseData = postSchema.parse(userdata)
    console.log("✅ Data validated successfully")
    
    const slug = slugify(parseData.title)
    console.log("Generated slug:", slug)
    
    // Handle image upload
    let publicImageUrl: string | null = null
    const imageFile = userdata.image?.get("image")
    
    if (imageFile && imageFile instanceof File) {
      console.log("Uploading image:", imageFile.name)
      publicImageUrl = await uploadImage(imageFile)
      console.log("✅ Image uploaded:", publicImageUrl)
    }

    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error("❌ Authentication error:", userError)
      throw new Error("Not Authorized - Please log in")
    }
    
    console.log("✅ User authenticated:", user.id)

    // Prepare post data
    const postData = {
      user_id: user.id,
      slug: slug,
      title: parseData.title,
      content: parseData.content || "",
      image: publicImageUrl
    }

    console.log("Attempting to insert post:", postData)

    // Insert into database
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()

    if (error) {
      console.error("❌ Supabase insert error:", error)
      throw new Error(`Failed to create post: ${error.message}`)
    }

    if (!data || data.length === 0) {
      console.error("❌ No data returned from insert")
      throw new Error("Post creation failed - no data returned")
    }

    console.log("✅ POST CREATED SUCCESSFULLY:", data[0])

    // Revalidate the home page
    revalidatePath("/")
    
    // Return success with slug for frontend redirect
    return { 
      success: true, 
      slug: slug,
      post: data[0]
    }
    
  } catch (error) {
    console.error("❌ CREATE POST ERROR:", error)
    
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred")
  }
}