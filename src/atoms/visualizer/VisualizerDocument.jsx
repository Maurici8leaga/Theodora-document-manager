import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// static data
import urlPDF from "../../assets/documents/CV_Mauricio_Oleaga.pdf";
import { urlWord, urlTxt } from "../../services/utils/static.data";

const VisualizerDocument = () => {
	const { id } = useParams();
	const files = useSelector((state) => state.files);

	const fileSelected = files.documents.find((item) => item.id === +id);
	const { document, fileType, title } = fileSelected;
	// usamos el simbolo "+" para convertir id en un number

	const [uriFile, setUriFile] = useState("");

	useEffect(() => {
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
	}, [document, fileType, uriFile]);

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
			<p>este es el id que esta llegando {id}</p>
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

export default VisualizerDocument;
