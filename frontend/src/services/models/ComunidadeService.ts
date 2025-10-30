import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class ComunidadeService extends BaseService {
    async seguirComunidade(id: number) {
        const response = await axiosInstance.post(`comunidade/${id}/seguir_comunidade/`);
        return response.data;
    }

    async deixarDeSeguir(id: number) {
        const response = await axiosInstance.delete(`comunidade/${id}/deixar_de_seguir_comunidade/`);
        return response.data;
    }
    async verificarSeguimentoComunidade(id: number) {
        const response = await axiosInstance.get(`/comunidade/${id}/verificar_seguimento_comunidade/`);
        return response.data;
    }

    async contar_seguidores(id: number) {
        const response = await axiosInstance.get(`comunidade/${id}/contar_seguidores_comunidade/`);
        return response.data;
    }
    async listarComunidadeAdm(){
        const response = await axiosInstance.get(`comunidade/listarComunidadeAdm`);
        return response.data
    }
}

export default new ComunidadeService("comunidade");