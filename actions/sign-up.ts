/*'use server'

import { redirect } from "next/navigation"
import { createClient } from "../utils/supabase/server-client"
import { signUpSchema } from "./schemas"
import z from "zod"
 
export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {

    const parsedData = signUpSchema.parse(userdata)
    const supabase = await createClient()

    const {data: {user}, error} = await supabase.auth.signUp(parsedData)
   
 
    if (user && user.email) {
        const {data, error} = await supabase.from('user').insert([{id: user.id, email: user.email, username: userdata.username}])
        //console.log("New user:", data, "Error:", error)
    }
    if (error) throw error
    
    redirect("/")
}*/   


'use server'

import { redirect } from "next/navigation"
import { createClient } from "../utils/supabase/server-client"
import { signUpSchema } from "./schemas"
import z from "zod"

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
    console.log("=== SIGN UP STARTED ===")
    
    const parsedData = signUpSchema.parse(userdata)
    const supabase = await createClient()

    // Step 1: Create auth user
    const {data: {user}, error: authError} = await supabase.auth.signUp(parsedData)
    console.log("Auth user created:", user?.id)

    if (authError) {
        console.error("❌ Auth sign up error:", authError)
        throw authError
    }

    // Step 2: Create custom user profile
    if (user && user.email) {
        console.log("Creating user profile in custom user table...")
        
        const {data, error} = await supabase.from('user').insert([{
            id: user.id, 
            email: user.email, 
            username: userdata.username
        }])
        
        if (error) {
            console.error("❌ Failed to create user profile:", error)
            console.error("❌ Error code:", error.code)
            console.error("❌ Error details:", error.details)
            console.error("❌ Error hint:", error.hint)
            
            // Clean up: delete the auth user since profile creation failed
            await supabase.auth.admin.deleteUser(user.id)
            
            throw new Error(`Failed to create user profile: ${error.message}`)
        }
        
        console.log("✅ User profile created successfully:", data)
    }

    console.log("=== SIGN UP COMPLETED ===")
    redirect("/")
}