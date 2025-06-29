import "./style.css";
import acessAuth from "../../utils/acessAuth";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {IBeeUser} from "../BeeHeaderProfile/IBeeUser";

import UsuarioService from "../../services/models/UsuarioService";
import ComunidadeService from "../../services/models/ComunidadeService";

import {Divider, Menu} from "antd";
import type {GetProp, MenuProps} from "antd";
import {Globe, House, User} from "@phosphor-icons/react";

export const BeeSidebar = () => {
	const {username} = acessAuth();
	const identificador = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [comunidades, setComunidades] = useState<MenuItem[]>([]);

	useEffect(() => {
		void UsuarioService.getbyUsername(String(identificador))
			.then((response) => {
				setUsuario(response);
			})
			.catch(() => {
				console.log("Não recebeu dados");
			});
	}, [identificador]);

	useEffect(() => {
		void ComunidadeService.listAll()
			.then((response) => {
				const listarComunidades: MenuItem[] = response.data.map(
					(comunidade: any) => ({
						key: `comunidade-${comunidade.id}`,
						label: comunidade.nome,
					}),
				);
				setComunidades(listarComunidades);
			})
			.catch(() => {
				console.log("Erro ao buscar comunidades");
			});
	}, []);

	type MenuItem = GetProp<MenuProps, "items">[number];
	const items: MenuItem[] = [
		{
			key: "1",
			icon: <House />,
			label: "Página inicial",
		},
		{
			key: "2",
			icon: <User />,
			label: "Você segue",
		},
		{
			key: "3",
			label: "Comunidades",
			icon: <Globe />,
			children: comunidades,
		},
	];
	return (
		<div className="h-full w-1/3">
			<div className="flex items-center gap-2 mt-4 ml-5 bg-transparent ">
				{usuario ? (
					<img
						src={
							usuario.imagemPerfil
								? `http://localhost:8000${usuario.imagemPerfil}`
								: "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png"
						}
						alt={username}
						className="w-8 h-8 object-cover"
						style={{
							clipPath:
								"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
						}}
					/>
				) : (
					<div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
				)}
				<div className="leading-tight">
					<p className="font-semibold text-sm text-black ">{username}</p>
					<p className="text-xs text-zinc-500">Ver perfil</p>
				</div>
			</div>
			<Divider />
			<Menu
				className="border-none "
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["3"]}
				mode="inline"
				items={items}
			/>
		</div>
	);
};
