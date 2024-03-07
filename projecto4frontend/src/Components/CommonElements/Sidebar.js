import React from "react"
import { slide as Menu } from 'react-burger-menu'
import './CommonElements.css'

export default props => {
    return (
        <Menu>
            <a className="menu-item" >Add Task</a>
            <a className="menu-item" >All Users</a>
            <a className="menu-item" >Categories</a>
        </Menu>
    )
};