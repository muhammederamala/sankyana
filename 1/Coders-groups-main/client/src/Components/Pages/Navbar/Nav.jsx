// this componets show a navbar valong with drop down actions
import React, { useState, useEffect, useRef } from "react";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedOutUser } from "../../Redux/Reducers/Loginreducers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [admins, Setadmins] = useState([]); // for storing all the admins here
  const adminroles = useSelector((state) => state.rootReducers.userLogin); // gettig the roles of admin from the redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false); // handle the local state of the componetns
  const dropdownRef = useRef(null); // for the reference to maipulate the dfom directs
  // to handle side effect of react applicatio i used useeffect hooks
  // getting
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    // adding event listeners for automatic open or close the drop down onc clicked
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // this function will remove the user from the redux as well as the local storage and navigate to the home page
  const handleLogout = () => {
    localStorage.removeItem("role"); // remove the role from local storage
    dispatch(loggedOutUser("")); // also dispatched empy action which wll remove currnet role from redux
    navigate("/");
    setDropdownOpen(false); // Close the dropdown after logout
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            Contact
          </Link>
        </li>
        {adminroles && adminroles === "master" ? (
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Add Admin
            </Link>
          </li>
        ) : (
          ""
        )}
        {adminroles && adminroles === "master" ? (
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin/alladmins" className="nav-link">
              Show Admins
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>

      {/* Right navbar links */}
      <div className="dropdown" ref={dropdownRef}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-expanded={isDropdownOpen}
          onClick={handleDropdownToggle}
        >
          {adminroles ? `${adminroles}` : "User"}
        </button>
        <ul className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
          <button
            type="button"
            onClick={handleLogout}
            className="dropdown-item"
          >
            Logout
          </button>
        </ul>
      </div>

      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="navbar-search"
            href="#"
            role="button"
          >
            <i className="fas fa-search"></i>
          </a>
        </li>

        {/* Control Sidebar */}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="control-sidebar"
            data-controlsidebar-slide="true"
            href="#"
            role="button"
          >
            <i className="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
