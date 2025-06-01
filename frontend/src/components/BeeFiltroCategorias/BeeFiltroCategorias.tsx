import React from "react";
import type {IBeeFiltroCategorias} from "./IBeeFiltroCategorias";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";

const BeeFiltroCategorias: React.FC<IBeeFiltroCategorias> = ({
	categorias,
	categoriasSelecionadas,
	aoSelecionarCategoria,
	aoPesquisar,
}) => {
	const [tipoAtivo, setTipoAtivo] = React.useState<"tec" | "mat" | "per">(
		"tec",
	);

	const categoriasFiltradas = categorias.filter(
		(cat) => cat.tipo === tipoAtivo,
	);

	const handleTipoChange = (tipo: "tec" | "mat" | "per") => {
		setTipoAtivo(tipo);
	};

	const handleCategoriaClick = (categoriaId: number) => {
		aoSelecionarCategoria(categoriaId);
	};

	React.useEffect(() => {
		console.log("Categorias selecionadas atualizadas:", categoriasSelecionadas);
	}, [categoriasSelecionadas]);

	return (
		<div className="bg-white shadow-md rounded-[15px] p-4 w-full max-w-sm">
			<div className="flex justify-between gap-2 mb-4">
				{(["tec", "mat", "per"] as const).map((tipo) => (
					<button
						key={tipo}
						type="button"
						onClick={() => handleTipoChange(tipo)}
						className={`flex-1 px-3 py-1 rounded-[15px] font-semibold transition duration-200 flex justify-center items-center ${
							tipoAtivo === tipo
								? "bg-[#FCBD18] text-gray-900 shadow-md h-[27px]"
								: "text-gray-600"
						}`}
					>
						{tipo === "tec" && "Curso"}
						{tipo === "mat" && "Matéria"}
						{tipo === "per" && "Período"}
					</button>
				))}
			</div>

			<BeeSearchBar onSearch={aoPesquisar} />

			<div className="mt-4 max-h-40 overflow-y-auto px-1">
				{categoriasFiltradas.map((categoria) => (
					<div
						key={categoria.id}
						className="flex items-center gap-2 mb-2 cursor-pointer"
						onClick={() => handleCategoriaClick(categoria.id)}
					>
						<input
							type="checkbox"
							checked={categoriasSelecionadas.includes(categoria.id)}
							onChange={() => {}} // Função vazia para evitar warnings
							className="accent-[#FCBD18] w-4 h-4 pointer-events-none"
						/>
						<span className="text-gray-700 select-none">{categoria.nome}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default BeeFiltroCategorias;
