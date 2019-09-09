import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigations">
        <Link to="/">
          <h2>Menu</h2>
        </Link>
      </div>
      <div className="navigations">
        <Link to="/Search">
          <h2>Search</h2>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
