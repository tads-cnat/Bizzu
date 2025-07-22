import BeeAbasPerfil from "./components/BeeAbasPerfil/BeeAbasPerfil";
import type React from "react";
import {useEffect, useState} from "react";
import BeePost from "../../components/BeePost/BeePost";
import PostagemService from "../../services/models/PostagemService";
import ComunidadeService from "../../services/models/ComunidadeService";
import CategoriaService from "../../services/models/CategoriaService";
import type {Postagem, Tag} from "../../interfaces/Postagem";
import type {Comunidade} from "../../interfaces/Comunidade";
import type {Categoria} from "../../interfaces/IBeeCategoria";
import {useParams} from "react-router-dom";
import UsuarioService from "../../services/models/UsuarioService";
import BeeAlert from "../../components/BeeAlert/BeeAlert";
import {IBeeUser} from "./components/BeeHeaderProfile/IBeeUser";
import BeeHeaderProfile from "./components/BeeHeaderProfile/BeeHeaderProfile";
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";
import acessPermissions from "../../utils/acessPermissions";
import {Empty, Spin} from "antd";
import FormCategoria from "./Form/FormCategoria";
import BeeEditTag from "./components/BeeEditTag/BeeEditTag";
import BeeButton from "../../components/BeeButtons/BeeButtons";
import {IRepositorio} from "../../interfaces/Repositorio";
import RepositorioService from "../../services/models/RepositorioService";
import BeeRepo from "../../components/BeeRepo/BeeRepo";

