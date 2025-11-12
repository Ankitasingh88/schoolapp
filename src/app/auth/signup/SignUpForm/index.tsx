'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { SignUp } from "../../../../../actions/sign-up"
import { signUpSchema } from "../../../../../actions/schemas"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
 
const  SignUpForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: SignUp
    })

 
    return (
        <>
        <form onSubmit={handleSubmit(values => mutate(values))} className=" flex flex-col mb-4">
           
            <fieldset>
                <label htmlFor="email">Enter Your email</label>
                <input className="ml-2 mb-6 px-2" type="email" {...register("email")} placeholder="Enter your email..." />
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </fieldset>

            <fieldset>
                <label htmlFor="username">What's your name</label>
                <input type="username" className="ml-2 mb-4 px-2" id="username" {...register("username")} placeholder="Enter your username" />
                {errors.username && <ErrorMessage message={errors.username.message!} />}
            </fieldset>

            <fieldset>
                <label htmlFor="password">Enter your Password</label>
                <input type="password" className="ml-2 mb-4 px-2" id="password" {...register("password")} placeholder="Enter your password..." />
                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </fieldset>
            <button className="button-secondary w-1/2 m-auto">Sign Up</button>
              {error && <ErrorMessage message={error.message} />}
        </form>
        </>
    )
}
export default SignUpForm