import axios from "axios"
import getLocalStorage from "../../utils/getLocalStorage"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const user = getLocalStorage()
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`
    }

    // Para FormData, remover o Content-Type para deixar o browser definir
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]
    }

    return config
  },
  async (error) => {
    await Promise.reject(error)
  },
)

// Interceptor para lidar com respostas de erro
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem("usuario")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
