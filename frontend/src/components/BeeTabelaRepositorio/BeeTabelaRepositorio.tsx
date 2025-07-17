"use client";

import type React from "react";
import {File, Download, Calendar, Tag as TagIcon} from "@phosphor-icons/react";
import type {IBeeTabelaRepositorio, FileItem} from "./IBeeTabelaRepositorio";
import BeeTags from "../BeeTags/BeeTags";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";

// Função para calcular tempo decorrido
function tempoDesde(data: string): string {
	const date = new Date(data);
	const agora = new Date();
	const diffMs = agora.getTime() - date.getTime();
	const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDias === 0) return "hoje";
	if (diffDias === 1) return "ontem";
	return `${diffDias} dias atrás`;
}

// Função para obter extensão do arquivo
function getFileExtension(filename: string | undefined | null): string {
	if (!filename) return "";
	return filename.split(".").pop()?.toLowerCase() || "";
}

// Função para obter cor baseada na extensão
function getFileColor(extension: string): string {
	const colorMap: Record<string, string> = {
		pdf: "#FF6B6B",
		doc: "#4ECDC4",
		docx: "#4ECDC4",
		txt: "#95E1D3",
		jpg: "#F38BA8",
		jpeg: "#F38BA8",
		png: "#F38BA8",
		gif: "#F38BA8",
		zip: "#A8E6CF",
		rar: "#A8E6CF",
		mp4: "#FFD93D",
		mp3: "#FFD93D",
		default: "#B0B0B0",
	};

	return colorMap[extension] || colorMap.default;
}

// Função para processar tags do backend
function processarTags(tags: string[]): {
	label: string;
	color: "magenta" | "orange" | "cyan";
	tipo: "tec" | "mat" | "per";
}[] {
	return tags.map((tag) => {
		// Lógica simples para determinar tipo e cor baseado no conteúdo da tag
		let tipo: "tec" | "mat" | "per" = "tec";
		let color: "magenta" | "orange" | "cyan" = "magenta";

		if (
			tag.toLowerCase().includes("matemática") ||
			tag.toLowerCase().includes("cálculo")
		) {
			tipo = "mat";
			color = "orange";
		} else if (
			tag.toLowerCase().includes("pesquisa") ||
			tag.toLowerCase().includes("projeto")
		) {
			tipo = "per";
			color = "cyan";
		} else {
			color = "magenta";
		}

		return {
			label: tag,
			color,
			tipo,
		};
	});
}

const BeeTabelaRepositorio: React.FC<IBeeTabelaRepositorio> = ({
	id,
	titulo,
	descricao,
	usuario,
	dataPublicacao,
	tags,
	arquivos,
	imagem,
}) => {
	const handleDownload = async (arquivo: FileItem) => {
		try {
			let fileUrl = arquivo.arquivo;
			if (!fileUrl.startsWith("http")) {
				fileUrl = `http://localhost:8000${fileUrl}`;
			}
			const response = await fetch(fileUrl);
			if (!response.ok) {
				throw new Error(`Erro ao baixar arquivo: ${response.status}`);
			}
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = arquivo.nome || `arquivo_${arquivo.id}`;
			link.style.display = "none";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Erro ao fazer download:", error);
			alert("Erro ao fazer download do arquivo. Tente novamente.");
		}
	};

	const tagsProcessadas = processarTags(tags);

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			{/* Header do Repositório */}
			<div className="bg-gradient-to-r from-[#FCBD18]/10 to-[#FCBD18]/5 p-6 border-b border-gray-100">
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<h1 className="text-2xl font-bold text-[#333333] mb-2">{titulo}</h1>
						<p className="text-gray-600 leading-relaxed">{descricao}</p>
					</div>

					{imagem && (
						<img
							src={`http://localhost:8000${imagem}`}
							alt={titulo}
							className="w-24 h-24 object-cover rounded-lg ml-6 border border-gray-200"
						/>
					)}
				</div>

				{/* Informações do usuário e data */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						{usuario && (
							<BeeFTPerfil
								usuarioId={usuario.nome}
								dataPublicacao={dataPublicacao}
							/>
						)}
					</div>

					<div className="flex items-center gap-2 text-sm text-gray-500">
						<Calendar size={16} />
						<span>Criado {tempoDesde(dataPublicacao)}</span>
					</div>
				</div>

				{/* Tags */}
				{tags && tags.length > 0 && (
					<div className="mt-4">
						<div className="flex items-center gap-2 mb-2">
							<TagIcon
								size={16}
								className="text-gray-500"
							/>
							<span className="text-sm font-medium text-gray-700">Tags:</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{tagsProcessadas.map((tag, index) => (
								<BeeTags
									key={index}
									label={tag.label}
									color={tag.color}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Seção de Arquivos */}
			<div className="p-6">
				<div className="flex items-center gap-2 mb-4">
					<File
						size={20}
						className="text-[#FCBD18]"
					/>
					<h2 className="text-lg font-semibold text-[#333333]">
						Arquivos ({arquivos.length})
					</h2>
				</div>

				{arquivos.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						<File
							size={48}
							className="mx-auto mb-2 opacity-50"
						/>
						<p>Nenhum arquivo anexado a este repositório</p>
					</div>
				) : (
					<div className="space-y-2">
						{arquivos.map((arquivo: FileItem) => {
							const extension = getFileExtension(arquivo.nome);
							const fileColor = getFileColor(extension);

							return (
								<div
									key={arquivo.id}
									className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-[#FCBD18]/30 hover:bg-gray-50/50 transition-all duration-200"
								>
									<div className="flex items-center gap-3 flex-1 min-w-0">
										<div
											className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-xs"
											style={{backgroundColor: fileColor}}
										>
											{extension.toUpperCase().slice(0, 3)}
										</div>

										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-[#333333] truncate">
												{arquivo.nome || "Arquivo sem nome"}
											</p>
											<p className="text-xs text-gray-500">
												Arquivo #{arquivo.id}
											</p>
										</div>
									</div>

									<button
										onClick={() => handleDownload(arquivo)}
										className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#FCBD18] hover:text-[#E6A815] hover:bg-[#FCBD18]/10 rounded-lg transition-colors"
									>
										<Download size={16} />
										<span className="hidden sm:inline">Download</span>
									</button>
								</div>
							);
						})}
					</div>
				)}
			</div>

			{/* Footer com estatísticas */}
			<div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
				<div className="flex items-center justify-between text-sm text-gray-600">
					<div className="flex items-center gap-4">
						<span className="flex items-center gap-1">
							<File size={14} />
							{arquivos.length} {arquivos.length === 1 ? "arquivo" : "arquivos"}
						</span>
						<span className="flex items-center gap-1">
							<TagIcon size={14} />
							{tags.length} {tags.length === 1 ? "tag" : "tags"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BeeTabelaRepositorio;
