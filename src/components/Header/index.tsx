import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import SearchInput from "../Search"

const Header = () => {
    return (
        <>
         <header className="flex justify-between items-centre flex-wrap">
            <Logo />
            <SearchInput/>
            <AccountLinks />        
         </header>
         <div className="mt-4 w-[95%] border-b-4 flex-8/12"></div>
         </>
    )
}

export default Header


