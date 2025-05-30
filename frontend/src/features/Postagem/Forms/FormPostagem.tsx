import {use, useEffect, useState} from "react";
import {set, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {BeeButton} from "../../../components/BeeButtons/BeeButtons";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import {PaperPlaneRight} from "@phosphor-icons/react";
import PostagemService from "../../../services/models/PostagemService";
import {IFormPostagem} from "./IFormPostagem";
import BeeInput from "../../../components/BeeInput/BeeInput";
import {BeePostProps} from "../../../components/BeePost/BeePostProps";
import BeeAnexos from "../../../components/BeeAnexos/BeeAnexos";
import BeePost from "../../../components/BeePost/BeePost";

interface FormValues {
	texto: string;
}

const schema = yup.object({
	texto: yup.string().required("Conteúdo é obrigatório"),
});

export const FormPostagem = ({
	idPostagem,
	tipoForm,
	onSubmitCallback, // callback para quando o form for submetido resetar os campos para um novo forms
}: IFormPostagem & {onSubmitCallback?: () => void}) => {
	const [postagens, setPostagens] = useState<BeePostProps>();
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			texto: "",
		},
	});

	// Buscar dados para editar
	useEffect(() => {
		if (tipoForm === "editar" && idPostagem) {
			// console.log("", idPostagem)
			PostagemService.get(idPostagem).then((response) => {
				setPostagens(response.data);
				reset({
					texto: postagens.texto,
				});
			});
		} else {
			reset({
				texto: "",
			});
		}
	}, [idPostagem, tipoForm, reset]);
	useEffect(() => {
		console.log("Id da postagem", idPostagem);
		console.log("postagens", postagens);
	}, [postagens]);
	// Submit
	const onSubmit = async (data: FormValues) => {
		const formData = new FormData();
		formData.append("texto", data.texto);
		// console.log("tipo e id: ", tipoForm && idPostagem);
		try {
			if (tipoForm === "editar" && idPostagem) {
				await PostagemService.put(idPostagem, formData);
				alert("Postagem atualizada com sucesso!");
			} else {
				await PostagemService.post(formData);
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
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4"
		>
			<div>
				{postagens ? (
					<div className="editando">
						<BeeTextArea
							{...register("texto")}
							defaultValue={postagens.texto}
							label="Conteúdo"
						/>
						
						<BeeAnexos
							path="http://127.0.0.1:8000/imgPostagens/6c3dcc39c780ea9a175cb92c076f139e.jpg"/>

					</div>
						
				) : (
					<BeeTextArea
						{...register("texto")}
						placeholder="Digite seu conteúdo..."
						label="Conteúdo"
					/>
				)}

				{/* {errors.texto && (
					<p className="text-red-500 text-sm mt-1">{errors.texto.message}</p>
				)} */}
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
