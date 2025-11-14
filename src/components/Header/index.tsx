import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import SearchInput from "../Search"

const Header = () => {
    return (
        <>
         <header className="card px-8 py-4 mb-8 animate-fadeIn">
            <div className= "flex justify-between items-center flex-wrap gap-4 max-w-7xl mx-auto" >
            <Logo />
            <SearchInput/>
            <AccountLinks />        
           </div>
        </header>
         </>
    )
}

export default Header
