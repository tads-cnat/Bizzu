"use client";

import type React from "react";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {PencilSimple, GraduationCap, Gear} from "@phosphor-icons/react";
import UsuarioService from "../../services/models/UsuarioService";
import type {IBeeUser} from "../BeeHeaderProfile/IBeeUser";
import FormEditarPerfil from "../../features/Perfil/forms/FormEditarPerfil";
const BeePerfilSidebar: React.FC = () => {
	const {username} = useParams();
	const [usuario, setUsuario] = useState<IBeeUser | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const handleClick = (onClickOriginal: () => void) => {
		onClickOriginal();
	};

	useEffect(() => {
		const carregarUsuario = async () => {
			if (!username) return;

			try {
				setLoading(true);
				const response = await UsuarioService.getbyUsername(username);
				setUsuario(response);
			} catch (error) {
				console.error("Erro ao carregar dados do usuário:", error);
			} finally {
				setLoading(false);
			}
		};

		carregarUsuario();
	}, [username]);

	const handleEditarPerfil = () => {
		// Implementar navegação para edição de perfil
		console.log("Editar perfil");
	};

	const handleEditarFavoritos = () => {
		// Implementar navegação para favoritos
		console.log("Editar favoritos");
	};

	if (loading) {
		return (
			<div className="space-y-4">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
					<div className="h-24 bg-gray-200" />
					<div className="p-4 space-y-3">
						<div className="h-6 bg-gray-200 rounded" />
						<div className="h-4 bg-gray-200 rounded" />
						<div className="h-4 bg-gray-200 rounded w-3/4" />
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse">
					<div className="h-6 bg-gray-200 rounded mb-4" />
					<div className="space-y-2">
						<div className="h-4 bg-gray-200 rounded" />
						<div className="h-4 bg-gray-200 rounded w-2/3" />
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse">
					<div className="h-6 bg-gray-200 rounded mb-4" />
					<div className="space-y-3">
						<div className="h-4 bg-gray-200 rounded" />
						<div className="h-4 bg-gray-200 rounded" />
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

	// Preparar dados de formação acadêmica
	const formacoes = [];
	if (usuario.escolaFormacao) {
		formacoes.push({
			instituicao: usuario.escolaFormacao,
			curso: "Formação anterior",
		});
	}
	if (usuario.instituicaoAtual) {
		formacoes.push({
			instituicao: usuario.instituicaoAtual,
			curso: "Instituição atual",
		});
	}

	// Se não há formações, adicionar placeholder
	if (formacoes.length === 0) {
		formacoes.push({
			instituicao: "Nenhuma formação cadastrada",
			curso: "Adicione sua formação acadêmica",
		});
	}

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
		<div className="space-y-4">
			{/* Card de Perfil Resumo */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<div
					className="h-24 bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-400"
					style={{
						backgroundImage: usuario.banner
							? `url(http://localhost:8000${usuario.banner})`
							: `url(/banner.png)`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>

				<div className="p-4">
					<h2 className="text-xl font-semibold text-[#333333] font-poppins mb-2">
						{usuario.nome}
					</h2>

					<p className="text-sm text-[#666666] font-poppins mb-3 leading-relaxed">
						{usuario.descricao || "Nenhuma descrição disponível"}
					</p>

					{usuario.linkedinUrl && (
						<a
							href={usuario.linkedinUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-[#0066cc] font-poppins hover:underline break-all"
						>
							{usuario.linkedinUrl}
						</a>
					)}
				</div>
			</div>

			{/* Card de Formação Acadêmica */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
				<div className="flex items-center gap-2 mb-4">
					<GraduationCap
						size={20}
						weight="regular"
						className="text-[#333333]"
					/>
					<h3 className="text-lg font-semibold text-[#333333] font-poppins">
						Formação acadêmica
					</h3>
				</div>

				<div className="space-y-3">
					{formacoes.map((formacao, index) => (
						<div
							key={index}
							className="border-l-2 border-gray-200 pl-3"
						>
							<h4 className="font-medium text-[#333333] font-poppins text-sm">
								{formacao.instituicao}
							</h4>
							<p className="text-xs text-[#666666] font-poppins leading-relaxed">
								{formacao.curso}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Card de Configurações */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
				<div className="flex items-center gap-2 mb-4">
					<Gear
						size={20}
						weight="regular"
						className="text-[#333333]"
					/>
					<h3 className="text-lg font-semibold text-[#333333] font-poppins">
						Configurações
					</h3>
				</div>

				<div className="space-y-3">
					{configuracoes.map((config, index) => (
						<div
							key={index}
							className="flex items-center justify-between"
						>
							<div className="flex-1">
								<h4 className="font-medium text-[#333333] font-poppins text-sm">
									{config.label}
								</h4>
								<p className="text-xs text-[#666666] font-poppins">
									{config.descricao}
								</p>
							</div>

							<button
								onClick={() => navigate("/bizzu/perfil/editar/")}
								className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#058B92] hover:bg-gray-50 rounded-md transition-colors"
							>
								<PencilSimple
									size={12}
									weight="regular"
								/>
								{config.acao}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BeePerfilSidebar;
