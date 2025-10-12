import type React from "react";
import {useNavigate, useParams} from "react-router-dom";
import BeeForm from "../../components/BeeForm/BeeForm";
import schema from "./Forms/schema";
import sections from "./Forms/sections";
import {useState, useEffect} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import onSubmit from "./Forms/submitEdit";
import ComunidadeService from "../../services/models/ComunidadeService";
import PostagemService from "../../services/models/PostagemService";
import {Spin} from "antd";

const EditPostagem: React.FC = () => {
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [comunidades, setComunidades] = useState<any[]>([]);
	const [comunidadeSelecionada, setComunidadeSelecionada] = useState<any[]>([]);
	const {id} = useParams();
	const [postagem, setPostagem] = useState<any[]>([]);
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

	useEffect(() => {
		const loadPostagem = async () => {
			try {
				const response = await PostagemService.get(Number(id));
				setPostagem(response.data);
			} catch {
				setPostagem([]);
			}
		};

		loadPostagem();
	}, []);

	useEffect(() => {
		const loadComunidades = async () => {
			try {
				const response = await ComunidadeService.get(postagem.comunidade);
				setComunidadeSelecionada(response.data);
			} catch {
				setComunidades([]);
			}
		};

		loadComunidades();
	}, [postagem]);

	return username !== undefined ? (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Editar Postagem</h1>
			<BeeForm
				schema={schema}
				sections={sections}
				options={comunidades}
				onSubmit={(data: any) => {
					onSubmit(id, data, caminho, usuario, username);
				}}
				defaultValues={{
					texto: postagem.texto,
					comunidade: {
						label: comunidadeSelecionada.nome,
						value: comunidadeSelecionada.id,
					},
					categoria: postagem.categorias,
					imagem: postagem.imagem,
				}}
			/>
		</div>
	) : (
		<Spin />
	);
};

export default EditPostagem;
