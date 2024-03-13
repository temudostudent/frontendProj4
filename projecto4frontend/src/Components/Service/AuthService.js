import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE_URL = 'http://localhost:8080/project_backend/rest/users';

const AuthService = {

/*----------------------
USER
----------------------*/

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

/*----------------------
CATEGORIES
----------------------*/

    getAllCategories: async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`, {
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
              } else if (response.status === 404) {
                toast.warning('Something went wrong. The categories were not found.')
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }
    },

    editCategory: async (token, oldName, newName) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/editCategory/${oldName}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'token': token,
                    'newCategoryName': newName
                }
            });
            if (response.status === 200) {
       
                toast.success("Task edited successfully")
      
              } else if (response.status === 401) {
                toast.warning("Invalid credentials")
              } else if (response.status === 404) {
                toast.warning("Impossible to edit task. Verify all fields")
              }else if (response.status === 409) {
                toast.warning("Category already exists")
              } else {
                toast.warning("Category not created. Something went wrong")
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }
    },

    deleteCategory: async (token, categoryId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/deleteCategory/id/${categoryId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'token': token
                }
            });
            if (response.status === 200) {
       
                toast.success("Category deleted successfully")
      
              } else if (response.status === 400) {
                toast.warning("Category with this name can't be deleted while it has tasks associated")
              } else if (response.status === 403) {
                toast.warning("You don't have permission to delete a category")
              } else if (response.status === 404) {
                toast.warning("Category with this name not found")
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }
    },

    newCategory: async (token, input) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/newCategory`,
            input,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'token': token
                }
            });
            if (response.status === 201) {
       
                toast.success("Task created successfully")
                return response;
      
              } else if (response.status === 403) {
                toast.warning("You don't have permission to create a category")
              } else if (response.status === 404) {
                toast.warning("Impossible to create task. Verify all fields")
              }else if (response.status === 409) {
                toast.warning("Category already exists")
              } else {
                toast.warning("Category not created. Something went wrong")
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }
    },

    getTasksByCategories: async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`, {
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
              } else if (response.status === 404) {
                toast.warning('Something went wrong. The categories were not found.')
              }
        } catch (error) {
            console.error('Error getting username:', error);
        }
    },

};

export default AuthService;