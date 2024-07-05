import React, { useRef, useState } from "react";
import './LoginForm.css';
import { useAuth, loginUser } from "../../../../context/Contextprovider";


interface LoginFormProps{
    toggleRegister():void
}


export const Loginform: React.FC<LoginFormProps> = ({toggleRegister}) => {
    const [error, setError] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { state, dispatch } = useAuth();

    const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (emailRef && emailRef.current && passwordRef &&passwordRef.current)
            try {
                await loginUser(dispatch, {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                });
                setError(false)
                console.log(state.loggedInUser);
                toggleRegister
                
            } catch (e) {
                setError(true);
                console.log(e);
                
        }
    };

    return (
        <form className="login-form">
            <h2>Please Login</h2>
            {error && <p className="login-form-error">Username or password incorrect</p>}
            <div className="login-form-input-group">
                <h6>Email</h6>
                <input
                    className="login-form-input"
                    placeholder="enter email"
                    name="email"
                    required
                    ref={emailRef}
                />
            </div>
            <div className="login-form-input-group">
                <h6>Password</h6>
                <input
                    className="login-form-input"
                    placeholder="enter password"
                    name="password"
                    type="password"
                    required
                    ref={passwordRef}
                />
            </div>
            <button className="login-form-submit" onClick={handleLoginUser}>
                Login
            </button>
            <p>
                Don't have an account?
                <span className="login-form-register" onClick={toggleRegister}>Create one here.</span>
            </p>
        </form>
    );
};
