import type React from "react"
import BeePerfilResumoCard from "../../components/BeePerfilResumoCard/BeePerfilResumoCard"
import BeeFormacaoAcademicaCard from "../../components/BeeFormacaoAcademicaCard/BeeFormacaoAcademicaCard"
import BeeConfiguracoesCard from "../../components/BeeConfiguracoesCard/BeeConfiguracoesCard"

const TestComponents: React.FC = () => {
  const formacoesExemplo = [
    {
      instituicao: "IFRN - CNAT",
      curso: "Curso Superior de Tecnologia (CST) em Análise e Desenvolvimento de Sistemas",
    },
    {
      instituicao: "IFRN - Campus zona leste",
      curso: "CURSO DE FORMAÇÃO INICIAL E CONTINUADA (FIC) EM SISTEMAS EMBARCADOS",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F2F2F7] p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-8">Teste dos Componentes</h1>

        <BeePerfilResumoCard
          nome="Riel"
          descricao="Meu nome é Jesriel tenho 30 anos, 3 gatos e um budega em Miami"
          linkedinUrl="https://www.linkedin.com/in/jesrielmoura/"
        />

        <BeeFormacaoAcademicaCard
          formacoes={formacoesExemplo}
          onAdicionar={() => alert("Adicionar formação")}
          onEditar={() => alert("Editar formações")}
        />

        <BeeConfiguracoesCard
          onEditarPerfil={() => alert("Editar perfil")}
          onMudarTema={() => alert("Mudar tema")}
          onEditarFavoritos={() => alert("Editar favoritos")}
        />
      </div>
    </div>
  )
}

export default TestComponents
