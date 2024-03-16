import React, { useState , useEffect} from 'react'
import AuthService from '../Components/Service/AuthService'
import ScrumBoard from '../Components/MainScrum/ScrumBoard'
import { userStore } from '../Stores/UserStore'
import { useTaskStore } from '../Stores/TaskStore'
import { useActionsStore } from '../Stores/ActionStore'
import { useCategoryStore } from '../Stores/CategoryStore'
import Sidebar from '../Components/CommonElements/Sidebar'

const Home = () => {

    const token = userStore((state) => state.token);
    const userData = userStore((state) => state.userData);
    const categories = useCategoryStore((state) => state.categories);
    const updateCategories = useCategoryStore((state) => state.updateCategories);
    const { tasks, updateTasks, selectedTask, setSelectedTask} = useTaskStore();
    const { showSidebar, updateShowSidebar, isEditing } = useActionsStore();
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        fetchInitialData();
    }, []);


    const fetchInitialData = async () => {
        try {
            await Promise.all([fetchUserTasks(token), fetchCategories(token)]);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); 
        }
    };

    const fetchUserTasks = async (token) => {
        const userTasks = await AuthService.getAllTasksFromUser(token, userData.username);
        updateTasks(userTasks);
    };

    const fetchCategories = async () => {
        const allCategories = await AuthService.getAllCategories(token);
        updateCategories(allCategories);
    };

    const handleCreateTask = async (taskInput) => {
        try {
            
            const response = await AuthService.newTask(token, userData.username, taskInput);
          
            console.log(response);

            if (response.status === 201) {
                
                const tasksUpdated = await fetchUserTasks(token);
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
        console.log(taskInput);

        try {
            
            const response = await AuthService.editTask(token, selectedTask.id, taskInput);
          
            console.log(response);

            if (response.status === 200) {
                
                const tasksUpdated = await fetchUserTasks(token);
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
                ...categories.map(category => ({ value: category.name, label: category.name, categoryId: category.id}))
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
                            isEditing={isEditing}
                            sidebarActive={showSidebar}
                        />
                    </div>
                </div>
            )}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Home;