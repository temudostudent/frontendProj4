import React, { useState , useEffect} from 'react'
import AuthService from '../Components/Service/AuthService'
import ScrumBoard from '../Components/MainScrum/ScrumBoard'
import Modal from '../Components/CommonElements/Modal'
import { userStore } from '../Stores/UserStore'
import { useTaskStore } from '../Stores/TaskStore'
import { useCategoryStore } from '../Stores/CategoryStore'

const Home = () => {

    const token = userStore((state) => state.token);
    const userData = userStore((state) => state.userData);
    const taskData = useTaskStore((state) => state.tasks);
    const categories = useCategoryStore((state) => state.categories);
    const updateCategories = useCategoryStore((state) => state.updateCategories);
    const updateUserTasks = useTaskStore((state) => state.updateTasks);
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
        updateUserTasks(userTasks);
    };

    const fetchCategories = async () => {
        const allCategories = await AuthService.getAllCategories(token);
        updateCategories(allCategories);
    };

    

    const inputs = [
        { type: 'text', name: 'title', placeholder: 'Title', required: true },
        { type: 'textarea', name: 'description', placeholder: 'Description' },
        { 
            type: 'select', 
            name: 'priority', 
            required: true,
            options: [
            {value: '', label: 'Priority', disabled: true},
            { value: 300, label: 'High' },
            { value: 200, label: 'Medium' },
            { value: 100, label: 'Low' }
            ]
        },
        { type: 'date', name: 'startDate', required: true },
        { type: 'date', name: 'lastDate' },
        { 
            type: 'select', 
            name: 'category', 
            required: true,
            options: categories.map(category => ({ value: category.name, label: category.name}))
        }
    ];


    return (
        <div className='Home'>
             {!loading && (
                <>
                    <ScrumBoard 
                        token={token} 
                        userData={userData} 
                        taskData={taskData}
                    />
                    <Modal title="Add Task" inputs={inputs} buttonText="Submit" />
                </>
            )}
            {loading && <div>Loading...</div>}
        </div>
    )
}

export default Home