"use client";

import {forwardRef} from "react";
import type {IBeeInput} from "./IBeeInput";

const BeeInput = forwardRef<HTMLInputElement, IBeeInput>(
	(
		{
			label,
			placeholder,
			type = "text",
			icon: Icon,
			value,
			onChange,
			name,
			...props
		},
		ref,
	) => {
		return (
			<div>
				<label
					htmlFor={name}
					className="block text-sm/6 font-medium text-gray-900"
				>
					{label}
				</label>
				<div className="mt-2">
					<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
						<div>
							{Icon && (
								<Icon
									size={20}
									color="#000"
									weight="bold"
								/>
							)}
						</div>
						<input
							ref={ref}
							type={type}
							name={name}
							placeholder={placeholder}
							value={value}
							onChange={onChange}
							className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
							{...props}
						/>
					</div>
				</div>
			</div>
		);
	},
);

BeeInput.displayName = "BeeInput";

export default BeeInput;
