import {useCallback, useEffect, useState} from "react";
import BeeFiltroCategorias from "../BeeFiltroCategorias/BeeFiltroCategorias";
import BeeTags from "../BeeTags/BeeTags";
import {IBeeCategoria} from "./IBeeCategoria";
import CategoriaService from "../../services/models/CategoriaService";

const BeeCategoria = ({errors, watch}: IBeeCategoria) => {
	const [categorias, setCategorias] = useState<IBeeCategoria[]>([]);
	const categoriasSelecionadas = watch("categorias");
	const [termoPesquisa, setTermoPesquisa] = useState("");

	useEffect(() => {
		const loadCategorias = async () => {
			try {
				const response = await CategoriaService.listAll();
				if (response.data && Array.isArray(response.data)) {
					setCategorias(response.data);
				} else {
					setCategorias([]);
				}
			} catch {
				setCategorias([]);
			}
		};

		loadCategorias();
	}, []);

	const categoriasFiltradas = categorias.filter((categoria) =>
		categoria.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
	);

	const aoSelecionarCategoria = useCallback(
		(categoriaId: number) => {
			const categoriasAtuais = getValues("categorias") || [];
			let novasCategorias;

			if (categoriasAtuais.includes(categoriaId)) {
				novasCategorias = categoriasAtuais.filter((id) => id !== categoriaId);
			} else {
				novasCategorias = [...categoriasAtuais, categoriaId];
			}

			setValue("categorias", novasCategorias, {shouldValidate: true});
		},
		[getValues, setValue],
	);

	const handlePesquisarCategorias = useCallback((termo: string) => {
		setTermoPesquisa(termo);
	}, []);

	return (
		<>
			<label className="block text-sm font-medium text-gray-900 mb-2">
				Categorias *
			</label>
			<BeeFiltroCategorias
				categorias={categoriasFiltradas}
				categoriasSelecionadas={categoriasSelecionadas || []}
				aoSelecionarCategoria={aoSelecionarCategoria}
				aoPesquisar={handlePesquisarCategorias}
			/>
			{errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
			{categoriasSelecionadas && categoriasSelecionadas.length > 0 && (
				<div className="mt-2">
					<p className="text-sm text-gray-600">
						Categorias selecionadas: {categoriasSelecionadas.length}
					</p>
					<div className="flex flex-wrap gap-1 mt-1">
						{categoriasSelecionadas.map((catId) => {
							const categoria = categorias.find((cat) => cat.id === catId);
							return categoria ? (
								<div key={catId}>
									{categoria.tipo == "tec" ? (
										<BeeTags
											label={categoria.nome}
											color="magenta"
										/>
									) : categoria.tipo == "per" ? (
										<BeeTags
											label={categoria.nome}
											color="cyan"
										/>
									) : (
										<BeeTags
											label={categoria.nome}
											color="orange"
										/>
									)}
								</div>
							) : null;
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default BeeCategoria;
