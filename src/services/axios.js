import axios from "axios";

// DATO las variables de entorno de react tienes que comenzar con "REACT_APP"
const APP_ENVIROMENT = process.env.REACT_APP_ENV;

export let BASE_ENDPOINT = "";

// metodo para cambiar el URL del server dinamicamente segun el entorno
if (APP_ENVIROMENT === "development") {
	BASE_ENDPOINT = "http://localhost:5001";
} else if (APP_ENVIROMENT === "production") {
	BASE_ENDPOINT = "https://theodora-document-server.onrender.com";
}

export const SERVER_URL = `${BASE_ENDPOINT}/api/v1`;

// instancia desacoplada de axios con sus configuraciones, OJO para solicitudes con headers JSON
export const axiosJSON = axios.create({
	// de esta forma abstraida no se tiene que repetir esto constantemente para cada request
	baseURL: SERVER_URL,
	// para actualizar el document se debe colocar este header de tipo "application/json"
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
});

// instancia desacoplada de axios con sus configuraciones, OJO para solicitudes con headers MULTIPART
export const axiosMultipart = axios.create({
	baseURL: SERVER_URL,
	// se debe usar este header para poder crear un file con title y document
	headers: {
		"Content-Type": "multipart/form-data",
	},
	withCredentials: true,
});
