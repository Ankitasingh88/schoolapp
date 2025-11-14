import Link from "next/link"
import LogInForm from "./LogInForm"

const LogIn = () => {
    return(
        <div className="max-h-screen flex items-center justify-center px-4 bg-fuchsia-200 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="card p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md">
                <div className="text-center mb-4 sm:mb-8">
                    <h1 className="text-5xl sm:text-4xl lg:text-5xl font-bold text-purple-900 mb-2">
                        Welcome!
                    </h1>
                    <p className="text-sm sm:text-base text-black-600">
                        Sign in to continue to your account
                    </p>
                </div>

                <LogInForm />

                <div className="mt-8 sm:mt-6 text-center">
                    <p className="text-sm sm:text-base text-black-600">
                        Don't have an account?{" "}
                        <Link
                            className="text-purple-600 font-semibold"
                            href="/auth/signup"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn