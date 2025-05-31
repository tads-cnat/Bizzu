"use client";

import type React from "react";

import {X} from "@phosphor-icons/react";
import type {IBeeAnexos} from "./IBeeAnexos";
import {useState} from "react";

const BeeAnexos: React.FC<IBeeAnexos> = ({path, onDelete}) => {
	const [visible, setVisible] = useState(true);

	const handleDelete = () => {
		setVisible(false);
		if (onDelete) {
			onDelete();
		}
	};

	if (!visible) return null;

	return (
		<div className="w-auto py-2 inline-flex rounded-[8px] items-center p-3 bg-[#B0B0B0]">
			<p className="text-[#F8F4E6] font-semibold text-[12px] pr-1.5 pb-1">
				{path}
			</p>
			<button
				className="cursor-pointer"
				type="button"
				onClick={handleDelete}
			>
				<X
					size={14}
					color="#F8F4E6"
					weight="bold"
				/>
			</button>
		</div>
	);
};

export default BeeAnexos;
