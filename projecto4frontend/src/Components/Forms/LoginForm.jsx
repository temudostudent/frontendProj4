import React from "react";
import { useState } from 'react';
import '../../App.css'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate('/home', {replace: true});
    }
    
    return (
        <div className="form-container login-container">
            {/*Fixa o formulário na mesma página*/}
            <form  action="#" onSubmit={handleSubmit}>
                <h1>Login</h1>
                    <input 
                        type="text" 
                        defaultValue={inputs.username || ''}   
                        placeholder="Username" 
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        defaultValue={inputs.password || ''} 
                        placeholder="Password" 
                        onChange={handleChange}
                    />

                    <button type="submit">Login</button>
            </form>
        </div>
    )

}

export default LoginForm