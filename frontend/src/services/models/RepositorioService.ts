import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class RepositorioService extends BaseService{
    async getRepo(id: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/${id}/getRepo`)
    return response
  }

  async getRepoComunidade(id: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/${id}/getRepoComunidade`)
    return response
  }
}

export default new RepositorioService("repositorio");