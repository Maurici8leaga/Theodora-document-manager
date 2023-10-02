import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// static data
import urlPDF from "../../assets/documents/CV_Mauricio_Oleaga.pdf";
import { urlWord, urlTxt } from "../../services/utils/static.data";
import { fileService } from "../../services/api/files.service";
import { getDocumentById } from "../../redux-toolkit/reducers/files/files.reducer";

const VisualizerDocument = ({ stateFiles }) => {
	const { idFile } = useParams();
	// const stateFiles = useSelector((state) => state.files.file);

	console.log(stateFiles, "este es stateFiles de mapState");

	const dispatch = useDispatch();

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

	// console.log(stateFiles !== fileSelected, "esto es igual> ");

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

	console.log(fileSelected, "esto es fileSelected");

	const docs = [
		{
			uri: uriFile,
			fileType: fileType,
			fileName: title,
		},
	];

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<h1>ESTE ES EL VISUALIZER</h1>
			<p>este es el id que esta llegando {idFile}</p>
			{uriFile && uriFile.length > 0 && (
				<DocViewer
					documents={docs}
					pluginRenderers={DocViewerRenderers}
					style={{ height: "90vh" }}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	stateFiles: state.files.file,
});

export default connect(mapStateToProps)(VisualizerDocument);
