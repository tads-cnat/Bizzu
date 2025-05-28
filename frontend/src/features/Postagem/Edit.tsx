import {useParams} from "react-router-dom";
import FormPostagem from "./Forms/FormPostagem";

const EditPostagem: React.FC = () => {
	const idPostagem = useParams();

	return (
		<>
			<FormPostagem
				idPostagem={Number(idPostagem)}
				tipoForm="editar"
			/>
		</>
	);
};

export default EditPostagem;
