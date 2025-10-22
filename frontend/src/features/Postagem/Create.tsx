import type React from "react";
import {useState, useEffect} from "react";
import BeeForm from "../../components/BeeForm/BeeForm";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import schema from "./Forms/schema";
import sections from "./Forms/sections";
import ComunidadeService from "../../services/models/ComunidadeService";
import onSubmit from "./Forms/submit";
import {useNavigate} from "react-router-dom";
import {Spin} from "antd";

const CreatePostagem: React.FC = () => {
	const caminho = useNavigate();
	const [usuario, setUsuario] = useState<IBeeUser>();
	const {username} = acessAuth();
	const [comunidades, setComunidades] = useState<any[]>([]);

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
						(comunidade: any) => ({
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

	return username !== undefined ? (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Criar Postagem</h1>
			<BeeForm
				schema={schema}
				sections={sections}
				onSubmit={(data: any) => {
					onSubmit(data, caminho, usuario, username);
				}}
				options={comunidades}
				usuario={usuario}
				defaultValues={{usuario: 1}}
			/>
		</div>
	) : (
		<Spin />
	);
};

export default CreatePostagem;
