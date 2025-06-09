import {BoxArrowUp, Newspaper, Plus} from "@phosphor-icons/react";
import BeeButton from "../BeeButtons/BeeButtons";
import {IBeeUser} from "./IBeeUser";
import acessAuth from "../../utils/acessAuth";
import {useEffect, useState} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import {Link, useParams} from "react-router-dom";
import {Menu, MenuItem} from "@headlessui/react";

const BeeHeaderProfile = () => {
	const {username} = acessAuth();
	const identificator = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [visble, setVisible] = useState<Boolean>(false);
	const [estaSeguindo, setEstaSeguindo] = useState(false);
	const [seguidores, setSeguidores] = useState(0);
	const [seguindo, setSeguindo] = useState(0);

	useEffect(() => {
		void UsuarioService.getbyUsername(String(identificator))
			.then((response) => {
				setUsuario(response);
				if (response.id) {
					verificarStatusSeguimento(response.id);
				}
			})
			.catch(() => {
				console.log("Não recebeu dados");
			});
	}, [identificator]);

	const verificarStatusSeguimento = async (id: number) => {
		try {
			const response = await UsuarioService.verificarSeguimento(id);
			setEstaSeguindo(response.esta_seguindo);
			setSeguidores(response.seguidores);
			setSeguindo(response.seguindo);
		} catch (error) {
			console.error("Erro ao verificar status de seguimento:", error);
		}
	};

	const handleSeguir = async () => {
		if (!usuario?.id) return;
		try {
			await UsuarioService.seguirUsuario(usuario.id);
			setEstaSeguindo(true);
			setSeguidores(prev => prev + 1);
		} catch (error) {
			console.error("Erro ao seguir usuário:", error);
		}
	};

	const handleDeixarDeSeguir = async () => {
		if (!usuario?.id) return;
		try {
			await UsuarioService.deixarDeSeguir(usuario.id);
			setEstaSeguindo(false);
			setSeguidores(prev => prev - 1);
		} catch (error) {
			console.error("Erro ao deixar de seguir usuário:", error);
		}
	};

	const openOptions = () => {
		if (visble) setVisible(false);
		else setVisible(true);
	};

	return (
		<>
			{usuario && (
				<div className="flex min-w-0 gap-x-4">
					<img
						src={`http://localhost:8000${usuario.imagemPerfil}`}
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
							@{usuario.nome}
						</p>
						<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
							<a
								href="#"
								className="mt-2 flex font-semibold items-center text-sm text-[#333333]"
							>
								{seguindo} Segue
							</a>
							<a
								href="#"
								className="mt-2 flex font-semibold items-center text-sm text-[#333333]"
							>
								{seguidores} Seguidores
							</a>
							{usuario.username == username ? (
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
												<Link to={`/bizzu/postagem/criar/`}>
													<Newspaper /> Criar Postagem
												</Link>
											</MenuItem>

											<MenuItem>
												<Link to={`/bizzu/postagem/editar/${usuario.username}`}>
													<BoxArrowUp /> Criar Repositório
												</Link>
											</MenuItem>
										</div>
									)}
								</Menu>
							) : (
								<BeeButton
									variante={estaSeguindo ? "secundaria" : "primaria"}
									label={estaSeguindo ? "Seguindo" : "Seguir"}
									onClick={estaSeguindo ? handleDeixarDeSeguir : handleSeguir}
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BeeHeaderProfile;
