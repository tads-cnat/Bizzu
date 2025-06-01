import type React from "react";
import type IBeeTags from "./IBeeTags";

const BeeTags: React.FC<IBeeTags> = ({
	label,
	color,
	onClick,
	isSelected = false,
}) => {
	return (
		<div
			className={`w-auto h-6 inline-flex rounded-[10px] items-center p-3 cursor-pointer transition-all duration-200 ${
				isSelected ? "ring-2 ring-blue-500" : ""
			}`}
			style={{backgroundColor: color}}
			onClick={onClick}
		>
			<p className="text-[#333333] font-semibold text-[12px]">#{label}</p>
		</div>
	);
};

export default BeeTags;
