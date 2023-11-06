import axios from "axios";

export const BASE_URL = "http://localhost:3500/files";

export default axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json", Accept: "application/json" },
	withCredentials: true,
});
