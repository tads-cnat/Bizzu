import type React from "react";
import {useState} from "react";
import {
	DotsThreeVertical,
	PencilSimple,
	Trash,
} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";
import type {BeeRepoProps} from "./IBeeRepo";
import "../../index.css";

const BeeRepo: React.FC<BeeRepoProps> = ({
	id,
	usuario,
	descricao,
	imagemRepo,
	dataPublicacao,
	onExcluir,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const navigate = useNavigate();

	const handleEditarClick = () => {
		if (id) {
			navigate(`/bizzu/repositorio/editar/${id}`);
		}
		setShowMenu(false);
	};

	const handleExcluirClick = () => {
		if (onExcluir && id) {
			const confirmDelete = window.confirm(
				"Tem certeza que deseja excluir este repositorio?",
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
								className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer duration-200"
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
								className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer duration-200"
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

			<p className="mb-3 mt-2">{descricao}</p>

			{imagemRepo && (
				// <img
				// 	src={`data:image/jpeg;base64,${imagemPost}`}
				// 	alt="Postagem"
				// />

				<img
					src={imagemRepo || "/placeholder.svg"}
					alt="Imagem do post"
					className="rounded-lg mb-3 w-full object-cover"
				/>
			)}

			<div className="flex items-center justify-between text-sm mb-2">
				<div
					className="flex items-center gap-4"
					style={{color: "#333333"}}
				>
				</div>
			</div>
		</div>
	);
};

export default BeeRepo;
