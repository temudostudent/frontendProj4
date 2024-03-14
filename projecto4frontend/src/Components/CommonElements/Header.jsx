import React, { useRef, useState, useEffect, createRef } from "react";
import gsap from "gsap";
import logo from '../Assets/agileflow-high-resolution-logo-transparent.png'
import defaultPhoto from "../Assets/profile_pic_default.png"
import './CommonElements.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { userStore } from '../../Stores/UserStore'
import { useNavigate } from 'react-router-dom'
import AuthService from "../Service/AuthService"

const Header = ({headerPhotoAlt}) => {
    const token = userStore((state) => state.token);
    const navigate = useNavigate();
    const [showAccountDrop, setShowAccountDrop] = useState(false);
    const [headerUsername, setHeaderUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [headerPhoto, setHeaderPhoto] = useState(defaultPhoto);
   

    useEffect(() => {

        async function fetchUsername() {
            try {
                const username = await AuthService.getUsername(token);
                setHeaderUsername(username);
            }catch (error) {
                console.error('Error fetching username:', error);
            }
        }
        fetchUsername();

        async function fetchPhoto() {
            try {
                const photoUrl = await AuthService.getPhoto(token);
                if (photoUrl !== '') {
                    setHeaderPhoto(photoUrl);
                }
            }catch (error) {
                console.error('Error fetching username:', error);
            }
        }
        fetchPhoto();

        async function fetchUserData() {
            try {
                const userData = await AuthService.getUserData(token, headerUsername);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
          }
        
          fetchUserData();


    }, [token, userData])

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
        { name: "Board", color: "#c8ae7e", href: "/home" },
        { name: "Tasks", color: "#59a4b1", href: "#" },
        { name: "Categories", color: "#2D9596", href: "/categories" },
        { name: "Users", color: "#4d7d99", href: "#" },
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

const Menu = ({ items }) => {
    const $root = useRef();
    const $indicator1 = useRef();
    const $indicator2 = useRef();
    const $items = useRef(items.map(createRef));
    const [active, setActive] = useState(0);

    const animate = () => {
        const menuOffset = $root.current.getBoundingClientRect();
        const activeItem = $items.current[active].current;
        const { width, height, top, left } = activeItem.getBoundingClientRect();

        const settings = {
            x: left - menuOffset.x,
            y: top - menuOffset.y,
            width: width,
            height: height,
            backgroundColor: items[active].color,
            ease: "elastic.out(.7, .7)",
            duration: 0.8
        };

        gsap.to($indicator1.current, { ...settings });
        gsap.to($indicator2.current, { ...settings, duration: 1 });
    };

    useEffect(() => {
        animate();
        window.addEventListener("resize", animate);

        return () => {
            window.removeEventListener("resize", animate);
        };
    }, [active]);

    return (
        <div ref={$root} className="menu">
            {items.map((item, index) => (
                <div key={item.name} className="menu-item" onMouseEnter={() => setActive(index)}>
                    <a
                        ref={$items.current[index]}
                        className={`item ${active === index ? "active" : ""}`}
                        href={item.href}
                        aria-label={item.name} // Add accessibility label
                    >
                        {item.name}
                    </a>
                </div>
            ))}
            <div ref={$indicator1} className="indicator" />
            <div ref={$indicator2} className="indicator" />
        </div>
    );
};

export default Header;