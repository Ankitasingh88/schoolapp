'use client'
import { LogIn } from "../../../../../actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "../../../../../actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const LogInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate,isPending,data} = useMutation({
        mutationFn: LogIn
    })

    return(
        <>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit(values => mutate(values))}>

            <div>
                <label 
                    htmlFor="email" 
                    className="block text-xs sm:text-sm font-bold text-purple-700 mb-1.5 sm:mb-2"
                >
                    Enter Your Email Address
                </label>
                <input
                    id="email" 
                    type="email" 
                    className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5" 
                    {...register("email")}
                    placeholder="Enter your email"
                    disabled={isPending}
                />
                {errors.email && (
                    <div className="mt-1.5 sm:mt-2">
                        <ErrorMessage message={errors.email.message!} />
                    </div>
                )}
            </div>

            <div>
                <label 
                    htmlFor="password" 
                    className="block text-xs sm:text-sm font-semibold text-purple-700 mb-1.5 sm:mb-2"
                >
                    Enter Your Password
                </label>
                <input
                    id="password" 
                    type="password" 
                    className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
                    {...register("password")}
                    placeholder="Enter your password"
                    disabled={isPending}
                />
                {errors.password && (
                    <div className="mt-1.5 sm:mt-2">
                        <ErrorMessage message={errors.password.message!} />
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="button-secondary w-full text-sm sm:text-base py-2.5 sm:py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-6 sm:mt-8"
                disabled={isPending}
            >
                {isPending ? "Logging you in..." : "Log In"}
            </button>
        </form>
        {data && data.error && (
            <div className="mt-3 sm:mt-4">
                <ErrorMessage message={data.error} />
            </div>
        )}
        </>
    )
}

export default LogInForm