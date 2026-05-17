import {Building} from "@phosphor-icons/react";
import {IBeeCommunity} from "../../../../interfaces/IBeeCommunity";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import getLocalStorage from "../../../../utils/getLocalStorage";
import ComunidadeService from "../../../../services/models/ComunidadeService";
import {Spin} from "antd";
import {Gear, PencilSimple} from "@phosphor-icons/react";

const BeeSidebarCommunity = () => {
	const [papel, setPapel] = useState();
	const navigate = useNavigate();
	const identificator = Number(useParams().id);
	const [comunidade, setComunidade] = useState<IBeeCommunity | undefined>(
		undefined,
	);
	const [informacoes, setInformacoes] = useState<any[]>([]);
	if (getLocalStorage() != null) {
		if (papel == undefined) setPapel(getLocalStorage().papel);
	}

	useEffect(() => {
		if (comunidade === undefined) {
			void ComunidadeService.get(identificator)
				.then((response) => {
					setComunidade(response.data);
				})
				.catch(() => {
					console.error("Não capturou comunidade");
				});
		} else {
			const info = [];
			if (comunidade.coordenacao != "undefined") {
				info.push({
					coordenacao: comunidade.coordenacao,
					curso: "Coordenador(a)",
				});
			}
			if (comunidade.anoFundacao != "undefined") {
				info.push({
					fundacao: comunidade.anoFundacao,
					curso: "Ano de fundação",
				});
			}

			if (info.length === 0) {
				info.push({
					coordenacao: "Sem informações",
					fundacao: "Sem informações",
				});
			}
			setInformacoes(info);
		}
	}, [comunidade]);

	const handleEditarComunidade = () => {
		navigate(`comunidade/editar/${comunidade?.id}`);
	};
	const configuracoes = [
		{
			label: "Editar Comunidade",
			descricao: "Edite a foto, descrição, tema...",
			acao: "Editar",
			onClick: handleEditarComunidade,
		},
	];

	return (
		<>
			{comunidade !== undefined && informacoes.length > 0 ? (
				<div className="space-y-4">
					{/* Card de Perfil Resumo */}
					<div className="bg-white shadow-2xs border border-gray-200 overflow-hidden">
						<div
							className="h-24 bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-400"
							style={{
								backgroundImage: comunidade.banner
									? `url(${comunidade.banner})`
									: `url(/banner.png)`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						/>

						<div className="p-4">
							<h2 className="text-xl font-semibold text-[#333333] font-poppins mb-2">
								{comunidade.nome}
							</h2>

							<p className="text-sm text-[#666666] font-poppins mb-3 leading-relaxed">
								{comunidade.descricao || "Nenhuma descrição disponível"}
							</p>
						</div>
					</div>
					<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
						<div className="flex items-center gap-2 mb-4">
							<Building
								size={20}
								weight="regular"
								className="text-[#333333]"
							/>
							<h3 className="text-lg font-semibold text-[#333333] font-poppins">
								Informações da comunidade
							</h3>
						</div>
						<div className="space-y-3">
							{informacoes.map((formacao, index) => (
								<div
									key={index}
									className="border-l-2 border-gray-200 pl-3"
								>
									{formacao.coordenacao && (
										<div>
											<h4 className="font-medium text-[#333333] font-poppins text-sm">
												Coordenação
											</h4>
											<p className="text-xs text-[#666666] font-poppins leading-relaxed">
												{formacao.coordenacao}
											</p>
										</div>
									)}
									{formacao.fundacao && (
										<div>
											<h4 className="font-medium text-[#333333] font-poppins text-sm">
												Fundação
											</h4>
											<p className="text-xs text-[#666666] font-poppins leading-relaxed">
												{formacao.fundacao}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					{papel === "adm" && (
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
							<div className="flex items-center gap-2 mb-4">
								<Gear
									size={20}
									weight="regular"
									className="text-[#333333]"
								/>
								<h3 className="text-lg font-semibold text-[#333333] font-poppins">
									Configurações
								</h3>
							</div>
							<div className="space-y-3">
								{configuracoes.map((config, index) => (
									<div
										key={index}
										className="flex items-center justify-between"
									>
										<div className="flex-1">
											<h4 className="font-medium text-[#333333] font-poppins text-sm">
												{config.label}
											</h4>
											<p className="text-xs text-[#666666] font-poppins">
												{config.descricao}
											</p>
										</div>

										<button
											onClick={config.onClick}
											className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#058B92] hover:bg-gray-50 rounded-md transition-colors"
										>
											<PencilSimple
												size={12}
												weight="regular"
											/>
											{config.acao}
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<Spin />
			)}
		</>
	);
};

export default BeeSidebarCommunity;
