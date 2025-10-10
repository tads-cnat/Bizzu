import type React from "react";
import {useState, useEffect} from "react";
import {SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import BeeForm from "../../components/BeeForm/BeeForm";
import PostagemService from "../../services/models/PostagemService";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import schema from "./Forms/schema";
import sections from "./Forms/sections";
import ComunidadeService from "../../services/models/ComunidadeService";

const CreatePostagem: React.FC = () => {
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

	const caminho = useNavigate();
	const onSubmit: SubmitHandler<any> = async (data) => {
		const dataSubmit = new FormData();
		dataSubmit.append("usuario", String(usuario?.id));
		dataSubmit.append("texto", data.texto);
		if (data.imagem !== null && data.imagem !== undefined)
			dataSubmit.append("imagem", data.imagem);
		for (let i = 0; i < data.categorias.length; i++) {
			dataSubmit.append("categorias", String(data.categorias[i]));
		}
		dataSubmit.append("comunidade", String(data.comunidade?.value));
		try {
			await PostagemService.post(dataSubmit);
			caminho(`/${username}/`, {
				state: {
					alerta: {
						tipo: "success",
						mensagem: "Postagem criada com sucesso.",
					},
				},
			});
		} catch (e) {
			caminho(`/${username}/`, {
				state: {
					alerta: {
						tipo: "error",
						mensagem: "Erro ao criar postagem.",
					},
				},
			});
			console.error("Deu mal", e);
		}
	};

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

	return (
		<BeeForm
			schema={schema}
			sections={sections}
			onSubmit={onSubmit}
			options={comunidades}
		/>
	);
};

export default CreatePostagem;
