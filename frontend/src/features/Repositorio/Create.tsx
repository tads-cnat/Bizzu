import type React from "react";
import BeeForm from "../../components/BeeForm/BeeForm";
import schema from "./Forms/schemas";
import sections from "./Forms/sections";
import {useState, useEffect} from "react";
import ComunidadeService from "../../services/models/ComunidadeService";
import onSubmit from "./Forms/submit";

const CreateRepositorio: React.FC = () => {
	const [comunidades, setComunidades] = useState<any[]>([]);

	useEffect(() => {
		const loadComunidades = async () => {
			try {
				const response = await ComunidadeService.listAll();
				if (response.data && Array.isArray(response.data)) {
					const comunidadesFormatadas = response.data.map(
						(comunidade: any) => ({
							label: comunidade.nome || comunidade.title,
							value: comunidade.id,
						}),
					);
					setComunidades(comunidadesFormatadas);
				} else {
					setComunidades([]);
				}
			} catch {
				setComunidades([]);
			}
		};

		loadComunidades();
	}, []);

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Criar Novo Repositorio</h1>
			<BeeForm
				schema={schema}
				sections={sections}
				onSubmit={onSubmit}
				options={comunidades}
			/>
		</div>
	);
};

export default CreateRepositorio;
