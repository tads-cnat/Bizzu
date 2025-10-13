import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class UsuarioService extends BaseService{
    async postToken(content:any){
        const response = await axiosInstance.post(`token/`, content);

        return response.data;
    }  
    async getbyUsername(username:any){
        const response = await axiosInstance.get(`usuario/userByusername/${username}`);

        return response.data;
    }  

    async seguirUsuario(id: number) {
        const response = await axiosInstance.post(`usuario/${id}/seguir/`);
        return response.data;
    }

    async deixarDeSeguir(id: number) {
        const response = await axiosInstance.delete(`usuario/${id}/deixar_de_seguir/`);
        return response.data;
    }

    async verificarSeguimento(id: number) {
        const response = await axiosInstance.get(`usuario/${id}/verificar_seguimento/`);
        return response.data;
    }

    async usernameExists(username: string) {
        const response = await axiosInstance.get(`/usuario/usernameExits/${username}`);
        return response.data;
    }
    async editarPerfil(dados: any){
        const response = await axiosInstance.patch(`/usuario/editarPerfil/`, dados);
        return response.data
    }
    async logout() {
        const response = await axiosInstance.post(`/logout`);
        return response.data;
    }

    async solicitarMudanca(content: any){
        const response = await axiosInstance.post('/usuario/solicitarMudanca/', content);
        return response.data;
    }

    async pesquisarUsuarios(termo: string) {
        const response = await axiosInstance.get(`pesquisa/?search=${encodeURIComponent(termo)}`);
        return response;
    }

    async listarSolicitacoes(){
        const response = await axiosInstance.get('/listar_solicitacoes/');
        return response
    }

    async aprovarSolicitacao(id: number){
        const response = await axiosInstance.post('/usuario/aprovarSolicitacao/', {id: id})
        
        return response
    }

    async reprovarSolicitacao(id: number){
        const response = await axiosInstance.post('/usuario/reprovarSolicitacao/', {id: id})
        return response
    }

    async getRepositoriosFavoritos() {
        const response = await axiosInstance.get(`usuario/repositorios_favoritos/`);
        return response.data;
    }
}

export default new UsuarioService("usuario");