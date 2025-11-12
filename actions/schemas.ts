import { z } from 'zod'
import { title } from "process";

export const logInSchema = z.object({
    email: z.email("Wrong,email,format"),
    password: z.string().min(6, "your password must be a 6 characters")
})

export const signUpSchema = z.object({
    email: z.email("Wrong email format"),
    username: z.string().regex(/^[a-zA-Z]+$/,"Username should contain only Letters"),
    password: z.string().min(6, "your password must be a minimum 6 characters")
})

export const postSchema = z.object({
    title: z.string().min(3, "Titles must have a least 3 characters"),
    content: z.string().optional(),
    image: z.instanceof(FormData).optional()
})
