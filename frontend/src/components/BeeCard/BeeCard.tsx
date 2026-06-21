import {Card} from "antd";
import {IBeeCard} from "./IBeeCard";
import {Link} from "react-router-dom";
import ComunidadeService from "../../services/models/ComunidadeService";
import {useState, useEffect} from "react";
import { IBeeComunidade } from "../../interfaces/IBeeComunidade";



// eslint-disable-next-line no-empty-pattern
const BeeCard = ({}: IBeeCard) => {
	const [comunidades, setComunidades] = useState<IBeeComunidade[]>([]);
	const loadComunidadeAdm = async () => {
		try {
			const data = await ComunidadeService.listarComunidadeAdm();
			setComunidades(Array.isArray(data) ? data : []);
		} catch {
			setComunidades([]);
		}
	};
	useEffect(() => {
		loadComunidadeAdm();
	}, []);

	return (
		<>
			{comunidades.map((s) => (
				<div
					key={s.id}
					className="mb-4"
				>
					<Link
						to={`/comunidade/${s.id}`}
						className="block"
					>
						<Card
							hoverable
							className="w-[500px] p-4"
						>
							<div className="flex items-center gap-4">
								<img
									src={
										s.imagem
											? `http://localhost:8000${s.imagem}`
											: "./public/semFoto.jpg"
									}
									alt="Imagem da comunidade"
									className="w-20 h-20 object-cover rounded-full"
									style={{
										clipPath:
											"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
									}}
								/>
								<div className="flex flex-col justify-center">
									<h3 className="font-semibold text-lg">{s.nome}</h3>
									<p className="text-sm text-gray-600">{s.descricao}</p>
								</div>
							</div>
						</Card>
					</Link>
				</div>
			))}
		</>
	);
};

export default BeeCard;
