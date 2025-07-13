import type React from "react"

import BeeHeader from "../../components/BeeHeader/BeeHeader"
import { BeeSidebar } from "../../components/BeeSidebar/BeeSidebar"
import BeeRepo from "../../components/BeeRepo/BeeRepo"
import type { Repositorio, Tag } from "../../interfaces/Repositorio"
import RepositorioService from "../../services/models/RepositorioService"
import CategoriaService from "../../services/models/CategoriaService"
import type { Categoria } from "../../interfaces/Categoria"
import PostagemService from "../../services/models/PostagemService"
import BeePost from "../../components/BeePost/BeePost"
import type { BeePostProps } from "../../components/BeePost/IBeePost"
import { useEffect, useState } from "react"
import { Empty } from "antd"
import getLocalStorage from "../../utils/getLocalStorage"
import BeeDropdown from "../../components/BeeDropdown/BeeDropdown"
import type { ICategoria } from "../../components/BeeDropdown/IBeeDropdown"
import type IBeeTags from "../../components/BeeTags/IBeeTags"


interface Usuario {
  username: string
}

const LayoutFeed: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined)
  const [repositorios, setRepositorios] = useState<Repositorio[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [postagensComunidade, setPostagensComunidade] = useState<BeePostProps[]>([])
  const [postagensSeguidores, setPostagensSeguidores] = useState<BeePostProps[]>([])
  const [allPost, setAllPost] = useState<BeePostProps[]>([])

  const [categoriaFiltro, setCategoriaFiltro] = useState<ICategoria | null>(null)
  const [postagensFiltradas, setPostagensFiltradas] = useState<BeePostProps[]>([])
  const [mostrarFiltradas, setMostrarFiltradas] = useState(false)
  const [dropdownAberto, setDropdownAberto] = useState(false)
  const [carregandoFiltro, setCarregandoFiltro] = useState(false)

  useEffect(() => {
    const user = getLocalStorage()
    if (user && user.username && usuario === undefined) {
      setUsuario({ username: user.username })
    }
  }, [usuario])

  const [secaoAtual, setSecaoAtual] = useState("1")

  const carregarRepositorios = async () => {
    try {
      const response = await RepositorioService.listAll()
      setRepositorios(response.data || [])
    } catch (error) {
      console.error("Erro ao carregar repositórios:", error)
      setRepositorios([])
    }
  }

  const carregarPostagem = async () => {
    try {
      const response = await PostagemService.getPostByCommunity(usuario?.username ?? "")
      setPostagensComunidade(response.data)
    } catch (error) {
      console.error("Erro ao carregar usuario:", error)
    }
  }

  const carregarPostagemSeguidores = async () => {
    try {
      const response = await PostagemService.getPostByFollowers(usuario?.username ?? "")
      setPostagensSeguidores(response.data)
    } catch (error) {
      console.error("Erro ao carregar usuario:", error)
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

  const carregarPostDefault = async () => {
    try {
      const response = await PostagemService.listAll()
      setAllPost(response.data || [])
    } catch (error) {
      console.error("Erro ao carregar todas as postagens:", error)
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

  const handleExcluirPostagem = (id: number) => {
    console.log("Excluindo postagem:", id)
  }

  const categoriasParaTagsRepositorio = (categoriasIds: number[]): Tag[] => {
    if (!categoriasIds || categoriasIds.length === 0) return []

    const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
      tec: "magenta",
      mat: "orange",
      per: "cyan",
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

  const categoriasParaTagsPostagem = (categoriasIds: number[]): IBeeTags[] => {
    if (!categoriasIds || categoriasIds.length === 0) return []

    const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
      tec: "magenta",
      mat: "orange",
      per: "cyan",
    }

    const defaultColor = "#6FCF97"

    const tagsValidas: IBeeTags[] = []

    for (const categoriaId of categoriasIds) {
      const categoria = categorias.find((c) => c.id === categoriaId)

      if (categoria) {
        tagsValidas.push({
          label: categoria.nome,
          color: coresPorTipo[categoria.tipo as "tec" | "mat" | "per"] || defaultColor,
        })
      }
    }

    return tagsValidas
  }

  const obterPostagensParaExibir = (): BeePostProps[] => {
    if (mostrarFiltradas && categoriaFiltro) {
      return postagensFiltradas
    }

    if (usuario !== undefined) {
      return secaoAtual === "1" ? postagensComunidade : postagensSeguidores
    }

    return allPost
  }

  const obterMensagemVazia = (): string => {
    if (mostrarFiltradas && categoriaFiltro) {
      return `Nenhuma publicação encontrada para a categoria "${categoriaFiltro.nome}"`
    }

    if (usuario !== undefined) {
      return secaoAtual === "1"
        ? "Sem publicações das comunidades que você segue"
        : "Sem publicações das pessoas que você segue"
    } else {
      return "Sem publicações no bizzu"
    }
  }

  const filtrarPostagensPorCategoria = async (categoria: ICategoria) => {
    setCategoriaFiltro(categoria)
    setMostrarFiltradas(true)
    setDropdownAberto(false)
    setCarregandoFiltro(true)

    try {

      if (usuario !== undefined) {
        const response = await PostagemService.getFeedFiltradoPorCategoria(categoria.nome)
        setPostagensFiltradas(response.data.postagens || [])
      } else {
        const filtradas = allPost.filter((post) => {
          return post.categorias && post.categorias.includes(categoria.id)
        })
        setPostagensFiltradas(filtradas)
      }
    } catch (error) {
      console.error("Erro ao filtrar postagens:", error)
      let postagensParaFiltrar: BeePostProps[] = []

      if (usuario !== undefined) {
        postagensParaFiltrar = secaoAtual === "1" ? postagensComunidade : postagensSeguidores
      } else {
        postagensParaFiltrar = allPost
      }

      const filtradas = postagensParaFiltrar.filter((post) => {
        return post.categorias && post.categorias.includes(categoria.id)
      })
      setPostagensFiltradas(filtradas)
    } finally {
      setCarregandoFiltro(false)
    }
  }

  const limparFiltro = () => {
    setCategoriaFiltro(null)
    setMostrarFiltradas(false)
    setPostagensFiltradas([])
    setDropdownAberto(false)
  }

  const toggleDropdown = () => {
    setDropdownAberto(!dropdownAberto)
  }

  useEffect(() => {
    if (usuario === undefined) {
      carregarPostDefault()
    } else {
      carregarPostagem()
      carregarRepositorios()
      carregarPostagemSeguidores()
    }
    carregarCategorias()
  }, [usuario])

  const handleSelecionarSecao = (secao: string) => {
    setSecaoAtual(secao)
    if (categoriaFiltro) {
      limparFiltro()
    }
  }

  return (
    <>
      <BeeHeader />
      <div className="flex flex-col flex-1 items-start w-200 mt-20">
        <BeeSidebar onSelecionarSecao={handleSelecionarSecao} />
        <div className="fixed top-[80px] left-1/5 w-200 h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
          <div className="w-full max-w-[500px] px-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1">
                {categoriaFiltro && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">
                      Filtrando por: <span className="font-semibold">{categoriaFiltro.nome}</span>
                    </span>
                    <button onClick={limparFiltro} className="text-xs text-blue-600 hover:text-blue-800 underline">
                      Limpar filtro
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center shadow-md"
                  title="Filtrar por categoria"
                  disabled={carregandoFiltro}
                >
                  {carregandoFiltro ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <img src="/filter-icon.png" alt="Filtro" className="w-5 h-5" />
                  )}
                </button>

                {dropdownAberto && (
                  <div className="absolute top-12 right-0 z-50">
                    <BeeDropdown
                      placeholder="Filtrar por categoria"
                      onSelect={filtrarPostagensPorCategoria}
                      selectedCategory={categoriaFiltro}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              {carregandoFiltro ? (
                <div className="flex justify-center items-center py-8">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Filtrando postagens...</span>
                  </div>
                </div>
              ) : obterPostagensParaExibir().length > 0 ? (
                <div>
                  {obterPostagensParaExibir().map((post) => {
                    const tags = categoriasParaTagsPostagem(post.categorias || [])
                    return (
                      <BeePost
                        key={post.id}
                        id={post.id}
                        texto={post.texto}
                        tags={tags}
                        curtidas={post.curtidas || 0}
                        comentarios={post.comentarios || 0}
                        usuario={post.usuario}
                        dataPublicacao={post.dataPublicacao}
                        imagemPost={post.imagemPost}
                        onCurtir={() => console.log("Curtir post:", post.id)}
                        onAbrirComentarios={() => console.log("Abrir comentários:", post.id)}
                        onExcluir={post.onExcluir ? () => handleExcluirPostagem(post.id || 0) : undefined}
                        imagemUsuarioLogado={post.imagemUsuarioLogado}
                        disableInteractions={post.disableInteractions}
                      />
                    )
                  })}
                </div>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={obterMensagemVazia()} />
              )}
            </div>
          </div>
        </div>
        <aside className="fixed top-[80px] right-4 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
          <h2 className="text-lg font-bold mb-2">Repositórios</h2>
          {repositorios.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nenhum repositório encontrado" />
          )}
          {repositorios.map((repo) => {
            const tags = categoriasParaTagsRepositorio(repo.categorias)
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
        </aside>
      </div>
    </>
  )
}

export default LayoutFeed
