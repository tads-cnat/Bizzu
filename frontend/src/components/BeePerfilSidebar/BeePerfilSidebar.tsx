"use client";

import type React from "react";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {PencilSimple, GraduationCap, Gear} from "@phosphor-icons/react";
import UsuarioService from "../../services/models/UsuarioService";
import acessPermissions from "../../utils/acessPermissions";
import {UserSwitch} from "@phosphor-icons/react/dist/ssr";
import {IBeeUser} from "../../features/Perfil/components/BeeHeaderProfile/IBeeUser";
import getLocalStorage from "../../utils/getLocalStorage";
import FormPapel from "./Forms/FormPapel";

const BeePerfilSidebar: React.FC = () => {
	const {username} = useParams();
	const {load} = acessPermissions();
	const [usuario, setUsuario] = useState<IBeeUser | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [papel, setPapel] = useState();
	const [userLocal, setUserlocal] = useState();
	const [key, setKey] = useState<number>(0);
	const [abrirModal, setModal] = useState<boolean>(false);

	if (getLocalStorage() != null) {
		if (!papel) setPapel(getLocalStorage().papel);
		if (!userLocal) setUserlocal(getLocalStorage().username);
	}

	useEffect(() => {
		const carregarUsuario = async () => {
			if (!username) return;

			try {
				setLoading(true);
				const response = await UsuarioService.getbyUsername(username);
				setUsuario(response);
			} catch (error) {
				console.error("Erro ao carregar usuário:", error);
			} finally {
				setLoading(false);
			}
		};

		carregarUsuario();
	}, [username]);

	const handleEditarPerfil = () => navigate("editar");
	const handleEditarFavoritos = () => navigate("/repositorios-favoritos");

	if (loading || !load) {
		return (
			<div className="space-y-4 animate-pulse">
				<div className="bg-white rounded-xl overflow-hidden">
					<div className="h-24 bg-gray-200" />
					<div className="p-4 space-y-3">
						<div className="h-6 bg-gray-200 rounded" />
						<div className="h-4 bg-gray-200 rounded" />
						<div className="h-4 bg-gray-200 rounded w-3/4" />
					</div>
				</div>
			</div>
		);
	}

	if (!usuario) {
		return (
			<div className="text-center py-8 text-gray-500">
				Usuário não encontrado
			</div>
		);
	}

	// Formação
	const formacoes: any[] = [];
	if (usuario.escolaFormacao && usuario.escolaFormacao !== "undefined")
		formacoes.push({
			instituicao: usuario.escolaFormacao,
			curso: "Formação anterior",
		});
	if (usuario.instituicaoAtual && usuario.instituicaoAtual !== "undefined")
		formacoes.push({
			instituicao: usuario.instituicaoAtual,
			curso: "Instituição atual",
		});
	if (formacoes.length === 0)
		formacoes.push({
			instituicao: "Nenhuma formação cadastrada",
			curso: "Adicione sua formação acadêmica",
		});

	const configuracoes = [
		{
			label: "Editar perfil",
			descricao: "Edite sua foto, descrição, tema...",
			acao: "Editar",
			onClick: handleEditarPerfil,
		},
		{
			label: "Favoritos",
			descricao: "Abrir repositórios favoritados",
			acao: "Abrir",
			onClick: handleEditarFavoritos,
		},
	];

	return (
		<div className="space-y-4 w-full max-w-full overflow-y-auto pb-10">
			{/* CARD PERFIL */}
			<div className="bg-white shadow border border-gray-200 overflow-hidden rounded-xl">
				<div
					className="h-24 bg-gray-200"
					style={{
						backgroundImage: usuario.banner
							? `url(http://localhost:8000${usuario.banner})`
							: "url(/banner.png)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>

				<div className="p-4 break-words">
					<h2 className="text-xl font-semibold text-gray-800 mb-2">
						{usuario.nome}
					</h2>

					<p className="text-sm text-gray-600 mb-3 break-words">
						{usuario.descricao || "Nenhuma descrição disponível"}
					</p>

					{usuario.linkedinUrl && (
						<a
							href={usuario.linkedinUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 underline break-all"
						>
							{usuario.linkedinUrl}
						</a>
					)}
				</div>
			</div>

			{/* FORMAÇÃO */}
			{papel !== "adm" && userLocal === usuario.username && (
				<div className="bg-white rounded-xl shadow border border-gray-200 p-4">
					<div className="flex items-center gap-2 mb-4">
						<GraduationCap
							size={20}
							className="text-gray-800"
						/>
						<h3 className="text-lg font-semibold text-gray-800">
							Formação acadêmica
						</h3>
					</div>

					<div className="space-y-3">
						{formacoes.map((form, index) => (
							<div
								key={index}
								className="border-l-2 border-gray-200 pl-3"
							>
								<h4 className="font-medium text-gray-800 text-sm">
									{form.instituicao}
								</h4>
								<p className="text-xs text-gray-600">{form.curso}</p>
							</div>
						))}
					</div>
				</div>
			)}

			{/* CONFIGURAÇÕES */}
			{papel !== "adm" && userLocal === usuario.username && (
				<div className="bg-white rounded-xl shadow border border-gray-200 p-4">
					<div className="flex items-center gap-2 mb-4">
						<Gear
							size={20}
							className="text-gray-800"
						/>
						<h3 className="text-lg font-semibold text-gray-800">
							Configurações
						</h3>
					</div>

					<div className="space-y-3">
						{configuracoes.map((cfg, i) => (
							<div
								key={i}
								className="flex items-center justify-between"
							>
								<div className="flex-1 min-w-0">
									<h4 className="font-medium text-gray-800 text-sm">
										{cfg.label}
									</h4>
									<p className="text-xs text-gray-600 truncate">
										{cfg.descricao}
									</p>
								</div>

								<button
									onClick={cfg.onClick}
									className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-teal-600 hover:bg-teal-50 rounded-md transition"
								>
									<PencilSimple size={12} />
									{cfg.acao}
								</button>
							</div>
						))}

						{papel === "int" && (
							<div className="flex items-center justify-between">
								<div className="flex-1">
									<h4 className="font-medium text-gray-800 text-sm">
										Solicitar mudança
									</h4>
									<p className="text-xs text-gray-600">
										Faça uma solicitação para moderador
									</p>
								</div>

								<button
									onClick={() => {
										setModal(true);
										setKey((p) => p + 1);
									}}
									className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-teal-600 hover:bg-teal-50 rounded-md"
								>
									<UserSwitch size={12} />
									Solicitar
								</button>
							</div>
						)}
					</div>
				</div>
			)}

			{abrirModal && <FormPapel key={key} />}
		</div>
	);
};

export default BeePerfilSidebar;
