"use client"

import type React from "react"
import { useState } from "react"
import { DotsThreeVertical, PencilSimple, Trash } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil"
import type { BeeRepoProps } from "./IBeeRepo"
import BeeTags from "../BeeTags/BeeTags"
import "../../index.css"

const BeeRepo: React.FC<BeeRepoProps> = ({
  id,
  usuario,
  titulo,
  descricao,
  imagemRepo,
  dataPublicacao,
  tags = [],
  onExcluir,
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const handleEditarClick = () => {
    if (id) {
      navigate(`/bizzu/repositorio/editar/${id}`)
    }
    setShowMenu(false)
  }

  const handleExcluirClick = () => {
    if (onExcluir && id) {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este repositório?")
      if (confirmDelete) {
        onExcluir(id)
      }
    }
    setShowMenu(false)
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleClickRepositorio = () => {
    if (id) {
      navigate(`/repositorio/${id}`)
    }
  }

  return (
    <div className="bg-[#F2F2F7] shadow-md rounded-lg p-4 mb-4 relative w-full cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:bg-white" onClick={handleClickRepositorio}>
      {/* Menu de opções */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition duration-200 ease-in-out"
          type="button"
        >
          <DotsThreeVertical size={24} weight="bold" />
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-[#333333] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              <button
                onClick={handleEditarClick}
                className="flex items-center w-full px-4 py-2 text-sm text-[#F8F4E6] hover:bg-zinc-600 transition duration-200"
                type="button"
              >
                <PencilSimple size={16} className="mr-2" weight="bold" />
                Editar Repositório
              </button>
              <button
                onClick={handleExcluirClick}
                className="flex items-center w-full px-4 py-2 text-sm text-[#F8F4E6] hover:bg-zinc-600 transition duration-200"
                type="button"
              >
                <Trash size={16} className="mr-2" weight="bold" />
                Excluir Repositório
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay para fechar o menu quando clicar fora */}
      {showMenu && <div className="fixed inset-0 z-5" onClick={() => setShowMenu(false)} />}

      <BeeFTPerfil usuarioId={usuario?.nome || ""} dataPublicacao={dataPublicacao} />

      {titulo && <h3 className="text-lg font-semibold mt-2 text-[#333333]">{titulo}</h3>}

      <p className="mb-3 mt-2 text-gray-600">{descricao}</p>

      {imagemRepo && (
        <img
          src={imagemRepo || "/placeholder.svg"}
          alt="Imagem do repositório"
          className="rounded-lg mb-3 w-full object-cover"
        />
      )}

      {tags && tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {tags.map((tag, index) => (
            <BeeTags key={index} label={tag.label} color={tag.color} tipo={tag.tipo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BeeRepo
