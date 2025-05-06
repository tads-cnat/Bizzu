import React from "react";
import { CaixaRepositorioProps } from "./BeeCaixaRepositorio.props";
import BeeTags from "../BeeTags/BeeTags";

// Função para exibir "há X horas"
function tempoDesde(data: Date): string {
  const agora = new Date();
  const diffMs = agora.getTime() - data.getTime();
  const diffSegundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(diffSegundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (dias > 0) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
  if (horas > 0) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
  if (minutos > 0) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
  return "agora mesmo";
}

const CaixaRepositorio: React.FC<CaixaRepositorioProps> = ({
  usuarioIconeUrl,
  usuarioNome,
  dataPostagem,
  tituloPostagem,
  descricaoPostagem,
  tags,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-md max-w-85 cursor-pointer hover:bg-gray-50 transition"
    >
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-2">
        {usuarioIconeUrl && (
          <img  src={usuarioIconeUrl}
                alt={usuarioNome}
                className="w-8 h-8 object-cover"
                style={{
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                }}
              />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{usuarioNome}</span>
          <span className="text-xs text-gray-400">{tempoDesde(dataPostagem)}</span>
        </div>
      </div>

      {/* Título */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{tituloPostagem}</h3>

      {/* Descrição */}
      <p className="text-sm text-gray-700 mb-2 max-w-60">{descricaoPostagem}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <BeeTags key={index} label={tag.label} color={tag.color} />
        ))}
      </div>
    </div>
  );
};

export default CaixaRepositorio;
