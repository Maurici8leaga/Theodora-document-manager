import React, { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";
import "../document-manager/DocumentManager.css";

const DocumentManager = () => {
	const [setStoredUser] = useLocalStorage("token", "get");
	const [deleteStoredUser] = useLocalStorage("token", "delete");
	const [userAuthenticated, setUserAuthenticated] = useState(setStoredUser);

	const logOut = () => {
		setUserAuthenticated(deleteStoredUser);
	};

	return (
		<>
			{userAuthenticated ? (
				<div className="container-md text-center">
					<div className="d-flex flex-row justify-content-evenly mt-5">
						<h2>List of documents</h2>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => logOut()}
						>
							Close Session
						</button>
					</div>

					<div className="d-flex flex-row justify-content-center mt-5">
						<div className="form-floating">
							<input
								type="text"
								className="form-control"
								id="floatingInput"
								placeholder="file name"
							/>
							<label>File name</label>
						</div>
						<button type="button" className="btn btn-primary d-flex">
							Agregar
						</button>
					</div>

					<div className="container text-center mt-5">
						<div className="row align-items-center bg-secondary">
							<div className="col d-flex flex-row text-light ">document #1</div>
							<div className="col d-flex flex-row text-light">
								Curriculum vitae
							</div>
							<div className="col d-flex flex-row gap-3 justify-content-center">
								<button type="button" className="btn btn-warning d-flex">
									<i
										className="bi-alarm"
										style={{ fontSize: "1rem", color: "black" }}
									></i>
								</button>
								<button type="button" className="btn btn-danger d-flex">
									Eliminar
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

export default DocumentManager;
