import React from "react";
import { Heart, ChatCircle } from "phosphor-react";
import BeeTags from "../BeeTags/BeeTags";
import { BeePostProps } from "./BeePostProps";
import "../../index.css";

const BeePost: React.FC<BeePostProps> = ({
	nome,
	tempoPostado,
	conteudo,
	imagemPost,
	tags,
	curtidas,
	comentarios,
	imagemUsuarioLogado,
}) => {
	return (
		<div className="bg-white shadow rounded-lg p-4 mb-4">
			{/* 
				🔧 Cabeçalho temporário:
				Atualmente o nome do usuário e a imagem de perfil estão mockados/estáticos.
				O componente final de perfil com imagem + nome será integrado futuramente
				por outro membro da equipe.
			*/}
			<div className="flex items-center mb-2">
				<div className="w-10 h-10 bg-gray-200 rounded-full" />
				<span className="ml-3 font-semibold">{nome}</span>
				<span className="text-sm text-[#FCBD18] ml-2 font-semibold">
					{tempoPostado}
				</span>
			</div>

			<p className="mb-3">{conteudo}</p>

			{imagemPost && (
				<img
					src={imagemPost}
					alt="Imagem do post"
					className="rounded-lg mb-3 w-full object-cover"
				/>
			)}

			{/* 
				👍❤️ Seção de curtidas e comentários:
				Os ícones e contadores estão renderizados de forma direta neste componente.
				Futuramente, essa funcionalidade será delegada a um componente especializado
				por outro membro do time (com suporte a eventos de clique e estado).
			*/}
			<div className="flex items-center justify-between text-sm mb-2">
				<div className="flex items-center gap-4" style={{ color: "#333333" }}>
					<span className="flex items-center gap-1">
						<Heart size={16} weight="regular" /> {curtidas} Curtidas
					</span>
					<span className="flex items-center gap-1">
						<ChatCircle size={16} weight="bold" /> {comentarios} Comentários
					</span>
				</div>

				<div className="flex gap-1 flex-wrap">
					{tags.map((tag, index) => (
						<BeeTags key={index} label={tag.label} color={tag.color} />
					))}
				</div>
			</div>

			{/* 
				💬 Seção de comentário:
				- A imagem do usuário logado está sendo usada diretamente.
				- O input é um elemento HTML puro.
				Ambos serão substituídos pelo componente oficial de input e avatar
				que está sendo produzido por outro membro da equipe.
			*/}
			<div className="mt-2 flex items-center gap-3">
				<img
					src={imagemUsuarioLogado}
					alt="Imagem do usuário"
					className="hexagon"
				/>
				<input
					type="text"
					placeholder="Faça um comentário"
					className="flex-1 p-2 bg-[#F2F2F7] rounded-[15px] outline-none"
				/>
			</div>
		</div>
	);
};

export default BeePost;
