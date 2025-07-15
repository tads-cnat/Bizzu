"use client"

import {useEffect, useState} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import {IBeeFTPerfil} from "./IBeeFTPerfil";
import {Link} from "react-router-dom";
import acessAuth from "../../utils/acessAuth";
import BeeNotification from "../BeeNotification/BeeNotification";

function tempoDesde(data: string): string {
	const date = new Date(data);
	const agora = new Date();
	const diffMs = agora.getTime() - date.getTime();
	const diffSegundos = Math.floor(diffMs / 1000);
	const minutos = Math.floor(diffSegundos / 60);
	const horas = Math.floor(minutos / 60);
	const dias = Math.floor(horas / 24);

	if (dias > 0) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
	if (horas > 0) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
	if (minutos > 0) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
	return "agora mesmo";
}

const BeeFTPerfil: React.FC<IBeeFTPerfil> = ({usuarioId, dataPublicacao}) => {
	const [usuario, setUsuario] = useState<any>();
	const {username} = acessAuth();

	useEffect(() => {
		const fetchUser = async () => {
			try {
			  if (typeof usuarioId === "number") {
				const response = await UsuarioService.get(usuarioId)
				setUsuario(response.data)
			  } else {
				const response = await UsuarioService.getbyUsername(usuarioId)
				setUsuario(response)
			  }
			} catch (e) {
			  console.error("Não recebeu dados", e)
			}
		  }
	  
		  fetchUser()
		}, [usuarioId])

	return (
		<>
			<div className="inline-flex items-center">
				<div className="flex items-center mb-2">
					{usuario?.imagemPerfil !== undefined ? (
						<img
							src={
								usuario.imagemPerfil
									? `${usuario.imagemPerfil}`
									: "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png"
							}
							alt="Imagem de usuário"
							className="w-12 h-12 object-cover gap-2 mt-2"
							style={{
								clipPath:
									"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
							}}
						></img>
					) : (
						<img
							src="https://saae.lucasdorioverde.mt.gov.br/arquivos/setores/sem_imagem_avatar.png"
							alt="Imagem de usuário"
							className="w-12 h-12 object-cover gap-2 mt-2"
							style={{
								clipPath:
									"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
							}}
						></img>
					)}
				</div>
				<div className="p-2 ">
					{usuario?.username !== undefined && (
						<span>
							{username !== undefined ? (
								<Link
									to={`/${usuario?.username}/`}
									style={{color: "#333333"}}
									className="text-[#333333] font-poppins font-semibold outline-none"
								>
									{usuario?.username}
									<span className="text-[#FCBD18] font-poppins font-semibold">
										{" "}
										• {tempoDesde(dataPublicacao)}{" "}
									</span>
								</Link>
							) : (
								<a>
									<BeeNotification
										type="warning"
										title="Você não está conectado"
										message="Faça o login e aproveite integralmente o bizzu"
										content={
											<div
												style={{color: "#333333"}}
												className="text-[#333333] font-poppins font-semibold outline-none"
											>
												{usuario?.username}{" "}
												<span className="text-[#FCBD18] font-poppins font-semibold">
													{" "}
													• {tempoDesde(dataPublicacao)}{" "}
												</span>{" "}
											</div>
										}
									/>
								</a>
							)}
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default BeeFTPerfil;
