import { axiosJSON, axiosMultipart } from "../axios";

class FileServices {
	// Endpoinst for request to API

	async getFiles() {
		const response = await axiosJSON.get("/");
		return response;
	}

	async getFileById(body) {
		const response = await axiosJSON.get(`/searchFile/${body}`);
		return response;
	}

	async createFile(body) {
		const response = await axiosMultipart.post("/upload", body);
		return response;
	}

	async updateFile(id, body) {
		const response = await axiosJSON.put(`/editFile/${id}`, body);
		return response;
	}

	async deleteFile(id) {
		const response = await axiosJSON.delete(`/deleteFile/${id}`);
		return response;
	}
}

export const fileService = new FileServices();
