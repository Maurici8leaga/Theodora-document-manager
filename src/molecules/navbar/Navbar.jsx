import React from "react";
import { useNavigate } from "react-router-dom";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillDoorOpenFill } from "react-icons/bs";

const Navbar = () => {
	const navigate = useNavigate();

	const [deleteStoredUser] = useLocalStorage("token", "delete"); //no vaa

	const logOut = () => {
		deleteStoredUser(); // aplicas el hook para eliminar el token
		navigate("/");
	};

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
