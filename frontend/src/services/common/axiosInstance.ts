import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/"
});


axiosInstance.interceptors.request.use( ///token ser inserido na requisição automaticamente 
    (config) => {
        const user = getLocalStorage();
        if (user  && user.token){
            const token = user.token;
            config.headers['Authorization'] =  `Bearer ${token}`;
        }
        else { 
            console.warn('Não tem token porque não foi realizado o cadastro');
        }
        return config;
    },
    async (error) => {
		await Promise.reject(error);
	}
)


export default axiosInstance;

