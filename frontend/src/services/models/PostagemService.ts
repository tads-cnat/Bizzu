import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class PostagemService extends BaseService{
  async getPost(id: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/${id}/getPost`)
    return response
  }

  async getPostComunidade(id: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/${id}/getPostComunidade`)
    return response
  }

  async getPostByCommunity(username: string) {
    const response = await axiosInstance.get(`${this.complementoURL}/postCommunity/${username}`)
    return response
  }

  async getPostByFollowers(username: string) {
    const response = await axiosInstance.get(`${this.complementoURL}/postFollowers/${username}`)
    return response
  }

  async getFeedFiltradoPorCategoria(nomeCategoria: string) {
    const response = await axiosInstance.get(`/feed/categoria/?categoria=${nomeCategoria}`)
    return response
  }
  
}

export default new PostagemService("postagem");
