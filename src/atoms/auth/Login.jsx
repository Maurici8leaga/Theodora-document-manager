import React from "react";
import "../auth/Login.css";

const Login = () => {
	return (
		<div className="container-md">
			<div className="text-center pt-extra">
				<div className="form-container">
					<h1 className="h1 mt-2">THEODORA</h1>

					<p className="p">Enter your credentials</p>

					<form className="container">
						<div className="mb-3">
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Email address"
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
