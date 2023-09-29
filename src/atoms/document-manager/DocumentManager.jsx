import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// component
import CreateFile from "../../molecules/modal/create-file-modal/CreateFile";
import EditFile from "../..//molecules/modal/edit-file-modal/EditFile";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import {
	addDocument,
	deleteDocument,
} from "../../redux-toolkit/reducers/files/files.reducer";
import { BsPencil, BsTrash3 } from "react-icons/bs";
// css
import "../document-manager/DocumentManager.css";

const DocumentManager = () => {
	const files = useSelector((state) => state.files);
	// useSelector es un hook  de react-redux que permite extraer data del state de store

	const [setStoredUser] = useLocalStorage("token", "get");
	const [deleteStoredUser] = useLocalStorage("token", "delete");
	const [userAuthenticated, setUserAuthenticated] = useState(setStoredUser);

	const [titleFile, setTitlefile] = useState("");
	const [document, setDocument] = useState("");

	const [idFile, setIdFile] = useState("");

	const logOut = () => {
		setUserAuthenticated(deleteStoredUser);
	};

	const dispatch = useDispatch();

	const createFile = (event) => {
		event.preventDefault();

		const maxId =
			files.length > 0 ? Math.max(...files.map((file) => file.id)) : 0;
		// Math.max calcula el mayor elemento del array, en este caso el id, y si no tiene algun se le define 0
		// se usa "...files." porque para Math.max cuando se quiere calcular el mayor valor de un array se usa asi

		dispatch(
			// aqui se usa el actions para crear un nuevo file
			addDocument({
				// se le debe pasar id, title, y docuemnt ya que en el actions esta esperando esos 3 documentos
				id: maxId + 1, //aqui se le va a sumar 1 siempre, ya sea 0 o tenga valor el length y id
				title: titleFile,
				document: document,
			})
		);
		setTitlefile("");
		setDocument("");
	};

	const deleteFile = (id) => {
		dispatch(deleteDocument({ id: id }));
		// en este se pasa solo id porque el action esta esperando el id del document
	};

	return (
		<>
			{userAuthenticated ? (
				<div className="container-md text-center">
					<div className="d-flex flex-row justify-content-evenly mt-5">
						<h2>THEODORA</h2>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => logOut()}
						>
							Close Session
						</button>
					</div>

					<div className="d-flex d-flex flex-row justify-content-center mt-5">
						<h3 className="h3 mx-5">List of Documents</h3>
						<button
							type="button"
							className="btn btn-primary"
							data-bs-toggle="modal"
							data-bs-target="#createModal"
						>
							Create a file
						</button>
					</div>

					<CreateFile
						titleFile={titleFile}
						setTitlefile={setTitlefile}
						document={document}
						setDocument={setDocument}
						createFile={createFile}
					/>

					<EditFile idFile={idFile} setTitlefile={setTitlefile} />

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
												data-bs-toggle="modal"
												data-bs-target="#editModal"
												onClick={() => setIdFile(item.id)}
											>
												<BsPencil />
											</button>
											<button
												type="button"
												className="btn btn-danger d-flex"
												onClick={() => deleteFile(item.id)}
											>
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
