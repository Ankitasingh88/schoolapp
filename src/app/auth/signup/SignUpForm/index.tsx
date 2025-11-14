'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUp } from "../../../../../actions/sign-up"
import { signUpSchema } from "../../../../../actions/schemas"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
 
const SignUpForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const {mutate, isPending, error} = useMutation({
        mutationFn: SignUp
    })

 
    return (
        <>
        <form 
            onSubmit={handleSubmit(values => mutate(values))} 
            className="space-y-4 sm:space-y-5"
        >
            <fieldset>
                <label 
                    htmlFor="email" 
                    className="block text-xs sm:text-sm font-bold text-black-600 mb-1.5 sm:mb-2"
                >
                    Enter Your Email
                </label>
                <input 
                    className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5" 
                    type="email" 
                    id="email"
                    {...register("email")} 
                    placeholder="Enter your email..."
                    disabled={isPending}
                />
                {errors.email && (
                    <div className="mt-1.5 sm:mt-2">
                        <ErrorMessage message={errors.email.message!} />
                    </div>
                )}
            </fieldset>

            <fieldset>
                <label 
                    htmlFor="username" 
                    className="block text-xs sm:text-sm font-bold text-black-600 mb-1.5 sm:mb-2"
                >
                    What's Your Name
                </label>
                <input 
                    type="text" 
                    className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5" 
                    id="username" 
                    {...register("username")} 
                    placeholder="Enter your username"
                    disabled={isPending}
                />
                {errors.username && (
                    <div className="mt-1.5 sm:mt-2">
                        <ErrorMessage message={errors.username.message!} />
                    </div>
                )}
            </fieldset>

            <fieldset>
                <label 
                    htmlFor="password" 
                    className="block text-xs sm:text-sm font-bold text-black-600 mb-1.5 sm:mb-2"
                >
                    Enter Your Password
                </label>
                <input 
                    type="password" 
                    className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5" 
                    id="password" 
                    {...register("password")} 
                    placeholder="Enter your password..."
                    disabled={isPending}
                />
                {errors.password && (
                    <div className="mt-1.5 sm:mt-2">
                        <ErrorMessage message={errors.password.message!} />
                    </div>
                )}
            </fieldset>

            <div className="pt-2 sm:pt-4">
                <button 
                    className="button-secondary w-full text-sm sm:text-base py-2.5 sm:py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    disabled={isPending}
                >
                    {isPending ? "Creating Account..." : "Sign Up"}
                </button>
            </div>

            {error && (
                <div className="mt-3 sm:mt-4">
                    <ErrorMessage message={error.message} />
                </div>
            )}
        </form>
        </>
    )
}

export default SignUpForm