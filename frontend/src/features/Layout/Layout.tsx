import {useEffect, useState} from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import type {Repositorio} from "../../interfaces/Repositorio";
import RepositorioService from "../../services/models/RepositorioService";
import acessAuth from "../../utils/acessAuth";

const Layout: React.FC = () => {
	const [repositorios, setRepositorios] = useState<Repositorio[]>([]);
	const {username} = acessAuth();

	const carregarRepositorios = async () => {
		try {
			const response = await RepositorioService.listAll();
			setRepositorios(response.data || []);
		} catch (error) {
			console.error("Erro ao carregar repositórios:", error);
			setRepositorios([]);
		}
	};

	useEffect(() => {
		carregarRepositorios();
	}, []);

	return (
		<>
			<BeeHeader />
			<div className="flex flex-col flex-1 items-start w-200 mt-20 ">
				<BeeSidebar />
				<div className="fixed top-[80px] left-1/5 w-200 h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-full max-w-[500px] px-4 flex flex-col">
						<Outlet context={{recarregarRepositorios: carregarRepositorios}} />
					</div>
				</div>
				<aside className="fixed top-[80px] right-4 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
					<h2 className="text-lg font-bold mb-2">Repositórios</h2>
					{repositorios.length === 0 && (
						<p className="text-gray-500">Nenhum repositório encontrado.</p>
					)}
					{repositorios.map((repo) => (
						<BeeRepo
							key={repo.id}
							id={repo.id}
							usuario={repo.usuario}
							descricao={repo.descricao}
							imagemRepo={repo.imagem}
							dataPublicacao={repo.dataPublicacao}
							tags={[]}
						/>
					))}
				</aside>
			</div>
		</>
	);
};

export default Layout;
