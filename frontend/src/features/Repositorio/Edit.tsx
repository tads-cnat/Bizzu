"use client";

import type React from "react";

import {useParams} from "react-router-dom";
import FormRepositorio from "./Forms/FormRepositorio";

const EditRepositorio: React.FC = () => {
    const {id} = useParams();

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">Editar Repositorio</h1>
            <FormRepositorio
                idRepositorio={id ? Number(id) : undefined}
                tipoForm="editar"
            />
        </div>
    );
};

export default EditRepositorio;