import Link from "next/link"
import LogInForm from "./LogInForm"

const LogInPage = () => {
    return (
        <div className="border-1 rounded-xl p-4 w-[700px] mx-auto">
            <h2 className="font-bold text-3xl mb-4">Log In!</h2>
            <LogInForm/>
            <div>Don't have an account? sign up <Link className="text-red-500" href="/auth/signup">here! </Link></div>
         
        </div>
    )
}

export default LogInPage