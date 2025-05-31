import axios from "axios";

// Detectar se está rodando no GitHub Codespaces
const isCodespaces = window.location.hostname.includes('app.github.dev');

// Função para detectar a porta do backend automaticamente
const getBackendURL = () => {
  if (isCodespaces) {
    // Extrair o nome do codespace da URL atual
    const hostname = window.location.hostname;
    const codespaceName = hostname.split('-')[0] + '-' + hostname.split('-')[1] + '-' + hostname.split('-')[2];
    return `https://${codespaceName}-8000.app.github.dev/api/`;
  }
  return "http://localhost:8000/api/";
};

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Função para obter CSRF token
const getCSRFToken = () => {
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

// Interceptor para requests
axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`🚀 Fazendo requisição para: ${config.baseURL}${config.url}`);
        
        // Para FormData, remover o Content-Type
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
            console.log('📎 Enviando FormData');
        }
        
        // Adicionar CSRF token
        const csrfToken = getCSRFToken();
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        
        // Adicionar token de autenticação se existir
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        console.error('❌ Erro no interceptor de request:', error);
        return Promise.reject(error);
    }
);

// Interceptor para responses
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`✅ Resposta recebida de: ${response.config.url}`, response.status);
        return response;
    },
    (error) => {
        console.error('❌ Erro na requisição:', error);
        
        if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            console.error('🔌 Servidor Django não está rodando na porta 8000');
            alert('Erro de conexão: Verifique se o servidor Django está rodando com "python manage.py runserver 8000"');
        }
        
        if (error.response?.status === 401) {
            console.log('Usuário não autenticado');
            alert('Você precisa estar logado para realizar esta ação');
        }
        
        if (error.response?.status === 403) {
            console.error('CSRF token inválido ou permissão negada');
            alert('Erro de permissão. Tente recarregar a página.');
        }
        
        if (error.response?.status === 404) {
            console.error('🔍 Endpoint não encontrado:', error.config?.url);
            console.error('URL completa:', error.config?.baseURL + error.config?.url);
            alert(`Endpoint não encontrado: ${error.config?.url}. Verifique se o backend Django está configurado corretamente.`);
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;