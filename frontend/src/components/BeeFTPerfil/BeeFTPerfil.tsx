"use client";

import {useEffect, useState} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import {IBeeFTPerfil} from "./IBeeFTPerfil";

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

const BeeFTPerfil: React.FC<IBeeFTPerfil> = ({
	usuarioId,
	dataPublicacao,
	comunidade,
}) => {
	const [usuario, setUsuario] = useState<any>();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await UsuarioService.get(Number(usuarioId));
				setUsuario(response.data);
			} catch (e) {
				console.error("Não recebeu dados", e);
			}
		};
		if (usuario == undefined) {
			fetchUser();
		}
	}, []);

	useEffect(() => {
		console.log("USER ", usuario);
	}, []);

	return (
		<>
			<div className="inline-flex items-center">
				<div className="flex items-center mb-2">
					<img
						src={
							usuario?.imagemPerfil
								? `${usuario.imagemPerfil}`
								: "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png"
						}
						alt="Imagem de usuário"
						className={`w-10 h-10 object-cover gap-1 mt-1${usuario?.username === "usuário não encontrado" ? " grayscale opacity-60 w-8 h-8" : ""}`}
						style={{
							clipPath:
								"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
						}}
					/>
				</div>
				<div className="p-2 ">
					{!usuario?.username
						? "usuário não encontrado"
						: usuario.papel === "adm"
							? comunidade
							: usuario?.username}
					<span className="text-[#FCBD18] font-poppins font-semibold text-xs">
						{" "}
						• {tempoDesde(dataPublicacao)}{" "}
					</span>
				</div>
			</div>
		</>
	);
};

export default BeeFTPerfil;
