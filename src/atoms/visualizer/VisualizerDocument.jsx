import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Navbar from "../../molecules/navbar/Navbar";
// static data
import useLocalStorage from "../../hooks/useLocalStorage";
import urlPDF from "../../assets/documents/CV_Mauricio_Oleaga.pdf";
import { urlWord, urlTxt } from "../../services/utils/static.data";
import { fileService } from "../../services/api/files.service";
import { getDocumentById } from "../../redux-toolkit/reducers/files/files.reducer";
// css
import "../visualizer/VisualizerDocument.css";
import "../../index.css";

const VisualizerDocument = () => {
	// const VisualizerDocument = ({ stateFiles }) => {
	const { idFile } = useParams();
	const stateFiles = useSelector((state) => state.files.file);

	console.log(stateFiles, "este es stateFiles de mapState");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [setStoredUser] = useLocalStorage("token", "get");
	const [deleteStoredUser] = useLocalStorage("token", "delete");
	const [userAuthenticated, setUserAuthenticated] = useState(setStoredUser);

	const [uriFile, setUriFile] = useState("");
	const [fileSelected, setFileSelected] = useState("");

	const loadingTypeFile = (fileType) => {
		if (fileType === "application/pdf") {
			// se uso solo el PDF distinto porque cloduinary no permite compartir url de archivos PDF
			setUriFile(urlPDF);
		} else if (
			fileType === "application/msword" ||
			fileType ===
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		) {
			setUriFile(urlWord);
		} else if (fileType === "text/plain") {
			setUriFile(urlTxt);
		}
	};

	useEffect(() => {
		const fetchFileById = async () => {
			try {
				const idnum = parseInt(idFile);
				const response = await fileService.getFileById(idnum);
				dispatch(getDocumentById(response.data));
			} catch (error) {
				console.log(error.stack);
			}
		};

		if (stateFiles !== fileSelected) {
			setFileSelected(stateFiles);
		}

		fetchFileById();
		loadingTypeFile(fileSelected.fileType);
	}, [idFile, dispatch, fileSelected]);

	const { fileType, title } = fileSelected || {};

	const docs = [
		{
			uri: uriFile,
			fileType: fileType,
			fileName: title,
		},
	];

	const logOut = () => {
		setUserAuthenticated(deleteStoredUser);
	};

	return (
		<>
			{userAuthenticated ? (
				<div className="bg-custom">
					<Navbar logOut={logOut} />

					{uriFile && uriFile.length > 0 && (
						<div className="container-Visualizer">
							<DocViewer
								documents={docs}
								pluginRenderers={DocViewerRenderers}
								style={{ height: "80vh" }}
							/>
						</div>
					)}
				</div>
			) : (
				navigate("/")
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	stateFiles: state.files.file,
});

export default connect(mapStateToProps)(VisualizerDocument);
