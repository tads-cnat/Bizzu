import {useForm} from "react-hook-form";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {IFormPostagem} from "./IFormPostagem";
import BeeButton from "../../../components/BeeButtons/BeeButtons";

const schema = yup.object().shape({
	conteudo: yup.string().required(),
});

const FormPostagem = ({
	sendPostagem,
	defaultValue,
	defaultComunidade,
}: IFormPostagem) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	{
		defaultValue === undefined &&
			(defaultValue = "Insira um texto para sua postagem...");
	}
	return (
		<>
			<form onSubmit={handleSubmit(sendPostagem)}>
				<BeeTextArea
					placeholder={defaultValue}
					label="Conteúdo"
					{...register("conteudo")}
				/>
				{errors.conteudo?.message !== undefined && (
					<div>Preecha o campo ele é obrigatório</div>
				)}

				<div className="px-4 py-3 sm:flex sm:flex-row-reverse gap-4">
					<BeeButton
						label="Salvar"
						variante="primaria"
					/>
					<BeeButton
						label="Cancelar"
						variante="neutro"
					/>
				</div>
			</form>
		</>
	);
};

export default FormPostagem;
