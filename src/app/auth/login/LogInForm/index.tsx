'use client'

import { LogIn } from "../../../../../actions/log-in"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "../../../../../actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const LogInForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate, isPending, data} = useMutation({
        mutationFn: LogIn
    })

    return (
        <>
        <form className="flex flex-col mb-4" onSubmit={handleSubmit(values => mutate(values))} >
              
            <fieldset>
                <label htmlFor="email">Enter your Email</label>
                <input className="ml-2 mb-4 px-2"{...register("email")} id="email" placeholder="Enter your Email"></input>
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </fieldset>

            <fieldset>
                <label htmlFor="password">Enter your Password</label>
                <input type="password" className="ml-2 mb-4 px-2" {...register("password")} id="password" placeholder="Enter your Password..."></input>
                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </fieldset>

            <button className="button-secondary w-1/2 m-auto">{isPending? "Logging you in!" : "Log In!"}</button>
        </form>
        {data?.error && <ErrorMessage message={data.error} />}
        </>
    )
}

export default LogInForm