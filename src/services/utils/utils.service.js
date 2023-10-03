import { pdfFileExample, txtFileExample, wordFileExample } from "./static.data";

export class UtilsService {
	static maxId(files) {
		const id = files.length > 0 ? Math.max(...files.map((file) => file.id)) : 0;
		// Math.max calcula el mayor elemento del array, en este caso el id, y si no tiene algun se le define 0
		// se usa "...files." porque para Math.max cuando se quiere calcular el mayor valor de un array se usa asi

		return id;
	}

	static setDocumentByType(documentType) {
		// creamos este condicional para poder usar mock con los archivos y asi lo pueda leer
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
