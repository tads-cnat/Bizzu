import BeeAbasPerfil from "../../components/BeeAbasPerfil/BeeAbasPerfil";
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
import BeeHeaderProfile from "../../components/BeeHeaderProfile/BeeHeaderProfile";

const Perfil: React.FC = () => {
	const [postagens, setPostagens] = useState<Postagem[]>([]);
	const [comunidades, setComunidades] = useState<Comunidade[]>([]);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [error, setError] = useState<string | null>(null);
	const idUsuario = Number(useParams().id);

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
			alert("Postagem excluída com sucesso!");
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
			const response = await PostagemService.getPost(idUsuario);
			setPostagens(response.data);
		} catch (error) {
			console.error("Erro ao carregar postagens:", error);
			setError("Erro ao carregar postagens. Verifique sua conexão.");
		}
	};

	useEffect(() => {
		// Carregar dados necessários
		loadComunidades();
		loadCategorias();
		loadPostagens();
	}, []);

	return (
		<>
			<BeeHeaderProfile />
			<BeeAbasPerfil abas={["Postagens", "Repositórios", "Comentários"]} />
			{postagens?.length ? (
				<div className="space-y-4">
					{postagens.map((post: Postagem) => {
						// Converter categorias em tags
						const tags = categoriasParaTags(post.categorias);

						// Buscar nome da comunidade
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
									usuario={{
										nome: post.usuario?.nome,
										imagemPerfil: post.usuario?.imagemPerfil,
									}}
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
		</>
	);
};

export default Perfil;
