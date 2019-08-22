import React from 'react';
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<div className="asd">
			<nav>
				<Link to="/"><h1>Night Cinema</h1></Link>
				<Link to="/Search"><h1>Search</h1></Link>
			</nav>
		</div>
	)
}

export default Navigation;