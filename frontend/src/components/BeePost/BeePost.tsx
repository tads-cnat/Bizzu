import React from "react";
import {Heart, ChatCircle, DotsThreeVertical} from "@phosphor-icons/react";
import BeeTags from "../BeeTags/BeeTags";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";
import {BeePostProps} from "./BeePostProps";
import "../../index.css";
import BeeDropPost from "../BeeDropPost/BeeDropPost";

const BeePost: React.FC<BeePostProps> = ({
	usuario,
	conteudo,
	imagemPost,
	dataPublicacao,
	tags,
	curtidas,
	comentarios,
	onCurtir,
	onAbrirComentarios,
}) => {
	return (
		<div className="bg-white shadow rounded-lg p-4 mb-4 relative w-full">
			<BeeDropPost />

			<BeeFTPerfil
				usuario={usuario}
				dataPublicacao={dataPublicacao}
			/>

			<p className="mb-3 mt-2">{conteudo}</p>

			{imagemPost && (
				<img
					src={imagemPost}
					alt="Imagem do post"
					className="rounded-lg mb-3 w-full object-cover"
				/>
			)}

			<div className="flex items-center justify-between text-sm mb-2">
				<div
					className="flex items-center gap-4"
					style={{color: "#333333"}}
				>
					<button
						className="flex items-center gap-1 hover:text-gray-500 transition duration-200 ease-in-out hover:bg-gray-100 rounded-full p-2"
						onClick={onCurtir}
					>
						<Heart
							size={16}
							weight="regular"
						/>
						{curtidas} Curtidas
					</button>

					<button
						className="flex items-center gap-1 hover:text-gray-500 transition duration-200 ease-in-out hover:bg-gray-100 rounded-full p-2"
						onClick={onAbrirComentarios}
					>
						<ChatCircle
							size={16}
							weight="bold"
						/>
						{comentarios} Comentários
					</button>
				</div>
				{tags !== undefined && (
					<div className="flex gap-1 flex-wrap">
						{tags.map((tag, index) => (
							<BeeTags
								key={index}
								label={tag.label}
								color={tag.color}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default BeePost;
