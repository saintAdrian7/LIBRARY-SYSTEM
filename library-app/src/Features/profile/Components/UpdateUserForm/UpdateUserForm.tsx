import React,{useEffect, useState} from "react";

import { useAuth, updateUser, resetUser } from "../../../../context/Contextprovider";

import { useNavigate } from "react-router-dom";

import './UpdateUserForm.css';
import { User } from "../../../../models/User";
import { Create } from "@mui/icons-material";

export const UpdateUserForm:React.FC = () => {
 const {state, dispatch} = useAuth()

 const [displayUpdate, setDisplayUpdate] = useState<boolean>(false)
 const [user, setUser] = useState<User | undefined>(state.profileUser);

 const navigate = useNavigate();

 const updateUserState = (e:React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUpdate(true);
    if(e.target.value && e.target.name && user ){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
 }
const submitUpdatedUser = (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    if(user)
    updateUser(dispatch, user);
    setDisplayUpdate(false);
   
    
}

const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('userId')
    resetUser(dispatch, "loggedInUser")
    resetUser(dispatch, "profileUser")
    navigate('/')
}

useEffect(() => {
if(!user){
    setUser(state.profileUser)
}
},[state.profileUser, user])
 return (
    <form className="update-user-form">
        <div className="update-user-input-group">
            <h4>First Name:</h4>
            <input className="update-user-input" name="firstName" value={user?.firstName || ''} onChange={updateUserState} disabled={state.loggedInUser?._id !== state.profileUser?._id}/>
            {state.loggedInUser?._id === state.profileUser?._id && <Create sx={{
                position:'absolute',
                top:'65%',
                right:'0'

            }} />}

        </div>
        <div className="update-user-input-group">
            <h4>Last Name:</h4>
            <input className="update-user-input" name="LastName" value={user?.lastName || ''} onChange={updateUserState} disabled={state.loggedInUser?._id !== state.profileUser?._id}/>
            {state.loggedInUser?._id === state.profileUser?._id && <Create sx={{
                position:'absolute',
                top:'65%',
                right:'0'

            }} />}

        </div>
        <div className="update-user-input-group">
            <h4>Email:</h4>
            <input className="update-user-input" name="email" value={user?.email || ''} onChange={updateUserState} disabled={state.loggedInUser?._id !== state.profileUser?._id}/>
            {state.loggedInUser?._id === state.profileUser?._id && <Create sx={{
                position:'absolute',
                top:'65%',
                right:'0'

            }} />}

        </div>

        {displayUpdate ? <button className="profile-button" onClick={submitUpdatedUser}>Update Profile</button> : <></>}
        {state.loggedInUser?._id === state.profileUser?._id ? <button className="profile-button" onClick={logout}>Logout of Account</button>: <></>}

    </form>
 )
}