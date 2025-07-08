import axiosInstance from "../common/axiosInstance"
import BaseService from "../common/baseService"

class ComentarioService extends BaseService {
  async getComentariosByPostagem(postagemId: number) {
    try {
      const response = await axiosInstance.get(`${this.complementoURL}/postagem/${postagemId}/`)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar comentários:", error)
      throw error
    }
  }

  async criarComentario(postagemId: number, conteudo: string) {
    try {
      const response = await axiosInstance.post(`${this.complementoURL}/`, {
        postagem: postagemId,
        conteudo: conteudo,
      })
      return response.data
    } catch (error) {
      console.error("Erro ao criar comentário:", error)
      throw error
    }
  }

  async contarComentarios(postagemId: number) {
    try {
      const response = await axiosInstance.get(`${this.complementoURL}/contar/${postagemId}/`)
      return response.data
    } catch (error) {
      console.error("Erro ao contar comentários:", error)
      throw error
    }
  }
}

export default new ComentarioService("comentario")
