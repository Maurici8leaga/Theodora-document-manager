import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
	userNotAuthorized,
	fieldEmpty,
} from "../../services/utils/static.data";
import "../auth/Login.css";

const Login = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [setStoredUser] = useLocalStorage("token", "set");
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const loginUser = (event) => {
		event.preventDefault();

		if (username === "" || password === "") {
			setError(true);
			setErrorMsg(fieldEmpty);
			setUsername("");
			setPassword("");
		} else if (username !== "admin" || password !== "admin12345") {
			setError(true);
			setErrorMsg(userNotAuthorized);
			setUsername("");
			setPassword("");
		} else {
			const tokenInbound =
				"r$?ykt06[RhFUm2RPhja6pwPCWZBxgya}qm;]vH/z#4cRW8BwhJT7eAk)YYX[Uutv0hNMC{GpDjHrgS!b=N9tuFJ?7FvvdN(+4f+";

			setStoredUser(tokenInbound);
			setUsername("");
			setPassword("");
			navigate("/document-manager");
		}
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
							<div
								className="alert alert-danger"
								role="alert"
								style={{ display: error ? "block" : "none" }}
							>
								{errorMsg}
							</div>
							<div className="mb-3">
								<input
									id="username"
									name="username"
									type="text"
									value={username}
									className="form-control"
									placeholder="Username"
									onChange={(event) => setUsername(event.target.value)}
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
