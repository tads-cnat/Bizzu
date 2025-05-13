// BeeFiltroCategorias.tsx
import React from "react";
import { IBeeFiltroCategorias } from "./IBeeFiltroCategorias";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";

const BeeFiltroCategorias: React.FC<IBeeFiltroCategorias> = ({
  categorias,
  categoriasSelecionadas,
  aoSelecionarCategoria,
  aoPesquisar,
}) => {
  const [tipoAtivo, setTipoAtivo] = React.useState<"tec" | "mat" | "per">("tec");

  const categoriasFiltradas = categorias.filter((cat) => cat.tipo === tipoAtivo);

  return (
    <div className="bg-white shadow-md rounded-[15px] p-4 w-full max-w-sm">
      <div className="flex justify-between gap-2 mb-4">
        {(["tec", "mat", "per"] as const).map((tipo) => (
          <button
            key={tipo}
            onClick={() => setTipoAtivo(tipo)}
            className={`flex-1 px-3 py-1 rounded-[15px] font-semibold transition duration-200 flex justify-center items-center ${
              tipoAtivo === tipo
                ? "bg-[#FCBD18] text-gray-900 shadow-md h-[27px]"
                : "text-gray-600"
            }`}
          >
            {tipo === "tec" && "Curso"}
            {tipo === "mat" && "Matéria"}
            {tipo === "per" && "Período"}
          </button>
        ))}
      </div>

      <BeeSearchBar onSearch={aoPesquisar} />

      <div className="mt-4 max-h-40 overflow-y-auto px-1">
        {categoriasFiltradas.map((categoria) => (
          <label
            key={categoria.id}
            className="flex items-center gap-2 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={categoriasSelecionadas.includes(categoria.id)}
              onChange={() => aoSelecionarCategoria(categoria.id)}
              className="accent-[#FCBD18] w-4 h-4"
            />
            <span className="text-gray-700">{categoria.nome}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BeeFiltroCategorias;
