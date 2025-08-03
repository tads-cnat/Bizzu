import React from "react";
import type {IBeeFiltroCategorias} from "./IBeeFiltroCategorias";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";
import {Tabs} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import "./styles.css";

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

	const tabsItems = [
		{
			key: "tec",
			label: <span className="text-[#333333] font-medium">Tecnologia</span>,
		},
		{
			key: "mat",
			label: <span className="text-[#333333] font-medium">Matéria</span>,
		},
		{
			key: "per",
			label: <span className="text-[#333333] font-medium">Período</span>,
		},
	];

	return (
		<div className="bg-white rounded-[15px] p-4 w-full max-w-sm">
			<div className="flex justify-between gap-2">
				<Tabs
					activeKey={tipoAtivo}
					onChange={handleTipoChange}
					tabBarStyle={{marginBottom: "1rem"}}
					centered
					items={tabsItems}
				/>
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
