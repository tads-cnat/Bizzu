import React, {useCallback, useEffect, useState} from "react";
import type {IBeeFiltroCategorias} from "./IBeeFiltroCategorias";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";
import {Tabs} from "antd";
import "./styles.css";
import BeeTags from "../BeeTags/BeeTags";
import {Controller} from "react-hook-form";

const BeeFiltroCategorias: React.FC<IBeeFiltroCategorias> = ({
	categorias,
	aoPesquisar,
	name,
	control,
	defaultValue,
}) => {
	const [categoriasAtuais, setCategoriasAtuais] = useState<any>([]);
	const [tipoAtivo, setTipoAtivo] = useState<"tec" | "mat" | "per">("tec");

	const categoriasFiltradas = categorias.filter(
		(cat) => cat.tipo === tipoAtivo,
	);

	const handleTipoChange: any = (key: any) => {
		setTipoAtivo(key);
	};

	const handleCategoriaClick = useCallback(
		(categoriaId: number) => {
			let novasCategorias;

			if (categoriasAtuais.includes(categoriaId)) {
				novasCategorias = categoriasAtuais.filter(
					(id: number) => id !== categoriaId,
				);
			} else {
				novasCategorias = [...categoriasAtuais, categoriaId];
			}

			setCategoriasAtuais(novasCategorias);
		},
		[categoriasAtuais, categorias],
	);

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

	useEffect(() => {
		if (defaultValue && Array.isArray(defaultValue)) {
			setCategoriasAtuais(defaultValue);
		}
	}, [defaultValue]);

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({field}) => {
				useEffect(() => {
					field.onChange(categoriasAtuais);
				}, [categoriasAtuais]);

				return (
					<div className="bg-white rounded-[15px] w-full max-w-sm">
						<label className="block text-sm font-medium text-gray-900 pt-5">
							Categorias *
						</label>

						<div className="flex">
							<Tabs
								activeKey={tipoAtivo}
								onChange={(key: string) => handleTipoChange(key as any)}
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
										checked={categoriasAtuais.includes(categoria.id)}
										readOnly
										className="accent-[#FCBD18] w-4 h-4"
									/>
									<span className="text-gray-700 select-none">
										{categoria.nome}
									</span>
								</div>
							))}
						</div>

						<div className="flex flex-wrap gap-1 mt-1">
							{categoriasAtuais.map((catId: any) => {
								const categoria = categorias.find((cat) => cat.id === catId);
								if (!categoria) return null;

								const color =
									categoria.tipo === "tec"
										? "magenta"
										: categoria.tipo === "per"
											? "cyan"
											: "orange";

								return (
									<BeeTags
										key={catId}
										label={categoria.nome}
										color={color}
									/>
								);
							})}
						</div>
					</div>
				);
			}}
		/>
	);
};

export default BeeFiltroCategorias;
