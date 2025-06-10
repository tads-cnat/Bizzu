"use client"

import type React from "react"

import BeeHeader from "../../components/BeeHeader/BeeHeader"
import { Outlet } from "react-router"
import { BeeSidebar } from "../../components/BeeSidebar/BeeSidebar"
import BeeHeaderProfile from "../../components/BeeHeaderProfile/BeeHeaderProfile"
import { useEffect, useState } from "react"
import RepositorioService from "../../services/models/RepositorioService"
import type { Repositorio } from "../../interfaces/Repositorio"
import BeeRepo from "../../components/BeeRepo/BeeRepo"

const LayoutFeed: React.FC = () => {
  const [repositorios, setRepositorios] = useState<Repositorio[]>([])

  useEffect(() => {
    RepositorioService.listAll()
      .then((res: any) => {
        setRepositorios(res.data || [])
      })
      .catch(() => setRepositorios([]))
  }, [])

  return (
    <>
      <BeeHeader />
      <div className="flex min-h-screen bg-[#F2F2F7] pt-20">
        {/* Sidebar */}
        <div className="fixed left-0 top-20 w-64 h-[calc(100vh-80px)] bg-white shadow-md overflow-y-auto z-30">
          <BeeSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 mr-80 px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <BeeHeaderProfile />
            <Outlet />
          </div>
        </div>

        {/* Right Sidebar - Repositórios */}
        <div className="fixed right-0 top-20 w-80 h-[calc(100vh-80px)] bg-white shadow-md overflow-y-auto z-30 p-4">
          <h2 className="text-lg font-bold mb-4">Repositórios</h2>
          <div className="space-y-4">
            {repositorios.length === 0 && <p className="text-gray-500">Nenhum repositório encontrado.</p>}
            {repositorios.map((repo) => (
              <BeeRepo
                key={repo.id}
                id={repo.id}
                usuario={repo.usuario}
                titulo={repo.titulo}
                descricao={repo.descricao}
                imagemRepo={repo.imagem}
                dataPublicacao={repo.dataPublicacao}
                tags={[]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LayoutFeed
