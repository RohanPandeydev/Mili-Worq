import React, { useContext } from "react";
import profileimg from '../assets/images/profile-img.png'
import { UserContext } from "../context/UserContext";

const Header = () => {
    const {userData}=useContext(UserContext)
    return (
        <div className="dashboard-header">
            <div className="dashboard-tittle">
                <h3>Hello {userData?.name || 'Phillips'}</h3>
                <p>Here you can arrange your data</p>
            </div>
            <div className="dashboard-haeder-right">
                <form action method>
                    <div className="search">
                        <i className="fa-solid fa-magnifying-glass" />
                        <input type="search" placeholder="Search" className=" form-input" />
                    </div>
                </form>
                <ul className="header-list">
                    <li>
                        <a href="#" className="bell-notify">
                            <i className="fa-solid fa-bell" />
                            <div className="dot" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="profile">
                            <img src={profileimg} alt />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
