import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {BeeButton} from "../../../components/BeeButtons/BeeButtons";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import {PaperPlaneRight, Hexagon} from "@phosphor-icons/react";
import PostagemService from "../../../services/models/PostagemService";
import {IFormPostagem} from "./IFormPostagem";
import {BeePostProps} from "../../../components/BeePost/BeePostProps";
import BeeAnexos from "../../../components/BeeAnexos/BeeAnexos";
import BeeArquivo from "../../../components/BeeArquivo/BeeArquivo";
import BeeSelect from "../../../components/BeeSelect/BeeSelect";
import ComunidadeService from "../../../services/models/ComunidadeService";

interface FormValues {
	texto: string;
	imagem: string;
}

const schema = yup.object({
	texto: yup.string().required("Conteúdo é obrigatório"),
	imagem: yup.string(),
});

export const FormPostagem = ({
	idPostagem,
	tipoForm,
	onSubmitCallback, // callback para quando o form for submetido resetar os campos para um novo forms
}: IFormPostagem & {onSubmitCallback?: () => void}) => {
	const [postagens, setPostagens] = useState<BeePostProps>();
	const [comunidades, setComunidades] = useState();
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

	useEffect(() => {
		void ComunidadeService.listAll()
			.then((response) => {
				setComunidades(response.data);
			})
			.catch(() => {
				console.log("Não recebeu comunidades");
			});
		console.log(comunidades);
	}, [tipoForm]);

	// Buscar dados para editar
	useEffect(() => {
		if (tipoForm === "editar" && idPostagem) {
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
		console.log(idPostagem);
	}, [idPostagem, tipoForm, reset]);

	// Submit
	const onSubmit = async (data: FormValues): Promise<void> => {
		const formData = new FormData();
		formData.append("texto", data.texto);
		if (data.imagem !== undefined) formData.append("imagem", data.imagem);
		console.log("Data: ", data);
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
						{comunidades !== undefined && (
							<BeeSelect
								options={comunidades}
								placeholder="C"
								icone={Hexagon}
							/>
						)}

						<BeeTextArea
							{...register("texto")}
							defaultValue={postagens.texto}
							label="Conteúdo"
						/>

						<BeeArquivo {...register("imagem")} />

						<BeeAnexos
							path={postagens.imagemPost}
							{...register("imagem")}
						/>
					</div>
				) : (
					<BeeTextArea
						{...register("texto")}
						placeholder="Digite seu conteúdo..."
						label="Conteúdo"
					/>
				)}

				{errors.texto && (
					<p className="text-red-500 text-sm mt-1">{errors.texto.message}</p>
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
