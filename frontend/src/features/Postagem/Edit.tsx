import {useParams} from "react-router-dom";
import FormPostagem from "./Forms/FormPostagem";

const EditPostagem: React.FC = () => {
	const idPostagem = useParams();

	return (
		<>
			<FormPostagem
				idPostagem={idPostagem.id ? Number(idPostagem.id) : undefined}
				tipoForm="editar"
			/>
		</>
	);
};

export default EditPostagem;
