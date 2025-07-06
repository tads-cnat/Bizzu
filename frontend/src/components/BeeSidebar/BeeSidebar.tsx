import "./style.css";
import acessAuth from "../../utils/acessAuth";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ComunidadeService from "../../services/models/ComunidadeService";
import UsuarioService from "../../services/models/UsuarioService";
import {Divider, Menu} from "antd";
import type {GetProp, MenuProps} from "antd";
import {Globe, House, User} from "@phosphor-icons/react";
import {IBeeSidebarProps} from "./IBeeSidebar";
import {IBeeUser} from "../../features/Perfil/components/BeeHeaderProfile/IBeeUser";

export const BeeSidebar = ({onSelecionarSecao}: IBeeSidebarProps) => {
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
				{usuario && username ? (
					<div className="flex items-center gap-2">
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
						<div className="leading-tight">
							<p className="font-semibold text-sm text-black ">{username}</p>
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
			<Divider />
			<Menu
				className="border-none "
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["3"]}
				mode="inline"
				items={items}
				onSelect={(e) => {
					onSelecionarSecao(e.key);
				}}
			/>
		</div>
	);
};
