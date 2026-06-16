import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";


class DenunciaService extends BaseService{
    async getTipos() {
		    const response = await axiosInstance.get("/denuncia/tipos-denuncia/");
		    return response;
	}
    async enviarDenuncia({
    tipo,
    postagem,
    comentario,
    repositorio = null,
    }: {
    tipo: string;
    postagem?: number;
    comentario?: number;
    repositorio?: number | null;
    }) {
    try {
        const payload = {
        tipo,
        postagem: postagem ?? null,
        comentario: comentario ?? null,
        repositorio: repositorio ?? null,
        };

        const response = await axiosInstance.post("/denuncia/", payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar denúncia:", error);
        throw error;
    }
    }
};

export default new DenunciaService("denuncia");
