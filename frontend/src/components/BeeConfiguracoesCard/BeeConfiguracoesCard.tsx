"use client"

import type React from "react"
import { Gear, PencilSimple } from "@phosphor-icons/react"
import type { IBeeConfiguracoesCard } from "./IBeeConfiguracoesCard"

const BeeConfiguracoesCard: React.FC<IBeeConfiguracoesCard> = ({ onEditarPerfil, onMudarTema, onEditarFavoritos }) => {
  const configuracoes = [
    {
      label: "Editar perfil",
      descricao: "Edite sua foto, descrição, tema...",
      acao: "Editar",
      onClick: onEditarPerfil,
    },
    {
      label: "Tema",
      descricao: "Escuro/Claro",
      acao: "Mudar",
      onClick: onMudarTema,
    },
    {
      label: "Favoritos",
      descricao: "Abrir repositórios favoritados",
      acao: "Editar",
      onClick: onEditarFavoritos,
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Gear size={20} weight="regular" className="text-[#333333]" />
        <h3 className="text-lg font-semibold text-[#333333] font-poppins">Configurações</h3>
      </div>

      <div className="space-y-3">
        {configuracoes.map((config, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-[#333333] font-poppins text-sm">{config.label}</h4>
              <p className="text-xs text-[#666666] font-poppins">{config.descricao}</p>
            </div>

            <button
              onClick={config.onClick}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#058B92] hover:bg-gray-50 rounded-md transition-colors"
            >
              <PencilSimple size={12} weight="regular" />
              {config.acao}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BeeConfiguracoesCard
