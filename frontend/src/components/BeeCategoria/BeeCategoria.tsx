import {useCallback, useEffect, useState} from "react";
import BeeFiltroCategorias from "../BeeFiltroCategorias/BeeFiltroCategorias";
import {IBeeCategoria} from "./IBeeCategoria";
import CategoriaService from "../../services/models/CategoriaService";
import {ICategoria} from "../BeeFiltroCategorias/IBeeFiltroCategorias";

const BeeCategoria = ({errors, defaultValue, name, control}: IBeeCategoria) => {
	const [categorias, setCategorias] = useState<ICategoria[]>([]);
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

	const categoriasFiltradas: any[] = categorias.filter((categoria: any) =>
		categoria.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
	);

	const handlePesquisarCategorias = useCallback((termo: string) => {
		setTermoPesquisa(termo);
	}, []);

	return (
		<>
			<BeeFiltroCategorias
				categorias={categoriasFiltradas}
				aoPesquisar={handlePesquisarCategorias}
				name={name}
				control={control}
				defaultValue={defaultValue}
			/>

			{errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
		</>
	);
};

export default BeeCategoria;
