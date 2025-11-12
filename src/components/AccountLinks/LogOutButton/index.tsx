'use client'

import { LogOut } from "../../../../actions/log-out"

const LogOutButton = () => {
    const handleClick = () => {
        LogOut()
    }
    
    return(
        <button onClick={handleClick} className="buttton-secondary">LogOut</button>
    )
}

export default LogOutButton