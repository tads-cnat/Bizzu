"use client";

import {createContext, useEffect, useState} from "react";
import type {IBeeProvider} from "./interfaces/IBeeProvider";
import type {IBeeUsuario} from "../../components/BeeFTPerfil/IBeeUsuario";
import getLocalStorage from "../../utils/getLocalStorage";
import UsuarioService from "../../services/models/UsuarioService";
import setLocalStorage from "../../utils/setLocalStorage";
import type {IBeeContext} from "./interfaces/IBeeContext";

export const AutenticationContext = createContext<IBeeContext>(
	{} as IBeeContext,
);

const AuthProvider = ({children}: IBeeProvider) => {
	const [usuario, setUsuario] = useState<IBeeUsuario | null>(null);

	useEffect(() => {
		const user = getLocalStorage();
		if (user) setUsuario(user);
	}, []);

	const autenticar = async (
		username: string,
		password: string,
	): Promise<void> => {
		try {
			// 1. Obter o token
			const saveToken = await UsuarioService.postToken({username, password});

			// 2. Buscar os dados completos do usuário usando o token recebido
			const usuarioData = await UsuarioService.getUsuarioByToken(
				saveToken.access,
			);

			const usuarioCompleto = {
				id: usuarioData.id,
				token: saveToken.access,
				username: usuarioData.username,
				// adicione outros campos conforme necessário
			};

			setUsuario(usuarioCompleto);
			setLocalStorage(usuarioCompleto);
		} catch (error) {
			throw error;
		}
	};

	const deslogar = async () => {
		setUsuario(null);
		setLocalStorage(null);
	};

	// Garantir que sempre retornamos um objeto válido
	const contextValue = {
		autenticar,
		deslogar,
		id: usuario?.id,
		username: usuario?.username,
		token: usuario?.token,
	};

	return (
		<AutenticationContext.Provider value={contextValue}>
			{children}
		</AutenticationContext.Provider>
	);
};

export default AuthProvider;
