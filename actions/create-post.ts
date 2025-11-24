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
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authUser) {
      console.error("❌ Authentication error:", authError)
      throw new Error("Not Authorized - Please log in")
    }
    
    console.log("✅ Auth user ID:", authUser.id)

    // CRITICAL: Check if user exists in the custom user table
    const { data: customUser, error: customUserError } = await supabase
      .from('user')
      .select('id')
      .eq('id', authUser.id)
      .single()

    if (customUserError || !customUser) {
      console.error("❌ User not found in user table")
      console.error("❌ Auth user ID:", authUser.id)
      console.error("❌ Error:", customUserError)
      
      // User doesn't exist in custom user table - this is the problem!
      throw new Error("User profile not found. Please contact support.")
    }

    console.log("✅ Custom user found:", customUser.id)

    // Prepare post data
    const postData = {
      user_id: customUser.id,
      slug: slug,
      title: parseData.title,
      content: parseData.content || "",
      image: publicImageUrl
    }

    console.log("Attempting to insert post with data:", postData)

    // Insert into database
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()

    if (error) {
      console.error("❌ ========================================")
      console.error("❌ SUPABASE INSERT ERROR:")
      console.error("❌ Error Message:", error.message)
      console.error("❌ Error Code:", error.code)
      console.error("❌ Error Details:", error.details)
      console.error("❌ Error Hint:", error.hint)
      console.error("❌ ========================================")
      throw new Error(`Failed to create post: ${error.message}`)
    }

    if (!data || data.length === 0) {
      console.error("❌ No data returned from insert")
      throw new Error("Post creation failed")
    }

    console.log("✅ POST CREATED SUCCESSFULLY:", data[0])

    revalidatePath("/")
    revalidatePath(`/${slug}`)
    
    return { 
      success: true, 
      slug: slug,
      post: data[0]
    }
    
  } catch (error) {
    console.error("❌ ========================================")
    console.error("❌ ERROR IN CREATE POST:", error)
    console.error("❌ ========================================")
    
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred")
  }
}



/*'use server'
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

    console.log("Attempting to insert post with data:", postData)

    // Insert into database
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()

    // THIS IS WHAT YOUR TEACHER WANTS - Log the error from the insert
    if (error) {
      console.error("❌ ========================================")
      console.error("❌ SUPABASE INSERT ERROR:")
      console.error("❌ Error Message:", error.message)
      console.error("❌ Error Code:", error.code)
      console.error("❌ Error Details:", error.details)
      console.error("❌ Error Hint:", error.hint)
      console.error("❌ Full Error Object:", JSON.stringify(error, null, 2))
      console.error("❌ ========================================")
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
    // Also log any general errors
    console.error("❌ ========================================")
    console.error("❌ GENERAL ERROR IN CREATE POST:")
    console.error("❌ Error:", error)
    console.error("❌ Error Type:", typeof error)
    if (error instanceof Error) {
      console.error("❌ Error Message:", error.message)
      console.error("❌ Error Stack:", error.stack)
    }
    console.error("❌ ========================================")
    
    if (error instanceof Error) {
      throw error
    }
    throw new Error("An unexpected error occurred")
  }
}*/





