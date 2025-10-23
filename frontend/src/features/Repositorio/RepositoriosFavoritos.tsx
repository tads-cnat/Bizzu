"use client";

import type React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowLeft, FolderNotchOpen} from "@phosphor-icons/react";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import UsuarioService from "../../services/models/UsuarioService";
import type {
	IRepositorio,
	ITag,
	ICategoria,
} from "../../interfaces/Repositorio";
import acessAuth from "../../utils/acessAuth";

const RepositoriosFavoritos: React.FC = () => {
	const navigate = useNavigate();
	const {id: usuarioId} = acessAuth();
	const [repositoriosFavoritos, setRepositoriosFavoritos] = useState<
		IRepositorio[]
	>([]);
	const [loading, setLoading] = useState(true);

	const carregarRepositoriosFavoritos = async () => {
		if (!usuarioId || usuarioId === 0) return;

		try {
			setLoading(true);
			const response = await UsuarioService.obterRepositoriosFavoritos();
			setRepositoriosFavoritos(response || []);
		} catch (error) {
			console.error("Erro ao carregar repositórios favoritos:", error);
			setRepositoriosFavoritos([]);
		} finally {
			setLoading(false);
		}
	};

	const categoriasParaTags = (categorias: ICategoria[]): ITag[] => {
		if (!categorias || categorias.length === 0) return [];

		const coresPorTipo: Record<string, string> = {
			tec: "magenta",
			mat: "orange",
			per: "cyan",
		};

		return categorias.map((categoria) => ({
			label: categoria.nome,
			color: coresPorTipo[categoria.tipo] || "magenta",
			tipo: categoria.tipo,
		}));
	};

	useEffect(() => {
		if (!usuarioId || usuarioId === 0) {
			navigate("/login");
			return;
		}

		carregarRepositoriosFavoritos();
	}, [usuarioId, navigate]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div>Carregando...</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex items-center gap-4 mb-6">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
				>
					<ArrowLeft size={20} />
					<span>Voltar</span>
				</button>
			</div>

			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					Repositórios Favoritos
				</h1>
				<p className="text-gray-600">
					Seus repositórios salvos para acesso rápido
				</p>
			</div>

			{/* Lista de repositórios favoritos */}
			{repositoriosFavoritos.length === 0 ? (
				<div className="text-center py-16">
					<div className="flex justify-center mb-4">
						<FolderNotchOpen
							size={64}
							className="text-gray-400"
						/>
					</div>
					<h3 className="text-xl font-semibold text-gray-700 mb-2">
						Nenhum repositório favorito
					</h3>
					<p className="text-gray-500 mb-6">
						Você ainda não favoritou nenhum repositório. Explore e encontre
						conteúdos interessantes!
					</p>
					<button
						onClick={() => navigate("/")}
						className="bg-[#FCBD18] hover:bg-[#E6A815] text-white px-6 py-3 rounded-lg font-medium transition-colors"
					>
						Explorar Repositórios
					</button>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{repositoriosFavoritos.map((repositorio) => {
						const tags = categoriasParaTags(repositorio.categorias);
						return (
							<BeeRepo
								key={repositorio.id}
								id={repositorio.id}
								usuario={repositorio.usuario!} // Garantindo que não é null
								titulo={repositorio.titulo}
								descricao={repositorio.descricao}
								imagemRepo={repositorio.imagem}
								dataPublicacao={repositorio.dataPublicacao}
								tags={tags}
								onExcluir={() => {}} // Usuário não pode excluir repositórios de outros
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default RepositoriosFavoritos;
