import { useState}  from 'react'
import { Button, Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import FormTask from './FormTask'
import './Sidebar.css'

const { Sider } = Layout;

function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);

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
        /*{ 
            type: 'select', 
            name: 'category', 
            required: true,
            options: categories.map(category => ({ value: category.name, label: category.name}))
        }*/
    ];

    


    return (
        <Layout>
            <Sider collapsed={collapsed}
                collapsedWidth={0}
                collapsible
                trigger={null}
                className='sidebar'>
                <FormTask title="Add Task" inputs={inputs} buttonText="Submit" />
            </Sider>
            <Layout>
                <Button type='text' 
                        onClick={() => setCollapsed(!collapsed)}
                        icon={collapsed ?  <MenuUnfoldOutlined /> : 
                        <MenuFoldOutlined /> }
                />
            </Layout>
        </Layout>
    );
}

export default Sidebar;