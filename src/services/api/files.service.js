import axios from "../axios";
import { SERVER_URL } from "../utils/static.data";

class FileServices {
	async getFiles() {
		const response = await axios.get(`${SERVER_URL}/`);
		return response;
	}

	async getFileById(body) {
		const response = await axios.get(`${SERVER_URL}/searchFile/${body}`);
		return response;
	}

	async createFile(body) {
		// se debe usar este header para poder crear un file con title y document
		const headers = { headers: { "Content-Type": "multipart/form-data" } };

		const response = await axios.post(`${SERVER_URL}/upload`, body, headers);
		return response;
	}

	async updateFile(body) {
		const response = await axios.patch(`/${body.id}`, body);
		// para este ENDPOINT hay que pasarle el ID del item en el URL
		return response;
	}

	async deleteFile(body) {
		const response = await axios.delete(`/${body.id}`, body);
		// para este ENDPOINT hay que pasarle el ID del item en el URL y el body que sera el id a eliminar ya que lo esperan en el reducer
		return response;
	}
}

export const fileService = new FileServices();
