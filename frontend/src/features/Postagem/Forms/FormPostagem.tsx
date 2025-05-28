import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {BeeButton} from "../../../components/BeeButtons/BeeButtons";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import {PaperPlaneRight} from "@phosphor-icons/react";
import PostagemService from "../../../services/models/PostagemService";
import {IFormPostagem} from "./IFormPostagem";
import BeeInput from "../../../components/BeeInput/BeeInput";

interface FormValues {
	conteudo: string;
	titulo: string;
}

const schema = yup.object({
	conteudo: yup.string().required("Conteúdo é obrigatório"),
	titulo: yup.string().required("Título é obrigatório"),
});

export const FormPostagem = ({idPostagem, tipoForm}: IFormPostagem) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			conteudo: "",
			titulo: "",
		},
	});

	const onSubmit = (data: FormValues) => {
		if (tipoForm == "editar") {
			async function sendPostagem(): Promise<void> {
				void PostagemService.put(idPostagem, data).then();
			}
		} else {
			async function savePostagem(): Promise<void> {
				void PostagemService.post(idPostagem, data).then();
			}
		}
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4"
		>
			<div>
				<BeeInput
					{...register("titulo")}
					placeholder="Digite o título..."
					label="Título"
				/>
				{errors.titulo && (
					<p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>
				)}
			</div>

			<div>
				<BeeTextArea
					{...register("conteudo")}
					placeholder="Digite seu conteúdo..."
					label="Conteúdo"
				/>
			</div>

			<BeeButton
				label="Publicar"
				variante="primaria"
				icone={<PaperPlaneRight size={18} />}
			/>
		</form>
	);
};

export default FormPostagem;
