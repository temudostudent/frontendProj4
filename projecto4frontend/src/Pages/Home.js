import React, {useState, useEffect} from 'react'
import ScrumBoard from '../Components/MainScrum/ScrumBoard'
import Modal from '../Components/CommonElements/Modal'
import { userStore } from '../Stores/UserStore'
import { categoryStore } from '../Stores/CategoryStore'

const Home = () => {

    const token = userStore((state) => state.token);
    const categoriesStored = categoryStore(state => state.categoriesStored);
    const updateCategoriesStore = categoryStore((state) => state.updateCategStore);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        updateCategoriesStore(categories);
    }, [categoriesStored]);

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
            <ScrumBoard />
            <Modal title="Add Task" inputs={inputs} buttonText="Submit" />
        </div>
    )
}

export default Home