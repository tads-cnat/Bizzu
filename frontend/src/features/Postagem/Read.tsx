import type React from "react";
import {useEffect, useState} from "react";
import BeePost from "../../components/BeePost/BeePost";
import PostagemService from "../../services/models/PostagemService";
import ComunidadeService from "../../services/models/ComunidadeService";
import CategoriaService from "../../services/models/CategoriaService";

// Usuário padrão para postagens sem usuário atribuído
const DEFAULT_USER = {
	nome: "Usuário Bizzu",
	imagemPerfil:
		"https://saae.lucasdorioverde.mt.gov.br/arquivos/setores/sem_imagem_avatar.png",
};

// Imagem padrão do usuário logado
const DEFAULT_USER_IMAGE =
	"https://saae.lucasdorioverde.mt.gov.br/arquivos/setores/sem_imagem_avatar.png";

interface PostagemBackend {
	id: number;
	texto: string;
	imagem?: string;
	dataPublicacao: string;
	usuario?: {
		nome: string;
		imagemPerfil?: string;
	} | null;
	comunidade?: number | null;
	categorias: number[];
	curtidas?: number;
	comentarios?: number;
}

interface Comunidade {
	id: number;
	nome: string;
}

interface Categoria {
	id: number;
	nome: string;
	tipo: "tec" | "mat" | "per";
}

const Read: React.FC = () => {
	const [postagens, setPostagens] = useState<PostagemBackend[]>([]);
	const [comunidades, setComunidades] = useState<Comunidade[]>([]);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
			await PostagemService.delete(postagemId, {});
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
	const categoriasParaTags = (categoriasIds: number[]) => {
		if (!categoriasIds || categoriasIds.length === 0) return [];

		// Cores para alternar entre as tags
		const cores = ["#FCBD18", "#058B92", "#F2C94C", "#6FCF97"];

		return categoriasIds
			.map((categoriaId) => {
				const categoria = categorias.find((c) => c.id === categoriaId);
				return categoria ? categoria : null;
			})
			.filter((categoria) => categoria !== null)
			.map((categoria, index) => ({
				label: categoria!.nome,
				color: cores[index % cores.length],
			}));
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
		setLoading(true);
		setError(null);

		try {
			const response = await PostagemService.listAll();

			if (response.data && Array.isArray(response.data)) {
				console.log("Dados brutos das postagens:", response.data);
				setPostagens(response.data);
			} else {
				console.error(
					"Formato de resposta inválido para postagens:",
					response.data,
				);
				setPostagens([]);
				setError("Formato de dados inválido recebido do servidor");
			}
		} catch (error) {
			console.error("Erro ao carregar postagens:", error);
			setPostagens([]);
			setError("Erro ao carregar postagens. Verifique sua conexão.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Carregar dados necessários
		loadComunidades();
		loadCategorias();
		loadPostagens();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCBD18] mx-auto mb-2"></div>
					<p className="text-gray-600">Carregando postagens...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="text-center">
					<p className="text-red-500 mb-4">{error}</p>
					<button
						onClick={loadPostagens}
						className="px-4 py-2 bg-[#FCBD18] text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
					>
						Tentar novamente
					</button>
				</div>
			</div>
		);
	}

	if (postagens.length === 0) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="text-center">
					<p className="text-gray-600 mb-4">Nenhuma postagem encontrada</p>
					<button
						onClick={loadPostagens}
						className="px-4 py-2 bg-[#FCBD18] text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
					>
						Recarregar
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{postagens.map((post: PostagemBackend) => {
				// Converter categorias em tags
				const tags = categoriasParaTags(post.categorias);

				// Buscar nome da comunidade
				const comunidadeNome = getComunidadeNome(post.comunidade ?? null);

				return (
					<div
						key={post.id}
						className="mb-6"
					>
						{/* Informações da comunidade se existir */}
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
								nome: post.usuario?.nome ?? DEFAULT_USER.nome,
								imagemPerfil:
									post.usuario?.imagemPerfil ?? DEFAULT_USER.imagemPerfil,
							}}
							dataPublicacao={post.dataPublicacao}
							imagemPost={post.imagem}
							imagemUsuarioLogado={DEFAULT_USER_IMAGE}
							onCurtir={() => handleCurtir(post.id)}
							onAbrirComentarios={() => handleComentar(post.id)}
							onExcluir={handleExcluir}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Read;
