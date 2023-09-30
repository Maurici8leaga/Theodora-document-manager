import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// component
import CreateFile from "../../molecules/modal/create-file-modal/CreateFile";
import EditFile from "../..//molecules/modal/edit-file-modal/EditFile";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import { fileService } from "../../services/api/files.service";
import {
	addDocument,
	deleteDocument,
	getDocument,
} from "../../redux-toolkit/reducers/files/files.reducer";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import {
	pdfFileExample,
	txtFileExample,
	wordFileExample,
} from "../../services/utils/static.data";
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

	const dispatch = useDispatch();

	useEffect(() => {
		// como se quiere que cada vez que inicie este componet carge laa data se coloca esta funcion dentro
		const fetchFiles = async () => {
			// toda llamada a un api es async
			try {
				const response = await fileService.getFiles(); //request al API
				dispatch(getDocument(response.data));
			} catch (error) {
				console.log(error.stack);
			}
		};
		fetchFiles();
	}, [dispatch]);

	const logOut = () => {
		setUserAuthenticated(deleteStoredUser);
	};

	const postFile = async () => {
		try {
			const maxId =
				files.documents.length > 0
					? Math.max(...files.documents.map((file) => file.id))
					: 0;
			// Math.max calcula el mayor elemento del array, en este caso el id, y si no tiene algun se le define 0
			// se usa "...files." porque para Math.max cuando se quiere calcular el mayor valor de un array se usa asi

			// creamos este condicional para poder usar mock conn los archivos y asi lo pueda leer
			let documentPath;
			if (document === "application/pdf") {
				documentPath = pdfFileExample;
			} else if (document === "application/msword") {
				documentPath = wordFileExample;
			} else {
				documentPath = txtFileExample;
			}

			const response = await fileService.createFile({
				id: maxId + 1,
				title: titleFile,
				document: documentPath,
			});

			dispatch(
				// aqui se usa el actions para crear un nuevo file
				addDocument(response.data)
			);
		} catch (error) {
			console.log(error.stack);
		}
	};

	const createFile = (event) => {
		event.preventDefault();
		postFile();
		setTitlefile("");
		setDocument("");
	};

	const deleteFile = async (id) => {
		try {
			await fileService.deleteFile({ id: id });

			dispatch(deleteDocument({ id: id }));
			// en este se pasa solo id porque el reducer esta esperando el id del document
		} catch (error) {
			console.log(error.stack);
		}
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

					<EditFile idFile={idFile} />

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
								{files.documents && files.documents.length > 0 ? (
									files.documents.map((item, index) => (
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
									))
								) : (
									<tr>
										<td></td>
										<td>There no are documents yet</td>
										<td></td>
									</tr>
								)}
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
