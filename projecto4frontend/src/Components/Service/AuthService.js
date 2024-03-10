import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:8080/project_backend/rest/users';

const AuthService = {
    logout: async (token) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/logout`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            if (response.status === 200) {
                sessionStorage.clear();
                toast.success('Logout Success');
            } else {
                toast.warning(response.status)
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    },

    getUserData: async (token , username) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'token': token
                }
            });
            if (response.status === 200) {
       
                return response.data;
      
              } else if (response.status === 401) {
                toast.warning("Invalid credentials")
              } else {
                toast.warning("Invalid username on path")
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }
    },

    getUsername: async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getUsername`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            if (response.status === 200) {
       
                return response.data;
      
              } else if (response.status === 401) {
                  toast.warning("Invalid credentials")
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }
    },

    getPhoto: async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getPhotoUrl`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            if (response.status === 200) {
       
                return response.data;
      
              } else if (response.status === 401) {
                  toast.warning("Invalid credentials")
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }

    },
};

export default AuthService;