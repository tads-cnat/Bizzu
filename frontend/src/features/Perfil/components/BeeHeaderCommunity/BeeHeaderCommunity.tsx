import {Menu, MenuItem} from "@headlessui/react";
import BeeButton from "../../../../components/BeeButtons/BeeButtons";
import {IBeeHeaderCommunity} from "./IBeeHeaderCommunity";
import {useEffect, useState} from "react";
import ComunidadeService from "../../../../services/models/ComunidadeService";
import getLocalStorage from "../../../../utils/getLocalStorage";
import {Plus, Newspaper} from "@phosphor-icons/react";
import {Link} from "react-router-dom";
const BeeHeaderComunnity = ({comunidade}: IBeeHeaderCommunity) => {
	const [estaSeguindo, setEstaSeguindo] = useState(false);
	const [seguidores, setSeguidores] = useState(0);
	const [visible, setVisible] = useState<boolean>(false);
	const [papel, setPapel] = useState();

	if (getLocalStorage() != null) {
		if (papel == undefined) setPapel(getLocalStorage().papel);
	}
	// Função para contar quantos usuários seguem a comunidade
	useEffect(() => {
		if (!comunidade?.id) return;

		const contarSeguidores = async () => {
			try {
				const data = await ComunidadeService.contar_seguidores(comunidade.id);
				setSeguidores(data.seguidores);
			} catch (error) {
				console.error("Erro ao buscar seguidores:", error);
			}
		};

		contarSeguidores();
	}, [comunidade?.id]);

	// Função para verificar se o usuario segue ou não a comunidade
	useEffect(() => {
		if (!comunidade?.id) return;

		const usuarioSegue = async () => {
			try {
				const seguidoresData = await ComunidadeService.contar_seguidores(
					comunidade.id,
				);
				setSeguidores(seguidoresData.seguidores);

				const seguimentoData =
					await ComunidadeService.verificarSeguimentoComunidade(comunidade.id);
				setEstaSeguindo(seguimentoData.esta_seguindo);
			} catch (error) {
				console.error("Erro ao carregar dados da comunidade:", error);
			}
		};

		usuarioSegue();
	}, [comunidade?.id]);

	const handleSeguir = async () => {
		if (!comunidade?.id) return;
		try {
			await ComunidadeService.seguirComunidade(comunidade.id);
			setEstaSeguindo(true);
			const data = await ComunidadeService.contar_seguidores(comunidade.id);
			setSeguidores(data.seguidores);
		} catch (error) {
			console.error("Erro ao seguir usuário:", error);
		}
	};

	const handleDeixarDeSeguir = async () => {
		if (!comunidade?.id) return;
		try {
			await ComunidadeService.deixarDeSeguir(comunidade.id);
			setEstaSeguindo(false);
			const data = await ComunidadeService.contar_seguidores(comunidade.id);
			setSeguidores(data.seguidores);
			// ("");
		} catch (error) {
			console.error("Erro ao deixar de seguir usuário:", error);
		}
	};
	const openOptions = () => {
		if (visible) setVisible(false);
		else setVisible(true);
	};
	return (
		<>
			{comunidade && (
				<div className="flex min-w-0 gap-x-4 mb-7">
					<img
						src={
							comunidade.imagem
								? `${comunidade.imagem}`
								: "http://localhost:8000/imgPostagens/comunidades/2025/06/10/sem_imagem_avatar.png"
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
							{comunidade.nome}
						</p>
						<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
							<a
								href="#"
								className="mt-2 flex font-semibold items-center text-sm text-[#333333]"
							>
								{seguidores} Seguidores
							</a>

							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								{papel === "adm" ? (
									<>
										<BeeButton
											variante="primaria"
											label="Novo"
											icone={<Plus />}
											onClick={openOptions}
										/>
										{visible && (
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
											</div>
										)}
									</>
								) : (
									<BeeButton
										variante={estaSeguindo ? "secundaria" : "primaria"}
										label={estaSeguindo ? "Seguindo" : "Seguir"}
										onClick={estaSeguindo ? handleDeixarDeSeguir : handleSeguir}
									/>
								)}
							</Menu>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BeeHeaderComunnity;
