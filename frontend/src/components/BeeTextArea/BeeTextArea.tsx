import React from "react";
import {IBeeTextArea} from "./IBeeTextArea";

export const BeeTextArea: React.FC<IBeeTextArea> = ({
	id,
	placeholder = "Fale mais um pouco sobre você...",
	defaultValue = "",
	onChange,
	rows = 4,
	label = "Descrição",
	value,
}) => {
	return (
		<div
			className="sm:col-span-2"
			style={{fontFamily: "Poppins, sans-serif"}}
		>
			<label
				htmlFor={id}
				className="block text-sm/6 font-semibold text-[#333333]"
			>
				{label}
			</label>
			<div className="mt-2.5">
				<textarea
					id={id}
					name={id}
					rows={rows}
					className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-[#333333] outline-2 -outline-offset-1 outline-[#333333] placeholder-[#B0B0B0] placeholder:italic focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-medium"
					placeholder={placeholder}
					defaultValue={defaultValue}
					onChange={onChange}
					value={value}
					style={{fontFamily: "Poppins, sans-serif"}}
				/>
			</div>
		</div>
	);
};
