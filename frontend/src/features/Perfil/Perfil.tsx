import BeeAbasPerfil from "./components/BeeAbasPerfil/BeeAbasPerfil";
import type React from "react";
import {useEffect, useState} from "react";
import BeePost from "../../components/BeePost/BeePost";
import PostagemService from "../../services/models/PostagemService";
import ComunidadeService from "../../services/models/ComunidadeService";
import CategoriaService from "../../services/models/CategoriaService";
import type {Postagem, Tag} from "../../interfaces/Postagem";
import type {Comunidade} from "../../interfaces/Comunidade";
import type {Categoria} from "../../interfaces/Categoria";
import {useParams} from "react-router-dom";
import UsuarioService from "../../services/models/UsuarioService";
import BeeAlert from "../../components/BeeAlert/BeeAlert";
import {IBeeUser} from "./components/BeeHeaderProfile/IBeeUser";
import BeeHeaderProfile from "./components/BeeHeaderProfile/BeeHeaderProfile";

// === LINHA ADICIONADA: import do componente de sidebar ===
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";
import acessPermissions from "../../utils/acessPermissions";

const Perfil: React.FC = () => {
	const [postagens, setPostagens] = useState<Postagem[]>([]);
	const [comunidades, setComunidades] = useState<Comunidade[]>([]);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [error, setError] = useState<string | null>(null);
	const identificator = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [alertActivate, setAlertActivate] = useState<Boolean>(false);
	const {permissions} = acessPermissions();

	useEffect(() => {
		if (usuario === undefined) {
			void UsuarioService.getbyUsername(String(identificator))
				.then((response) => {
					setUsuario(response);
				})
				.catch(() => {
					console.log("Não recebeu dados");
				});
		}
	}, []);

	useEffect(() => {
		if (usuario !== undefined) {
			loadComunidades();
			loadCategorias();
			loadPostagens();
		}
	}, [usuario]);

	const handleCurtir = async (postagemId?: number) => {
		console.log("Curtir postagem:", postagemId);
		// Aqui será implementada a lógica de curtir
	};

	const handleComentar = async (postagemId?: number) => {
		console.log("Comentar postagem:", postagemId);
		// Aqui será implementada a lógica de comentar
	};

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
			tec: "#FCBD18",
			mat: "#058B92",
			per: "#F2C94C",
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
		setError(null);
		try {
			const response = await PostagemService.getPost(usuario.id);
			setPostagens(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Erro ao carregar postagens:", error);
			setError("Erro ao carregar postagens. Verifique sua conexão.");
		}
	};

	console.log("Permissões: ", permissions);

	return (
		<>
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
							const comunidadeNome = getComunidadeNome(post.comunidade ?? null);

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
					<div>Nenhuma postagem encontrada</div>
				)}
				<div>Parte dos repositórios</div>
			</BeeAbasPerfil>

			<aside className="fixed top-[80px] right-4 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
				<BeePerfilSidebar />
			</aside>
		</>
	);
};

export default Perfil;
