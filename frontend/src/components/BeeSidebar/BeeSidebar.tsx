import {CaretDown} from "@phosphor-icons/react";

import {IBeeSidebarProps} from "./IBeeSidebar";

import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";

import acessAuth from "../../utils/acessAuth";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IBeeUser} from "../BeeHeaderProfile/IBeeUser";
import UsuarioService from "../../services/models/UsuarioService";

const DEFAULT_IMAGE = ""; // ainda não existe imagem_default

export const BeeSidebar = ({
	items,
	userRole = "Ver Perfil",
}: IBeeSidebarProps) => {
	const {username} = acessAuth();
	const idUser = useParams().id;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [comunidade, setComunidade] = useState();
	useEffect(() => {
		void UsuarioService.get(Number(idUser))
			.then((response) => {
				setUsuario(response.data);
			})
			.catch(() => {
				console.log("Não recebeu dados");
			});
	}, []);
	return (
		<aside className="fixed top-[80px] left-4 w-66 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40">
			{/* Topo - Perfil do usuário */}
			<div className="flex items-center gap-2 mb-4 bg-transparent">
				<img
					src={usuario?.imagemPerfil || DEFAULT_IMAGE}
					alt={username}
					className="w-8 h-8 object-cover"
					style={{
						clipPath:
							"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
					}}
				/>
				<div className="leading-tight">
					<p className="font-semibold text-sm text-black">{username}</p>
					<p className="text-xs text-zinc-500">{userRole}</p>
				</div>
			</div>

			{/* Itens do menu */}
			<nav className="flex flex-col gap-2">
				{items.map((item, index) =>
					item.children ? (
						<Menu
							as="div"
							key={index}
							className="relative"
						>
							{({open}) => (
								<>
									<MenuButton className="ml-2 mt-1 flex w-full items-center gap-2 text-black rounded hover:bg-zinc-200/60 transition bg-transparent">
										<div className="flex items-center gap-2">
											{item.icon}
											<span className="text-sx">{item.label}</span>
										</div>
										<CaretDown
											size={14}
											className={`transition-transform duration-200 ${
												open ? "rotate-180" : ""
											}`}
										/>
									</MenuButton>

									<MenuItems className="absolute left-0 top-full mt-1 w-full bg-transparent z-50 flex flex-col">
										{item.children!.map((child, idx) => (
											<MenuItem key={idx}>
												{({active}) => (
													<button
														onClick={child.onClick}
														className={`flex items-center gap-3 px-4 py-2 text-sm w-full ${
															active ? "hover:bg-zinc-200/60 rounded" : ""
														}`}
													>
														{child.image && (
															<img
																src={child.image}
																alt={child.label}
																className="w-6 h-6 object-cover"
																style={{
																	clipPath:
																		"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
																}}
															/>
														)}
														{child.icon && <span>{child.icon}</span>}
														<span>{child.label}</span>
													</button>
												)}
											</MenuItem>
										))}
									</MenuItems>
								</>
							)}
						</Menu>
					) : (
						<button
							key={index}
							onClick={item.onClick}
							className="flex items-center gap-2 px-2 py-1 rounded text-black hover:bg-zinc-200/60 transition bg-transparent text-sx"
						>
							{item.icon}
							<span>{item.label}</span>
						</button>
					),
				)}
			</nav>
		</aside>
	);
};
