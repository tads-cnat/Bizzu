import type React from "react"
import FormPostagem from "./Forms/FormPostagem"

const CreatePostagem: React.FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Postagem</h1>
      <FormPostagem tipoForm="criar" />
    </div>
  )
}

export default CreatePostagem
