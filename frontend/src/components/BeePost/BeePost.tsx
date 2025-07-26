"use client";

import type React from "react";
import {useState, useEffect} from "react";
import {
	Heart,
	ChatCircle,
	DotsThreeVertical,
	PencilSimple,
	Trash,
} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import BeeTags from "../BeeTags/BeeTags";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";
import type {BeePostProps} from "./IBeePost";
import "../../index.css";
import BeeModal from "../BeeModal/BeeModal";
import BeeModalComentarios from "../BeeModalComentarios/BeeModalComentarios";
import CurtidaService from "../../services/models/CurtidaService";
import ComentarioService from "../../services/models/ComentarioService";
import acessAuth from "../../utils/acessAuth";

const BeePost: React.FC<BeePostProps> = ({
	id,
	usuario,
	texto,
	imagemPost,
	dataPublicacao,
	tags = [],
	curtidas = 0,
	comentarios = 0,
	onCurtir,
	onAbrirComentarios,
	onExcluir,
	disableInteractions = false, // Nova prop com valor padrão false
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const [deleteConfimation, setDeleteConfimation] = useState<boolean>(false);
	const [showComentarios, setShowComentarios] = useState(false);
	const [curtido, setCurtido] = useState(false);
	const [totalCurtidas, setTotalCurtidas] = useState(curtidas);
	const [totalComentarios, setTotalComentarios] = useState(comentarios);
	const [loadingCurtida, setLoadingCurtida] = useState(false);
	const navigate = useNavigate();
	const {username} = acessAuth();

	// Verificar curtidas e carregar contagem de comentários ao montar o componente
	useEffect(() => {
		const carregarDados = async () => {
			if (!id || !username || disableInteractions) return;

			try {
				// Verificar curtida
				const curtidaResponse = await CurtidaService.verificarCurtida(id);
				setCurtido(curtidaResponse.curtido);
				setTotalCurtidas(curtidaResponse.total_curtidas);

				// Carregar contagem de comentários
				const comentariosResponse =
					await ComentarioService.contarComentarios(id);
				setTotalComentarios(comentariosResponse.total_comentarios);
			} catch (error) {
				console.error("Erro ao carregar dados do post:", error);
				// Se houver erro, usar os valores iniciais
				setTotalCurtidas(curtidas);
				setTotalComentarios(comentarios);
			}
		};

		carregarDados();
	}, [id, username, curtidas, comentarios, disableInteractions]);

	const handleCurtir = async () => {
		if (!id || loadingCurtida || disableInteractions) return;

		setLoadingCurtida(true);
		try {
			const response = await CurtidaService.alternarCurtida(id);
			setCurtido(response.curtido);
			setTotalCurtidas(response.total_curtidas);

			// Chamar callback se fornecido
			if (onCurtir) {
				onCurtir();
			}
		} catch (error) {
			console.error("Erro ao curtir/descurtir:", error);
		} finally {
			setLoadingCurtida(false);
		}
	};

	const handleAbrirComentarios = () => {
		if (disableInteractions) return;

		setShowComentarios(true);
		if (onAbrirComentarios) {
			onAbrirComentarios();
		}
	};

	const handleComentarioAdicionado = () => {
		// Atualizar contagem quando um comentário for adicionado
		setTotalComentarios((prev) => prev + 1);
	};

	const handleEditarClick = () => {
		if (id) {
			navigate(`/postagem/editar/${id}`);
		}
		setShowMenu(false);
	};

	const handleExcluirClick = () => {
		setDeleteConfimation(true);
		setShowMenu(false);
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	// Preparar dados do post para o modal
	const postData: BeePostProps = {
		id,
		usuario,
		texto,
		imagemPost,
		dataPublicacao,
		tags,
		curtidas: totalCurtidas,
		comentarios: totalComentarios,
		onCurtir: handleCurtir,
		onAbrirComentarios: handleAbrirComentarios,
		onExcluir,
	};

	console.log("POST", imagemPost);

	return (
		<div className="bg-white shadow rounded-lg p-4 mb-4 relative w-full">
			{deleteConfimation && (
				<BeeModal
					onExcluir={onExcluir}
					label="Excluir postagem"
					text="Você deseja excluir essa postagem?"
					id={id}
				/>
			)}
			{/* Modal de Comentários - só renderiza se não estiver desabilitado */}
			{!disableInteractions && (
				<BeeModalComentarios
					isOpen={showComentarios}
					onClose={() => setShowComentarios(false)}
					post={postData}
					onComentarioAdicionado={handleComentarioAdicionado}
				/>
			)}
			{/* Menu de opções - só mostra se não estiver desabilitado */}
			{!disableInteractions && (
				<div className="absolute top-4 right-4">
					<button
						onClick={toggleMenu}
						className="text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition duration-200 ease-in-out"
						type="button"
					>
						<DotsThreeVertical
							size={24}
							weight="bold"
						/>
					</button>

					{/* Dropdown menu */}
					{showMenu && (
						<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
							<div className="py-1">
								<button
									onClick={handleEditarClick}
									className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
									type="button"
								>
									<PencilSimple
										size={16}
										className="mr-2"
									/>
									Editar
								</button>
								<button
									onClick={handleExcluirClick}
									className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200"
									type="button"
								>
									<Trash
										size={16}
										className="mr-2"
									/>
									Excluir
								</button>
							</div>
						</div>
					)}
				</div>
			)}
			{/* Overlay para fechar o menu quando clicar fora */}
			{showMenu && (
				<div
					className="fixed inset-0 z-5"
					onClick={() => setShowMenu(false)}
				/>
			)}
			<BeeFTPerfil
				usuarioId={usuario}
				dataPublicacao={dataPublicacao}
			/>
			<p className="mb-3 mt-2">{texto}</p>
			{imagemPost && (
				<img
					src={imagemPost || "/placeholder.svg"}
					alt="Imagem do post"
					className="rounded-lg mb-3 w-full object-cover"
				/>
			)}
			<div className="flex items-center justify-between text-sm mb-2">
				<div
					className="flex items-center gap-4"
					style={{color: "#333333"}}
				>
					{/* Botão de curtir - desabilitado quando disableInteractions é true */}
					<button
						className={`flex items-center gap-1 transition duration-200 ease-in-out rounded-full p-2 ${
							disableInteractions
								? "cursor-default opacity-60"
								: `hover:bg-gray-100 ${curtido ? "text-red-500" : "hover:text-gray-500"} ${loadingCurtida ? "opacity-50 cursor-not-allowed" : ""}`
						}`}
						onClick={disableInteractions ? undefined : handleCurtir}
						type="button"
						disabled={loadingCurtida || disableInteractions}
					>
						<Heart
							size={16}
							weight={curtido ? "fill" : "regular"}
							className={curtido ? "text-red-500" : ""}
						/>
						{totalCurtidas} {totalCurtidas === 1 ? "Curtida" : "Curtidas"}
					</button>

					{/* Botão de comentários - desabilitado quando disableInteractions é true */}
					<button
						className={`flex items-center gap-1 transition duration-200 ease-in-out rounded-full p-2 ${
							disableInteractions
								? "cursor-default opacity-60"
								: "hover:text-gray-500 hover:bg-gray-100"
						}`}
						onClick={disableInteractions ? undefined : handleAbrirComentarios}
						type="button"
						disabled={disableInteractions}
					>
						<ChatCircle
							size={16}
							weight="bold"
						/>
						{totalComentarios}{" "}
						{totalComentarios === 1 ? "Comentário" : "Comentários"}
					</button>
				</div>
				{tags && tags.length > 0 && (
					<div className="flex gap-1 flex-wrap justify-end">
						{tags.map((tag, index) => (
							<BeeTags
								key={index}
								label={tag.label}
								color={tag.color}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default BeePost;