const Perfil: React.FC = () => {
	const [postagens, setPostagens] = useState<Postagem[]>([]);
	const [comunidades, setComunidades] = useState<Comunidade[]>([]);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [repositorio, setRepositorio] = useState<IRepositorio[]>([]);
	const identificator = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [alertActivate, setAlertActivate] = useState<Boolean>(false);
	let {permissions, load} = acessPermissions();
	const [abrirModal, setModal] = useState<Boolean>(false);
	const [key, setKey] = useState<number>(0);

	useEffect(() => {
		if (usuario === undefined) {
			void UsuarioService.getbyUsername(String(identificator))
				.then((response) => {
					setUsuario(response);
				})
				.catch(() => {
					console.error("Não recebeu dados");
				});
		}
	}, []);

	useEffect(() => {
		if (usuario !== undefined) {
			loadComunidades();
			loadCategorias();
			loadPostagens();
			loadRepositorio();
		}
	}, [usuario]);

	const handleExcluir = async (postagemId: number) => {
		try {
			await PostagemService.delete(postagemId);
			// Remover a postagem da lista local
			setPostagens((prev) => prev.filter((post) => post.id !== postagemId));
			setAlertActivate(true);
			setTimeout(() => {
				setAlertActivate(false);
			}, 3000);
		} catch (error) {
			console.error("Erro ao excluir postagem:", error);
			alert("Erro ao excluir postagem. Tente novamente.");
		}
	};

	// Função para buscar nome da comunidade pelo ID
	const getComunidadeNome = (comunidadeId: number | null): string | null => {
		if (!comunidadeId) return null;
		const comunidade = comunidades.find((c) => c.id === comunidadeId);
		return comunidade?.nome || null;
	};

	// Função para converter categorias em tags para o componente BeePost
	const categoriasParaTags = (categoriasIds: number[]): Tag[] => {
		if (!categoriasIds || categoriasIds.length === 0) return [];

		// Cores por tipo de categoria
		const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
			tec: "magenta",
			mat: "orange",
			per: "cyan",
		};

		const defaultColor = "#6FCF97";

		// Filtrar e mapear categorias válidas
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

	const handleExcluirRepositorio = async (id: number) => {
		try {
			await RepositorioService.delete(id);
			setRepositorio((prev) => prev.filter((repo) => repo.id !== id));
		} catch (error) {
			console.error("Erro ao excluir repositório:", error);
		}
	};

	const loadComunidades = async () => {
		try {
			const response = await ComunidadeService.listAll();
			if (response.data && Array.isArray(response.data)) {
				setComunidades(response.data);
			}
		} catch (error) {
			console.error("Erro ao carregar comunidades:", error);
		}
	};

	const loadRepositorio = async () => {
		try {
			const response = await RepositorioService.listAll();
			if (response.data && Array.isArray(response.data)) {
				setRepositorio(response.data);
			}
		} catch (error) {
			console.error("Erro ao carregar repositorios:", error);
		}
	};

	const loadCategorias = async () => {
		try {
			const response = await CategoriaService.listAll();
			if (response.data && Array.isArray(response.data)) {
				setCategorias(response.data);
			}
		} catch (error) {
			console.error("Erro ao carregar categorias:", error);
		}
	};

	const loadPostagens = async (): Promise<void> => {
		try {
			const response = await PostagemService.getPost(usuario.id);
			setPostagens(response.data);
		} catch (error) {
			console.error("Erro ao carregar postagens:", error);
		}
	};

	const modal = () => {
		if (!abrirModal) return null;
		return (
			<FormCategoria
				key={key}
				label="Criar Categoria"
			/>
		);
	};

	return (
		<>
			{!load ? (
				<Spin />
			) : (
				<div>
					{alertActivate && (
						<BeeAlert
							typeAlert="success"
							messageAlert="Postagem excluída com sucesso!"
						/>
					)}
					<BeeHeaderProfile />
					<BeeAbasPerfil initialActiveKey="1">
						{postagens?.length ? (
							<div className="space-y-4">
								{postagens.map((post: Postagem) => {
									const tags = categoriasParaTags(post.categorias);
									const comunidadeNome = getComunidadeNome(
										post.comunidade ?? null,
									);

									return (
										<div
											key={post.id}
											className="mb-6"
										>
											{comunidadeNome && (
												<div className="bg-white p-2 rounded-t-lg border-b border-gray-200">
													<p className="text-sm text-gray-600">
														<span className="font-medium">Comunidade:</span>{" "}
														{comunidadeNome}
													</p>
												</div>
											)}

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
												onCurtir={() => handleCurtir(post.id)}
												onAbrirComentarios={() => handleComentar(post.id)}
												onExcluir={handleExcluir}
											/>
										</div>
									);
								})}
							</div>
						) : (
							<Empty
								description="Não há postagens"
								image={Empty.PRESENTED_IMAGE_SIMPLE}
							/>
						)}
						{repositorio.filter(
							(repo: IRepositorio) =>
								repo.usuario && usuario && repo.usuario.id === usuario.id,
						).length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{repositorio
									.filter(
										(repo: IRepositorio) =>
											repo.usuario && usuario && repo.usuario.id === usuario.id,
									)
									.map((repo: IRepositorio) => {
										const tags = categoriasParaTags(repo.categorias);
										const comunidadeNome = getComunidadeNome(
											repo.comunidade ?? null,
										);

										return (
											<>
												<BeeRepo
													id={repo.id}
													descricao={repo.descricao}
													dataPublicacao={repo.dataPublicacao}
													usuario={repo.usuario}
													titulo={repo.titulo}
													tags={tags}
													comunidade={comunidadeNome}
													imagemRepo={repo.imagem}
													onExcluir={handleExcluirRepositorio}
												/>
											</>
										);
									})}
							</div>
						) : (
							<Empty
								description="Não há repositórios"
								image={Empty.PRESENTED_IMAGE_SIMPLE}
							/>
						)}
						<div>
							<BeeButton
								label="Adicionar categoria"
								onClick={() => {
									setModal(true);
									setKey((prev) => prev + 1);
								}}
							/>
							{/* <FormCategoria /> */}
							<BeeEditTag />
						</div>
					</BeeAbasPerfil>

					<aside className="fixed top-[80px] right-4 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
						<BeePerfilSidebar />
					</aside>
				</div>
			)}
			{modal()}
		</>
	);
};

export default Perfil;
