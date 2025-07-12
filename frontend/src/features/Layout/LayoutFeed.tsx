import React from "react";

import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import {Repositorio, Tag} from "../../interfaces/Repositorio";
import RepositorioService from "../../services/models/RepositorioService";
import CategoriaService from "../../services/models/CategoriaService";
import type {Categoria} from "../../interfaces/Categoria";
import PostagemService from "../../services/models/PostagemService";
import BeePost from "../../components/BeePost/BeePost";
import {BeePostProps} from "../../components/BeePost/IBeePost";
import {useEffect, useState} from "react";
import {Empty} from "antd";
import getLocalStorage from "../../utils/getLocalStorage";
const LayoutFeed: React.FC = () => {
	const [usuario, setUsuario] = useState<any>();
	const [repositorios, setRepositorios] = useState<Repositorio[]>([]);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [postagensComunidade, setPostagensComunidade] = useState<
		BeePostProps[]
	>([]);
	const [postagensSeguidores, setPostagensSeguidores] = useState<
		BeePostProps[]
	>([]);
	const [allPost, setAllPost] = useState<BeePostProps[]>([]);

	if (getLocalStorage() !== null && usuario === undefined) {
		setUsuario(getLocalStorage().username);
	}

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
			const response = await PostagemService.getPostByCommunity(usuario);
			setPostagensComunidade(response.data);
		} catch (error) {
			console.error("Erro ao carregar usuario:", error);
		}
	};

	const carregarPostagemSeguidores = async () => {
		try {
			const response = await PostagemService.getPostByFollowers(usuario);
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
			console.log(response);

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

	// Função para converter categorias em tags
	const categoriasParaTags = (categoriasIds: number[]): Tag[] => {
		if (!categoriasIds || categoriasIds.length === 0) return [];

		const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
			tec: "magenta",
			mat: "orange",
			per: "cyan",
		};

		const defaultColor = "#6FCF97";

		const tagsValidas: Tag[] = [];

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

	useEffect(() => {
		if (usuario === undefined) carregarPostDefault();
		else {
			carregarPostagem();
			carregarRepositorios();
			carregarCategorias();
			carregarPostagemSeguidores();
		}
		console.log(categorias);
	}, []);

	const handleSelecionarSecao = (secao: string) => {
		setSecaoAtual(secao);
	};

	return (
		<>
			<BeeHeader />
			<div className="flex flex-col flex-1 items-start w-200 mt-20">
				<BeeSidebar onSelecionarSecao={handleSelecionarSecao} />
				<div className="fixed top-[80px] left-1/5 w-200 h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-full max-w-[500px] px-4 flex flex-col">
						{usuario !== undefined ? (
							<div>
								{secaoAtual === "1" ? (
									<div>
										{postagensComunidade.length > 0 ? (
											<div>
												{postagensComunidade.map((post) => {
													const tags: any = categoriasParaTags(post.categorias);
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
															onCurtir={() => post.id}
															onAbrirComentarios={() => post.id}
															onExcluir={() => {}}
														/>
													);
												})}
											</div>
										) : (
											<Empty
												image={Empty.PRESENTED_IMAGE_SIMPLE}
												description="Sem publicações das comunidades que você segue"
											/>
										)}
									</div>
								) : (
									<div>
										{postagensSeguidores.length > 0 ? (
											<div>
												{postagensSeguidores.map((post) => {
													const tags: any = categoriasParaTags(post.categorias);
													return (
														<BeePost
															id={post.id}
															texto={post.texto}
															tags={tags}
															curtidas={post.curtidas || 0}
															comentarios={post.comentarios || 0}
															usuario={post.usuario}
															dataPublicacao={post.dataPublicacao}
															imagemPost={post.imagem}
															onCurtir={() => post.id}
															onAbrirComentarios={() => post.id}
															onExcluir={() => {}}
														/>
													);
												})}
											</div>
										) : (
											<Empty
												image={Empty.PRESENTED_IMAGE_SIMPLE}
												description="Sem publicações das pessoas que você segue"
											/>
										)}
									</div>
								)}
							</div>
						) : (
							<div>
								{allPost.length > 0 ? (
									<div>
										{allPost.map((post) => {
											const tags: any = categoriasParaTags(post.categorias);
											return (
												<BeePost
													id={post.id}
													texto={post.texto}
													tags={tags}
													curtidas={post.curtidas || 0}
													comentarios={post.comentarios || 0}
													usuario={post.usuario}
													dataPublicacao={post.dataPublicacao}
													imagemPost={post.imagem}
													onCurtir={() => post.id}
													onAbrirComentarios={() => post.id}
													onExcluir={() => {}}
												/>
											);
										})}
									</div>
								) : (
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description="Sem publicações no bizzu"
									/>
								)}
							</div>
						)}
					</div>
				</div>
				<aside className="fixed top-[80px] right-4 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
					<h2 className="text-lg font-bold mb-2">Repositórios</h2>
					{repositorios.length === 0 && (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description="Nenhum repositório encontrado"
						/>
					)}
					{repositorios.map((repo) => {
						const tags = categoriasParaTags(repo.categorias);
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
						);
					})}
				</aside>
			</div>
		</>
	);
};

export default LayoutFeed;
