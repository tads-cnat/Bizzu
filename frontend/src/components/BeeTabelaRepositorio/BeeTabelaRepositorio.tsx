import React from "react";
import { File } from "@phosphor-icons/react";
import { IBeeTabelaRepositorio, FileItem } from "./IBeeTabelaRepositorio";
import BeeTags from "../BeeTags/BeeTags";

const BeeTabelaRepositorio: React.FC<IBeeTabelaRepositorio> = ({
	usuario,
	lastUpdated,
	tags,
	files,
}) => {
	return (
		<div className="border-2 border-[#FCBD18] rounded-[14px] overflow-hidden">
			<div className="flex items-center justify-between p-4 bg-[#DCCEB1]/30">
				<div className="flex items-center gap-3">
					<img
						src={usuario.imagemPerfil}
						alt={usuario.nome}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<span className="font-semibold text-gray-800">{usuario.nome}</span>
						<p className="text-sm text-gray-600">{lastUpdated}</p>
					</div>
				</div>
				<div className="flex gap-2">
					{tags.map((tag, index) => (
						<BeeTags
							key={index}
							label={tag.label}
							color={tag.color}
						/>
					))}
				</div>
			</div>

			<div>
				{files.map((file: FileItem) => (
					<div
						key={file.id}
						className="flex items-center justify-between p-4 border-t border-[#FCBD18]"
					>
						<div className="flex items-center gap-2">
							<File
								size={20}
								weight="regular"
								className="text-[#FCBD18]"
							/>
							<span className="text-sm text-gray-800 font-light">
								{file.name}
							</span>
						</div>
						<span className="text-sm text-gray-600 font-normal">
							{file.daysAgo} dias atrás
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default BeeTabelaRepositorio;
