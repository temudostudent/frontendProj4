import React, {useEffect, useState } from "react";
import { userStore } from '../Stores/UserStore'
import { useUsersListStore } from '../Stores/UsersDataStore'
import EnhancedTable from '../Components/CommonElements/Table'
import AuthService from '../Components/Service/AuthService'

const Users = () => {

    const { token } = userStore(); 
    const { usersListData, updateUsersListData } = useUsersListStore();
    const [loading, setLoading] = useState(true);
    const [selected , setSelected] = useState([]);

    const handleUsersSelectionChange = (selectedUsersIds) => {
        setSelected(selectedUsersIds);
      };


    const headCells = [
        {
          id: 'username',
          numeric: false,
          disablePadding: true,
          label: 'Username',
        },
        {
            id: 'firstName',
            numeric: false,
            disablePadding: true,
            label: 'First Name',
        },
        {
            id: 'lastName',
            numeric: false,
            disablePadding: true,
            label: 'Last Name',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'Email',
        },
        {
            id: 'typeOfUser',
            numeric: false,
            disablePadding: true,
            label: 'Type Of User',
        },
        {
          id: 'number_tasks_user',
          numeric: true,
          disablePadding: false,
          label: '# Tasks',
        }
      ];

    const filterData = [
        {
            id: 'all',
            numeric: false,
            label: 'All Users',
        },
        {
            id: 300,
            numeric: false,
            label: 'Product Owner',
        },
        {
            id: 200,
            numeric: false,
            label: 'Scrum Master',
        },
        {
            id: 100,
            numeric: false,
            label: 'Developer',
        },
        {
            id: 'active',
            numeric: false,
            label: 'Active',
        },
        {
            id: 'inactive',
            numeric: false,
            label: 'Inactive',
        },
    ];


    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers({});
            console.log(usersListData);
        };
    
        fetchData();
    }, []);
    
      const fetchUsers = async ({type, visible}) => {
        try {

            let usersList;

            if (type !== undefined) {
                usersList = await AuthService.getUsersByType(token, type);
            }else if (visible !== undefined) {
                usersList = await AuthService.getUsersByVisibility (token, visible);
            }else{
                usersList = await AuthService.getAllUsersData(token);
            }

            if (usersList !== undefined) {
                
                //Verificar número de tarefas de cada um
                const usersFormatted = await Promise.all(
                    usersList.map(async (user) => {
                        const tasks = await AuthService.getAllTasksFromUser(token, user.username);

                        const typeOfUserFormatted = formatTypeOfUser(user);

                        return { ...user, id:user.username, number_tasks_user: tasks.length, typeOfUser: typeOfUserFormatted};
                    })
                );
                
                await updateUsersListData(usersFormatted);

            } else {
                console.error('Error: Users data is undefined');
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

      const formatTypeOfUser = (userData) => {
        if (userData.typeOfUser === 100) {
            return 'Developer';
        } else if (userData.typeOfUser === 200) {
            return 'Scrum Master';
        } else if (userData.typeOfUser === 300) {
            return 'Product Owner';
        }
      };

      const handleUsersVisibility = async () => {
        try {
          await Promise.all(
            selected.map(async (username) => {
              await AuthService.updateVisibility(token, username);
            })
          );
      
          await fetchUsers({});

            } catch (error) {
            console.error('Error deleting categories:', error);
            }
      };

      const handleUsersDeleteAllTasks = async () => {
        try {
          await Promise.all(
            selected.map(async (username) => {
              await AuthService.eraseAllTasksFromUser(token, username);
            })
          );
      
          await fetchUsers({});

            } catch (error) {
            console.error('Error deleting categories:', error);
            }
      };



      const handleFilterList = async (id) => {

        if (id ==='all'){ await fetchUsers({});

        } else if(id==='active') {  await fetchUsers({visible: true});

        } else if(id==='inactive') { await fetchUsers({visible: false});

        }  else { await fetchUsers({type: id});

        }
      };

    return (
        <div className="users-container">
            <div className="table-container">
            {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <EnhancedTable 
                            dataType="Users"
                            headCells={headCells}
                            data={usersListData}
                            filterData={filterData}
                            handleFilter={handleFilterList}
                            onSelectionChange={handleUsersSelectionChange}
                            onDeleteSelected={handleUsersDeleteAllTasks}
                            onChangeVisibilitySelect={handleUsersVisibility}
                            />
                    </>
                )}
            </div>
        </div>
    );

}

export default Users;