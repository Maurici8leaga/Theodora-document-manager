import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../molecules/navbar/Navbar";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Navbar from "../../molecules/navbar/Navbar";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fileService } from "../../services/api/files.service";
import Login from "../auth/Login";
import "../visualizer/VisualizerDocument.css";
import "../../index.css";

const VisualizerDocument = () => {
	const { idFile } = useParams();

	// hook navigate
	const navigate = useNavigate();

	const [tokeAuthentication] = useLocalStorage("token", "get");

	const [file, setFile] = useState([]);

	// state for errors
	const [hasError, setHasError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (!tokeAuthentication) {
			navigate("/");
		}

		// function for request file by id to API
		const fetchFileById = async () => {
			try {
				const { data } = await fileService.getFileById(idFile);

				const docs = [
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
