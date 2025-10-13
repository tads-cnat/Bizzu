import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {ArrowLeft, Star} from "@phosphor-icons/react";
import {Empty, Spin} from "antd";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import {IRepositorio} from "../../interfaces/Repositorio";
import UsuarioService from "../../services/models/UsuarioService";
import RepositorioService from "../../services/models/RepositorioService";
import acessAuth from "../../utils/acessAuth";

const RepositoriosFavoritos: React.FC = () => {
	const [repositoriosFavoritos, setRepositoriosFavoritos] = useState<
		IRepositorio[]
	>([]);
	const [loading, setLoading] = useState(true);
	const {username} = useParams();
	const navigate = useNavigate();
	const {username: usernameLogado} = acessAuth();

	const isOwnProfile = username === usernameLogado;

	useEffect(() => {
		carregarRepositoriosFavoritos();
	}, [username]);

	const carregarRepositoriosFavoritos = async () => {
		try {
			setLoading(true);
			const response = await UsuarioService.getRepositoriosFavoritos();
			setRepositoriosFavoritos(response);
		} catch (error) {
			console.error("Erro ao carregar repositórios favoritos:", error);
			setRepositoriosFavoritos([]);
		} finally {
			setLoading(false);
		}
	};

	const handleVoltar = () => {
		navigate(`/${username}`);
	};

	const handleExcluirRepositorio = async (id: number) => {
		try {
			await RepositorioService.delete(id);
			setRepositoriosFavoritos((prev) => prev.filter((repo) => repo.id !== id));
		} catch (error) {
			console.error("Erro ao excluir repositório:", error);
			alert("Erro ao excluir repositório. Tente novamente.");
		}
	};

	const categoriasParaTagsRepositorio = (categoriasIds: number[]) => {
		if (!categoriasIds || categoriasIds.length === 0) return [];

		const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
			tec: "magenta",
			mat: "orange",
			per: "cyan",
		};

		// Criar tags simples baseadas no ID da categoria
		return categoriasIds.map((categoriaId) => ({
			label: `Categoria ${categoriaId}`,
			color: "magenta",
			tipo: "tec" as const,
		}));
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="w-full max-w-7xl mx-auto p-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<button
						onClick={handleVoltar}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors hover:bg-gray-100 px-3 py-2 rounded-lg"
					>
						<ArrowLeft size={20} />
						<span className="font-medium">Voltar ao perfil</span>
					</button>
				</div>

				{/* Lista de repositórios favoritos */}
				{repositoriosFavoritos.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl">
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description={
								<div className="text-center">
									<p className="text-gray-600 mb-2">
										{isOwnProfile
											? "Você ainda não favoritou nenhum repositório"
											: "Este usuário não possui repositórios favoritos públicos"}
									</p>
									<p className="text-sm text-gray-400">
										{isOwnProfile &&
											"Explore repositórios e favorite os que mais gostar!"}
									</p>
								</div>
							}
						/>
					</div>
				) : (
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<p className="text-lg font-semibold text-gray-800">
								{repositoriosFavoritos.length}{" "}
								{repositoriosFavoritos.length === 1
									? "repositório favoritado"
									: "repositórios favoritados"}
							</p>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
							{repositoriosFavoritos.map((repo) => {
								const tags = categoriasParaTagsRepositorio(repo.categorias);
								return (
									<div
										key={repo.id}
										className="w-full"
									>
										<BeeRepo
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
											onExcluir={
												repo.usuario?.username === usernameLogado
													? handleExcluirRepositorio
													: undefined
											}
										/>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default RepositoriosFavoritos;
