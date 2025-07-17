"use client";

import type React from "react";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import RepositorioService from "../../services/models/RepositorioService";
import CategoriaService from "../../services/models/CategoriaService";
import {useEffect, useState} from "react";
import type {IRepositorio, ITag} from "../../interfaces/Repositorio";
import type {ICategoria} from "../../interfaces/Categoria";

const RepoList: React.FC = () => {
	const [repositorios, setRepositorios] = useState<IRepositorio[]>([]);
	const [categorias, setCategorias] = useState<ICategoria[]>([]);

	const carregarCategorias = async () => {
		try {
			const response = await CategoriaService.listAll();
			setCategorias(response.data || []);
		} catch (error) {
			console.error("Erro ao carregar categorias:", error);
			setCategorias([]);
		}
	};

	const handleExcluirRepositorio = async (id: number) => {
		try {
			await RepositorioService.delete(id);
			setRepositorios((prev) => prev.filter((repo) => repo.id !== id));
		} catch (error) {
			console.error("Erro ao excluir repositório:", error);
			// alert removido conforme solicitado
		}
	};

	// Função para converter categorias em tags
	const categoriasParaTags = (categoriasIds: number[]): ITag[] => {
		if (!categoriasIds || categoriasIds.length === 0) return [];

		const coresPorTipo: Record<"tec" | "mat" | "per", string> = {
			tec: "magenta",
			mat: "orange",
			per: "cyan",
		};

		const defaultColor = "#6FCF97";

		const tagsValidas: ITag[] = [];

		for (const categoriaId of categoriasIds) {
			const categoria = categorias.find((c) => c.id === categoriaId);

			if (
				categoria &&
				categoria.tipo &&
				(categoria.tipo === "tec" ||
					categoria.tipo === "mat" ||
					categoria.tipo === "per")
			) {
				tagsValidas.push({
					label: categoria.nome,
					color: coresPorTipo[categoria.tipo] || defaultColor,
					tipo: categoria.tipo,
				});
			}
		}

		return tagsValidas;
	};

	useEffect(() => {
		const loadRepositorios = async () => {
			try {
				const response = await RepositorioService.listAll();
				if (response.data && Array.isArray(response.data)) {
					setRepositorios(response.data);
				}
			} catch (error) {
				console.error("Erro ao carregar repositórios:", error);
			}
		};

		loadRepositorios();
		carregarCategorias();
	}, []);

	return (
		<div className="w-full bg-[#F2F2F7] min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-4 text-[#333333]">Repositórios</h1>
			<div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto pr-2">
				{repositorios.map((repositorio) => {
					const tags = categoriasParaTags(repositorio.categorias);
					return (
						<BeeRepo
							key={repositorio.id}
							id={repositorio.id}
							usuario={repositorio.usuario}
							titulo={repositorio.titulo}
							descricao={repositorio.descricao}
							imagemRepo={repositorio.imagem}
							dataPublicacao={repositorio.dataPublicacao}
							tags={tags}
							onExcluir={handleExcluirRepositorio}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RepoList;
