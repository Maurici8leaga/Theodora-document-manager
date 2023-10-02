import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import "../auth/Login.css";

const Login = () => {
	const navigate = useNavigate();

	// states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [setStoredUser] = useLocalStorage("token", "set");

	const loginUser = (event) => {
		event.preventDefault();
		setStoredUser(email);
		setEmail("");
		setPassword("");
		navigate("/document-manager");
	};

	return (
		<div className="bg-login">
			<div className="container-md">
				<div className="text-center pt-15">
					<div className="form-container  pt-5">
						<h1 className="h1 mt-2">THEODORA</h1>

						<p className="p">Enter your credentials</p>

						<form
							className="container d-flex flex flex-column pt-3"
							onSubmit={loginUser}
						>
							<div className="mb-3">
								<input
									id="email"
									name="email"
									type="email"
									value={email}
									className="form-control"
									placeholder="Email address"
									onChange={(event) => setEmail(event.target.value)}
									required
								/>
							</div>
							<div className="mb-3">
								<input
									id="password"
									name="password"
									type="password"
									value={password}
									className="form-control"
									placeholder="Password"
									onChange={(event) => setPassword(event.target.value)}
									required
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
