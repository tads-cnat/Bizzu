import type React from "react";
import FormPostagem from "./Forms/FormPostagem";
import {useParams} from "react-router-dom";

const CreatePostagem: React.FC = () => {
	const idUser = Number(useParams().id);
	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Criar Nova Postagem</h1>
			<FormPostagem
				tipoForm="criar"
				idUser={idUser}
			/>
		</div>
	);
};

export default CreatePostagem;
