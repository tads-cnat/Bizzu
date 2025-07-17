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
import type {BeeRepoProps} from "./IBeeRepo";
import BeeTags from "../BeeTags/BeeTags";
import "../../index.css";
import acessAuth from "../../utils/acessAuth";
import {BeeButton} from "../BeeButtons/BeeButtons";
import UsuarioService from "../../services/models/UsuarioService";
import BeeModal from "../BeeModal/BeeModal";

const defaultBeeImg = "/static/img/abelha_bizzu.svg"; // ajuste o path conforme necessário

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

const BeeRepo: React.FC<BeeRepoProps> = ({
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
	const [usuarioId, setUsuarioId] = useState<number | null>(null);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const navigate = useNavigate();
	const {username} = acessAuth();
	const isOwner = username;

	// Função para tratar a exclusão e fechar o modal
	const handleConfirmarExclusao = (id: number) => {
		if (onExcluir && id) {
			onExcluir(id);
		}
		setDeleteConfirmation(false);
	};

	useEffect(() => {
		if (username) {
			UsuarioService.getbyUsername(username)
				.then((data) => {
					if (data && data.id) setUsuarioId(data.id);
				})
				.catch(() => setUsuarioId(null));
		}
	}, [username]);

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

	console.log("Objeto usuario recebido pelo BeeRepo:", usuario);

	return (
		<div
			className="bg-[#F7F7FA] shadow-md rounded-xl p-3 mb-2 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
			style={{maxWidth: 320}}
			onClick={(e) => {
				// Não faz nada se clicar no header, nas tags, se o menu estiver aberto ou se o modal estiver aberto
				if (
					(e.target as HTMLElement).closest(".repo-header, .repo-tag") ||
					showMenu ||
					deleteConfirmation
				) {
					return;
				}
				// Aqui você pode colocar a navegação para detalhes, se desejar
			}}
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
				{isOwner ? (
					<>
						<button
							onClick={toggleMenu}
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
										onClick={handleEditarClick}
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
										onClick={handleExcluirClick}
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
						{/* Overlay para fechar o menu quando clicar fora */}
						{showMenu && (
							<div
								className="fixed inset-0 z-5"
								onClick={() => setShowMenu(false)}
							/>
						)}
					</>
				) : (
					<WarningCircle
						size={18}
						className="text-[#333333] opacity-60"
					/>
				)}
			</div>
			{/* Header: Avatar, nome, tempo - tudo clicável */}
			{usuarioId ? (
				<>
					<BeeFTPerfil
						usuarioId={usuarioId}
						dataPublicacao={dataPublicacao}
					/>
				</>
			) : (
				<div
					className="repo-header flex items-center gap-1 group"
					style={{textDecoration: "none"}}
				>
					<div
						className="w-4 h-4 flex items-center justify-center bg-[#E5E5EA] rounded-full"
						style={{
							clipPath:
								"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
						}}
					>
						<img
							src={
								usuario &&
								typeof usuario === "object" &&
								"imagemPerfil" in usuario &&
								(usuario as any).imagemPerfil
									? (usuario as any).imagemPerfil
									: defaultBeeImg
							}
							alt="Avatar"
							className="w-2 h-2 object-cover"
						/>
					</div>
					<div className="flex flex-col">
						<span className="font-bold text-[#333333] text-[11px] leading-tight">
							{usuario &&
							typeof usuario === "object" &&
							"username" in usuario &&
							(usuario as any).username
								? (usuario as any).username
								: "Usuário"}
						</span>
						<span className="text-[#FCBD18] text-[9px] font-semibold leading-tight">
							{tempoDesde(dataPublicacao)}
						</span>
					</div>
				</div>
			)}
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
		</div>
	);
};

export default BeeRepo;
