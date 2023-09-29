import axios from "../axios";

class FileServices {
	async getFiles() {
		const response = await axios.get();
		return response;
	}
}

export const fileService = new FileServices();
