import {useState, useEffect} from "react";
import UsuarioService from "../services/models/UsuarioService";
import acessAuth from "../utils/acessAuth";

interface UseFavoritosReturn {
	estaFavoritado: boolean;
	carregandoFavorito: boolean;
	alternarFavorito: () => Promise<void>;
	verificarStatusFavorito: () => Promise<void>;
}

export const useFavoritos = (repositorioId: number): UseFavoritosReturn => {
	const [estaFavoritado, setEstaFavoritado] = useState(false);
	const [carregandoFavorito, setCarregandoFavorito] = useState(false);
	const {id: usuarioId} = acessAuth();

	const verificarStatusFavorito = async () => {
		if (!usuarioId || !repositorioId) return;

		try {
			setCarregandoFavorito(true);
			const response = await UsuarioService.verificarFavorito(repositorioId);
			setEstaFavoritado(response.esta_favoritado);
		} catch (error) {
			console.error("Erro ao verificar status do favorito:", error);
		} finally {
			setCarregandoFavorito(false);
		}
	};

	const alternarFavorito = async () => {
		if (!usuarioId || !repositorioId) {
			console.error("Erro ao processar solicitação: IDs inválidos");
			return;
		}

		try {
			setCarregandoFavorito(true);

			if (estaFavoritado) {
				await UsuarioService.desfavoritarRepositorio(repositorioId);
				setEstaFavoritado(false);
			} else {
				await UsuarioService.favoritarRepositorio(repositorioId);
				setEstaFavoritado(true);
			}
		} catch (error: any) {
			console.error("Erro ao alterar favorito:", error);
			const errorMessage =
				error.response?.data?.error ||
				error.response?.data?.message ||
				"Erro ao processar solicitação";
			console.error(errorMessage);
		} finally {
			setCarregandoFavorito(false);
		}
	};

	useEffect(() => {
		if (repositorioId && usuarioId) {
			verificarStatusFavorito();
		}
	}, [repositorioId, usuarioId]);

	return {
		estaFavoritado,
		carregandoFavorito,
		alternarFavorito,
		verificarStatusFavorito,
	};
};
