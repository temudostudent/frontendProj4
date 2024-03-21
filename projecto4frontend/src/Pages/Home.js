import React, { useState , useEffect, useCallback} from 'react'
import { useLocation } from 'react-router-dom';
import AuthService from '../Components/Service/AuthService'
import ScrumBoard from '../Components/MainScrum/ScrumBoard'
import { userStore } from '../Stores/UserStore'
import { useTaskStore } from '../Stores/TaskStore'
import { useActionsStore } from '../Stores/ActionStore'
import { useCategoryStore } from '../Stores/CategoryStore'
import { IoMdArrowDropdown } from "react-icons/io";
import Sidebar from '../Components/CommonElements/Sidebar'

const Home = () => {

    const location = useLocation();
    const { pathname } = location;

    const token = userStore((state) => state.token);
    const userData = userStore((state) => state.userData);
    const { categories, updateCategories} = useCategoryStore();
    const { tasks, updateTasks, selectedTask, setSelectedTask} = useTaskStore();
    const { showSidebar, updateShowSidebar, isEditing } = useActionsStore();
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('All');


    useEffect(() => {
        fetchInitialData();
    }, []);

    
    const fetchInitialData = async () => {
        console.log('Fetching initial data');
        try {
            await Promise.all([fetchTasks(token), fetchCategories(token)]);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); 
        }
    };

    const fetchTasks = async (categoryName , erasedStatus) => {

        console.log('Fetching tasks');
        let userTasks;
        
        try {
            if (pathname === '/alltasks') {
                if (categoryName) {
                    userTasks = await AuthService.getAllTasksByCategory(categoryName);
                } else if (erasedStatus) {
                    userTasks = await AuthService.getAllTasksByErasedStatus(erasedStatus);
                } else {
                    userTasks = await AuthService.getAllTasks(token);
                }
            } else {
                userTasks = await AuthService.getAllTasksFromUser(token, userData.username);
            }
    
            updateTasks(userTasks);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };


    const fetchCategories = async () => {
        const allCategories = await AuthService.getAllCategories(token);
        updateCategories(allCategories);
    };

    const handleCreateTask = async (taskInput) => {
        console.log('newtask');


        try {
            
            const response = await AuthService.newTask(token, userData.username, taskInput);
          
            console.log(response);

            if (response.status === 201) {
                
                const tasksUpdated = await fetchTasks(token);
                updateTasks(tasksUpdated);
            } else {
                console.error('Error creating task:', response.error);
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleEditTask = async (taskInput) => {
        console.log(selectedTask);
        console.log('taskInput');

        try {
            
            const response = await AuthService.editTask(token, selectedTask.id, taskInput);
          
            console.log(response);

            if (response.status === 200) {
                
                const tasksUpdated = await fetchTasks(token);
                updateTasks(tasksUpdated);
                updateShowSidebar(true);
                setSelectedTask(null);
            } else {
                console.error('Error creating task:', response.error);
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };
    

    const inputs = [
        { 
            type: 'select', 
            name: 'category', 
            required: true,
            options: [
                { value: '', label: 'Category', disabled: true, categoryId: null},
                ...(categories ? categories.map(category => ({ value: category.name, label: category.name, categoryId: category.id})) : [])
              ]
        },
        { type: 'text', name: 'title', placeholder: 'Title', required: true },
        { type: 'textarea', name: 'description', placeholder: 'Description', required: true },
        { 
            type: 'select', 
            name: 'priority', 
            required: true,
            options: [
            { value: '', label: 'Priority', disabled: true},
            { value: 300, label: 'High' },
            { value: 200, label: 'Medium' },
            { value: 100, label: 'Low' }
            ]
        },
        { type: 'date', label: 'Start', name: 'startDate', required: true },
        { type: 'date', label: 'End', name: 'limitDate' },
        
    ];

    const handleFilterChange = async (event) => {
        const selectedValue = event.target.value;

        console.log('aqui');
    
        switch (selectedValue) {
            case 'All':
                fetchTasks();
                break;
            case 'Active':
                fetchTasks({erasedStatus : false});          
                break;
            case 'Erased':
                fetchTasks({erasedStatus : true});
                break;
            default:
                fetchTasks({categoryName : 'selectedValue'});
                break;
        }
    }


    const renderSelect = ({ name }) => {
        return (
          <select name={name} onChange={handleFilterChange} value={selectedFilter}>
            <option disabled>{name}</option>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Erased">Erased</option>
            <option value="" disabled>Categories <IoMdArrowDropdown /> </option>
            {categories.map((category, index) => (
              <option key={index} value={category.name} data-category-id={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        );
      }


    return (
        <div className='Home'>
            {!loading && (
                <div className={`container-home ${showSidebar ? 'sidebar-active' : 'sidebar-inactive'}`}>
                    <div className="sidebar-container">
                    <Sidebar
                        collapsedWidth={showSidebar ? '100%' : '0'}
                        formTitle={isEditing ? 'Edit Task' : 'Add Task'} 
                        inputs={inputs}
                        formSubmitTitle={isEditing ? 'Save Changes' : 'Submit'}
                        onSubmit={isEditing ? handleEditTask : handleCreateTask}
                    />
                    </div>
                     <div className={`scrum-board-container ${showSidebar ? 'scrum-board-expanded' : ''}`}>
                        <ScrumBoard
                            token={token}
                            userData={userData}
                            taskData={tasks}
                        />
                    </div>
                    <div className='select-filter-container'>
                        {renderSelect({ name: 'Filters' })}
                    </div>
                </div>
            )}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Home;