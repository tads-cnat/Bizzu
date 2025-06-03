import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class PostagemService extends BaseService{
    async getPost(id: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/${id}/getPost`)
    return response
  }
}

export default new PostagemService("postagem");