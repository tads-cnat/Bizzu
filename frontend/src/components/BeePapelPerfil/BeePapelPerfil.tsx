import {useEffect, useState} from "react";
import BeeButton from "../BeeButtons/BeeButtons";
import UsuarioService from "../../services/models/UsuarioService";
import {Empty} from "antd";
import {ReadOutlined, UserOutlined} from "@ant-design/icons";

const BeePapelPerfil = () => {
	const [solicitacoes, setSolicitacoes] = useState([]);
	// Função utilizada para lidar com as aprovações das solicitações
	const handleAprovarClick = async () => {
		try {
			//const response = await UsuarioService.aprovarSolicitacao(id);
			await loadSolicitacoes();
		} catch (error) {
			console.error("Erro ao aprovar solicitação:", error);
		}
	};

	// Função utilizada para lidar com as aprovações das solicitações
	const handleReprovarClick = async (id: number) => {
		try {
			const response = await UsuarioService.reprovarSolicitacao(id);
			console.error("Solicitação reprovada:", response.data);
			await loadSolicitacoes();
		} catch (error) {
			console.error("Erro ao aprovar solicitação:", error);
		}
	};

	// Função utilizada para carregar as solicitações
	const loadSolicitacoes = async () => {
		try {
			const response = await UsuarioService.listarSolicitacoes();
			setSolicitacoes(response.data);
		} catch (error) {
			console.error("Erro ao carregar solicitações:", error);
		}
	};

	// Função que muda a cor do balãozinho do status no canto superior direito do modal
	const statusColors = {
		pendente: "bg-[#FCBD18]",
		aprovada: "bg-green-500",
		reprovada: "bg-[#D32F2F]",
	};

	useEffect(() => {
		loadSolicitacoes();
	}, []);
	return (
		<>
			{solicitacoes.length === 0 ? (
				<Empty
					description="Não há solicitações"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			) : (
				solicitacoes.map((s: any) => (
					<div
						key={s.id}
						className="bg-white shadow  rounded-lg p-4 mb-4 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
					>
						<div
							className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md select-none ${statusColors[s.status]}`}
						>
							{s.status}
						</div>
						<div className="flex flex-col space-y-2">
							<div className="flex space-x-2">
								<UserOutlined />
								<span className="font-bold">Solicitante:</span>
								<span>{s.nome_solicitante}</span>
							</div>
							<div className="flex items-start space-x-2">
								<ReadOutlined className="mt-1" />
								<span className="font-bold">Descrição:</span>
								<span className="break-words overflow-hidden text-ellipsis">
									{s.descricao}
								</span>
							</div>
						</div>
						{s.status !== "aprovada" && s.status !== "reprovada" && (
							<div className="px-6 py-2  sm:flex sm:flex-row-reverse sm:px-0 gap-4">
								<BeeButton
									label="Aprovar"
									variante="primaria"
									onClick={() => handleAprovarClick(s.id)}
								/>
								<BeeButton
									label="Reprovar"
									variante="neutro"
									onClick={() => handleReprovarClick(s.id)}
								/>
							</div>
						)}
					</div>
				))
			)}
		</>
	);
};

export default BeePapelPerfil;
