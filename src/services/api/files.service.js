import axios from "../axios";

class FileServices {
	async getFiles() {
		const response = await axios.get();
		return response;
	}

	async createFile(body) {
		const response = await axios.post("/", body);
		// se coloca la ruta "/" porque es el principal
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
