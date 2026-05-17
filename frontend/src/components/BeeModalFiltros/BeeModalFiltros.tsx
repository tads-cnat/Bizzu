"use client";

import type React from "react";
import {useState, useEffect} from "react";
import {X} from "@phosphor-icons/react";
import CategoriaService from "../../services/models/CategoriaService";
import type {Categoria} from "../../interfaces/Categoria";
import type {IBeeModalFiltros, FiltrosPostagem} from "./IBeeModalFiltros";

const BeeModalFiltros: React.FC<IBeeModalFiltros> = ({
	isOpen,
	onClose,
	onAplicarFiltros,
	filtrosAtuais,
}) => {
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [loading, setLoading] = useState(false);

	// Estados para os filtros selecionados
	const [tecnologiasSelecionadas, setTecnologiasSelecionadas] = useState<
		number[]
	>([]);
	const [cursosSelecionados, setCursosSelecionados] = useState<number[]>([]);
	const [periodosSelecionados, setPeriodosSelecionados] = useState<number[]>(
		[],
	);

	// Carregar categorias
	useEffect(() => {
		const carregarCategorias = async () => {
			setLoading(true);
			try {
				const response = await CategoriaService.listAll();
				setCategorias(response.data || []);
			} catch (error) {
				console.error("Erro ao carregar categorias:", error);
				setCategorias([]);
			} finally {
				setLoading(false);
			}
		};

		carregarCategorias();
	}, []);

	// Sincronizar com filtros ativos externos
	useEffect(() => {
		if (filtrosAtuais) {
			setTecnologiasSelecionadas(filtrosAtuais.tecnologias || []);
			setCursosSelecionados(filtrosAtuais.cursos || []);
			setPeriodosSelecionados(filtrosAtuais.periodos || []);
		} else {
			setTecnologiasSelecionadas([]);
			setCursosSelecionados([]);
			setPeriodosSelecionados([]);
		}
	}, [filtrosAtuais]);

	const handleSelecionarCategoria =
		(tipo: "tec" | "mat" | "per") => (categoriaId: number) => {
			switch (tipo) {
				case "tec":
					setTecnologiasSelecionadas((prev) =>
						prev.includes(categoriaId)
							? prev.filter((id) => id !== categoriaId)
							: [...prev, categoriaId],
					);
					break;
				case "mat":
					setCursosSelecionados((prev) =>
						prev.includes(categoriaId)
							? prev.filter((id) => id !== categoriaId)
							: [...prev, categoriaId],
					);
					break;
				case "per":
					setPeriodosSelecionados((prev) =>
						prev.includes(categoriaId)
							? prev.filter((id) => id !== categoriaId)
							: [...prev, categoriaId],
					);
					break;
			}
		};

	const aplicarFiltros = () => {
		const filtros: FiltrosPostagem = {
			tecnologias: tecnologiasSelecionadas,
			cursos: cursosSelecionados,
			periodos: periodosSelecionados,
		};

		onAplicarFiltros(filtros);
		onClose();
	};

	const limparTodosFiltros = () => {
		setTecnologiasSelecionadas([]);
		setCursosSelecionados([]);
		setPeriodosSelecionados([]);

		const filtrosVazios: FiltrosPostagem = {
			tecnologias: [],
			cursos: [],
			periodos: [],
		};

		onAplicarFiltros(filtrosVazios);
		onClose();
	};

	const totalFiltrosAtivos =
		tecnologiasSelecionadas.length +
		cursosSelecionados.length +
		periodosSelecionados.length;

	const categoriasParaFiltro = (tipo: "tec" | "mat" | "per") =>
		categorias.filter((cat) => cat.tipo === tipo);

	const renderizarCategorias = (
		tipo: "tec" | "mat" | "per",
		selecionadas: number[],
	) => {
		const categoriasDoTipo = categoriasParaFiltro(tipo);

		if (categoriasDoTipo.length === 0) {
			return (
				<p className="text-gray-500 text-sm">Nenhuma categoria encontrada</p>
			);
		}

		return (
			<div className="flex flex-wrap gap-2">
				{categoriasDoTipo.map((categoria) => {
					const isSelected = selecionadas.includes(categoria.id);
					return (
						<button
							key={categoria.id}
							onClick={() => handleSelecionarCategoria(tipo)(categoria.id)}
							className={`px-3 py-1 roundesd-full text-sm transition-colors ${
								isSelected
									? tipo === "tec"
										? "bg-pink-500 text-white"
										: tipo === "mat"
											? "bg-orange-500 text-white"
											: "bg-cyan-500 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{categoria.nome}
						</button>
					);
				})}
			</div>
		);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop mais sutil */}
			<div
				className="absolute inset-0 bg-white bg-opacity-80"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[70vh] overflow-hidden border border-gray-200">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-[#333333]">
						Filtros Avançados
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
					>
						<X
							size={20}
							className="text-gray-500"
						/>
					</button>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto max-h-[50vh]">
					{loading ? (
						<div className="flex justify-center items-center py-8">
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
								<span className="text-gray-600">Carregando categorias...</span>
							</div>
						</div>
					) : (
						<div className="space-y-6">
							{/* Tecnologias */}
							<div>
								<h3 className="text-base font-medium text-[#333333] mb-3 flex items-center gap-2">
									<span className="w-3 h-3 bg-pink-500 rounded-full"></span>
									Tecnologias
									{tecnologiasSelecionadas.length > 0 && (
										<span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
											{tecnologiasSelecionadas.length}
										</span>
									)}
								</h3>
								{renderizarCategorias("tec", tecnologiasSelecionadas)}
							</div>

							{/* Cursos/Matérias */}
							<div>
								<h3 className="text-base font-medium text-[#333333] mb-3 flex items-center gap-2">
									<span className="w-3 h-3 bg-orange-500 rounded-full"></span>
									Matérias
									{cursosSelecionados.length > 0 && (
										<span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
											{cursosSelecionados.length}
										</span>
									)}
								</h3>
								{renderizarCategorias("mat", cursosSelecionados)}
							</div>

							{/* Períodos */}
							<div>
								<h3 className="text-base font-medium text-[#333333] mb-3 flex items-center gap-2">
									<span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
									Períodos
									{periodosSelecionados.length > 0 && (
										<span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs">
											{periodosSelecionados.length}
										</span>
									)}
								</h3>
								{renderizarCategorias("per", periodosSelecionados)}
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
					<div className="text-sm text-gray-600">
						{totalFiltrosAtivos > 0 ? (
							<span>{totalFiltrosAtivos} filtro(s) selecionado(s)</span>
						) : (
							<span>Nenhum filtro selecionado</span>
						)}
					</div>

					<div className="flex gap-3">
						<button
							onClick={limparTodosFiltros}
							className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
						>
							Limpar Tudo
						</button>
						<button
							onClick={aplicarFiltros}
							className="px-6 py-2 bg-[#FCBD18] hover:bg-yellow-500 text-white rounded-lg transition-colors font-medium"
						>
							Aplicar Filtros
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BeeModalFiltros;
