"use client"

import type React from "react"
import { Plus, PencilSimple, GraduationCap } from "@phosphor-icons/react"
import type { IBeeFormacaoAcademicaCard } from "./IBeeFormacaoAcademicaCard"

const BeeFormacaoAcademicaCard: React.FC<IBeeFormacaoAcademicaCard> = ({ formacoes, onAdicionar, onEditar }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap size={20} weight="regular" className="text-[#333333]" />
          <h3 className="text-lg font-semibold text-[#333333] font-poppins">Formação acadêmica</h3>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onAdicionar} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <Plus size={16} weight="bold" className="text-[#333333]" />
          </button>
          <button onClick={onEditar} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <PencilSimple size={16} weight="regular" className="text-[#333333]" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {formacoes.map((formacao, index) => (
          <div key={index} className="border-l-2 border-gray-200 pl-3">
            <h4 className="font-medium text-[#333333] font-poppins text-sm">{formacao.instituicao}</h4>
            <p className="text-xs text-[#666666] font-poppins leading-relaxed">{formacao.curso}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BeeFormacaoAcademicaCard
