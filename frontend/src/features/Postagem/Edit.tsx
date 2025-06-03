"use client";

import type React from "react";

import {useParams} from "react-router-dom";
import FormPostagem from "./Forms/FormPostagem";

const EditPostagem: React.FC = () => {
	const {id} = useParams();

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Editar Postagem</h1>
			<FormPostagem
				idPostagem={id ? Number(id) : undefined}
				tipoForm="editar"
			/>
		</div>
	);
};

export default EditPostagem;
