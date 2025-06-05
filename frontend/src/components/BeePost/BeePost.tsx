import type React from "react";
import {useState} from "react";
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
import {useCurtida} from "../../hooks/useCurtida";
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
	onAbrirComentarios,
	onExcluir,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const navigate = useNavigate();
	const {id: usuarioLogadoId} = acessAuth();

	const {curtido, contagem, alternarCurtida, carregando} = useCurtida(id);

	const handleEditarClick = () => {
		if (id) {
			navigate(`/bizzu/postagem/editar/${id}`);
		}
		setShowMenu(false);
	};

	const handleExcluirClick = () => {
		if (onExcluir && id) {
			const confirmDelete = window.confirm(
				"Tem certeza que deseja excluir esta postagem?",
			);
			if (confirmDelete) {
				onExcluir(id);
			}
		}
		setShowMenu(false);
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const isOwnPost = usuario?.id === usuarioLogadoId;

	const handleCurtidaClick = () => {
		if (isOwnPost) {
			alert("Você não pode curtir sua própria postagem!");
			return;
		}

		if (carregando) return;

		alternarCurtida();
	};

	return (
		<div className="bg-white shadow rounded-lg p-4 mb-4 relative w-full">
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
				usuario={usuario}
				dataPublicacao={dataPublicacao}
			/>

			<p className="mb-3 mt-2">{texto}</p>

			{imagemPost && (
				// <img
				// 	src={`data:image/jpeg;base64,${imagemPost}`}
				// 	alt="Postagem"
				// />

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
						className={`flex items-center gap-1 transition duration-200 ease-in-out rounded-full p-2 ${
							isOwnPost
								? "opacity-50 cursor-not-allowed"
								: "hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
						} ${curtido ? "text-[#FCBD18]" : ""}`}
						onClick={handleCurtidaClick}
						disabled={carregando || isOwnPost}
						type="button"
						title={
							isOwnPost
								? "Você não pode curtir sua própria postagem"
								: curtido
									? "Descurtir"
									: "Curtir"
						}
					>
						<Heart
							size={16}
							weight={curtido ? "fill" : "regular"}
							className={curtido ? "text-[#FCBD18]" : ""}
						/>
						{carregando ? "..." : contagem || curtidas} Curtidas
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
						{comentarios} Comentários
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
