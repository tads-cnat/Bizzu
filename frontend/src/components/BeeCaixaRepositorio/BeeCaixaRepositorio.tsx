import React from "react";
import {CaixaRepositorioProps} from "./BeeCaixaRepositorio.props";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";
import BeeTags from "../BeeTags/BeeTags";

// Função para exibir "há X horas"
/*function tempoDesde(data: Date): string {
	const agora = new Date();
	const diffMs = agora.getTime() - data.getTime();
	const diffSegundos = Math.floor(diffMs / 1000);
	const minutos = Math.floor(diffSegundos / 60);
	const horas = Math.floor(minutos / 60);
	const dias = Math.floor(horas / 24);

	if (dias > 0) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
	if (horas > 0) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
	if (minutos > 0) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
	return "agora mesmo";
}*/

const CaixaRepositorio: React.FC<CaixaRepositorioProps> = ({
	usuarioIconeUrl,
	usuarioNome,
	dataPostagem,
	tituloPostagem,
	descricaoPostagem,
	tags,
	onClick,
	isOwner = false,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 mb-4">
			<BeeFTPerfil
				usuarioIconeUrl={usuarioIconeUrl}
				usuarioNome={usuarioNome}
				dataPostagem={dataPostagem}
			/>
			<h3 className="text-lg font-semibold mt-2">{tituloPostagem}</h3>
			<p className="text-gray-600 mt-1">{descricaoPostagem}</p>
			<div className="mt-2">
				<BeeTags tags={tags} />
			</div>
			{isOwner && (
				<div className="mt-4 flex justify-end gap-2">
					<button
						onClick={onClick}
						className="text-blue-600 hover:text-blue-800"
					>
						Editar
					</button>
				</div>
			)}
		</div>
	);
};

export default CaixaRepositorio;
