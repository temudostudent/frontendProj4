import React, { useRef, useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import logo from '../Assets/agileflow-high-resolution-logo-transparent.png'
import './CommonElements.css'
import { userStore } from '../../Stores/UserStore'

const Header = ({ onLogout }) => {
    const token = userStore((state) => state.token);
    const [showAccountDrop, setShowAccountDrop] = useState(false);
    
    const items = [
        { name: "Board", color: "#c8ae7e", href: "/home" },
        { name: "Tasks", color: "#59a4b1", href: "#" },
        { name: "Categories", color: "#2D9596", href: "/categories" },
        { name: "Users", color: "#4d7d99", href: "#" },
    ];

    return (
        <header className="site-header">
            <div class="site-identity">
                <img src={logo} alt="Logo da empresa" />
            </div>  
                <Menu items={items} />
            <div className="profile-container" onMouseEnter={() => setShowAccountDrop(true)}>
                <span>
                    <img />
                </span>
                <a>Username</a>
            </div>
            {showAccountDrop && (
            <div className="accountDrop"  onMouseEnter={() => setShowAccountDrop(true)} onMouseLeave={() => setShowAccountDrop(false)}>
                <a className="view-profile" href="/profile">My Profile</a>
                <a onClick={onLogout}>Logout</a>

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
                <a
                    key={item.name}
                    ref={$items.current[index]}
                    className={`item ${active === index ? "active" : ""}`}
                    onMouseEnter={() => {
                        setActive(index);
                    }}
                    href={item.href}
                    aria-label={item.name} // Add accessibility label
                >
                    {item.name}
                </a>
            ))}
            <div ref={$indicator1} className="indicator" />
            <div ref={$indicator2} className="indicator" />
        </div>
    );
};

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Header;