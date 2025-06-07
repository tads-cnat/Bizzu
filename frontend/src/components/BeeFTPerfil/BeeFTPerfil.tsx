import {useEffect, useState} from "react";
import UsuarioService from "../../services/models/UsuarioService";
import {IBeeFTPerfil} from "./IBeeFTPerfil";
import {IBeeUser} from "../BeeHeaderProfile/IBeeUser";
import {useParams} from "react-router-dom";

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

const BeeFTPerfil: React.FC<IBeeFTPerfil> = ({dataPublicacao}) => {
	const identificator = useParams().username;
	const [usuario, setUsuario] = useState<IBeeUser>();

	useEffect(() => {
		void UsuarioService.getbyUsername(String(identificator))
			.then((response) => {
				setUsuario(response);
			})
			.catch(() => {
				console.log("Não recebeu dados");
			});
	}, []);

	return (
		<>
			<div className="inline-flex items-center">
				<div className="flex items-center mb-2">
					{usuario?.imagemPerfil !== undefined ? (
						<img
							src={`http://localhost:8000${usuario.imagemPerfil}` || ""}
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
					<span className="text-[#333333] font-poppins font-semibold">
						{usuario?.nome}
					</span>
					<span className="text-[#FCBD18] font-poppins font-semibold">
						{" "}
						• {tempoDesde(dataPublicacao)}{" "}
					</span>
				</div>
			</div>
		</>
	);
};

export default BeeFTPerfil;
