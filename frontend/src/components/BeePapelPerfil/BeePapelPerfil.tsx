import {useEffect, useState} from "react";
import {IBeePapelPerfil} from "./IBeePapelPerfil";
import BeeButton from "../BeeButtons/BeeButtons";
import {BeeTextArea} from "../BeeTextArea/BeeTextArea";
import UsuarioService from "../../services/models/UsuarioService";

const BeePapelPerfil = ({solicitante, descricao}: IBeePapelPerfil) => {
	const handleAprovarClick = () => {};
	const handleReprovarClick = () => {};
	const [solicitacoes, setSolicitacoes] = useState([]);

	// Função utilizada para carregar as solicitações
	const loadSolicitacoes = async () => {
		try {
			const response = await UsuarioService.listarSolicitacoes();
			setSolicitacoes(response.data);
		} catch (error) {
			console.error("Erro ao carregar solicitações:", error);
		}
	};

	useEffect(() => {
		loadSolicitacoes();
	}, []);
	return (
		<>
			{solicitacoes.map((s, index) => (
				<div
					key={index}
					className="bg-[#F2F2F7] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mb-4"
				>
					<div className="sm:flex sm:items-center justify-center">
						<div className="mx-auto flex size-12 shrink-0 items-center rounded-full sm:mx-0 sm:size-10">
							{s.solicitante}
						</div>
					</div>
					<div className="mt-4 text-center sm:mt-0 sm:ml-2 sm:text-center">
						{s.descricao}
					</div>
					<div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
						<BeeButton
							label="Aprovar"
							variante="primaria"
							onClick={() => handleAprovarClick(s)}
						/>
						<BeeButton
							label="Reprovar"
							variante="neutro"
							onClick={() => handleReprovarClick(s)}
						/>
					</div>
				</div>
			))}
		</>
	);
};

export default BeePapelPerfil;
