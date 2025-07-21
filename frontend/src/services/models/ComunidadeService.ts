import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class ComunidadeService extends BaseService {
    async seguirComunidade(id: number) {
        const response = await axiosInstance.post(`comunidade/${id}/seguir/`);
        return response.data;
    }

    async deixarDeSeguir(id: number) {
        const response = await axiosInstance.delete(`comunidade/${id}/deixar_de_seguir/`);
        return response.data;
    }

    async verificarSeguimento(id: number) {
        const response = await axiosInstance.get(`comunidade/${id}/verificar_seguimento/`);
        return response.data;
    }
}

export default new ComunidadeService("comunidade");

