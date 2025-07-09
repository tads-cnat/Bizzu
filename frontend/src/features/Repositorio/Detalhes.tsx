"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, PencilSimple, Trash } from "@phosphor-icons/react"
import BeeTabelaRepositorio from "../../components/BeeTabelaRepositorio/BeeTabelaRepositorio"
import BeeButton from "../../components/BeeButtons/BeeButtons"
import BeeModal from "../../components/BeeModal/BeeModal"
import RepositorioService from "../../services/models/RepositorioService"
import ArquivoService from "../../services/models/ArquivoService"
import CategoriaService from "../../services/models/CategoriaService"
import type { Repositorio, Tag } from "../../interfaces/Repositorio"
import type { Categoria } from "../../interfaces/Categoria"
import type { FileItem } from "../../components/BeeTabelaRepositorio/IBeeTabelaRepositorio"
import acessAuth from "../../utils/acessAuth"
// import acessPermissions from "../../utils/acessPermissions"

const DetalhesRepositorio: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { username } = acessAuth()
//   const { permissions } = acessPermissions()

  const [repositorio, setRepositorio] = useState<Repositorio | null>(null)
  const [arquivos, setArquivos] = useState<FileItem[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (id) {
      carregarDados()
    }
  }, [id])

  const carregarDados = async () => {
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      // Carregar repositório
      const repoResponse = await RepositorioService.get(Number(id))
      const repoData = repoResponse.data
      setRepositorio(repoData)

      // Verificar se é o dono
      setIsOwner(repoData.usuario?.nome === username)

      // Carregar categorias para converter em tags
      const categoriasResponse = await CategoriaService.listAll()
      setCategorias(categoriasResponse.data || [])

      // Carregar arquivos (simulado - você pode implementar um endpoint específico)
      try {
        const arquivosResponse = await ArquivoService.listAll()
        // Filtrar arquivos deste repositório (se houver campo repositorio_id)
        const arquivosDoRepo = arquivosResponse.data?.filter((arquivo: any) => arquivo.repositorio === Number(id)) || []

        const arquivosFormatados: FileItem[] = arquivosDoRepo.map((arquivo: any) => ({
          id: arquivo.id,
          name: arquivo.arquivo.split("/").pop() || "arquivo",
          arquivo: arquivo.arquivo,
          uploadedAt: repoData.dataPublicacao, // Usar data do repositório como fallback
        }))

        setArquivos(arquivosFormatados)
      } catch (arquivoError) {
        console.warn("Erro ao carregar arquivos:", arquivoError)
        setArquivos([])
      }
    } catch (error) {
      console.error("Erro ao carregar repositório:", error)
      setError("Erro ao carregar repositório. Verifique se o ID está correto.")
    } finally {
      setLoading(false)
    }
  }

  const handleVoltar = () => {
    navigate(-1)
  }

  const handleEditar = () => {
    navigate(`/repositorio/editar/${id}`)
  }

  const handleExcluir = async (repositorioId: number) => {
    try {
      await RepositorioService.delete(repositorioId)
      navigate(`/${username}/`)
    } catch (error) {
      console.error("Erro ao excluir repositório:", error)
      alert("Erro ao excluir repositório. Tente novamente.")
    }
  }

  // Converter categorias em tags
  const categoriasParaTags = (categoriasIds: number[]): Tag[] => {
    if (!categoriasIds || categoriasIds.length === 0) return []

    const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
      tec: "magenta",
      mat: "orange",
      per: "cyan",
    }

    const tagsValidas: Tag[] = []

    for (const categoriaId of categoriasIds) {
      const categoria = categorias.find((c) => c.id === categoriaId)

      if (
        categoria &&
        categoria.tipo &&
        (categoria.tipo === "tec" || categoria.tipo === "mat" || categoria.tipo === "per")
      ) {
        tagsValidas.push({
          label: categoria.nome,
          color: coresPorTipo[categoria.tipo],
          tipo: categoria.tipo,
        })
      }
    }

    return tagsValidas
  }

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleVoltar}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !repositorio) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleVoltar}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-red-500 mb-4">
            <Trash size={48} className="mx-auto mb-2" />
            <h2 className="text-xl font-semibold">Repositório não encontrado</h2>
            <p className="text-gray-600 mt-2">
              {error || "O repositório que você está procurando não existe ou foi removido."}
            </p>
          </div>
          <BeeButton label="Voltar" variante="primaria" onClick={handleVoltar} />
        </div>
      </div>
    )
  }

  const tags = categoriasParaTags(repositorio.categorias)

  return (
    <div className="w-full">
      {/* Header com navegação e ações */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleVoltar}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        {/* Ações do proprietário */}
        {isOwner  && (
          <div className="flex items-center gap-2">
            <BeeButton label="Editar" variante="secundaria" icone={<PencilSimple size={16} />} onClick={handleEditar} />
            <BeeButton
              label="Excluir"
              variante="negativo"
              icone={<Trash size={16} />}
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        )}
      </div>

      {/* Componente principal do repositório */}
      <BeeTabelaRepositorio
        id={repositorio.id}
        titulo={repositorio.titulo || "Repositório sem título"}
        descricao={repositorio.descricao}
        usuario={repositorio.usuario ?? null}
        dataPublicacao={repositorio.dataPublicacao}
        tags={tags}
        files={arquivos}
        imagem={repositorio.imagem}
      />

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <BeeModal
          label="Excluir repositório"
          text="Você tem certeza que deseja excluir este repositório? Esta ação não pode ser desfeita."
          type="descartar"
          id={repositorio.id}
          onExcluir={handleExcluir}
        />
      )}
    </div>
  )
}

export default DetalhesRepositorio
