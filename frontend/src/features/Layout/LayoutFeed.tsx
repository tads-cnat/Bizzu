"use client";

import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import RepositorioService from "../../services/models/RepositorioService";
import CategoriaService from "../../services/models/CategoriaService";
import PostagemService from "../../services/models/PostagemService";
import BeePost from "../../components/BeePost/BeePost";
import type {BeePostProps} from "../../components/BeePost/IBeePost";
import {useEffect, useState} from "react";
import {Empty} from "antd";
import getLocalStorage from "../../utils/getLocalStorage";
import type IBeeTags from "../../components/BeeTags/IBeeTags";
import BeeModalFiltros from "../../components/BeeModalFiltros/BeeModalFiltros";
import type {FiltrosPostagem} from "../../components/BeeModalFiltros/IBeeModalFiltros";
import {Funnel} from "@phosphor-icons/react";
import {IBeeCategoria} from "../../interfaces/IBeeCategoria";
import {IRepositorio} from "../../interfaces/Repositorio";

interface Usuario {
	username: string;
}

interface BeePostPropsExtended extends BeePostProps {
	categorias?: number[];
}

const LayoutFeed = () => {
	const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
	const [repositorios, setRepositorios] = useState<IRepositorio[]>([]);
	const [categorias, setCategorias] = useState<IBeeCategoria[]>([]);
	const [postagensComunidade, setPostagensComunidade] = useState<
		BeePostPropsExtended[]
	>([]);
	const [postagensSeguidores, setPostagensSeguidores] = useState<
		BeePostPropsExtended[]
	>([]);
	const [allPost, setAllPost] = useState<BeePostPropsExtended[]>([]);
	const [postagensFiltroAvancado, setPostagensFiltroAvancado] = useState<
		BeePostPropsExtended[]
	>([]);

	const [mostrarFiltradas, setMostrarFiltradas] = useState(false);
	const [carregandoFiltroAvancado, setCarregandoFiltroAvancado] =
		useState(false);
	const [filtrosAvancados, setFiltrosAvancados] =
		useState<FiltrosPostagem | null>(null);
	const [modalFiltrosAberto, setModalFiltrosAberto] = useState(false);

	useEffect(() => {
		const user = getLocalStorage();
		if (user && user.username && usuario === undefined) {
			setUsuario({username: user.username});
		}
	}, [usuario]);

	const [secaoAtual, setSecaoAtual] = useState("1");

	const carregarRepositorios = async () => {
		try {
			const response = await RepositorioService.listAll();
			setRepositorios(response.data || []);
		} catch (error) {
			console.error("Erro ao carregar repositórios:", error);
			setRepositorios([]);
		}
	};

	const carregarPostagem = async () => {
		try {
			const response = await PostagemService.getPostByCommunity(
				usuario?.username ?? "",
			);
			setPostagensComunidade(response.data);
		} catch (error) {
			console.error("Erro ao carregar usuario:", error);
		}
	};

	const carregarPostagemSeguidores = async () => {
		try {
			const response = await PostagemService.getPostByFollowers(
				usuario?.username ?? "",
			);
			setPostagensSeguidores(response.data);
		} catch (error) {
			console.error("Erro ao carregar usuario:", error);
		}
	};

	const carregarCategorias = async () => {
		try {
			const response = await CategoriaService.listAll();
			setCategorias(response.data || []);
		} catch (error) {
			console.error("Erro ao carregar categorias:", error);
			setCategorias([]);
		}
	};

	const carregarPostDefault = async () => {
		try {
			const response = await PostagemService.listAll();
			setAllPost(response.data || []);
		} catch (error) {
			console.error("Erro ao carregar todas as postagens:", error);
		}
	};

	const handleExcluirRepositorio = async (id: number) => {
		try {
			await RepositorioService.delete(id);
			setRepositorios((prev) => prev.filter((repo) => repo.id !== id));
		} catch (error) {
			console.error("Erro ao excluir repositório:", error);
			alert("Erro ao excluir repositório. Tente novamente.");
		}
	};

	const handleExcluirPostagem = (id: number) => {
		console.log("Excluindo postagem:", id);
	};

	const categoriasParaTagsRepositorio = (categoriasIds: number[]): Tag[] => {
		if (!categoriasIds || categoriasIds.length === 0) return [];

		const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
			tec: "magenta",
			mat: "orange",
			per: "cyan",
		};

		const defaultColor = "#6FCF97";

		const tagsValidas: IBeeTags[] = [];

		for (const categoriaId of categoriasIds) {
			const categoria = categorias.find((c) => c.id === categoriaId);

			if (
				categoria &&
				categoria.tipo &&
				(categoria.tipo === "tec" ||
					categoria.tipo === "mat" ||
					categoria.tipo === "per")
			) {
				tagsValidas.push({
					label: categoria.nome,
					color: coresPorTipo[categoria.tipo] || defaultColor,
					tipo: categoria.tipo,
				});
			}
		}

		return tagsValidas;
	};

	const categoriasParaTagsPostagem = (categoriasIds: number[]): IBeeTags[] => {
		if (!categoriasIds || categoriasIds.length === 0) return [];

		const coresPorTipo: Record<
			"tec" | "mat" | "per",
			"magenta" | "orange" | "cyan"
		> = {
			tec: "magenta",
			mat: "orange",
			per: "cyan",
		};

		const tagsValidas: IBeeTags[] = [];

		for (const categoriaId of categoriasIds) {
			const categoria = categorias.find((c) => c.id === categoriaId);

			if (
				categoria &&
				categoria.tipo &&
				(categoria.tipo === "tec" ||
					categoria.tipo === "mat" ||
					categoria.tipo === "per")
			) {
				tagsValidas.push({
					label: categoria.nome,
					color: coresPorTipo[categoria.tipo],
				});
			}
		}

		return tagsValidas;
	};

	const obterPostagensParaExibir = (): BeePostPropsExtended[] => {
		if (filtrosAvancados && mostrarFiltradas) {
			return postagensFiltroAvancado;
		}

		if (usuario !== undefined) {
			return secaoAtual === "1" ? postagensComunidade : postagensSeguidores;
		}

		return allPost;
	};

	const obterMensagemVazia = (): string => {
		if (filtrosAvancados && mostrarFiltradas) {
			const totalFiltros =
				(filtrosAvancados.tecnologias?.length || 0) +
				(filtrosAvancados.cursos?.length || 0) +
				(filtrosAvancados.periodos?.length || 0);
			return `Nenhuma publicação encontrada para os ${totalFiltros} filtros selecionados`;
		}

		if (usuario !== undefined) {
			return secaoAtual === "1"
				? "Sem publicações das comunidades que você segue"
				: "Sem publicações das pessoas que você segue";
		} else {
			return "Sem publicações no bizzu";
		}
	};

	const handleSelecionarSecao = (secao: string) => {
		setSecaoAtual(secao);
		if (filtrosAvancados) {
			limparFiltrosAvancados();
		}
	};

	const limparFiltrosAvancados = () => {
		setFiltrosAvancados(null);
		setMostrarFiltradas(false);
		setPostagensFiltroAvancado([]);
	};

	const aplicarFiltrosAvancados = async (filtros: FiltrosPostagem) => {
		// Se todos os arrays estão vazios, limpar filtros
		const temFiltros =
			filtros.tecnologias.length > 0 ||
			filtros.cursos.length > 0 ||
			filtros.periodos.length > 0;

		if (!temFiltros) {
			limparFiltrosAvancados();
			return;
		}

		setFiltrosAvancados(filtros);
		setMostrarFiltradas(true);
		setCarregandoFiltroAvancado(true);

		try {
			let postagensParaFiltrar: BeePostPropsExtended[] = [];

			if (usuario !== undefined) {
				postagensParaFiltrar =
					secaoAtual === "1" ? postagensComunidade : postagensSeguidores;
			} else {
				postagensParaFiltrar = allPost;
			}

			const filtradas = postagensParaFiltrar.filter((post) => {
				let atendeTecnologia = filtros.tecnologias.length === 0;
				let atendeCurso = filtros.cursos.length === 0;
				let atendePeriodo = filtros.periodos.length === 0;

				if (filtros.tecnologias.length > 0) {
					atendeTecnologia = filtros.tecnologias.some((tecId) =>
						post.categorias?.includes(tecId),
					);
				}

				if (filtros.cursos.length > 0) {
					atendeCurso = filtros.cursos.some((cursoId) =>
						post.categorias?.includes(cursoId),
					);
				}

				if (filtros.periodos.length > 0) {
					atendePeriodo = filtros.periodos.some((periodoId) =>
						post.categorias?.includes(periodoId),
					);
				}

				return atendeTecnologia && atendeCurso && atendePeriodo;
			});

			setPostagensFiltroAvancado(filtradas);
		} catch (error) {
			console.error("Erro ao filtrar postagens:", error);
		} finally {
			setCarregandoFiltroAvancado(false);
		}
	};

	useEffect(() => {
		if (usuario === undefined) {
			carregarPostDefault();
		} else {
			carregarPostagem();
			carregarRepositorios();
			carregarPostagemSeguidores();
		}
		carregarCategorias();
	}, [usuario]);

	const totalFiltrosAtivos = filtrosAvancados
		? (filtrosAvancados.tecnologias?.length || 0) +
			(filtrosAvancados.cursos?.length || 0) +
			(filtrosAvancados.periodos?.length || 0)
		: 0;

	return (
		<>
			<BeeHeader />
			<div className="flex flex-col flex-1 items-start w-1/5 mt-20">
				<BeeSidebar onSelecionarSecao={handleSelecionarSecao} />
				<div className="fixed top-[70px] ml-70 w-[66%] h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-[550px] px-4 flex flex-col">
						<div className="mb-4">
							{filtrosAvancados && (
								<div className="flex items-center gap-2 mb-3">
									<span className="text-sm text-gray-600">
										Filtros ativos:
										{filtrosAvancados.tecnologias.length > 0 && (
											<span className="ml-1 px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
												{filtrosAvancados.tecnologias.length} tecnologia(s)
											</span>
										)}
										{filtrosAvancados.cursos.length > 0 && (
											<span className="ml-1 px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
												{filtrosAvancados.cursos.length} curso(s)
											</span>
										)}
										{filtrosAvancados.periodos.length > 0 && (
											<span className="ml-1 px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs">
												{filtrosAvancados.periodos.length} período(s)
											</span>
										)}
									</span>
									<button
										onClick={limparFiltrosAvancados}
										className="text-xs text-blue-600 hover:text-blue-800 underline"
									>
										Limpar filtros
									</button>
								</div>
							)}

							<div className="flex justify-end">
								<button
									onClick={() => setModalFiltrosAberto(true)}
									className={`relative w-12 h-12 rounded-full transition-colors duration-200 flex items-center justify-center shadow-lg ${
										totalFiltrosAtivos > 0
											? "bg-[#058B92] hover:bg-teal-700"
											: "bg-[#FCBD18] hover:bg-yellow-500"
									}`}
									title="Filtros avançados"
								>
									<Funnel
										size={24}
										color="white"
										weight="bold"
									/>
									{totalFiltrosAtivos > 0 && (
										<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
											{totalFiltrosAtivos}
										</span>
									)}
								</button>
							</div>
						</div>

						<BeeModalFiltros
							isOpen={modalFiltrosAberto}
							onClose={() => setModalFiltrosAberto(false)}
							onAplicarFiltros={aplicarFiltrosAvancados}
							filtrosAtuais={filtrosAvancados}
						/>

						{/* Conteúdo das postagens */}
						<div>
							{carregandoFiltroAvancado ? (
								<div className="flex justify-center items-center py-8">
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
										<span className="text-gray-600">Aplicando filtros...</span>
									</div>
								</div>
							) : obterPostagensParaExibir().length > 0 ? (
								<div>
									{obterPostagensParaExibir().map((post) => {
										const tags = categoriasParaTagsPostagem(
											post.categorias || [],
										);
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
												imagemPost={post.imagem}
												comunidade={post.comunidade}
												onCurtir={() => console.log("Curtir post:", post.id)}
												onAbrirComentarios={() =>
													console.log("Abrir comentários:", post.id)
												}
												onExcluir={
													post.onExcluir
														? () => handleExcluirPostagem(post.id || 0)
														: undefined
												}
												imagemUsuarioLogado={post.imagemUsuarioLogado}
												disableInteractions={post.disableInteractions}
											/>
										);
									})}
								</div>
							) : (
								<Empty
									image={Empty.PRESENTED_IMAGE_SIMPLE}
									description={obterMensagemVazia()}
								/>
							)}
						</div>
					</div>
				</div>
				<aside className="fixed top-[70px] right-4 w-[22%] h-[calc(100vh-70px)] flex flex-col bg-white z-40 border-l border-gray-300">
					<div className="px-3 py-4 border-b border-gray-200">
						<h2 className="text-lg font-bold">Repositórios</h2>
					</div>
					<div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
						{repositorios.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full">
								<Empty
									image={Empty.PRESENTED_IMAGE_SIMPLE}
									description="Nenhum repositório encontrado"
								/>
							</div>
						) : (
							<div className="space-y-3">
								{repositorios.map((repo) => {
									const tags = categoriasParaTagsRepositorio(repo.categorias);
									return (
										<BeeRepo
											key={repo.id}
											id={repo.id}
											usuario={
												repo.usuario || {
													id: 0,
													nome: "Usuário não encontrado",
													username: "unknown",
													imagemPerfil: undefined,
												}
											}
											titulo={repo.titulo}
											descricao={repo.descricao}
											imagemRepo={repo.imagem}
											dataPublicacao={repo.dataPublicacao}
											tags={tags}
											onExcluir={handleExcluirRepositorio}
										/>
									);
								})}
							</div>
						)}
					</div>
				</aside>
			</div>
		</>
	);
};

export default LayoutFeed;
