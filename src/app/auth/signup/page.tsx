import Link from "next/link";
import SignUpForm from "./SignUpForm";
 
const SignUpPage = () => {
    return (
        <>
        <div className="border-1 rounded-xl p-4 w-[700px] mx-auto">
            <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
                <SignUpForm />
            <div>Already  have an account? Log In <Link className="text-red-500" href="/auth/login">here!</Link></div>
        </div>
        </>
    )
}
export default SignUpPage;