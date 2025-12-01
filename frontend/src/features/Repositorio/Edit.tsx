import type React from "react";
import BeeForm from "../../components/BeeForm/BeeForm";
import {useState, useEffect} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import acessAuth from "../../utils/acessAuth";
import {IBeeUser} from "../Perfil/components/BeeHeaderProfile/IBeeUser";
import schema from "./Forms/schemas";
import sections from "./Forms/sections";
import onSubmit from "./Forms/submitEdit";
import {useNavigate, useParams} from "react-router-dom";
import ComunidadeService from "../../services/models/ComunidadeService";
import RepositorioService from "../../services/models/RepositorioService";

import {Spin} from "antd";

const EditRepositorio: React.FC = () => {
	const caminho = useNavigate();
	const [usuario, setUsuario] = useState<IBeeUser>();
	const {username} = acessAuth();
	const {id} = useParams();

	const [comunidades, setComunidades] = useState<any[]>([]);
	const [repositorio, setRepositorio] = useState<any[]>([]);
	const [comunidadeSelecionada, setComunidadeSelecionada] = useState<any[]>([]);
	const [arquivos, setArquivos] = useState<any[]>([]);

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
		const loadRepositorio = async () => {
			try {
				const response = await RepositorioService.get(Number(id));
				setRepositorio(response.data);
			} catch {
				setRepositorio([]);
			}
		};

		loadRepositorio();
	}, []);

	useEffect(() => {
		const loadComunidades = async () => {
			try {
				const response = await ComunidadeService.get(repositorio.comunidade);
				setComunidadeSelecionada(response.data);
			} catch {
				setComunidades([]);
			}
		};

		loadComunidades();
	}, [repositorio]);

	useEffect(() => {
		const loadArquivos = async () => {
			if (!repositorio) return;
			try {
				const arquivos = await RepositorioService.getArquivos(Number(id)); // Esse ID é o do repositório não do arquivo
				setArquivos(arquivos);
				console.log("ID recebido na rota:", id);
				console.log("arquivos:", id);
			} catch {
				setArquivos([]);
			}
		};

		loadArquivos();
	}, []);

	return repositorio && arquivos ? (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Editar Repositorio</h1>
			<BeeForm
				onSubmit={(data: any) => {
					onSubmit(id, data, caminho, username);
				}}
				schema={schema}
				sections={sections}
				options={comunidades}
				defaultValues={{
					titulo: repositorio.titulo,
					descricao: repositorio.descricao,
					comunidade: {
						label: comunidadeSelecionada.nome,
						value: comunidadeSelecionada.id,
					},
					categoria: repositorio.categorias,
					arquivo: arquivos.map((arq) => arq.arquivo),
				}}
			/>
		</div>
	) : (
		<Spin />
	);
};

export default EditRepositorio;
