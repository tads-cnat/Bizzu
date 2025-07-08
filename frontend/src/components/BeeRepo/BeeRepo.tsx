"use client";

import type React from "react";
import {useState} from "react";
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
	const navigate = useNavigate();
	const {username} = acessAuth();
	const isOwner = usuario?.username === username;

	const handleEditarClick = () => {
		if (id) {
			navigate(`/repositorio/editar/${id}`);
		}
		setShowMenu(false);
	};

	const handleExcluirClick = () => {
		if (onExcluir && id) {
			const confirmDelete = window.confirm(
				"Tem certeza que deseja excluir este repositório?",
			);
			if (confirmDelete) {
				onExcluir(id);
			}
		}
		setShowMenu(false);
	};

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowMenu(!showMenu);
	};

	return (
		<div
			className="bg-[#F7F7FA] shadow-md rounded-xl p-3 mb-2 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
			style={{maxWidth: 320}}
			onClick={(e) => {
				// Evita alert se clicar no header ou nas tags
				if ((e.target as HTMLElement).closest(".repo-header, .repo-tag"))
					return;
				alert("Abriu detalhes do repositório");
			}}
		>
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
			<Link
				to={`/${usuario?.username}/`}
				className="repo-header flex items-center gap-2 mb-1 group"
				style={{textDecoration: "none"}}
			>
				<div
					className="w-7 h-7 flex items-center justify-center bg-[#E5E5EA] rounded-full"
					style={{
						clipPath:
							"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
					}}
				>
					<img
						src={usuario?.imagemPerfil || defaultBeeImg}
						alt="Avatar"
						className="w-7 h-7 object-cover"
					/>
				</div>
				<div className="flex flex-col">
					<span className="font-bold text-[#333333] text-xs">
						{usuario?.username || "Usuário"}
					</span>
					<span className="text-[#FCBD18] text-[10px] font-semibold">
						{tempoDesde(dataPublicacao)}
					</span>
				</div>
			</Link>
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
						<span
							key={index}
							className="repo-tag bg-white text-[#333333] rounded-full px-2 py-0.5 text-[10px] font-medium border border-[#E5E5EA] cursor-pointer transition-all duration-1580 hover:shadow-md hover:scale-90"
							onClick={(e) => {
								e.stopPropagation();
								alert(`#${tag.label}`);
							}}
						>
							#{tag.label}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default BeeRepo;
