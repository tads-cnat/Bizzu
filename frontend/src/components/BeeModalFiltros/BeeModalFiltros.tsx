"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "@phosphor-icons/react"
import BeeFiltroCategorias from "../BeeFiltroCategorias/BeeFiltroCategorias"
import CategoriaService from "../../services/models/CategoriaService"
import type { Categoria } from "../../interfaces/Categoria"
import type { IBeeModalFiltros, FiltrosPostagem } from "./IBeeModalFiltros"

const BeeModalFiltros: React.FC<IBeeModalFiltros> = ({ isOpen, onClose, onAplicarFiltros, filtrosAtuais }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(false)

  // Estados para os filtros selecionados
  const [tecnologiasSelecionadas, setTecnologiasSelecionadas] = useState<number[]>([])
  const [cursosSelecionados, setCursosSelecionados] = useState<number[]>([])
  const [periodosSelecionados, setPeriodosSelecionados] = useState<number[]>([])

  // Carregar categorias
  useEffect(() => {
    const carregarCategorias = async () => {
      setLoading(true)
      try {
        const response = await CategoriaService.listAll()
        setCategorias(response.data || [])
      } catch (error) {
        console.error("Erro ao carregar categorias:", error)
        setCategorias([])
      } finally {
        setLoading(false)
      }
    }

    carregarCategorias()
  }, [])

  // Sincronizar com filtros ativos externos
  useEffect(() => {
    if (filtrosAtuais) {
      setTecnologiasSelecionadas(filtrosAtuais.tecnologias || [])
      setCursosSelecionados(filtrosAtuais.cursos || [])
      setPeriodosSelecionados(filtrosAtuais.periodos || [])
    } else {
      setTecnologiasSelecionadas([])
      setCursosSelecionados([])
      setPeriodosSelecionados([])
    }
  }, [filtrosAtuais])

  const handleSelecionarCategoria = (tipo: "tec" | "mat" | "per") => (categoriaId: number) => {
    switch (tipo) {
      case "tec":
        setTecnologiasSelecionadas((prev) =>
          prev.includes(categoriaId) ? prev.filter((id) => id !== categoriaId) : [...prev, categoriaId],
        )
        break
      case "mat":
        setCursosSelecionados((prev) =>
          prev.includes(categoriaId) ? prev.filter((id) => id !== categoriaId) : [...prev, categoriaId],
        )
        break
      case "per":
        setPeriodosSelecionados((prev) =>
          prev.includes(categoriaId) ? prev.filter((id) => id !== categoriaId) : [...prev, categoriaId],
        )
        break
    }
  }

  const aplicarFiltros = () => {
    const filtros: FiltrosPostagem = {
      tecnologias: tecnologiasSelecionadas,
      cursos: cursosSelecionados,
      periodos: periodosSelecionados,
    }

    onAplicarFiltros(filtros)
    onClose()
  }

  const limparTodosFiltros = () => {
    setTecnologiasSelecionadas([])
    setCursosSelecionados([])
    setPeriodosSelecionados([])

    const filtrosVazios: FiltrosPostagem = {
      tecnologias: [],
      cursos: [],
      periodos: [],
    }

    onAplicarFiltros(filtrosVazios)
    onClose()
  }

  const totalFiltrosAtivos = tecnologiasSelecionadas.length + cursosSelecionados.length + periodosSelecionados.length

  const categoriasParaFiltro = (tipo: "tec" | "mat" | "per") => categorias.filter((cat) => cat.tipo === tipo)

  const selecionadasParaTipo = (tipo: "tec" | "mat" | "per") => {
    switch (tipo) {
      case "tec":
        return tecnologiasSelecionadas
      case "mat":
        return cursosSelecionados
      case "per":
        return periodosSelecionados
      default:
        return []
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#333333]">Filtros Avançados</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Carregando categorias...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tecnologias */}
              <div>
                <h3 className="text-lg font-medium text-[#333333] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                  Tecnologias
                  {tecnologiasSelecionadas.length > 0 && (
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                      {tecnologiasSelecionadas.length}
                    </span>
                  )}
                </h3>
                <BeeFiltroCategorias
                  categorias={categoriasParaFiltro("tec")}
                  categoriasSelecionadas={tecnologiasSelecionadas}
                  aoSelecionarCategoria={handleSelecionarCategoria("tec")}
                  aoPesquisar={() => {}} // Implementar se necessário
                />
              </div>

              {/* Cursos/Matérias */}
              <div>
                <h3 className="text-lg font-medium text-[#333333] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                  Matérias
                  {cursosSelecionados.length > 0 && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      {cursosSelecionados.length}
                    </span>
                  )}
                </h3>
                <BeeFiltroCategorias
                  categorias={categoriasParaFiltro("mat")}
                  categoriasSelecionadas={cursosSelecionados}
                  aoSelecionarCategoria={handleSelecionarCategoria("mat")}
                  aoPesquisar={() => {}} // Implementar se necessário
                />
              </div>

              {/* Períodos */}
              <div>
                <h3 className="text-lg font-medium text-[#333333] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                  Períodos
                  {periodosSelecionados.length > 0 && (
                    <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs">
                      {periodosSelecionados.length}
                    </span>
                  )}
                </h3>
                <BeeFiltroCategorias
                  categorias={categoriasParaFiltro("per")}
                  categoriasSelecionadas={periodosSelecionados}
                  aoSelecionarCategoria={handleSelecionarCategoria("per")}
                  aoPesquisar={() => {}} // Implementar se necessário
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {totalFiltrosAtivos > 0 ? (
              <span>{totalFiltrosAtivos} filtro(s) selecionado(s)</span>
            ) : (
              <span>Nenhum filtro selecionado</span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={limparTodosFiltros}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Limpar Tudo
            </button>
            <button
              onClick={aplicarFiltros}
              className="px-6 py-2 bg-[#FCBD18] hover:bg-yellow-500 text-white rounded-lg transition-colors font-medium"
              disabled={totalFiltrosAtivos === 0}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeeModalFiltros
