import React, { useEffect, useState } from 'react'
import AuthService from '../Components/Service/AuthService'
import EditProfileForm from '../Components/Forms/EditProfileForm'
import { userStore } from '../Stores/UserStore'
import Header from '../Components/CommonElements/Header'

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [headerPhoto, setHeaderPhoto] = useState(null);
    const token = userStore((state) => state.token);

    useEffect(() => {
        async function fetchUserData() {
          try {
            const username = await AuthService.getUsername(token);

            const userData = await AuthService.getUserData(token, username);
            setUserData(userData);
            setHeaderPhoto(userData.photoURL);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      
        fetchUserData();
      }, [token, userData]);

      const handleUpdateSuccess = async (updatedUserData) => {
        setUserData(updatedUserData);
        if(updatedUserData.photoURL){
          setHeaderPhoto(updatedUserData.photoURL);
        }
        
    };

    return (
      <div>
          <Header headerPhotoAlt={headerPhoto} />
          <div className='edit-profile-body'>
            <div className='edit-profile-container'>
                {userData && 
                <EditProfileForm 
                  username={userData.username} 
                  token={token} 
                  userData={userData}
                  onUpdateSuccess={handleUpdateSuccess} />}
            </div>
          </div>
      </div>

        
    )
}

export default Profile