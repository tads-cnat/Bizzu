import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class CurtidaService extends BaseService {
  async alternarCurtida(postagemId: number) {
    const response = await axiosInstance.post(`${this.complementoURL}/alternar/`, {
      postagem_id: postagemId,
    });
    return response.data;
  }

  async verificarCurtida(postagemId: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/verificar/${postagemId}/`);
    return response.data;
  }

  async contarCurtidas(postagemId: number) {
    const response = await axiosInstance.get(`${this.complementoURL}/contar/${postagemId}/`);
    return response.data;
  }
}

export default new CurtidaService("curtida");
