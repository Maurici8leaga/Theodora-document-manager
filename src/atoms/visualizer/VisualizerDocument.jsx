import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Navbar from "../../molecules/navbar/Navbar";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import { urlWord } from "../../services/utils/static.data";
import { fileService } from "../../services/api/files.service";
// css
import "../visualizer/VisualizerDocument.css";
import "../../index.css";

const VisualizerDocument = () => {
	const { idFile } = useParams();

	// const dispatch = useDispatch();
	const navigate = useNavigate();

	// state for authentication
	const [setStoredUser] = useLocalStorage("token", "get");
	const [deleteStoredUser] = useLocalStorage("token", "delete");
	const [userAuthenticated, setUserAuthenticated] = useState(setStoredUser);

	// state for file
	const [file, setFile] = useState([]);

	useEffect(() => {
		const fetchFileById = async () => {
			try {
				const idnum = parseInt(idFile);
				const { data } = await fileService.getFileById(idnum);
				// {data} es una destructuracion de la  propiedad data al nombre que le pongas a la const
				// dispatch(getDocumentById(data));

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
	}, [idFile]);

	const logOut = () => {
		setUserAuthenticated(deleteStoredUser);
	};

	return (
		<>
			{userAuthenticated ? (
				<div className="bg-custom">
					<Navbar logOut={logOut} />
					<div className="container-Visualizer">
						<DocViewer
							documents={file}
							pluginRenderers={DocViewerRenderers}
							style={{ height: "80vh" }}
						/>
					</div>
				</div>
			) : (
				navigate("/")
			)}
		</>
	);
};

export default VisualizerDocument;
