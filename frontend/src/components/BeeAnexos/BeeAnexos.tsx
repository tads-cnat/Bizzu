import {X} from "@phosphor-icons/react";
import {IBeeAnexos} from "./IBeeAnexos";
import {useState} from "react";
import axios from "axios";
const BeeAnexos: React.FC<IBeeAnexos> = ({path}) => {
	const [fecharAnexos, setFecharAnexos] = useState("visível");
	const [loading, setLoading] = useState(false);
	const deletarAnexos = async () => {
		setLoading(true);
		try {
			const resposta = await axios.delete(
				`api/anexos/${encodeURIComponent(path)}`,
			); // Esse vai ser o caminho do endpoint como não tem no backend ainda vai ser so um caminho simulado e por isso não funciona ainda
			if (resposta.status === 204) setFecharAnexos("invisível");
		} catch (err) {
			console.error("Erro ao deletar:", err);
			alert("Falha ao deletar anexo");
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{fecharAnexos == "visível" && (
				<div className="w-auto py-2 inline-flex rounded-[8px] items-center p-3 bg-[#B0B0B0] ">
					<p className="text-[#F8F4E6] font-semibold text-[12px] pr-1.5 pb-1">
						{path}
					</p>
					<button
						className="cursor-pointer"
						type="button"
						onClick={deletarAnexos}
						disabled={loading}
					>
						<X
							size={14}
							color="#F8F4E6"
							weight="bold"
						/>
					</button>
				</div>
			)}
		</>
	);
};

export default BeeAnexos;
