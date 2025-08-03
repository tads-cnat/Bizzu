import {useEffect, useState} from "react";
import {IPostagem} from "../interfaces/Postagem";
import ComunidadeService from "../services/models/ComunidadeService";
import {IBeeCommunity} from "../interfaces/IBeeCommunity";
import {IBeeCategoria} from "../interfaces/IBeeCategoria";
import {IRepositorio} from "../interfaces/Repositorio";
import RepositorioService from "../services/models/RepositorioService";
import CategoriaService from "../services/models/CategoriaService";
import PostagemService from "../services/models/PostagemService";

const useCommunity = (id: number) => {
	const [comunidade, setComunidade] = useState<IBeeCommunity>();
	const [comunidades, setComunidades] = useState<IBeeCommunity[]>([]);
	const [postagens, setPostagens] = useState<IPostagem[]>([]);
	const [categorias, setCategorias] = useState<IBeeCategoria[]>([]);
	const [repositorio, setRepositorio] = useState<IRepositorio[]>([]);

	useEffect(() => {
		if (comunidade === undefined) {
			void ComunidadeService.get(id)
				.then((response) => {
					setComunidade(response.data);
				})
				.catch(() => {
					console.error("Não capturou comunidade");
				});
		}
	}, []);

	useEffect(() => {
		if (comunidade !== undefined) {
			loadComunidades();
			loadCategorias();
			loadPostagens();
			loadRepositorio();
		}
	}, [comunidade]);

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
			const response = await RepositorioService.getRepoComunidade(
				comunidade.id,
			);
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
			const response = await PostagemService.getPostComunidade(comunidade.id);
			setPostagens(response.data);
		} catch (error) {
			console.error("Erro ao carregar postagens:", error);
		}
	};

	const handleExcluirRepositorio = async (id: number) => {
		try {
			await RepositorioService.delete(id);
			setRepositorio((prev) => prev.filter((repo) => repo.id !== id));
		} catch (error) {
			console.error("Erro ao excluir repositório:", error);
		}
	};

	const handleExcluir = async (postagemId: number) => {
		try {
			await PostagemService.delete(postagemId);
			setPostagens((prev) => prev.filter((post) => post.id !== postagemId));
		} catch (error) {
			console.error("Erro ao excluir postagem:", error);
			alert("Erro ao excluir postagem. Tente novamente.");
		}
	};

	return {
		comunidade,
		categorias,
		postagens,
		repositorio,
		comunidades,
		handleExcluir,
		handleExcluirRepositorio,
	};
};

export default useCommunity;
