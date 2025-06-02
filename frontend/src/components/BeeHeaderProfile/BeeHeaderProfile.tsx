import {BoxArrowUp, Newspaper, Plus} from "@phosphor-icons/react";
import BeeButton from "../BeeButtons/BeeButtons";
import {IBeeUser} from "./IBeeUser";
import acessAuth from "../../utils/acessAuth";
import {useEffect, useState} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import {useParams} from "react-router-dom";
import {Menu, MenuItem} from "@headlessui/react";
import BeeAbasPerfil from "../BeeAbasPerfil/BeeAbasPerfil";
import BeePost from "../BeePost/BeePost";

const BeeHeaderProfile = () => {
	const {username} = acessAuth();
	const idUser = useParams().id;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [visble, setVisible] = useState<Boolean>(false);

	useEffect(() => {
		void UsuarioService.get(Number(idUser))
			.then((response) => {
				setUsuario(response.data);
			})
			.catch(() => {
				console.log("Não recebeu dados");
			});
	}, []);

	const openOptions = () => {
		if (visble) setVisible(false);
		else setVisible(true);
	};

	return (
		<>
			{usuario && (
				<div className="flex min-w-0 gap-x-4">
					<img
						src={usuario.imagemPerfil}
						alt="Imagem de usuário"
						className="size-22 flex-none rounded-full bg-gray-50"
						style={{
							clipPath:
								"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
						}}
					></img>
					<div className="min-w-0 flex-auto">
						<p className="text-xl font-semibold text-[#333333]">
							{usuario.nome}
						</p>
						<p className="mt-1 truncate text-xs/5 text-[#333333]">
							@{username}
						</p>
						<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
							<a
								href="#"
								className="mt-2 flex font-semibold items-center text-sm text-[#333333]"
							>
								{usuario.segue?.length} Segue
							</a>
							<a
								href="#"
								className="mt-2 flex font-semibold items-center text-sm text-[#333333]"
							>
								{usuario.segue?.length} Seguidores
							</a>
							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								<BeeButton
									variante="primaria"
									label="Novo"
									icone={<Plus />}
									onClick={openOptions}
								/>
								{visble && (
									<div className="absolute top-full left-0 z-50 w-48 bg-white shadow-lg rounded-md">
										<MenuItem>
											<a
												href="#"
												className="inline-flex items-center px-4 py-2 text-sm text-[#333333] space-x-2"
											>
												<Newspaper /> Criar Postagem
											</a>
										</MenuItem>
										<MenuItem>
											<a
												href="#"
												className="inline-flex items-center px-4 py-2 text-sm text-[#333333] space-x-2"
											>
												<BoxArrowUp /> Criar Repositório
											</a>
										</MenuItem>
									</div>
								)}
							</Menu>
						</div>
					</div>
				</div>
			)}
			<BeeAbasPerfil abas={["Postagens", "Repositórios", "Comentários"]} />
		</>
	);
};

export default BeeHeaderProfile;
