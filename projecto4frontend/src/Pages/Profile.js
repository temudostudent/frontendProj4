import React from 'react'
import AuthService from '../Components/Service/AuthService'
import EditProfileForm from '../Components/Forms/EditProfileForm'
import { userStore } from '../Stores/UserStore'
import Header from '../Components/CommonElements/Header'

const Profile = () => {

    const userData = userStore((state) => state.userData);
    const updateUserData = userStore((state) => state.updateUserData);
    const token = userStore((state) => state.token);

    const handleUpdateSuccess = async (inputs) => {

      try {
        const updateResponse = await AuthService.updateUser(token, userData.username, inputs);
    
        if (updateResponse) {

          await AuthService.getUserData(token, userData.username);
          updateUserData({ ...userData, ...inputs });
      
        } else {

          console.log(updateResponse);
         
          console.error("Update unsuccessful:", updateResponse);
        }
      } catch (error) {
        
        console.error("Error updating profile:", error);
      }

    };

    return (
      <div>
          <Header />
          <div className='edit-profile-body'>
            <div className='edit-profile-container'>
                {userData && 
                <EditProfileForm 
                  username={userData.username} 
                  printData={userData}
                  onUpdateSuccess={handleUpdateSuccess} />}
            </div>
          </div>
      </div>

        
    )
}

export default Profile