import React, { useRef } from "react";
import logo from '../Components/Assets/agileflow-favicon-color.png'
import LoginForm from '../Components/Forms/LoginForm'
import SignupForm from "../Components/Forms/SignUpForm"
import Footer from "../Components/CommonElements/Footer"
import '../App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const containerRef = useRef(null);

    const handleLoginClick = () => {
        containerRef.current.classList.remove('right-panel-active');
    }

    const handleSignUpClick = () => {
        containerRef.current.classList.add('right-panel-active');
    }

    return (
        <div className="container" ref={containerRef}>
            <SignupForm />
            <LoginForm />
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <div className='logo-top' style={{ textAlign: 'center' }}>
                            <img src={logo} alt="Logo da empresa" style={{ width: '50%', height: 'auto' }} />
                        </div> 
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id='login' onClick={handleLoginClick}>Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id='signUp' onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Login;