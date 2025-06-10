import React from "react";
import  BeeRepo  from "../../components/BeeRepo/BeeRepo";
import RepositorioService from "../../services/models/RepositorioService";
import {useEffect, useState} from "react";
import type {Repositorio} from "../../interfaces/Repositorio";

const Repositorio: React.FC = () => {
	const [repositorios, setRepositorios] = useState<Repositorio[]>([]);

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
	}, []);

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Repositórios</h1>
			<div className="flex flex-col gap-4">
				{repositorios.map((repositorio) => (
					<BeeRepo
						key={repositorio.id}
						id={repositorio.id}
						usuario={repositorio.usuario}
						descricao={repositorio.descricao}
						imagemRepo={repositorio.imagem}
						dataPublicacao={repositorio.dataPublicacao}
					/>
				))}
			</div>
		</div>
	);
};

export default Repositorio; 