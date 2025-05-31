"use client"

import type React from "react"

import { useEffect, useState } from "react"
import BeePost from "../../components/BeePost/BeePost"
import PostagemService from "../../services/models/PostagemService"

// Usuário padrão para postagens sem usuário atribuído
const DEFAULT_USER = {
  nome: "Usuário Bizzu",
  imagemPerfil: "https://saae.lucasdorioverde.mt.gov.br/arquivos/setores/sem_imagem_avatar.png",
}

// Imagem padrão do usuário logado
const DEFAULT_USER_IMAGE = "https://saae.lucasdorioverde.mt.gov.br/arquivos/setores/sem_imagem_avatar.png"

interface PostagemBackend {
  id?: number
  texto: string
  imagem?: string
  dataPublicacao?: string
  usuario?: {
    nome: string
    imagemPerfil?: string
  }
  comunidade?: {
    nome: string
    id: number
  }
  categorias?: Array<{
    id: number
    nome: string
  }>
  curtidas?: number
  comentarios?: number
}

const Read: React.FC = () => {
  const [postagens, setPostagens] = useState<PostagemBackend[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCurtir = async (postagemId?: number) => {
    console.log("Curtir postagem:", postagemId)
    // Aqui será implementada a lógica de curtir
  }

  const handleComentar = async (postagemId?: number) => {
    console.log("Comentar postagem:", postagemId)
    // Aqui será implementada a lógica de comentar
  }

  // Função para converter categorias em tags para o componente BeePost
  const categoriasParaTags = (categorias?: Array<{ id: number; nome: string }>) => {
    if (!categorias || categorias.length === 0) return []

    // Cores para alternar entre as tags
    const cores = ["#FCBD18", "#058B92", "#F2C94C", "#6FCF97"]

    return categorias.map((categoria, index) => ({
      label: categoria.nome,
      color: cores[index % cores.length],
    }))
  }

  const loadPostagens = async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const response = await PostagemService.listAll()

      if (response.data && Array.isArray(response.data)) {
        console.log("Dados brutos das postagens:", response.data)
        setPostagens(response.data)
      } else {
        console.error("Formato de resposta inválido para postagens:", response.data)
        setPostagens([])
        setError("Formato de dados inválido recebido do servidor")
      }
    } catch (error) {
      console.error("Erro ao carregar postagens:", error)
      setPostagens([])
      setError("Erro ao carregar postagens. Verifique sua conexão.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPostagens()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCBD18] mx-auto mb-2"></div>
          <p className="text-gray-600">Carregando postagens...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={loadPostagens}
            className="px-4 py-2 bg-[#FCBD18] text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if (postagens.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Nenhuma postagem encontrada</p>
          <button
            onClick={loadPostagens}
            className="px-4 py-2 bg-[#FCBD18] text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Recarregar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {postagens.map((post: PostagemBackend, index: number) => {
        // Formatar a data de publicação
        const dataFormatada = post.dataPublicacao
          ? new Date(post.dataPublicacao).toISOString()
          : new Date().toISOString()

        // Converter categorias em tags
        const tags = categoriasParaTags(post.categorias)

        return (
          <div key={post.id || index} className="mb-6">
            {/* Informações da comunidade se existir */}
            {post.comunidade && (
              <div className="bg-white p-2 rounded-t-lg border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Comunidade:</span> {post.comunidade.nome}
                </p>
              </div>
            )}

            <BeePost
              id={post.id}
              texto={post.texto}
              tags={tags}
              curtidas={post.curtidas || 0}
              comentarios={post.comentarios || 0}
              usuario={{
                nome: post.usuario?.nome ?? DEFAULT_USER.nome,
                imagemPerfil: post.usuario?.imagemPerfil ?? DEFAULT_USER.imagemPerfil,
              }}
              dataPublicacao={dataFormatada}
              imagemPost={post.imagem}
              imagemUsuarioLogado={DEFAULT_USER_IMAGE}
              onCurtir={() => handleCurtir(post.id)}
              onAbrirComentarios={() => handleComentar(post.id)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Read
