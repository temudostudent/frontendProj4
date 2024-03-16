import React, { useRef, useState, useEffect } from "react";
import logo from '../Assets/agileflow-high-resolution-logo-transparent.png'
import defaultPhoto from "../Assets/profile_pic_default.png"
import './CommonElements.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { userStore } from '../../Stores/UserStore'
import { useNavigate } from 'react-router-dom'
import AuthService from "../Service/AuthService"
import Menu from './Menu'

const Header = () => {
    const token = userStore((state) => state.token);
    const userData = userStore((state) => state.userData);
    const navigate = useNavigate();
    const [showAccountDrop, setShowAccountDrop] = useState(false);
    const [headerUsername, setHeaderUsername] = useState('');
    const [headerPhoto, setHeaderPhoto] = useState(defaultPhoto);
   

    useEffect(() => {
        userHeaderData();
    }, [token, userData.photoURL])


    const userHeaderData = async() => {
        setHeaderUsername(userData.username);
        setHeaderPhoto(userData.photoURL);
    }

    const handleLogout = async () => {
        try {
            await AuthService.logout(token);
            userStore.getState().resetUserStore();
            navigate('/');
        }catch (error) {
            console.log(error);
        }
    }
    
    const items = [
        {   name: "Board", 
            color: "#c8ae7e", 
            href: "#",
            submenu: [
                { name: "My ScrumBoard", href: "/home" },
                { name: "Complete ScrumBoard", href: "/complete-board" },
            ] },
        {   name: "Tasks", 
            color: "#59a4b1", 
            href: "#", 
            submenu: [
                { name: "Create Task", href: "/create-task" },
                { name: "View Tasks", href: "/view-tasks" },
            ] },
        {   name: "Categories", color: "#2D9596", href: "/categories" },
        {   name: "Users", 
            color: "#4d7d99", 
            href: "#",
            submenu: [
                { name: "Manage Users", href: "/manage-users" },
                { name: "User Settings", href: "/user-settings" },
            ] },
    ];

    return (
        <header className="site-header">
            <ToastContainer position="top-center" />
            <div className="site-identity">
                <img src={logo} alt="Logo da empresa" />
            </div> 
                <Menu items={items} />
            <div className="profile-container" onMouseEnter={() => setShowAccountDrop(true)}>
                <a>{headerUsername}</a> {/*Mostra username*/}
                <span className="photo-container">
                    <img src={headerPhoto} /> {/*Mostra foto de perfil*/}
                </span>
            </div>
            {showAccountDrop && (
            <div className="accountDrop" onMouseLeave={() => setShowAccountDrop(false)}>
                <a href="/profile">My Profile</a>
                <a onClick={handleLogout}>Logout</a>

            </div>
            )}
        </header>
    );
};



export default Header;