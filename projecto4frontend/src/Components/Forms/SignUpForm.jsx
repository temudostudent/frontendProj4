import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpForm({ onSignUpSuccess }) {

    const [inputs, setInputs] = useState({});

    //Inputs
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(inputs);

        try{

        const response = await fetch ('http://localhost:8080/project_backend/rest/users/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            });
                if (response.ok) {
                    toast.success("Thanks for being awesome! Account registered successfully!");

                    onSignUpSuccess();
                    setInputs({});
                }else {
                    const errorData = await response.text();

                    switch (response.status) {
                        case 422:
                            switch (errorData) {
                                case "There's an empty field, fill all values":
                                    toast.error("Please fill all fields");
                                    break;
                                case "Invalid email":
                                    toast.error("The email you used is not valid");
                                    break;
                                case "Invalid phone number":
                                    toast.error("The phone number is not valid");
                                    break;
                                default:
                                    console.error('Unknown error message:', errorData);
                                    toast.error("Something went wrong");
                            }
                            break;
                        case 409: 
                            toast.error("Username already in use");
                            break;
                        default:
                            console.log('Unknown error message:', errorData);
                            toast.error("Something went wrong");
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error("Something went wrong");
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
                    <button type="submit">Sign Up</button>
            </form>
        </div>
        
    )
}

export default SignUpForm;