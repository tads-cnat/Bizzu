import acessAuth from "../../utils/acessAuth";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IBeeUser} from "../BeeHeaderProfile/IBeeUser";
import UsuarioService from "../../services/models/UsuarioService";

import {Divider, Menu} from "antd";
import type {GetProp, MenuProps} from "antd";
import {Globe, House, User} from "@phosphor-icons/react";

export const BeeSidebar = () => {
	const {username} = acessAuth();
	const identificador = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [comunidade, setComunidade] = useState();
	useEffect(() => {
		void UsuarioService.getbyUsername(String(identificador))
			.then((response) => {
				setUsuario(response.data);
			})
			.catch(() => {
				console.log("Não recebeu dados");
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
			children: [
				{key: "31", label: "Infoweb"},
				{key: "32", label: "Tads"},
				{key: "33", label: "Redes"},
			],
		},
	];

	return (
		<>
			<div className="flex items-center gap-2 mt-4 ml-4 bg-transparent">
				<img
					src={
						usuario?.imagemPerfil ||
						"https://saae.lucasdorioverde.mt.gov.br/arquivos/setores/sem_imagem_avatar.png"
					}
					alt={username}
					className="w-8 h-8 object-cover"
					style={{
						clipPath:
							"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
					}}
				/>
				<div className="leading-tight">
					<p className="font-semibold text-sm text-black">{username}</p>
					<p className="text-xs text-zinc-500">Ver perfil</p>
				</div>
			</div>
			<Divider type="vertical" />
			<br />
			<Menu
				style={{width: 256}}
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["3"]}
				mode="inline"
				items={items}
			/>
		</>
	);
};
