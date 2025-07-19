import {useEffect, useState} from "react";
import {IPostagem} from "../interfaces/Postagem";
import {IBeeComunidade} from "../interfaces/IBeeComunidade";
import {IBeeCategoria} from "../interfaces/IBeeCategoria";
import {IRepositorio} from "../interfaces/Repositorio";
import {IBeeUser} from "../features/Perfil/components/BeeHeaderProfile/IBeeUser";
import {useParams} from "react-router-dom";
import UsuarioService from "../services/models/UsuarioService";
import PostagemService from "../services/models/PostagemService";
import ComunidadeService from "../services/models/ComunidadeService";
import RepositorioService from "../services/models/RepositorioService";
import CategoriaService from "../services/models/CategoriaService";

const useUser = () => {
	const [postagens, setPostagens] = useState<IPostagem[]>([]);
	const [comunidades, setComunidades] = useState<IBeeComunidade[]>([]);
	const [categorias, setCategorias] = useState<IBeeCategoria[]>([]);
	const [repositorio, setRepositorio] = useState<IRepositorio[]>([]);
	const identificator = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();

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

	return {
		postagens,
		comunidades,
		categorias,
		repositorio,
	};
};

export default useUser;
