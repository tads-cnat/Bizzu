import axiosInstance from "../common/axiosInstance"
import BaseService from "../common/baseService"

class UsuarioService extends BaseService {
  async postToken(content: any) {
    const response = await axiosInstance.post(`token/`, content)
    return response.data
  }

    async getUsuarioByToken(token: string) {
        const response = await axiosInstance.get(`usuario/token/${token}/`)
        return response.data
    }

  // Novo método para obter dados do usuário logado
  async obterDadosUsuarioLogado() {
    try {
      const response = await axiosInstance.get(`${this.complementoURL}/me/`)
      return response.data
    } catch (error: any) {
      // Se o endpoint /me/ não existir, tentar uma abordagem alternativa
      if (error.response?.status === 404) {
        return await this.obterUsuarioPorToken()
      }

      throw error
    }
  }

  // Método alternativo caso o endpoint /me/ não exista
  private async obterUsuarioPorToken() {
    try {
      // Listar todos os usuários e encontrar o atual pelo username
      // Isso é uma solução temporária - idealmente o backend deveria ter um endpoint /me/
      const response = await axiosInstance.get(`${this.complementoURL}/`)

      // Aqui você precisaria de uma forma de identificar qual é o usuário atual
      // Por exemplo, decodificar o token JWT ou usar outro método
      // Por enquanto, vamos retornar o primeiro usuário (TEMPORÁRIO)
      if (response.data && response.data.length > 0) {
        return response.data[0]
      }

      throw new Error("Nenhum usuário encontrado")
    } catch (error) {
      throw error
    }
  }
}

export default new UsuarioService("usuario")
