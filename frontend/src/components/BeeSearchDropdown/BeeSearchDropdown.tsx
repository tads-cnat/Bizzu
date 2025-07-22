import React from "react";
import {User, Spinner} from "@phosphor-icons/react";
import type {IBeeSearchDropdown, IUsuarioPesquisa} from "./IBeeSearchDropdown";

const BeeSearchDropdown: React.FC<IBeeSearchDropdown> = ({
	usuarios,
	loading,
	isVisible,
	onSelectUser,
	onClose,
}) => {
	if (!isVisible) return null;

	return (
		<>
			{/* Overlay para fechar o dropdown quando clicar fora */}
			<div
				className="fixed inset-0 z-10"
				onClick={onClose}
			/>

			{/* Dropdown */}
			<div className="absolute top-full left-0 right-0 z-20 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
				{loading ? (
					<div className="flex items-center justify-center p-4">
						<Spinner
							size={20}
							className="animate-spin text-[#FCBD18]"
						/>
						<span className="ml-2 text-gray-600">Pesquisando...</span>
					</div>
				) : usuarios.length === 0 ? (
					<div className="p-4 text-center text-gray-500">
						Nenhum usuário encontrado
					</div>
				) : (
					<div className="py-2">
						{usuarios.map((usuario, index) => (
							<button
								key={`${usuario.username}-${index}`}
								onClick={() => onSelectUser(usuario)}
								className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
							>
								{/* Foto de perfil */}
								<div className="flex-shrink-0">
									{usuario.imagemPerfil ? (
										<img
											src={`${usuario.imagemPerfil}`}
											alt={usuario.username}
											className="w-10 h-10 object-cover"
											style={{
												clipPath:
													"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
											}}
										/>
									) : (
										<div
											className="w-10 h-10 bg-gray-200 flex items-center justify-center"
											style={{
												clipPath:
													"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
											}}
										>
											<User
												size={16}
												className="text-gray-500"
											/>
										</div>
									)}
								</div>

								{/* Informações do usuário */}
								<div className="flex-1 min-w-0">
									<p className="font-medium text-[#333333] truncate">
										{usuario.nome || usuario.username}
									</p>
									{usuario.nome && (
										<p className="text-sm text-gray-500 truncate">
											@{usuario.username}
										</p>
									)}
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default BeeSearchDropdown;
