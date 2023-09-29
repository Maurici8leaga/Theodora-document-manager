import axios from "axios";

// OJO ESTO DEBE IR EN EL README PARA QUE TODOS ABRAN EN EL MISMO PUERTO
export const BASE_URL = "http://localhost:3500/files";

// instancia desacoplada de axios con sus configuraciones
export default axios.create({
	// de esta forma abstraida no se tiene que repetir esto constantemente para cada request
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json", Accept: "application/json" },
	withCredentials: true,
});
