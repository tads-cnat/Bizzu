import React from "react";
import { Heart, ChatCircle, DotsThreeVertical } from "phosphor-react";
import BeeTags from "../BeeTags/BeeTags";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";
import { BeePostProps } from "./BeePostProps";
import "../../index.css";

const BeePost: React.FC<BeePostProps> = ({
  usuario,
  conteudo,
  imagemPost,
  tags,
  curtidas,
  comentarios,
  imagemUsuarioLogado,
  onCurtir,          
  onAbrirComentarios, 
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 relative">
      <button className="absolute top-8 right-4 text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-100 rounded-full transition duration-200 ease-in-out">
        <DotsThreeVertical size={24} weight="bold" />
      </button>

      <BeeFTPerfil
        name={usuario.name}
        date={usuario.date}
        image={usuario.image}
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
        <div className="flex items-center gap-4" style={{ color: "#333333" }}>
          <button
            className="flex items-center gap-1 hover:text-gray-500 transition duration-200 ease-in-out hover:bg-gray-100 rounded-full p-2"
            onClick={onCurtir}
          >
            <Heart size={16} weight="regular" />
            {curtidas} Curtidas
          </button>

          <button
            className="flex items-center gap-1 hover:text-gray-500 transition duration-200 ease-in-out hover:bg-gray-100 rounded-full p-2"
            onClick={onAbrirComentarios}
          >
            <ChatCircle size={16} weight="bold" />
            {comentarios} Comentários
          </button>
        </div>

        <div className="flex gap-1 flex-wrap">
          {tags.map((tag, index) => (
            <BeeTags key={index} label={tag.label} color={tag.color} />
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <img
          src={imagemUsuarioLogado}
          alt="Imagem do usuário logado"
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
