import axios from "../axios";

class FileServices {
	async getFiles() {
		const response = await axios.get("/");
		return response;
	}

	async getFileById(body) {
		const response = await axios.get(`/${body}`);
		return response;
	}

	async createFile(body) {
		const response = await axios.post("/", body);
		return response;
	}

	async updateFile(body) {
		const response = await axios.patch(`/${body.id}`, body);
		return response;
	}

	async deleteFile(body) {
		const response = await axios.delete(`/${body.id}`, body);
		return response;
	}
}

export const fileService = new FileServices();
