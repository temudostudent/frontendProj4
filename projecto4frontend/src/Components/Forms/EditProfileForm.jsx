import React, { useState } from 'react'

const EditProfileForm = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value}))
    }
  
    return (
      <form>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={inputs.firstName || ''}   
          placeholder="" 
          onChange={handleChange}
        />
        <br />
  
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={inputs.lastName || ''}   
          placeholder=""
          onChange={handleChange}
        />
        <br />
  
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={inputs.email || ''}   
          placeholder=""
          onChange={handleChange}
        />
        <br />
  
        <label htmlFor="photoUrl">Photo URL:</label>
        <input
          type="url"
          name="photoUrl"
          value={inputs.photoUrl || ''}   
          placeholder=""
          onChange={handleChange}
        />
        <br />
        <div class="editProfile-Buttons">
            <button type="button" id="profile-changePass-button">Change Password</button>
            <button type="submit">Submit</button>
        </div>
      </form>
    );
  };

  export default EditProfileForm;