import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { BeeButton } from "../../../components/BeeButtons/BeeButtons";
import { BeeTextArea } from "../../../components/BeeTextArea/BeeTextArea";
import { PaperPlaneRight } from "@phosphor-icons/react";
import PostagemService from "../../../services/models/PostagemService";
import { IFormPostagem } from "./IFormPostagem";
import BeeInput from "../../../components/BeeInput/BeeInput";

interface FormValues {
	titulo: string;
	conteudo: string;
}

const schema = yup.object({
	titulo: yup.string().required("Título é obrigatório"),
	conteudo: yup.string().required("Conteúdo é obrigatório"),
});

export const FormPostagem = ({
	idPostagem,
	tipoForm,
	onSubmitCallback, // callback para quando o form for submetido resetar os campos para um novo forms
}: IFormPostagem & { onSubmitCallback?: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			titulo: "",
			conteudo: "",
		},
	});

	// Buscar dados para editar
	useEffect(() => {
		if (tipoForm === "editar" && idPostagem) {
			PostagemService.get(idPostagem).then((response) => {
				const data = response.data;
				reset({
					titulo: data.titulo,
					conteudo: data.texto,
				});
			});
		} else {
			reset({
				titulo: "",
				conteudo: "",
			});
		}
	}, [idPostagem, tipoForm, reset]);

	// Submit
	const onSubmit = async (data: FormValues) => {
		const formData = new FormData();
		formData.append("titulo", data.titulo);
		formData.append("texto", data.conteudo);

		try {
			if (tipoForm === "editar" && idPostagem) {
				await PostagemService.put(idPostagem, formData);
				alert("Postagem atualizada com sucesso!");
			} else {
				await PostagemService.criar(formData);
				alert("Postagem criada com sucesso!");
			}
			reset();
			onSubmitCallback?.(); // Chama callback
		} catch (error) {
			console.error(error);
			alert("Erro ao salvar postagem.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
				{errors.conteudo && (
					<p className="text-red-500 text-sm mt-1">{errors.conteudo.message}</p>
				)}
			</div>

			<BeeButton
				label={tipoForm === "editar" ? "Atualizar" : "Publicar"}
				variante="primaria"
				icone={<PaperPlaneRight size={18} />}
			/>
		</form>
	);
};

export default FormPostagem;
