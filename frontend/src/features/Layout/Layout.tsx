"use client"

import type React from "react"

import { useEffect, useState } from "react"
import BeeHeader from "../../components/BeeHeader/BeeHeader"
import { Outlet } from "react-router"
import { BeeSidebar } from "../../components/BeeSidebar/BeeSidebar"
import BeeRepo from "../../components/BeeRepo/BeeRepo"
import type { Repositorio, Tag } from "../../interfaces/Repositorio"
import RepositorioService from "../../services/models/RepositorioService"
import CategoriaService from "../../services/models/CategoriaService"
import type { Categoria } from "../../interfaces/Categoria"

const Layout: React.FC = () => {
  const [repositorios, setRepositorios] = useState<Repositorio[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const carregarRepositorios = async () => {
    try {
      const response = await RepositorioService.listAll()
      setRepositorios(response.data || [])
    } catch (error) {
      console.error("Erro ao carregar repositórios:", error)
      setRepositorios([])
    }
  }

  const carregarCategorias = async () => {
    try {
      const response = await CategoriaService.listAll()
      setCategorias(response.data || [])
    } catch (error) {
      console.error("Erro ao carregar categorias:", error)
      setCategorias([])
    }
  }

  const handleExcluirRepositorio = async (id: number) => {
    try {
      await RepositorioService.delete(id)
      setRepositorios((prev) => prev.filter((repo) => repo.id !== id))
    } catch (error) {
      console.error("Erro ao excluir repositório:", error)
      alert("Erro ao excluir repositório. Tente novamente.")
    }
  }

  // Função para converter categorias em tags
  const categoriasParaTags = (categoriasIds: number[]): Tag[] => {
    if (!categoriasIds || categoriasIds.length === 0) return []

    const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
      tec: "#FCBD18",
      mat: "#058B92",
      per: "#F2C94C",
    }

    const defaultColor = "#6FCF97"

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
          color: coresPorTipo[categoria.tipo] || defaultColor,
          tipo: categoria.tipo,
        })
      }
    }

    return tagsValidas
  }

  useEffect(() => {
    carregarRepositorios()
    carregarCategorias()
  }, [])

  return (
    <>
      <BeeHeader />
      <div className="flex min-h-screen bg-[#F2F2F7] pt-20">
        {/* Sidebar */}
        <div className="fixed left-0 top-20 w-64 h-[calc(100vh-80px)] bg-white shadow-md overflow-y-auto z-30">
          <BeeSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 mr-80 px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <Outlet context={{ recarregarRepositorios: carregarRepositorios }} />
          </div>
        </div>

        {/* Right Sidebar - Repositórios */}
        <div className="fixed right-0 top-20 w-80 h-[calc(100vh-80px)] bg-white shadow-md overflow-y-auto z-30 p-4">
          <h2 className="text-lg font-bold mb-4 text-[#333333]">Repositórios</h2>
          <div className="space-y-4">
            {repositorios.length === 0 && <p className="text-gray-500">Nenhum repositório encontrado.</p>}
            {repositorios.map((repo) => {
              const tags = categoriasParaTags(repo.categorias)
              return (
                <BeeRepo
                  key={repo.id}
                  id={repo.id}
                  usuario={repo.usuario}
                  titulo={repo.titulo}
                  descricao={repo.descricao}
                  imagemRepo={repo.imagem}
                  dataPublicacao={repo.dataPublicacao}
                  tags={tags}
                  onExcluir={handleExcluirRepositorio}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
