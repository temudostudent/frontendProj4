import React, { useEffect, useState } from 'react'

const EditProfileForm = ({userData}) => {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
      if (userData) {
        setInputs(userData);
      }
    }, [userData]);
  
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
          placeholder={userData.firstName || ''} 
          onChange={handleChange}
        />
        <br />
  
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"  
          placeholder={userData.lastName || ''}
          onChange={handleChange}
        />
        <br />
  
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"   
          placeholder={userData.email || ''}
          onChange={handleChange}
        />
        <br />
  
        <label htmlFor="photoUrl">Photo URL:</label>
        <input
          type="url"
          name="photoUrl" 
          placeholder={userData.photoUrl || ''}  
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