import Link from "next/link";
import SignUpForm from "./SignUpForm";
 
const SignUpPage = () => {
    return (
        <div className="min-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="card p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-2xl animate-fadeInUp">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Create Account
                    </h2>
                    <p className="text-sm sm:text-base text-black-600">
                        Come and community today
                    </p>
                </div>

                <SignUpForm />

                <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-sm sm:text-base text-gray-600">
                        Already have an account?{" "}
                        <Link 
                            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300" 
                            href="/auth/login"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;