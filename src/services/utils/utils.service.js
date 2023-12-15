import { pdfFileExample, txtFileExample, wordFileExample } from "./static.data";

export class UtilsService {
	// function to calculate the maximum number of identifiers in the db
	static maxId(files) {
		const id = files.length > 0 ? Math.max(...files.map((file) => file.id)) : 0;
		return id;
	}

	// function to filter the document types and returns the static document defined for each one
	static setDocumentByType(documentType) {
		if (documentType === "application/pdf") {
			return { documentPath: pdfFileExample, fileType: "application/pdf" };
		} else if (documentType === "application/msword") {
			return { documentPath: wordFileExample, fileType: "application/msword" };
		} else if (
			documentType ===
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		) {
			return {
				documentPath: wordFileExample,
				fileType:
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			};
		} else {
			return { documentPath: txtFileExample, fileType: "text/plain" };
		}
	}
}
