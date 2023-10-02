import React from "react";
import { BsFillDoorOpenFill } from "react-icons/bs";

const Navbar = (prop) => {
	const { logOut } = prop;

	return (
		<nav className="navbar sticky-top bg-navbar">
			<div className="container-fluid justify-content space-between">
				<a className="navbar-brand text-white" href="/document-manager">
					THEODORA
				</a>

				<button
					type="button"
					className="btn btn-light d-flex align-items-center"
					onClick={() => logOut()}
				>
					Log out
					<BsFillDoorOpenFill />
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
