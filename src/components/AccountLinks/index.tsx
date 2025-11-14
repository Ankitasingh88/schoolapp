import { createClient } from "../../../utils/supabase/server-client"
import Link from "next/link"
import LogOutButton from "./LogOut";

const AccountLinks = async () => {
    const supabase= await createClient()
    const {data:{user},error} = await supabase.auth.getUser();
   
    return (
        <div>
            {user ? 
            <div className="flex gap-2">
            <LogOutButton /> 
            <Link href="/create" className="button-tertiary">Create Post</Link>
            </div>: 
            <Link href='/auth/login' className="button-secondary">Log In</Link>
            }
        </div>
    )
}

export default AccountLinks