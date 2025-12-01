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
  async getArquivos(id : number){
      const response = await axiosInstance.get((`${this.complementoURL}/${id}/getArquivos`))
      return response.data
    }
  async favoritar(id: number) {
    const response = await axiosInstance.post(`${this.complementoURL}/${id}/favoritar/`)
    return response
  }

  async desfavoritar(id: number) {
    const response = await axiosInstance.delete(`${this.complementoURL}/${id}/desfavoritar/`)
    return response
  }

  async verificarFavorito(id: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/${id}/verificar_favorito/`)
    return response
  }
}

export default new RepositorioService("repositorio");