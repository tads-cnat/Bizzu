import React from "react";
import {IBeeTextArea} from "./IBeeTextArea";
import {Controller} from "react-hook-form";

export const BeeTextArea: React.FC<IBeeTextArea> = ({
	id,
	placeholder = "Fale mais um pouco sobre você...",
	defaultValue = "",
	rows = 4,
	label = "Descrição",
	name,
	control,
}) => {
	return (
		<div
			className="sm:col-span-2"
			style={{fontFamily: "Poppins, sans-serif"}}
		>
			<label
				htmlFor={id}
				className="block text-sm/6 font-medium text-gray-900"
			>
				{label}
			</label>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({field}) => (
					<div className="mt-2.5">
						<textarea
							{...field}
							id={id}
							name={id}
							rows={rows}
							className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-[#333333] outline-1 outline-offset-1 outline-gray-300 placeholder-[#B0B0B0] placeholder:italic focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-medium"
							placeholder={placeholder}
							style={{fontFamily: "Poppins, sans-serif"}}
						/>
					</div>
				)}
			/>
		</div>
	);
};
