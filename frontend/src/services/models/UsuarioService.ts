import axiosInstance from "../common/axiosInstance";
import BaseService from "../common/baseService";

class UsuarioService extends BaseService{
    async postToken(content:any){
        const response = await axiosInstance.post(`token/`, content);

        return response.data;
    }  
}

export default new UsuarioService("usuario");