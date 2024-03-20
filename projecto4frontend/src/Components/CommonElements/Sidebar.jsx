import React , { useState, useEffect }  from 'react'
import { Button, Layout } from 'antd'
import FormTask from '../Forms/FormTask'
import EditProfileForm from '../Forms/EditProfileForm'
import { useActionsStore } from '../../Stores/ActionStore'
import { IoClose } from "react-icons/io5";
import { useTaskStore } from '../../Stores/TaskStore'
import { useUsersListStore } from '../../Stores/UsersDataStore'
import './Sidebar.css'
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;

function Sidebar({ formTitle, inputs, formSubmitTitle, onSubmit}) {

    const updateShowSidebar = useActionsStore((state) => state.updateShowSidebar);
    const showSidebar = useActionsStore((state) => state.showSidebar);
    const { selectedTask } = useTaskStore();
    const { selectedUser } = useUsersListStore();
    const [initialValues, setInitialValues] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Verifica se selectedTask mudou
        if (selectedTask !== initialValues) {
            setInitialValues(selectedTask);
        }
    }, [selectedTask]);
    
    useEffect(() => {
        // Verifica se selectedUser mudou
        if (selectedUser !== initialValues) {
            setInitialValues(selectedUser);
        }
    }, [selectedUser]);


    function renderComponent() {
        if (location.pathname === '/home') {
            return (
                <FormTask 
                    title={formTitle} 
                    inputs={inputs} 
                    buttonText={formSubmitTitle}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                />
            );
        } else if (location.pathname === '/users') {
            return initialValues ? (
                <EditProfileForm 
                    username={initialValues.username}
                    userData={initialValues}
                    onSubmit={onSubmit}
                />
            ) : null;
        } else {
            return null;
        }
    }

      
    return (
        <Layout className='sidebar-container'>
            <Sider 
                width={300}
                style={{ height: '80vh', backgroundColor: '#f6f5f7'}}
                collapsed={showSidebar}
                collapsedWidth={0}
                collapsible
                trigger={null}
                className='sidebar'>
                <Button onClick={()=>updateShowSidebar(!showSidebar)} className="close-button">
                    <IoClose />
                </Button>
                {renderComponent()}
            </Sider>
        </Layout>
    );
}

export default Sidebar;