import {X} from "@phosphor-icons/react";
import {IBeeAnexos} from "./IBeeAnexos";
import {useState} from "react";
const BeeAnexos: React.FC<IBeeAnexos> = ({path}) => {
	const [fecharAnexos, setFecharAnexos] = useState("visível");
	return (
		<>
			{fecharAnexos == "visível" && (
				<div className="flex items-center justify-center w-16 h-9 rounded-md px-4 py-2 items-center p-3 bg-[#B0B0B0] ">
					<p className="text-[#F8F4E6] font-semibold text-[12px] pr-1.5 pb-1">
						{path}
					</p>
					<button
						className="cursor-pointer"
						type="button"
						onClick={() => setFecharAnexos("invisível")}
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
