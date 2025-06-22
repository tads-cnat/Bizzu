"use client";

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
		<div className="h-full">
			<div className="flex items-center gap-2 mt-4 ml-4 bg-transparent ">
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

			<style>
				{`
    .ant-menu-item-selected {
    background-color: #FCBD18 !important;
    color: white !important;
    }
    .ant-menu-item {
    color: #555;
    }
    .ant-menu-item:hover {
    background-color:#B0B0B0 !important;
    color:rgb(232, 230, 230) !important;
    }
	.ant-menu-submenu-selected > .ant-menu-submenu-title {
	color: #333 !important;
	}

	.ant-menu-submenu-arrow {
	color: #333 !important;
	}

	.ant-menu-submenu-title {
	color: #333 !important;
	}

	.ant-menu-submenu-title:hover {
			background-color:#B0B0B0 !important;
			color:rgb(232, 230, 230) !important;
	}
	.ant-menu-sub {
	background-color: white !important; /* ou qualquer cor que você quiser */
	}
    `}
			</style>
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
