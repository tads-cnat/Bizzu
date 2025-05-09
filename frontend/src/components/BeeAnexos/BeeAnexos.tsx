import {X} from "@phosphor-icons/react";
import {IBeeAnexos} from "./IBeeAnexos";
import {useState} from "react";
const BeeAnexos: React.FC<IBeeAnexos> = ({path}) => {
	const [fecharAnexos, setFecharAnexos] = useState("visível");
	return (
		<>
			{fecharAnexos == "visível" && (
				<div className="w-auto h-6 inline-flex rounded-[8px] items-center p-3 bg-[#B0B0B0]">
					<p className="text-[#F8F4E6] font-semibold text-[12px] pr-1.5">
						{path}
					</p>
					<button
						type="button"
						onClick={() => setFecharAnexos("invisível")}
						className="cursor-pointer"
					>
						<X
							size={16}
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
