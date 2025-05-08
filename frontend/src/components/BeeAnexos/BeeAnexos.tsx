import {IBeeAnexos} from "./IBeeAnexos";
const BeeAnexos: React.FC<IBeeAnexos> = ({path, icon: Icon}) => {
	return (
		<>
			<div className="w-auto h-6 inline-flex rounded-[8px] items-center p-3  bg-[#B0B0B0]">
				<p className="text-[#FFFFFF] font-semibold text-[12px] pr-1.5">
					{path}
				</p>
				{Icon && (
					<Icon
						size={16}
						color="#FFF"
						weight="bold"
					/>
				)}
			</div>
		</>
	);
};

export default BeeAnexos;
