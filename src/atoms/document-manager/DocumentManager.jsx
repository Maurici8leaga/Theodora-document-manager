import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// component
import CreateFile from "../../molecules/modal/create-file-modal/CreateFile";
import EditFile from "../..//molecules/modal/edit-file-modal/EditFile";
import TableFiles from "../../molecules/tableFiles/TableFiles";
import Navbar from "../../molecules/navbar/Navbar";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import { fileService } from "../../services/api/files.service";
import {
	addDocument,
	deleteDocument,
	getDocument,
} from "../../redux-toolkit/reducers/files/files.reducer";
import {
	pdfFileExample,
	txtFileExample,
	wordFileExample,
} from "../../services/utils/static.data";

import UploadIcon from "../../assets/upload.png";
// css
import "../document-manager/DocumentManager.css";
import "../../index.css";

const DocumentManager = () => {
	const files = useSelector((state) => state.files.documents);
	// const files = useSelector((state) => state.files);
	// useSelector es un hook  de react-redux que permite extraer data del state de store

	const [setStoredUser] = useLocalStorage("token", "get");
	const [deleteStoredUser] = useLocalStorage("token", "delete");
	const [userAuthenticated, setUserAuthenticated] = useState(setStoredUser);

	const [titleFile, setTitlefile] = useState("");
	const [document, setDocument] = useState("");

	const [idFile, setIdFile] = useState("");

	const dispatch = useDispatch();

	const navigate = useNavigate();

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
				files.length > 0
					? // files.documents.length > 0
					  Math.max(...files.map((file) => file.id))
					: // ? Math.max(...files.documents.map((file) => file.id))
					  0;
			// Math.max calcula el mayor elemento del array, en este caso el id, y si no tiene algun se le define 0
			// se usa "...files." porque para Math.max cuando se quiere calcular el mayor valor de un array se usa asi

			// creamos este condicional para poder usar mock conn los archivos y asi lo pueda leer
			let documentPath;
			let fileType;
			if (document === "application/pdf") {
				documentPath = pdfFileExample;
				fileType = "application/pdf";
			} else if (document === "application/msword") {
				documentPath = wordFileExample;
				fileType = "application/msword";
			} else if (
				document ===
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			) {
				documentPath = wordFileExample;
				fileType =
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document";
			} else {
				documentPath = txtFileExample;
				fileType = "text/plain";
			}

			const response = await fileService.createFile({
				id: maxId + 1,
				title: titleFile,
				document: documentPath,
				fileType,
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

	const visulizeFile = (id) => {
		navigate(`/visualizer/${id}`);
	};

	return (
		<>
			{userAuthenticated ? (
				<div className="bg-custom">
					<Navbar logOut={logOut} />

					<div className="container-md mt-5 vh-100">
						<div className="container-custom">
							<div className="card text-center bg-card">
								<div className="card-body">
									<h3 className="card-title">Library</h3>
									<figure className="text-center">
										<img
											src={UploadIcon}
											alt="upload icon"
											style={{ width: "110px" }}
										/>
									</figure>
									<p className="card-text">Upload your files here.</p>
									<button
										type="button"
										className="btn btn-outline-primary"
										data-bs-toggle="modal"
										data-bs-target="#createModal"
									>
										Choose a file from your computer
									</button>
								</div>
							</div>
							<CreateFile
								titleFile={titleFile}
								setTitlefile={setTitlefile}
								setDocument={setDocument}
								createFile={createFile}
							/>

							<EditFile idFile={idFile} arrayDocuments={files} />

							<div className="text-center mt-5">
								<ul className="list-group gap-2">
									{files && files.length > 0 ? (
										files.map((item, index) => (
											<TableFiles
												key={index}
												idFile={item.id}
												title={item.title}
												fileType={item.fileType}
												setIdFile={setIdFile}
												visulizeFile={visulizeFile}
												deleteFile={deleteFile}
											/>
										))
									) : (
										<></>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			) : (
				navigate("/")
			)}
		</>
	);
};

export default DocumentManager;
