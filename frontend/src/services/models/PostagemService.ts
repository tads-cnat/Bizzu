import BaseService from "../common/baseService";
import axios from "axios";

// Configuração do Axios
const API = axios.create({
    baseURL: "http://localhost:8000/api/"
});

class PostagemService extends BaseService {
    // Criar uma nova postagem
    criar(data: FormData) {
        return API.post("/postagem/", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    // Buscar uma postagem pelo ID
    buscar(id: string) {
        return API.get(`/postagem/${id}/`);
    }

    // Atualizar uma postagem pelo ID
    atualizar(id: string, data: FormData) {
        return API.put(`/postagem/${id}/`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
}

export default new PostagemService("postagem");
