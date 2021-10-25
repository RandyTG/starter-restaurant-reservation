import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column flex- p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider  my-0" />
        <ul
          className="nav navbar-nav text-light d-sm-flex flex-md-column flex-row justify-content-evenly"
          id="accordionSidebar"
        >
          <li className="nav-item me-2 ">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-home pe-4 ps-3 pe-sm-0" />
              <span className="d-none d-sm-inline-block">&nbsp;Dashboard</span>
            </Link>
          </li>
          <li className="nav-item me-2 ">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass pe-4 ps-3 pe-sm-0" />
              <span className="d-none d-sm-inline-block">&nbsp;Search</span>
            </Link>
          </li>
          <li className="nav-item me-2 ">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus pe-4 ps-3 pe-sm-0" />
              <span className="d-none d-sm-inline-block">
                &nbsp;New Reservation
              </span>
            </Link>
          </li>
          <li className="nav-item me-2 ">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers pe-4 ps-3 pe-sm-0" />
              <span className="d-none d-sm-inline-block">&nbsp;New Table</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
