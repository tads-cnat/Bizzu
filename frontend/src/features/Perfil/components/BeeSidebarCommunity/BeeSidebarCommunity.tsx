import {GraduationCap} from "@phosphor-icons/react";
import {IBeeCommunity} from "../../../../interfaces/IBeeCommunity";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ComunidadeService from "../../../../services/models/ComunidadeService";
import {Spin} from "antd";

const BeeSidebarCommunity = () => {
	const identificator = Number(useParams().id);
	const [comunidade, setComunidade] = useState<IBeeCommunity | undefined>(
		undefined,
	);
	const [informacoes, setInformacoes] = useState<any[]>([]);

	useEffect(() => {
		if (comunidade === undefined) {
			void ComunidadeService.get(identificator)
				.then((response) => {
					setComunidade(response.data);
					console.log(response);
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
									? `url(http://localhost:8000${comunidade.banner})`
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
							<GraduationCap
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
				</div>
			) : (
				<Spin />
			)}
		</>
	);
};

export default BeeSidebarCommunity;
