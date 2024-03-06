import React from "react"
import { useState } from 'react'
import '../../App.css'

function SignUpForm() {

    return (

        <div className="form-container sign-up-container">
            <form  action="#">
                <h1>Create Account</h1>
                    <input type="text" placeholder="Username" />
			        <input type="text" placeholder="First Name" />
			        <input type="text" placeholder="Last Name" />
			        <input type="email" placeholder="Email" />
			        <input type="password" placeholder="Password" />
                    <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;