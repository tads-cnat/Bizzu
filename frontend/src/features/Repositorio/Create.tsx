import type React from "react";
import BeeForm from "../../components/BeeForm/BeeForm";
import schema from "./Forms/schemas";
import sections from "./Forms/sections";
import {useState, useEffect} from "react";
import ComunidadeService from "../../services/models/ComunidadeService";
import onSubmit from "./Forms/submit";
import {useNavigate} from "react-router-dom";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import { IBeeComunidade } from "../../interfaces/IBeeComunidade";

const CreateRepositorio: React.FC = () => {
	const caminho = useNavigate();
	const [usuario, setUsuario] = useState<IBeeUser>();
	const {username} = acessAuth();
	const [comunidades, setComunidades] = useState<IBeeComunidade[]>([]);

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

	useEffect(() => {
		const loadComunidades = async () => {
			try {
				const response = await ComunidadeService.listAll();
				if (response.data && Array.isArray(response.data)) {
					const comunidadesFormatadas = response.data.map(
						(comunidade) => ({
							label: comunidade.nome || comunidade.title,
							value: comunidade.id,
						}),
					);
					setComunidades(comunidadesFormatadas);
				} else {
					setComunidades([]);
				}
			} catch {
				setComunidades([]);
			}
		};

		loadComunidades();
	}, []);

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Criar Repositório</h1>
			<BeeForm
				schema={schema}
				sections={sections}
				onSubmit={(data: any) => {
					onSubmit(data, caminho, username);
				}}
				options={comunidades}
				usuario={usuario}
			/>
		</div>
	);
};

export default CreateRepositorio;
