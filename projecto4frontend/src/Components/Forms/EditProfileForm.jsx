import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import AuthService from '../Service/AuthService'
import { userStore } from '../../Stores/UserStore'


import '../../App.css'

Modal.setAppElement('#root');

const EditProfileForm = ({username, userData, onUpdateSuccess}) => {
    const [inputs, setInputs] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const token = userStore((state) => state.token);
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
      event.preventDefault(); 
      onUpdateSuccess(inputs, username);
      setInputs({}); 
      event.target.reset();
    };


    const handleSubmitModal = async (event) => {
      event.preventDefault();

      const { profile_oldPassword, profile_newPassword, profile_confirmPassword } = inputs;

        if (profile_newPassword !== profile_confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

      try{  
        const response = await fetch(`http://localhost:8080/project_backend/rest/users/update/${userData.username}/password`, 
          {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': '*/*',
                  'token': token,
                  'oldpassword': inputs.profile_oldPassword,
                  'newpassword': inputs.profile_newPassword,
              },
          });

          if (response.status === 200) {
              toast.success(response.statusText);
              setModalIsOpen(false);
              setInputs({});
              event.target.reset();
          } else if (response.status === 401) {
              toast.warning(response.statusText); 
          } else {
              toast.error(response.statusText);
          }
      } catch (error) {
          console.error('Error updating password:', error);
          toast.error('Error updating password. Please try again later.');
      }
      };

    return (
      <div>
        <form onSubmit={handleSubmit}>
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

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone" 
            
            placeholder={userData.phone || ''}
            onChange={handleChange}
          />
          <br />
    
          <label htmlFor="photoUrl">Photo URL:</label>
          <input
            type="url"
            name="photoURL" 
            
            placeholder={userData.photoURL || ''}  
            onChange={handleChange}
          />
          <br />
          <div className="editProfile-buttons-container">
              <button type="button" onClick={() => setModalIsOpen(true)}>Change Password</button>
              <button type="submit">Submit</button>
          </div>
      </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Change Password Modal"
                className='react-modal'
            >
                <h2>Change Password</h2>
                <form id="changePasswordForm" onSubmit={handleSubmitModal}>
                    <input type="password" name="profile_oldPassword" placeholder="Current Password:" required onChange={handleChange} />
                    <input type="password" name="profile_newPassword" placeholder="New Password" required onChange={handleChange} />
                    <input type="password" name="profile_confirmPassword" placeholder="Confirm New Password" required onChange={handleChange} />
                    <button type="submit">Save</button>
                </form>
                <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
            </Modal>
      </div>
      
    );
  };

  export default EditProfileForm;