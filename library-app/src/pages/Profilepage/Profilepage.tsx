import React,{useEffect} from "react";
import { fetchUser, useAuth } from "../../context/Contextprovider";
import { useNavigate, useParams } from "react-router-dom";

import './Profilepage.css'
import { UpdateUserForm } from "../../Features/profile";

export default function Profilepage(){
    const {state, dispatch} = useAuth()
    const loggedInUser = state.loggedInUser
    const profileUser = state.profileUser

    const {userId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(userId){
            if(loggedInUser?._id === userId || loggedInUser?.type === 'EMPLOYEE'){
                fetchUser(dispatch, { userId, property: "profileUser" });
            }else {
                navigate('/');
            }
        }
    
    },[userId,profileUser])

    return(
        <div className="page">
            <div className="page-container">
             <h1>{profileUser?.firstName} {profileUser?.lastName}'s Profile</h1>
             <div className="profile-page-cols">
                <div className="profile-page-left-column">
                    <UpdateUserForm />

                </div>
                <div className="profile-page-right-column">
                    
                </div>
             </div>
            </div>
            
        </div>
    )
}