import React, { useContext } from "react";
import logo from "../assets/images/logo.png";
import profileimg from "../assets/images/profile-img.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SideBarNav = () => {
  const { userData } = useContext(UserContext)

  return (
    <aside className="dashboard-sidenav">
      <div className="logo">
        <NavLink style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} to={"/"}>
          <img src={logo} alt />
        </NavLink >
      </div>
      <div className="dashboard-profile">
        <div className="profile-img">
          <img src={profileimg} alt />
        </div>
        <div className="profile-name">
          <h4>{userData?.name || 'Phillips'}</h4>
          <p>{userData?.email || 'phillips@dummy.com'}</p>
        </div>
      </div>
      <ul className="dashboard-sidenav-links">
        <li>
          <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-calendar" />
            Calendar
          </NavLink >
        </li>
        <li>
          {/* <a href="/projectlist">
            <i className="fa-solid fa-list" />
            
          </a> */}
          <NavLink to="/projectlist" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
            Project List
          </NavLink >
        </li>
        <li>
          <NavLink to="/clientlist" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
            Client List
          </NavLink >
        </li>
        <li>
          <NavLink to="/salespersonlist" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
            Salespersons List
          </NavLink >
        </li>
        <li>
          <NavLink to="/projectstatuslist" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
            Project Status List
          </NavLink >
        </li>
        <li>
          <NavLink to="/eventform" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
            Event Form
          </NavLink >
        </li>
        <li>
          {/* <NavLink  to="#" style={({isActive})=>({color:isActive?'#214ED':'gray'})} >
          <i className="fa-solid fa-list" />
          Links
        </NavLink > */}
        </li>
        <li>
          <NavLink to="/cabinetdatabaselist" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
            Cabinet Database List
          </NavLink >
        </li>
        <li>
          <NavLink to="/suppliers" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
            Supplier List
          </NavLink >
        </li>
        <li>
          <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} onClick={() => {
            localStorage.clear()
            window.location.replace('/')
            return
          }} >
            <i className="fa-solid fa-user" />
            Logout
          </NavLink >
        </li>
        {/* <li>

          <NavLink to="/estimateinformation" style={({ isActive }) => ({ color: isActive ? '#214ED' : 'gray' })} >
            <i className="fa-solid fa-list" />
           Estimate Information
          </NavLink >
        </li> */}
      </ul>
    </aside>
  );
};

export default SideBarNav;
