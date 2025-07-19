import {Menu} from "@headlessui/react";
import BeeButton from "../../../../components/BeeButtons/BeeButtons";
import {IBeeHeaderCommunity} from "./IBeeHeaderCommunity";

const BeeHeaderComunnity = ({comunidade}: IBeeHeaderCommunity) => {
	return (
		<>
			{comunidade && (
				<div className="flex min-w-0 gap-x-4 mb-7">
					<img
						src={
							comunidade.imagem
								? `${comunidade.imagem}`
								: "http://localhost:8000/imgPostagens/comunidades/2025/06/10/sem_imagem_avatar.png"
						}
						alt="Imagem de usuário"
						className="size-22 flex-none rounded-full bg-gray-50"
						style={{
							clipPath:
								"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
						}}
					></img>
					<div className="min-w-0 flex-auto">
						<p className="text-xl font-semibold text-[#333333]">
							{comunidade.nome}
						</p>
						<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
							<a
								href="#"
								className="mt-2 flex font-semibold items-center text-sm text-[#333333]"
							>
								y Segue
							</a>
							<a
								href="#"
								className="mt-2 flex font-semibold items-center text-sm text-[#333333]"
							>
								x Seguidores
							</a>

							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								<BeeButton
									variante={"primaria"}
									label={"Seguir"}
								/>
							</Menu>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BeeHeaderComunnity;
