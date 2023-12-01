import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// component
import CreateFile from "../../molecules/modal/create-file-modal/CreateFile";
import EditFile from "../..//molecules/modal/edit-file-modal/EditFile";
import DeleteFile from "../../molecules/modal/delete-file/DeleteFile";
import TableFiles from "../../molecules/tableFiles/TableFiles";
import Navbar from "../../molecules/navbar/Navbar";
import Login from "../auth/Login";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import { fileService } from "../../services/api/files.service"; // se podra eliminar
import { getDocument } from "../../redux-toolkit/reducers/files/files.reducer"; // se podra eliminar
import UploadIcon from "../../assets/upload.png";
// css
import "../document-manager/DocumentManager.css";
import "../../index.css";

const DocumentManager = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const files = useSelector((state) => state.files.documents);
	// useSelector es un hook  de react-redux que permite extraer data del state de store

	// state for authentication
	const [tokeAuthentication] = useLocalStorage("token", "get");
	const [titleFile, setTitlefile] = useState("");
	const [idFile, setIdFile] = useState("");

	useEffect(() => {
		if (!tokeAuthentication) {
			// usamos navigate en el useEffect paara que cuando cargue este componente si el user no esta autenticado redireccione al inicio
			navigate("/");
		}
		// como se quiere que cada vez que inicie este component carge la data se coloca esta funcion dentro
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
	}, [dispatch, navigate, tokeAuthentication]);

	return (
		<>
			{tokeAuthentication ? (
				<div className="bg-custom">
					<Navbar />

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
							<CreateFile titleFile={titleFile} setTitlefile={setTitlefile} />

							<EditFile idFile={idFile} arrayDocuments={files} />

							<DeleteFile idFile={idFile} arrayDocuments={files} />

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
				<Login />
			)}
		</>
	);
};

export default DocumentManager;
