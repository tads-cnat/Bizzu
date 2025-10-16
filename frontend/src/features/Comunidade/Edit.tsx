import type React from "react";
import {useNavigate, useParams} from "react-router-dom";
import BeeForm from "../../components/BeeForm/BeeForm";
import {useState, useEffect} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import {Spin} from "antd";
import schema from "./forms/schema";
import sections from "./forms/sections";
import onSubmit from "./forms/submitEdit";
import ComunidadeService from "../../services/models/ComunidadeService";

const EditComunidade: React.FC = () => {
	const [usuario, setUsuario] = useState<IBeeUser>();
	const {id} = useParams();
	const [comunidade, setComunidade] = useState<any[]>([]);
	const {username} = acessAuth();
	const caminho = useNavigate();

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
				const response = await ComunidadeService.get(Number(id));
				setComunidade(response.data);
			} catch {
				setComunidade([]);
			}
		};

		loadComunidades();
	}, []);

	return username !== undefined ? (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Editar Comunidade</h1>
			<BeeForm
				schema={schema}
				sections={sections}
				onSubmit={(data: any) => {
					onSubmit(id, data, caminho, usuario, username);
				}}
				defaultValues={{
					nome: comunidade.nome,
					descricao: comunidade.descricao,
					imagem: comunidade.imagem,
					fundacao: comunidade.fundacao,
					coodenacao: comunidade.coodenacao,
					banner: comunidade.banner,
					usuario: 1,
				}}
				usuario={usuario}
			/>
		</div>
	) : (
		<Spin />
	);
};

export default EditComunidade;
