import { Modal } from "../../../../../components/Modal";
import './LoginRegisterModal.css'
import { useAuth} from "../../../../../context/Contextprovider";
import { useEffect, useState } from "react";
import { Loginform } from "../LoginForm";
import { RegisterForm } from "../../RegisterForm/RegisterForm";

export const LoginRegisterModal:React.FC =() => {
const {state, dispatch} = useAuth()
const [login, setLogin] = useState<boolean>(true)

const closeModal = () => {
   dispatch({type: 'HIDE_MODAL'})
}

const toggleLogin = () => {
    setLogin(!login)
}

useEffect(()=> {
  if(state.loggedInUser){
    closeModal()
  }

  return (() => {
    if(state.loggedInUser){
        localStorage.setItem('userId', state.loggedInUser._id)
    }
  })
},[state.loggedInUser] )
    return(
        <Modal 
        content={login ? <Loginform toggleRegister={toggleLogin}/> : <RegisterForm toggleLogin={toggleLogin}/>}

        toggleModal={closeModal}
        />
    )
}