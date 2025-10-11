import type React from "react";
import BeeForm from "../../components/BeeForm/BeeForm";
import {useState, useEffect} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import schema from "./Forms/schemas";
import sections from "./Forms/sections";
import onSubmit from "./Forms/submit";

const EditRepositorio: React.FC = () => {
	const [usuario, setUsuario] = useState<IBeeUser>();
	const {username} = acessAuth();

	useEffect(() => {
		if (usuario === undefined) {
			void UsuarioService.getbyUsername(username)
				.then((response) => {
					setUsuario(response);
				})
				.catch(() => {
					console.error("Não recebeu dados");
				});
		}
	}, []);

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Editar Repositorio</h1>
			<BeeForm
				onSubmit={onSubmit}
				schema={schema}
				sections={sections}
			/>
		</div>
	);
};

export default EditRepositorio;
