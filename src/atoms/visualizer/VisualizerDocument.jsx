import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// components
import Navbar from "../../molecules/navbar/Navbar";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import { fileService } from "../../services/api/files.service";
import Login from "../auth/Login";
// css
import "../visualizer/VisualizerDocument.css";
import "../../index.css";

const VisualizerDocument = () => {
	const { idFile } = useParams();

	const navigate = useNavigate();

	// state for authentication
	const [tokeAuthentication] = useLocalStorage("token", "get");

	// state for file
	const [file, setFile] = useState([]);

	// state for errors
	const [hasError, setHasError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (!tokeAuthentication) {
			// usamos navigate en el useEffect paara que cuando cargue este componente si el user no esta autenticado redireccione al inicio
			navigate("/");
		}

		const fetchFileById = async () => {
			try {
				const { data } = await fileService.getFileById(idFile);
				// {data} es una destructuracion de la  propiedad data al nombre que le pongas a la cons

				const docs = [
					//metemos docs dentro para que pueda tener acceso a "data" y sus propiedades
					{
						uri: data.file.document,
						fileType: data.file.fileType,
						fileName: data.file.title,
					},
				];
				setFile(docs);
				setHasError(false);
				setErrorMsg("");
			} catch (error) {
				console.log(error.stack);
				setHasError(true);
				setErrorMsg(error.response.data.message);
			}
		};

		fetchFileById();
	}, [idFile, navigate, tokeAuthentication]);

	return (
		<>
			{tokeAuthentication ? (
				<div className="bg-custom">
					<Navbar />
					<div className="container-Visualizer">
						{hasError && errorMsg && (
							<div className="alert alert-danger" role="alert">
								{errorMsg}
							</div>
						)}
						<button
							type="button"
							className="btn btn-outline-secondary my-3"
							onClick={() => navigate("/document-manager")}
						>
							Go back
						</button>
						<DocViewer
							documents={file}
							pluginRenderers={DocViewerRenderers}
							style={{ height: "90vh" }}
						/>
					</div>
				</div>
			) : (
				<Login />
			)}
		</>
	);
};

export default VisualizerDocument;
