import axios from "axios";

// Get the actual enviroment from .env file
const APP_ENVIROMENT = process.env.REACT_APP_ENV;

export let BASE_ENDPOINT = "";

// Method for make BASE_ENDPOINT dinamyc by enviroment
if (APP_ENVIROMENT === "development") {
	BASE_ENDPOINT = "http://localhost:5001";
} else if (APP_ENVIROMENT === "production") {
	BASE_ENDPOINT = "https://theodora-document-server.onrender.com";
}

export const SERVER_URL = `${BASE_ENDPOINT}/api/v1`;

// Function for request axios with header JSON
export const axiosJSON = axios.create({
	baseURL: SERVER_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
});

// Function for request axios with header multipart
export const axiosMultipart = axios.create({
	baseURL: SERVER_URL,
	headers: {
		"Content-Type": "multipart/form-data",
	},
	withCredentials: true,
});
