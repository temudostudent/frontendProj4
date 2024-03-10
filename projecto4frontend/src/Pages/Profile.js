import React, { useEffect, useState } from 'react'
import AuthService from '../Components/Service/AuthService'
import EditProfileForm from '../Components/Forms/EditProfileForm'
import { userStore } from '../Stores/UserStore'

const Profile = () => {

    const [userData, setUserData] = useState('');
    const token = userStore((state) => state.token);

    useEffect(() => {
        async function fetchUserData() {
          try {
            const username = await AuthService.getUsername(token);

            const data = await AuthService.getUserData(token, username);
            setUserData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      
        fetchUserData();
      }, []);

    return (
        <div>
            {userData && <EditProfileForm userData={userData} />}
        </div>
    )
}

export default Profile