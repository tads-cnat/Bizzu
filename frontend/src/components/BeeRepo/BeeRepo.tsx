"use client";

import type React from "react";
import {useState, useEffect} from "react";
import {
	DotsThreeVertical,
	PencilSimple,
	Trash,
	WarningCircle,
} from "@phosphor-icons/react";
import {useNavigate, Link} from "react-router-dom";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";
import type {iBeeRepoProps} from "./IBeeRepo";
import type {IUsuario} from "../../interfaces/Repositorio";
import BeeTags from "../BeeTags/BeeTags";
import "../../index.css";
import acessAuth from "../../utils/acessAuth";
import {BeeButton} from "../BeeButtons/BeeButtons";
import UsuarioService from "../../services/models/UsuarioService";
import BeeModal from "../BeeModal/BeeModal";
import BeeDenuncia from "../BeeDenuncia/BeeDenuncia";
import BeeAlert from "../BeeAlert/BeeAlert";
import DenunciaService from "../../services/models/DenunciaService";
import getLocalStorage from "../../utils/getLocalStorage";
import {CloseOutlined} from "@ant-design/icons";

const defaultBeeImg = "/static/img/abelha_bizzu.svg";

function tempoDesde(data: string): string {
	const date = new Date(data);
	const agora = new Date();
	const diffMs = agora.getTime() - date.getTime();
	const diffSegundos = Math.floor(diffMs / 1000);
	const minutos = Math.floor(diffSegundos / 60);
	const horas = Math.floor(minutos / 60);
	const dias = Math.floor(horas / 24);
	if (dias > 0) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
	if (horas > 0) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
	if (minutos > 0) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
	return "agora mesmo";
}

