import React, { useRef } from "react"
import SignupForm from "../Components/Forms/SignUpForm"
import { useNavigate } from 'react-router-dom'

const RegisterUser = () => {

    const navigate = useNavigate();
    const navigateRef = useRef(navigate);

    const handleSignUpSuccess = () => {
        navigateRef.current("/home");
    };

    return (
        <div className="container-register">
            <SignupForm onSignUpSuccess={handleSignUpSuccess}/>
        </div>
    );
}

export default RegisterUser;