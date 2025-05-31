import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/"
});

//Posteriormente aqui será inserido o tratamento do token
export default axiosInstance;