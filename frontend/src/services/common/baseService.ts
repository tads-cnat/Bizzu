import axiosInstance from "./axiosInstance";

class BaseService {
	complementoURL = "";

	constructor(complementoURL: string) {
		this.complementoURL = complementoURL;
	}

	async get(id: number) {
		const response = await axiosInstance.get(`${this.complementoURL}/${id}/`);
		return response;
	}

	async listAll() {
		const response = await axiosInstance.get(`${this.complementoURL}/`);
		return response;
	}

	async post(content: any) {
		const response = await axiosInstance.post(
			`${this.complementoURL}/`,
			content,
		);
		return response;
	}

	async put(id: number, content: any) {
		const response = await axiosInstance.put(
			`${this.complementoURL}/${id}/`,
			content,
		);
		return response;
	}

	async patch(id: number, content: any) {
		const response = await axiosInstance.patch(
			`${this.complementoURL}/${id}/`,
			content,
		);
		return response;
	}

	async delete(id: number) {
		const response = await axiosInstance.delete(
			`${this.complementoURL}/${id}/`,
		);

		return response;
	}
}

export default BaseService;
