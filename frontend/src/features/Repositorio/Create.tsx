import type React from "react";
import FormRepositorio from "./Forms/FormRepositorio";

const CreateRepositorio: React.FC = () => {
    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">Criar Novo Repositorio</h1>
            <FormRepositorio tipoForm="criar" />
        </div>
    );
};

export default CreateRepositorio;