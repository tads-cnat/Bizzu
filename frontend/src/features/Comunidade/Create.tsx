import type React from "react";
import {useState, useEffect} from "react";
import BeeForm from "../../components/BeeForm/BeeForm";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import {useNavigate} from "react-router-dom";
import {Spin} from "antd";
import schema from "./forms/schema";
import sections from "./forms/sections";
import onSubmit from "./forms/submit";

const CreateComunidade: React.FC = () => {
	const caminho = useNavigate();
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

	return username !== undefined ? (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Criar Comunidade</h1>
			<BeeForm
				schema={schema}
				sections={sections}
				onSubmit={(data: any) => {
					onSubmit(data, caminho, usuario, username);
				}}
				usuario={usuario}
				defaultValues={{usuario: usuario}}
			/>
		</div>
	) : (
		<Spin />
	);
};

export default CreateComunidade;