const BeeRepo: React.FC<iBeeRepoProps> = ({
	id,
	usuario,
	titulo,
	descricao,
	imagemRepo,
	dataPublicacao,
	tags = [],
	onExcluir,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const navigate = useNavigate();
	const {username} = acessAuth();
	const isOwner = usuario && usuario.username === username;

	// Estados para denúncia
	const usuarioLocal = getLocalStorage();
	const [tipos, setTipos] = useState<any[]>([]);
	const [mostrarDenuncia, setMostrarDenuncia] = useState(false);
	const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
	const [alertaDenuncia, setAlertaDenuncia] = useState<{
		tipo: "success" | "error";
		mensagem: string;
	} | null>(null);

	// Função para setar os tipos de alerta
	useEffect(() => {
		if (alertaDenuncia) {
			const timer = setTimeout(() => {
				setAlertaDenuncia(null);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [alertaDenuncia]);

	// Função que carrega os tipos de denúncia
	const loadDenunciaType = async () => {
		try {
			const response = await DenunciaService.getTipos();
			const data = response?.data;
			if (Array.isArray(data)) {
				setTipos(data);
			} else {
				console.warn(
					"Resposta inesperada ao carregar tipos de denúncia:",
					data,
				);
			}
		} catch (error) {
			console.error("Erro ao carregar tipos de denúncia:", error);
		}
	};

	// Função responsável por enviar a denúncia
	const enviarDenuncia = async () => {
		if (!tipoSelecionado) {
			setAlertaDenuncia({
				tipo: "error",
				mensagem: "Selecione um tipo de denúncia.",
			});
			return;
		}
		try {
			await DenunciaService.enviarDenuncia({
				tipo: tipoSelecionado,
				repositorio: id,
			});
			setAlertaDenuncia({
				tipo: "success",
				mensagem: "Denúncia enviada com sucesso.",
			});
			setMostrarDenuncia(false);
		} catch (e) {
			setAlertaDenuncia({
				tipo: "error",
				mensagem: "Erro ao enviar denúncia.",
			});
		}
	};

	// Função responsável por abrir o modal de denuncia
	const handleAbrirDenuncia = (e: React.MouseEvent) => {
		e.stopPropagation(); // Impede a propagação do evento
		e.preventDefault(); // Previne qualquer comportamento padrão
		loadDenunciaType();
		setMostrarDenuncia(true);
	};

	// Função responsável por fechar o modal de denuncia
	const handleFecharDenuncia = (e?: React.MouseEvent) => {
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
		setMostrarDenuncia(false);
		setTipoSelecionado(null);
	};

	// Função para tratar a exclusão e fechar o modal
	const handleConfirmarExclusao = (id: number) => {
		if (onExcluir && id) {
			onExcluir(id);
		}
		setDeleteConfirmation(false);
	};

	const handleEditarClick = () => {
		if (id) {
			navigate(`/repositorio/editar/${id}`);
		}
		setShowMenu(false);
	};

	const handleExcluirClick = () => {
		setDeleteConfirmation(true);
		setShowMenu(false);
	};

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowMenu(!showMenu);
	};

	const handleClickRepositorio = (e: React.MouseEvent) => {
		// Se o modal de denúncia estiver aberto, não navegar
		if (mostrarDenuncia) {
			e.stopPropagation();
			return;
		}

		if (deleteConfirmation) {
			e.stopPropagation();
			return;
		}
		if (id) {
			navigate(`/repositorio/${id}`);
		}
	};

	// Função para navegar para o perfil do usuário
	const handleClickPerfil = (e: React.MouseEvent) => {
		e.stopPropagation(); // Impede a propagação do evento
		if (usuario && usuario.username) {
			navigate(`/${usuario.username}`);
		}
	};

	// Função para lidar com cliques no modal
	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<div
			className={`bg-[#F7F7FA] shadow-md rounded-xl p-3 mb-2 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl}`}
			style={{maxWidth: 320}}
			onClick={(e) => handleClickRepositorio(e)}
		>
			{/* Modal de confirmação de exclusão */}
			{deleteConfirmation && (
				<BeeModal
					onExcluir={handleConfirmarExclusao}
					label="Excluir repositório"
					text="Você deseja excluir este repositório?"
					id={id}
				/>
			)}
			{/* Ícone de ação no canto superior direito */}
			<div className="absolute top-3 right-3 z-10">
				{usuario && isOwner ? (
					<>
						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleMenu(e);
							}}
							className="text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition duration-200 ease-in-out"
							type="button"
						>
							<DotsThreeVertical
								size={18}
								weight="bold"
							/>
						</button>
						{showMenu && (
							<div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
								<div className="py-0.5">
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleEditarClick();
										}}
										className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 transition duration-200"
										type="button"
									>
										<PencilSimple
											size={14}
											className="mr-2"
										/>
										Editar
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleExcluirClick();
										}}
										className="flex items-center w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 transition duration-200"
										type="button"
									>
										<Trash
											size={14}
											className="mr-2"
										/>
										Excluir
									</button>
								</div>
							</div>
						)}
						{showMenu && (
							<div
								className="fixed inset-0 z-5"
								onClick={() => setShowMenu(false)}
							/>
						)}
					</>
				) : (
					<button
						type="button"
						className="text-[#FCBD18] hover:text-[#e6a800] cursor-pointer bg-transparent border-none"
						onClick={handleAbrirDenuncia}
					>
						<WarningCircle
							size={18}
							className="opacity-80"
						/>
					</button>
				)}
			</div>
			{/* Header: Avatar, nome, tempo - do criador do repositório */}
			<div
				onClick={handleClickPerfil}
				className="cursor-pointer"
			>
				{usuario ? (
					<BeeFTPerfil
						usuarioId={usuario.id}
						dataPublicacao={dataPublicacao}
					/>
				) : (
					<BeeFTPerfil
						usuarioId="Usuário não encontrado"
						dataPublicacao={dataPublicacao}
					/>
				)}
			</div>
			{/* Título */}
			{titulo && (
				<h3 className="text-base font-bold text-[#333333] mb-0.5">{titulo}</h3>
			)}
			{/* Descrição */}
			<p className="mb-1 text-[#6B6B6B] text-xs leading-snug line-clamp-2">
				{descricao}
			</p>
			{/* Tags */}
			{tags && tags.length > 0 && (
				<div className="flex gap-1 flex-wrap mt-1">
					{tags.map((tag, index) => (
						<BeeTags
							key={index}
							label={tag.label}
							color={tag.color as "magenta" | "orange" | "cyan"}
						/>
					))}
				</div>
			)}

			{/* Modal de Denúncia */}
			{mostrarDenuncia && (
				<div
					className="absolute top-0 left-0 w-full h-full bg-opacity-40 flex justify-center items-center z-50"
					onClick={handleFecharDenuncia}
				>
					<div
						className="bg-white p-4 rounded-md w-[400px] max-w-full shadow-lg relative"
						onClick={handleModalClick}
					>
						<button
							onClick={handleFecharDenuncia}
							className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
						>
							<CloseOutlined />
						</button>

						<BeeDenuncia
							tipos={tipos}
							onTipoSelecionado={setTipoSelecionado}
						/>
						<div className="mt-4 flex justify-end gap-2">
							<BeeButton
								onClick={handleFecharDenuncia}
								label="Cancelar"
								variante="neutro"
							/>
							<BeeButton
								onClick={enviarDenuncia}
								label="Enviar denuncia"
								variante="primaria"
							/>
						</div>
					</div>
				</div>
			)}

			{/* Alerta de Denúncia */}
			{alertaDenuncia && (
				<div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[10000] transition-all duration-500 ease-out opacity-100 translate-y-0">
					<BeeAlert
						typeAlert={alertaDenuncia.tipo}
						messageAlert={alertaDenuncia.mensagem}
					/>
				</div>
			)}
		</div>
	);
};

export default BeeRepo;
