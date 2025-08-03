import {createContext, useEffect, useState} from "react";
import {IBeeProvider} from "./interfaces/IBeeProvider";
import {IBeeUsuario} from "../../components/BeeFTPerfil/IBeeUsuario";
import getLocalStorage from "../../utils/getLocalStorage";
import UsuarioService from "../../services/models/UsuarioService";
import setLocalStorage from "../../utils/setLocalStorage";
import {IBeeContext} from "./interfaces/IBeeContext";

export const AutenticationContext = createContext<IBeeContext>(
	{} as IBeeContext,
);

const AuthProvider = ({children}: IBeeProvider) => {
	const [usuario, setUsuario] = useState<IBeeUsuario | null>(null);

	useEffect(() => {
		const user = getLocalStorage();
		if (user) setUsuario(user);
	}, []);

	const atualizarUsuario = () => {
		const user = getLocalStorage();
		if (user) setUsuario(user);
	};

	const autenticar = async (
		username: string,
		password: string,
	): Promise<void> => {
		const saveToken = await UsuarioService.postToken({username, password});
		const user: IBeeUsuario = await UsuarioService.getbyUsername(username);
		const tokens = {token: saveToken.access, username, papel: user.papel};
		setUsuario(tokens);
		setLocalStorage(tokens);
	};

	const deslogar = async () => {
		setUsuario(null);
		setLocalStorage(null);
	};

	return (
		<>
			<AutenticationContext.Provider
				value={{autenticar, deslogar, atualizarUsuario, ...usuario}}
			>
				{children}
			</AutenticationContext.Provider>
		</>
	);
};

export default AuthProvider;
