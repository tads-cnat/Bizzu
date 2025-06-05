import BaseService from "../common/baseService"
import axiosInstance from "../common/axiosInstance"

class CurtidaService extends BaseService {
  // Verifica se o usuário já curtiu uma postagem específica
  async verificarCurtida(usuarioId: number, postagemId: number) {
    try {
      const url = `${this.complementoURL}/verificar/?usuario=${usuarioId}&postagem=${postagemId}`
      const response = await axiosInstance.get(url)
      return response.data
    } catch (error: any) {
      return { curtido: false }
    }
  }

  // Alterna entre curtir e descurtir uma postagem
  async alternarCurtida(usuarioId: number, postagemId: number) {
    try {
      const url = `${this.complementoURL}/alternar/`
      const data = {
        usuario: usuarioId,
        postagem: postagemId,
      }

      const response = await axiosInstance.post(url, data)
      return response.data
    } catch (error: any) {
      throw error
    }
  }

  // Obtém o número de curtidas de uma postagem
  async contarCurtidas(postagemId: number) {
    try {
      const url = `${this.complementoURL}/contar/${postagemId}/`
      const response = await axiosInstance.get(url)

      if (response.data && typeof response.data.total !== "undefined") {
        return response.data.total
      } else {
        return 0
      }
    } catch (error: any) {
      return 0
    }
  }
}

export default new CurtidaService("curtida")
