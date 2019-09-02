import React from 'react';
import { Link } from "react-router-dom";
const Navigation = () => {
	return (
		<div className="navigation">
			<Link className="title"      to="/">      <h2>Menu</h2>  </Link>
			<Link className="nav-search" to="/Search"><h2>Search</h2></Link>
		</div>
	)
}

export default Navigation;