import { useState } from 'react';
import { BeeButton } from '../BeeButtons/BeeButtons';
import axiosInstance from '../../services/common/axiosInstance';

const BackendTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testBackendConnection = async () => {
    setLoading(true);
    setTestResults([]);
    
    try {
      // Teste 1: Verificar se o backend está rodando
      addResult('Testando conexão com o backend...');
      
      const baseURL = axiosInstance.defaults.baseURL;
      addResult(`URL base: ${baseURL}`);
      
      // Teste 2: Tentar acessar a raiz da API
      try {
        const response = await fetch(baseURL, { method: 'GET' });
        addResult(`Status da raiz da API: ${response.status}`);
        
        if (response.ok) {
          const text = await response.text();
          addResult(`Resposta da raiz: ${text.substring(0, 100)}...`);
        }
      } catch (error) {
        addResult(`Erro ao acessar raiz da API: ${error.message}`);
      }
      
      // Teste 3: Listar endpoints disponíveis
      try {
        const response = await axiosInstance.get('');
        addResult('✅ Conexão com API estabelecida');
        addResult(`Dados recebidos: ${JSON.stringify(response.data).substring(0, 200)}...`);
      } catch (error) {
        addResult(`❌ Erro na conexão com API: ${error.message}`);
      }
      
      // Teste 4: Testar endpoint específico de postagem
      try {
        const response = await axiosInstance.get('postagem/');
        addResult('✅ Endpoint postagem/ encontrado');
        addResult(`Postagens encontradas: ${response.data.length || 'N/A'}`);
      } catch (error) {
        addResult(`❌ Endpoint postagem/ não encontrado: ${error.response?.status || error.message}`);
      }
      
      // Teste 5: Testar endpoint de comunidade
      try {
        const response = await axiosInstance.get('comunidade/');
        addResult('✅ Endpoint comunidade/ encontrado');
        addResult(`Comunidades encontradas: ${response.data.length || 'N/A'}`);
      } catch (error) {
        addResult(`❌ Endpoint comunidade/ não encontrado: ${error.response?.status || error.message}`);
      }
      
    } catch (error) {
      addResult(`❌ Erro geral: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Teste de Conexão com Backend</h3>
      
      <BeeButton
        label="Testar Conexão"
        onClick={testBackendConnection}
        desabilitado={loading}
        variante="primaria"
      />
      
      {testResults.length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 rounded max-h-60 overflow-y-auto">
          <h4 className="font-medium mb-2">Resultados do Teste:</h4>
          {testResults.map((result, index) => (
            <div key={index} className="text-sm mb-1 font-mono">
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BackendTest;