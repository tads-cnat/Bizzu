import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";

const type = import.meta.env.ENV;
let BASE_URL = "http://localhost:8000/api";

if (type == 0) BASE_URL = import.meta.env.BASE_URL_CLOUD_API;
else if (type == 1) BASE_URL = import.meta.env.BASE_URL_LOCAL_API;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use( 
    (config) => {
        const user = getLocalStorage();
        if (user  && user.token){
            const token = user.token;
            config.headers["Authorization"] =  `Bearer ${token}`;
        }
        return config;
    },
    async (error) => {
		await Promise.reject(error);
	}
);

export default axiosInstance;


