import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../molecules/navbar/Navbar";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Login from "../auth/Login";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fileService } from "../../services/api/files.service";
import { urlWord } from "../../services/utils/static.data";
import "../visualizer/VisualizerDocument.css";
import "../../index.css";

const VisualizerDocument = () => {
	const { idFile } = useParams();

	const navigate = useNavigate();

	const [tokeAuthentication] = useLocalStorage("token", "get");

	const [file, setFile] = useState([]);

	useEffect(() => {
		if (!tokeAuthentication) {
			navigate("/");
		}

		const fetchFileById = async () => {
			try {
				const idnum = parseInt(idFile);

				const { data } = await fileService.getFileById(idnum);

				const uri =
					data.fileType !== "application/msword"
						? `${process.env.PUBLIC_URL}${data.document}`
						: urlWord;

				const docs = [
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
