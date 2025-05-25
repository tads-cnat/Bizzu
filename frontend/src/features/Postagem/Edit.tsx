import PostagemService from "../../services/models/PostagemService";
import FormPostagem from "./Forms/FormPostagem";

const EditPostagem: React.FC = () => {
	async function sendPostagem(): Promise<void> {
		void PostagemService.put().then;
	}

	return (
		<>
			<FormPostagem sendPostagem={sendPostagem} />
		</>
	);
};

export default EditPostagem;
