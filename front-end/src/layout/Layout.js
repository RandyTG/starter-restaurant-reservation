import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col vh-100 content">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
