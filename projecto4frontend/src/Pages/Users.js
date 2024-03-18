import React, {useEffect, useState} from "react";
import { userStore, useUsersListStore } from '../Stores/UserStore'
import EnhancedTable from '../Components/CommonElements/Table'
import AuthService from '../Components/Service/AuthService'

const Users = () => {

    const { token } = userStore(); 
    const { usersListData, updateUsersListData } = useUsersListStore(); 
    const [loading, setLoading] = useState(true);
    const [selected , setSelected] = useState([]);

    const handleUsersSelectionChange = (selectedUsersIds) => {
        console.log(selectedUsersIds);
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
          id: 'number_tasks',
          numeric: true,
          disablePadding: false,
          label: '# Tasks',
        }
      ];

      const filterData = [
        {
            id: 'product owner',
            numeric: false,
            label: 'Product Owner',
          },
          {
              id: 'scrum master',
              numeric: false,
              label: 'Scrum Master',
          },
          {
              id: 'developer',
              numeric: false,
              label: 'Developer',
          },
          {
              id: 'active',
              numeric: false,
              label: 'Active',
              onClick: () => fetchUsersByVisibility(true),
          },
          {
              id: 'inactive',
              numeric: false,
              label: 'Inactive',
              onClick: () => fetchUsersByVisibility(false),
          },
      ];


      useEffect(() => {
        fetchUsers();
      }, []);

    
      const fetchUsers = async () => {
        try {
            
            let usersList = await AuthService.getAllUsersData(token);

            if (usersList !== undefined) {
                
                //Verificar número de tarefas de cada um
                const usersFormatted = await Promise.all(
                    usersList.map(async (user) => {
                        const tasks = await AuthService.getAllTasksFromUser(token, user.username);

                        const typeOfUserFormatted = formatTypeOfUser(user);

                        return { ...user, number_tasks: tasks.length, typeOfUser: typeOfUserFormatted};
                    })
                );
                
                updateUsersListData(usersFormatted);

                console.log(usersListData);
            } else {
                console.error('Error: Categories data is undefined');
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

      const fetchUsersByVisibility = async (visible) => {
        try {
                let usersList = await AuthService.getUsersByVisibility(token, visible);

                if (usersList !== undefined) {
                        
                    const usersFormatted = await Promise.all(
                        usersList.map(async (user) => {
                            const tasks = await AuthService.getAllTasksFromUser(token, user.username);

                            const typeOfUserFormatted = formatTypeOfUser(user);

                            return { ...user, number_tasks: tasks.length, typeOfUser: typeOfUserFormatted};
                        })
                    );
                    
                    updateUsersListData(usersFormatted);

                    console.log(usersListData);
                } else {
                    console.error('Error: Categories data is undefined');
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

      const handleInactiveSelectedUsers = async () => {
        try {
          await Promise.all(
            selected.map(async (username) => {
              await AuthService.deleteCategory(token, username);
            })
          );
      
          await fetchUsers();

            } catch (error) {
            console.error('Error deleting categories:', error);
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
                            headCells={headCells}
                            data={usersListData}
                            filterData={filterData}
                            onSelectionChange={handleUsersSelectionChange}
                            onDeleteSelected={handleInactiveSelectedUsers}
                            />
                    </>
                )}
            </div>
        </div>
    );

}

export default Users;