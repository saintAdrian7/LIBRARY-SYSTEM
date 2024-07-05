
import React, {useEffect, useRef} from "react";
import './RegisterForm.css'
import { useAuth, registerUser } from "../../../../context/Contextprovider";


interface RegisterFormProps {
    toggleLogin():void;

}

export const RegisterForm:React.FC<RegisterFormProps> = ({ toggleLogin}) => {
const {state, dispatch} = useAuth()
const firstRef = useRef<HTMLInputElement>(null)
const lastRef = useRef<HTMLInputElement>(null)
const emailRef = useRef<HTMLInputElement>(null)
const passwordRef = useRef<HTMLInputElement>(null)

const handleRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
e.preventDefault()
if(firstRef && firstRef.current && lastRef && lastRef.current && emailRef && emailRef.current && passwordRef && passwordRef.current){

  try{
    await registerUser(dispatch, {
        type: 'PATRON',
        firstName: firstRef.current.value,
        lastName: lastRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value

    })

  }catch(e){
   console.log(e);
   
  }
}
}

useEffect( ()=> {
  return (() => {
  dispatch({type: 'RESET_REGISTER_SUCCESS'})
  })
}, [])
    return(
        <form className="register-form">
           <h2>Enter information</h2>
           {state.error ? <p className="register-form-error">There was an error</p> : <></>}
           <div className="register-form-name-group">
             <div className="register-form-name-input-group">
                <h6>first Name</h6>
                <input className="register-form-input-name" placeholder="First Name" name="first Name" required ref={firstRef}/>
                
             </div><div className="register-form-name-input-group">
                <h6>last Name</h6>
                <input className="register-form-input-name" placeholder="last Name" name="last Name" required ref={lastRef}/>
                
             </div>
           </div>
           <div className="register-form-input-group">
            <h6>Email</h6>
            <input className="register-form-input" placeholder="Enter Email" name="email" required ref={emailRef} />
           </div>
           <div className="register-form-input-group">
            <h6>Password</h6>
            <input className="register-form-input" placeholder="Enter password"  name="password" required type="password" ref={passwordRef} />
           </div>
           ,<button className="register-form-submit" onClick={handleRegisterUser}>Register</button>
           {state.registerSuccess ? <p>Registered Successfully.
            <span className="register-form-login" onClick={toggleLogin}>Login here.</span>
           </p>: <></>}
        </form>
    )
}