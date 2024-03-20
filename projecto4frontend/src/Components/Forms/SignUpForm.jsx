import React, { useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../Service/AuthService"

function SignUpForm({ onSignUpSuccess }) {

    const [inputs, setInputs] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });

    console.log(inputs);

    //Inputs
    const handleChange = (event) => { 
        const { name, value } = event.target;
        setInputs({...inputs, [name]: value});
    }

    const inputsFormatted = () => {
        return { ...inputs, photoURL: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' };
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(inputsFormatted());

        try {
            const response = await AuthService.register(inputsFormatted());
    
            console.log(response);
    
            if (response.status === 201) {
                onSignUpSuccess();
                setInputs({});
            } else {
                console.error("Failed to register. Response:", response);
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
        }
    };

    return (

        <div className="form-container sign-up-container">
            <form  action="#" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <br />
                    <input type="text" name="username" value={inputs.username || ''} placeholder="Username" onChange={handleChange} required/>
			        <input type="text" name="firstName" value={inputs.firstName || ''} placeholder="First Name" onChange={handleChange} required/>
			        <input type="text" name="lastName" value={inputs.lastName || ''} placeholder="Last Name" onChange={handleChange} required/>
			        <input type="email" name="email" value={inputs.email || ''} placeholder="Email" onChange={handleChange} required/>
                    <input type="text" name="phone" value={inputs.phone || ''} placeholder="Contact" onChange={handleChange} required/>
                    <input type="password" name="password" value={inputs.password || ''} placeholder="Password" onChange={handleChange} required/>
                    <input type="url" name="photoURL" value={inputs.photoURL || ''} placeholder="Profile Photo" onChange={handleChange}/>
                    <button type="submit">Sign Up</button>
            </form>
        </div>
        
    )
}

export default SignUpForm;