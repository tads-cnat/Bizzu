"use client";

import type React from "react";
import {useState, useEffect} from "react";
import {
	DotsThreeVertical,
	PencilSimple,
	Trash,
	WarningCircle,
	Star,
} from "@phosphor-icons/react";
import {useNavigate, Link} from "react-router-dom";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";
import type {iBeeRepoProps} from "./IBeeRepo";
import type {Usuario} from "../../interfaces/Repositorio";
import BeeTags from "../BeeTags/BeeTags";
import "../../index.css";
import acessAuth from "../../utils/acessAuth";
import {BeeButton} from "../BeeButtons/BeeButtons";
import UsuarioService from "../../services/models/UsuarioService";
import RepositorioService from "../../services/models/RepositorioService";
import BeeModal from "../BeeModal/BeeModal";

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
	dataPublicacao,
	tags = [],
	onExcluir,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [loadingFavorite, setLoadingFavorite] = useState(false);
	const navigate = useNavigate();
	const {username} = acessAuth();
	const isOwner = usuario && usuario.username === username;

	// Verificar se o repositório está favoritado quando componente carrega
	useEffect(() => {
		if (id && username) {
			verificarFavorito();
		}
	}, [id, username]);

	const verificarFavorito = async () => {
		if (!id) return;
		try {
			const response = await RepositorioService.verificarFavorito(id);
			setIsFavorite(response.data.favoritado);
		} catch (error) {
			console.error("Erro ao verificar favorito:", error);
		}
	};

	const handleToggleFavorite = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!id || loadingFavorite) return;

		setLoadingFavorite(true);
		try {
			if (isFavorite) {
				await RepositorioService.desfavoritar(id);
				setIsFavorite(false);
			} else {
				await RepositorioService.favoritar(id);
				setIsFavorite(true);
			}
		} catch (error) {
			console.error("Erro ao alterar favorito:", error);
		} finally {
			setLoadingFavorite(false);
		}
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
		if (deleteConfirmation) {
			e.stopPropagation();
			return;
		}
		if (id) {
			navigate(`/repositorio/${id}`);
		}
	};

	return (
		<div
			className="bg-[#F7F7FA] shadow-md rounded-xl p-4 mb-2 relative w-full flex flex-col gap-2 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1 min-h-[160px] min-w-[200px] cursor-pointer"
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
			<div className="absolute top-3 right-3 z-10 flex gap-2">
				{/* Botão de favoritar (sempre visível para usuários logados) */}
				{username && (
					<button
						type="button"
						disabled={loadingFavorite}
						className={`transition duration-200 ease-in-out p-1 rounded-full ${
							isFavorite
								? "text-yellow-500 hover:text-yellow-600"
								: "text-gray-400 hover:text-yellow-500"
						} ${loadingFavorite ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
						onClick={handleToggleFavorite}
						title={
							isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
						}
					>
						<Star
							size={18}
							weight={isFavorite ? "fill" : "regular"}
						/>
					</button>
				)}

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
				) : username ? null : (
					<button
						type="button"
						className="text-[#FCBD18] hover:text-[#e6a800] cursor-pointer bg-transparent border-none"
						onClick={() => alert("Denúncia enviada!")}
					>
						<WarningCircle
							size={18}
							className="opacity-80"
						/>
					</button>
				)}
			</div>
			{/* Header: Avatar, nome, tempo - do criador do repositório */}
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
			{/* Título */}
			{titulo && (
				<h3 className="text-lg font-bold text-[#333333] mb-2 line-clamp-2">
					{titulo}
				</h3>
			)}
			{/* Descrição */}
			<p className="mb-3 text-[#6B6B6B] text-sm leading-relaxed line-clamp-3 flex-1">
				{descricao}
			</p>
			{/* Tags */}
			{tags && tags.length > 0 && (
				<div className="flex gap-2 flex-wrap mt-auto pt-2">
					{tags.map((tag, index) => (
						<BeeTags
							key={index}
							label={tag.label}
							color={tag.color as "magenta" | "orange" | "cyan"}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default BeeRepo;
