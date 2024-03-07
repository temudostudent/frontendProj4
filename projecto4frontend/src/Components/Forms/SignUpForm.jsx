import React, { useState } from "react"


function SignUpForm({ onSignUpSuccess }) {

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}))
        setErrors(errors => ({...errors, [name]: ''}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(inputs);

        fetch ('http://localhost:8080/project_backend/rest/users/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
            .then(function (response) {
                if (response.ok) {
                    alert("Thanks for being awesome! Account registered successfully!");

                    onSignUpSuccess();
                    setInputs({});
                }else {
                    if (response.status === 422) {
                        response.json().then(function (data) {
                            const newErrors = {};

                            if (data.message) {
                                newErrors.message = data.message;
                            }

                            if (data.errors) {
                                for (const key in data.errors) {
                                    newErrors[key] = data.errors[key][0];
                                }
                            }
                            setErrors(newErrors);
                        });
                    } else {
                        console.error('Unknown response status:', response.status);
                        alert("Something went wrong");
                    }
                }
            });
    };

    return (

        <div className="form-container sign-up-container">
            <form  action="#" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <br />
                    <input type="text" name="username" value={inputs.username || ''} placeholder="Username" onChange={handleChange} required/>
                    {errors.username && <p>{errors.username}</p>}
			        <input type="text" name="firstName" value={inputs.firstName || ''} placeholder="First Name" onChange={handleChange} required/>
			        <input type="text" name="lastName" value={inputs.lastName || ''} placeholder="Last Name" onChange={handleChange} required/>
			        <input type="email" name="email" value={inputs.email || ''} placeholder="Email" onChange={handleChange} required/>
                    {errors.email && <p>{errors.email}</p>}
                    <input type="text" name="phone" value={inputs.phone || ''} placeholder="Contact" onChange={handleChange} required/>
                    {errors.phone && <p>{errors.phone}</p>}
                    <input type="password" name="password" value={inputs.password || ''} placeholder="Password" onChange={handleChange} required/>
                    {errors.password && <p>{errors.password}</p>}
                    <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;