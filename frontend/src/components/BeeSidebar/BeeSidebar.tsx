import "./style.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import ComunidadeService from "../../services/models/ComunidadeService";
import UsuarioService from "../../services/models/UsuarioService";
import {Divider, Menu, Spin} from "antd";
import type {GetProp, MenuProps} from "antd";
import {Globe, House, ListBullets, User} from "@phosphor-icons/react";
import {IBeeSidebarProps} from "./IBeeSidebar";
import {IBeeUser} from "../../features/Perfil/components/BeeHeaderProfile/IBeeUser";
import BeeNotification from "../BeeNotification/BeeNotification";
import getLocalStorage from "../../utils/getLocalStorage";
import BeeButton from "../BeeButtons/BeeButtons";

export const BeeSidebar = ({onSelecionarSecao}: IBeeSidebarProps) => {
	const [username, setUsername] = useState();
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [comunidades, setComunidades] = useState<MenuItem[]>([]);
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	if (getLocalStorage() != null && username == undefined) {
		setUsername(getLocalStorage().username);
	}

	useEffect(() => {
		void UsuarioService.getbyUsername(username)
			.then((response) => {
				setUsuario(response);
			})
			.catch(() => {
				console.log("Não recebeu dados");
			});
	}, []);

	useEffect(() => {
		void ComunidadeService.listAll()
			.then((response) => {
				const listarComunidades: MenuItem[] = response.data.map(
					(comunidade: any) => ({
						key: `comunidade-${comunidade.id}`,
						label: (
							<Link to={`/comunidade/${comunidade.id}`}>{comunidade.nome}</Link>
						),
					}),
				);
				setComunidades(listarComunidades);
			})
			.catch(() => {
				console.error("Erro ao buscar comunidades");
			});
	}, []);

	type MenuItem = GetProp<MenuProps, "items">[number];
	const items: MenuItem[] = [
		{
			key: "1",
			icon: (
				<House
					size={23}
					weight="fill"
				/>
			),
			label: "Página inicial",
		},
		{
			key: "2",
			icon: (
				<User
					size={23}
					weight="fill"
				/>
			),
			label: "Você segue",
		},
		{
			key: "3",
			label: "Comunidades",
			icon: <Globe size={23} />,
			children: comunidades,
		},
	];

	return (
		<>
			{usuario == undefined && getLocalStorage() != null ? (
				<Spin />
			) : (
				<div
					className={`h-screen transition-all duration-300 ${
						collapsed ? "w-[80px]" : "w-[300px] border-r border-gray-300"
					}`}
				>
					<div className="flex flex-col mt-4 ml-5 gap-3">
						<BeeButton
							onClick={toggleCollapsed}
							icone={<ListBullets />}
							variante="aviso"
							className="w-fit"
							classesDefault={false}
						/>
						<div className="flex items-center gap-3">
							{!collapsed && (
								<div>
									{usuario && username ? (
										<div className="flex items-center gap-3">
											<img
												src={
													usuario.imagemPerfil != undefined
														? `http://localhost:8000${usuario.imagemPerfil}`
														: "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png"
												}
												alt={username}
												className="w-10 h-10 object-cover"
												style={{
													clipPath:
														"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
												}}
											/>
											<div className="leading-tight">
												<p className="font-semibold text-md text-black">
													{username}
												</p>
												<p className="text-xs text-zinc-500">
													<Link to={`/${username}/`}>Ver perfil</Link>
												</p>
											</div>
										</div>
									) : (
										<div className="flex items-center">
											<div className="relative px-4 py-2 bg-white border border-yellow-400 text-sm text-black font-medium rounded-[20px] shadow-md max-w-[200px] before:content-[''] before:absolute before:left-6 before:top-[-10px] before:w-0 before:h-0 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[12px] before:border-b-white after:content-[''] after:absolute after:left-[25px] after:top-[-12px] after:w-0 after:h-0 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-b-[14px] after:border-b-yellow-400">
												Ei!{" "}
												<Link
													to="/login/"
													className="underline hover:text-yellow transition font-semibold"
												>
													Faça login
												</Link>{" "}
												pra se juntar a comunidade do bizzu!
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
					{!collapsed && <Divider className="mt-400" />}
					{username === undefined ? (
						<BeeNotification
							type="warning"
							title="Você não está conectado"
							message="Faça o login e aproveite integralmente o bizzu"
							content={
								<Menu
									className="border-none "
									defaultSelectedKeys={["1"]}
									defaultOpenKeys={["3"]}
									mode="inline"
									inlineCollapsed={collapsed}
									items={items}
									selectable={false}
									style={{width: "100%"}}
								/>
							}
						/>
					) : (
						<Menu
							className="border-none "
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["3"]}
							mode="inline"
							items={items}
							inlineCollapsed={collapsed}
							onSelect={(e) => {
								onSelecionarSecao(e.key);
							}}
						/>
					)}
				</div>
			)}
		</>
	);
};
