import { axiosJSON, axiosMultipart } from "../axios";

class FileServices {
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
		// hay que enviar el id del file y en el body, la actualizacion del file con new title
		return response;
	}

	async deleteFile(id) {
		const response = await axiosJSON.delete(`/deleteFile/${id}`);
		// para este ENDPOINT hay que pasarle el ID del item en el URL y el body que sera el id a eliminar ya que lo esperan en el reducer
		return response;
	}
}

export const fileService = new FileServices();
