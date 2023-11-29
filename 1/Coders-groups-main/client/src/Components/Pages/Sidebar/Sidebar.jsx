import React from "react";
import AdminLTELogo from "../../assest/img/AdminLTELogo.png";
import User from "../../assest/img/user2-160x160.jpg";

// Sidebar.js

const MainSidebar = ({ roleNames }) => {
  const getCustomRoleName = () => {
    if (
      roleNames &&
      roleNames["auth_user"] &&
      roleNames["auth_user"]["role_as"]
    ) {
      const role = roleNames["auth_user"]["role_as"];
      // Check if there's a custom name for the role
      if (roleNames[role]) {
        return roleNames[role];
      } else {
        // Default to the role name if no custom name is defined
        return role;
      }
    }
    return "User"; // Default name if the role is not set
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src={AdminLTELogo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">Sankhyana</span>
      </a>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={User}
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {getCustomRoleName()}
            </a>
          </div>
        </div>

        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Dashboard */}
            <li className="nav-item menu-open">
              <a href="../admin/index.php" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link active">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Category</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="../admin/index.php" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>View category</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* Setting */}
            <li className="nav-header">Setting</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-user text-danger"></i>
                <p className="text">Admin Profile</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="registered.php" className="nav-link">
                <i className="nav-icon far fa-user text-warning"></i>
                <p>Registered Users</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="user_table.php" className="nav-link">
                <i className="nav-icon far fa-circle text-info"></i>
                <p>Register All Users</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MainSidebar;
