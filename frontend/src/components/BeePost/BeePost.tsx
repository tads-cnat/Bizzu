import React from "react";
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
import {BeePostProps} from "./IBeePost";
import "../../index.css";
import BeeModal from "../BeeModal/BeeModal";
import CurtidaService from "../../services/models/CurtidaService";
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
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const [deleteConfimation, setDeleteConfimation] = useState<boolean>(false);
	const [curtido, setCurtido] = useState(false);
	const [totalCurtidas, setTotalCurtidas] = useState(curtidas);
	const [loadingCurtida, setLoadingCurtida] = useState(false);
	const navigate = useNavigate();
	const {username} = acessAuth();

	// Verificar se o usuário já curtiu a postagem ao montar o componente
	useEffect(() => {
		const verificarCurtida = async () => {
			if (!id || !username) return;

			try {
				const response = await CurtidaService.verificarCurtida(id);
				setCurtido(response.curtido);
				setTotalCurtidas(response.total_curtidas);
			} catch (error) {
				console.error("Erro ao verificar curtida:", error);
				// Se houver erro, usar os valores iniciais
				setTotalCurtidas(curtidas);
			}
		};

		verificarCurtida();
	}, [id, username, curtidas]);

	const handleCurtir = async () => {
		if (!id || loadingCurtida) return;

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
			// Você pode adicionar uma notificação de erro aqui
		} finally {
			setLoadingCurtida(false);
		}
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
			{/* Menu de opções */}
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
					<button
						className={`flex items-center gap-1 transition duration-200 ease-in-out hover:bg-gray-100 rounded-full p-2 ${
							curtido ? "text-red-500" : "hover:text-gray-500"
						} ${loadingCurtida ? "opacity-50 cursor-not-allowed" : ""}`}
						onClick={handleCurtir}
						type="button"
						disabled={loadingCurtida}
					>
						<Heart
							size={16}
							weight={curtido ? "fill" : "regular"}
							className={curtido ? "text-red-500" : ""}
						/>
						{totalCurtidas} {totalCurtidas === 1 ? "Curtida" : "Curtidas"}
					</button>

					<button
						className="flex items-center gap-1 hover:text-gray-500 transition duration-200 ease-in-out hover:bg-gray-100 rounded-full p-2"
						onClick={onAbrirComentarios}
						type="button"
					>
						<ChatCircle
							size={16}
							weight="bold"
						/>
						{comentarios} {comentarios === 1 ? "Comentário" : "Comentários"}
					</button>
				</div>
				{tags && tags.length > 0 && (
					<div className="flex gap-1 flex-wrap">
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
