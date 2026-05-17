import type React from "react";
import {useNavigate} from "react-router-dom";
import BeeForm from "../../components/BeeForm/BeeForm";
import {useState, useEffect} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import {Spin} from "antd";
import schema from "./Form/schema";
import sections from "./Form/sections";
import onSubmit from "./Form/submitEdit";

const EditPerfil: React.FC = () => {
	const [usuario, setUsuario] = useState<IBeeUser>();
	// const {id} = useParams();
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

	return username !== undefined ? (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>
			<BeeForm
				schema={schema}
				sections={sections}
				onSubmit={(data: any) => {
					onSubmit(
						data,
						caminho,
						usuario,
						username !== undefined ? username : usuario?.username,
					);
				}}
				defaultValues={{
					nome: usuario?.nome,
					imagemPerfil: usuario?.imagemPerfil,
					descricao: usuario?.descricao,
					escolaFormacao: usuario?.escolaFormacao,
					instituicaoAtual: usuario?.instituicaoAtual,
				}}
				usuario={usuario}
			/>
		</div>
	) : (
		<Spin />
	);
};

export default EditPerfil;
