import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// components
import Navbar from "../../molecules/navbar/Navbar";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import { urlWord } from "../../services/utils/static.data";
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

	useEffect(() => {
		if (!tokeAuthentication) {
			// usamos navigate en el useEffect paara que cuando cargue este componente si el user no esta autenticado redireccione al inicio
			navigate("/");
		}

		const fetchFileById = async () => {
			try {
				const idnum = parseInt(idFile);
				const { data } = await fileService.getFileById(idnum);
				// {data} es una destructuracion de la  propiedad data al nombre que le pongas a la const

				// se crea este condicional para evitar errores del DocViewer con archivos de tipo word
				const uri =
					data.fileType !== "application/msword"
						? `${process.env.PUBLIC_URL}${data.document}`
						: urlWord;

				const docs = [
					//metemos docs dentro para que pueda tener acceso a "data" y sus propiedades
					{
						uri,
						fileType: data.fileType,
						fileName: data.title,
					},
				];
				setFile(docs);
			} catch (error) {
				console.log(error.stack);
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
						<DocViewer
							documents={file}
							pluginRenderers={DocViewerRenderers}
							style={{ height: "80vh" }}
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
