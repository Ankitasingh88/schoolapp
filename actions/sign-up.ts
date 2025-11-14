'use server'

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
}