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
            console.error('Error:', error);
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
            console.error('Error:', error);
        }

    },

    updateUser: async (token, username, updatedData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/update/${username}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'token': token
                }
            });
            if (response.status === 200) {

                toast.success("Profile updated successfully");
       
                return response;
      
            } else if (response.status === 401) {
                toast.warning("Invalid credentials")
            } else if (response.status === 422) {
              toast.warning(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
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
            console.error('Error:', error);
        }
    },

    editCategory: async (token, oldName, newName) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/editCategory/${oldName}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'token': token,
                    'newCategoryName': newName
                }
            });
            if (response.status === 200) {
       
                toast.success("Task edited successfully")
                return response;
      
              } else if (response.status === 401) {
                toast.warning("Invalid credentials")
              } else if (response.status === 404) {
                toast.warning("Impossible to edit task. Verify all fields")
              }else if (response.status === 403) {
                toast.warning("You don't have permission to edit a category")
              } else {
                toast.warning("Category not created. Something went wrong")
              }
        } catch (error) {
            console.error('Error:', error);
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
            console.error('Error:', error);
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
            console.error('Error:', error);
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
            console.error('Error:', error);
        }
    },

/*----------------------
TASKS
----------------------*/

getAllTasks: async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
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
          }
    } catch (error) {
        console.error('Error:', error);
    }
},

getAllTasksFromUser: async (token, username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${username}/tasks`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'token': token,
                'username': username
            }
        });
        if (response.status === 200) {
   
            return response.data;
  
          } else if (response.status === 401) {
            toast.warning("Invalid credentials")
          } else if (response.status === 406) {
            toast.warning("Unauthorized access")
          }
    } catch (error) {
        console.error('Error:', error);
    }
},

newTask: async (token, username, task) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${username}/addTask`, null, {
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
            toast.warning("Impossible to create task. Verify all fields")
          }
    } catch (error) {
        console.error('Error:', error);
    }
},

updateTaskStatus: async (token, taskId, newStateId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}/${newStateId}`, null, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'token': token
            }
        });
        if (response.status === 200) {

            toast.success('Task status updated')
  
          } else if (response.status === 401) {
            toast.warning("Invalid credentials")
          } else if (response.status === 404) {
            toast.warning("Impossible to update task status. Task not found or invalid status")
          }
    } catch (error) {
        console.error('Error:', error);
    }
},


};

export default AuthService;