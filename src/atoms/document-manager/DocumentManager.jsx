import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import "../document-manager/DocumentManager.css";

const DocumentManager = () => {
	const files = useSelector((state) => state.files);
	// useSelector es un hook  de react-redux que permite extraer data del state de store

	console.log(files[files.length - 1].id);

	const [setStoredUser] = useLocalStorage("token", "get");
	const [deleteStoredUser] = useLocalStorage("token", "delete");
	const [userAuthenticated, setUserAuthenticated] = useState(setStoredUser);

	const [titleFile, setTitlefile] = useState("");
	const [document, setDocument] = useState("");

	const logOut = () => {
		setUserAuthenticated(deleteStoredUser);
	};

	const createFile = (event) => {
		event.preventDefault();
		setTitlefile("");
		setDocument("");
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

					<div className="d-flex flex-column justify-content-center mt-5">
						<form onSubmit={createFile}>
							<div className="form-floating">
								<input
									id="title-File"
									name="title"
									type="text"
									value={titleFile}
									className="form-control"
									placeholder="file name"
									onChange={(event) => setTitlefile(event.target.value)}
									required
								/>
								<label>File name</label>
							</div>
							<div className="mb-3">
								<input
									className="form-control"
									type="file"
									name="document"
									id="file"
									value={document}
									onChange={(event) => setDocument(event.target.value)}
									required
								/>
							</div>
							<button type="submit" className="btn btn-primary d-flex">
								Agregar
							</button>
						</form>
					</div>

					<div className="container text-center mt-5">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Number document</th>
									<th scope="col">Title</th>
									<th scope="col">settings</th>
								</tr>
							</thead>
							<tbody>
								{/* esto es lo que debe ir dentro del map */}
								{files.map((item, index) => (
									<tr key={index}>
										<td>{item.id}</td>
										<td>{item.title}</td>
										<td className="d-flex flex-row gap-3 justify-content-center">
											<button
												type="button"
												className="btn btn-warning d-flex text-center"
											>
												<BsPencil />
											</button>
											<button type="button" className="btn btn-danger d-flex">
												<BsTrash3 />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

export default DocumentManager;
