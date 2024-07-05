import React, {useRef} from "react";
import { Link, useNavigate } from "react-router-dom";

import './Navbar.css'
import { useAuth } from "../../../../context/Contextprovider";
import { Book, Search } from "@mui/icons-material";

export const Navbar:React.FC = () => {
const searchRef = useRef<HTMLInputElement>(null)
const {state, dispatch} = useAuth()
const navigate = useNavigate()

const handleEnterKey = (e:React.KeyboardEvent<HTMLInputElement>)=> {
    if(e.key === 'Enter' && searchRef && searchRef.current && searchRef.current.value.length > 0){
        navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
        searchRef.current.value = '';
    }
}

const handleSearchIconClicked = () => {
    if(searchRef && searchRef.current  && searchRef.current.value.length > 0){
        navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
        searchRef.current.value = '';
    }
}

const navigateToProfile = () => {
    if(state.loggedInUser) navigate(`/profile/${state.loggedInUser._id}`)
}

const toggleLogin = () => {
    dispatch({type:'LOG_OUT'})
}
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-logo-section">
              <Book sx={{
                fontSize:"3rem",
                color:"black"
              }} />
              <h1>My Library</h1>
            </Link>
            <div className="navbar-option-section">
                <Link to="/catalog" className="navbar-option navbar-link">
                <h2>View Catalog</h2>
                </Link>
                <div className="navbar-search-box">
                    <input className="navbar-search-input" placeholder="Search Catalog" onKeyDown={handleEnterKey} ref={searchRef} />
                    <Search onClick={handleSearchIconClicked}
                       sx={{
                        cursor:"pointer",
                        fontSize:"2rem",
                       }}
                       />
                </div>
                {
                    state.loggedInUser ?
                    <div className="navbar-option" onClick={navigateToProfile}>
                       <h2>{state.loggedInUser.firstName}'s Account</h2>
                    </div>
                    :
                    <div className="navbar-option" onClick={toggleLogin}>
                        <h2>Login</h2>
                    </div>
                }
            </div>
            

        </nav>
    )

}