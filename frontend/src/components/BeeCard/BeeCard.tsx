import {Card} from "antd";
import {IBeeCard} from "./IBeeCard";
import {Link} from "react-router-dom";
import ComunidadeService from "../../services/models/ComunidadeService";
import {Empty} from "antd";
import {useState} from "react";
import {useEffect} from "react";

const {Meta} = Card;

const BeeCard = ({}: IBeeCard) => {
	const [comunidades, setComunidades] = useState<any[]>([]);
	const loadComunidadeAdm = async () => {
		try {
			const data = await ComunidadeService.listarComunidadeAdm();
			setComunidades(Array.isArray(data) ? data : []);
			console.log("Comunidades do administrador carregadas com sucesso!");
		} catch {
			console.log("Erro ao carregar comunidades do adm");
			setComunidades([]);
		}
	};
	useEffect(() => {
		loadComunidadeAdm();
	}, []);
	console.log("BeeCard montou!");
	return (
		<>
			{comunidades.length === 0 ? (
				<Empty
					description="Você ainda não criou nenhuma comunidade!"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			) : (
				comunidades.map((s: any) => (
					<Link
						to={`/comunidade/${s.id}`}
						key={s.id}
					>
						<Card
							title={s.nome}
							style={{width: 500, marginBottom: "10px", justifySelf: "center"}}
							cover={
								<img
									src={
										s.imagem
											? `http://localhost:8000${s.imagem}`
											: "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png"
									}
									alt="Imagem de usuário"
									className="size-22 flex-none rounded-full bg-gray-50"
									style={{
										clipPath:
											"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
									}}
								/>
							}
							hoverable
						>
							<Meta
								description={s.descricao}
								style={{marginBottom: "10px"}}
							/>
						</Card>
					</Link>
				))
			)}
		</>
	);
};

export default BeeCard;
