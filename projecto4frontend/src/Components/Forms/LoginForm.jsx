import React, { useState } from "react";
import logo from '../Assets/agileflow-high-resolution-logo-transparent.png'
import { useNavigate } from 'react-router-dom'
import { userStore } from '../../Stores/UserStore'

function LoginForm() {

    const [inputs, setInputs] = useState({});
    const updateToken = userStore((state) => state.updateToken);
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(inputs);

        fetch ('http://localhost:8080/project_backend/rest/users/login',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            }
        ).then(function (response) {
            if (response.ok) {
                return response.text();
            } else if (response.status === 401) {
                alert("Invalid credentials, please try again");
            } else if (!response.ok) {
                alert("Something went wrong")
            }
        }).then(function (data) {
            updateToken(data);

            navigate('/home', {replace: true});
        }).catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Something went wrong :(');
        });
    }
    
    
    return (
        <div className="form-container login-container">
            {/*Fixa o formulário na mesma página*/}
            <form  action="#" onSubmit={handleSubmit}>
                    <div className='logo-top' style={{ textAlign: 'center' }}>
                        <img src={logo} alt="Logo da empresa" style={{ width: '70%', height: 'auto' }} />
                    </div> 
                    <br/>
                    <input 
                        type="text"
                        name="username"
                        defaultValue={inputs.username || ''}   
                        placeholder="Username" 
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        defaultValue={inputs.password || ''} 
                        placeholder="Password" 
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm