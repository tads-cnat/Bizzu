import {BoxArrowUp, Newspaper, Plus} from "@phosphor-icons/react";
import {IBeeUser} from "./IBeeUser";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Menu, MenuItem} from "@headlessui/react";
import UsuarioService from "../../../../services/models/UsuarioService";
import BeeButton from "../../../../components/BeeButtons/BeeButtons";
import acessPermissions from "../../../../utils/acessPermissions";
import acessAuth from "../../../../utils/acessAuth";
import getLocalStorage from "../../../../utils/getLocalStorage";

const BeeHeaderProfile = () => {
	const identificator = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();
	const [visible, setVisible] = useState<Boolean>(false);
	const [estaSeguindo, setEstaSeguindo] = useState(false);
	const [seguidores, setSeguidores] = useState(0);
	const [seguindo, setSeguindo] = useState(0);
	const {permissions} = acessPermissions();
	const {username} = acessAuth();
	const [papel, setPapel] = useState("");
	if (getLocalStorage() != null && papel == "") {
		setPapel(getLocalStorage().papel);
	}

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
			setSeguidores((prev) => prev + 1);
		} catch (error) {
			console.error("Erro ao seguir usuário:", error);
		}
	};

	const handleDeixarDeSeguir = async () => {
		if (!usuario?.id) return;
		try {
			await UsuarioService.deixarDeSeguir(usuario.id);
			setEstaSeguindo(false);
			setSeguidores((prev) => prev - 1);
		} catch (error) {
			console.error("Erro ao deixar de seguir usuário:", error);
		}
	};

	const openOptions = () => {
		if (visible) setVisible(false);
		else setVisible(true);
	};

	return (
		<div>
			{usuario && (
				<div className="flex min-w-0 gap-x-4 mb-7">
					<img
						src={
							usuario.imagemPerfil !== undefined &&
							usuario.imagemPerfil !== null
								? `http://localhost:8000${usuario.imagemPerfil}`
								: "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png"
						}
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
							@{usuario.username}
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
							{permissions.create || usuario.username == username ? (
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
									{visible &&
										(papel === "mod" || papel === "int" ? (
											<div className="absolute top-full left-0 z-50 w-56 mt-2 bg-white shadow-xl rounded-xl border border-gray-200 py-2">
												<MenuItem>
													<Link
														to="/postagem/criar/"
														className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
													>
														<Newspaper className="w-5 h-5 text-cyan-500" />{" "}
														Criar Postagem
													</Link>
												</MenuItem>

												<MenuItem>
													<Link
														to="/repositorio/criar/"
														className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
													>
														<BoxArrowUp className="w-5 h-5 text-cyan-500" />{" "}
														Criar Repositório
													</Link>
												</MenuItem>
											</div>
										) : papel === "adm" ? (
											<div className="absolute top-full left-0 z-50 w-56 mt-2 bg-white shadow-xl rounded-xl border border-gray-200 py-2">
												<MenuItem>
													<Link
														to="/comunidade/criar/"
														className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
													>
														<Newspaper className="w-5 h-5 text-cyan-500" />{" "}
														Criar Comunidade
													</Link>
												</MenuItem>
											</div>
										) : null)}
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
		</div>
	);
};

export default BeeHeaderProfile;
