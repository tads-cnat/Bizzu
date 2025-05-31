import {useEffect, useState} from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {BeeButton} from "../../../components/BeeButtons/BeeButtons";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import {PaperPlaneRight, Hexagon} from "@phosphor-icons/react";
import PostagemService from "../../../services/models/PostagemService";
import {IFormPostagem} from "./IFormPostagem";
import BeeArquivo from "../../../components/BeeArquivo/BeeArquivo";
import BeeSelect from "../../../components/BeeSelect/BeeSelect";
import ComunidadeService from "../../../services/models/ComunidadeService";
import axios, {AxiosError} from "axios";
import axiosInstance from "../../../services/common/axiosInstance";

const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(axiosInstance.defaults.baseURL + 'health/', {
      method: 'GET',
      mode: 'cors',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Definição da interface para comunidade
interface Comunidade {
	label: string;
	value: string | number;
}

// Interface para os valores do formulário
interface FormValues {
	texto: string;
	imagem?: File | null;
	comunidade?: Comunidade | undefined;
}

// Schema de validação com Yup
const schema = yup.object().shape({
	texto: yup
		.string()
		.required("Conteúdo é obrigatório")
		.min(1, "Conteúdo não pode estar vazio"),
	imagem: yup.mixed().nullable().optional(),
	comunidade: yup
		.object()
		.shape({
			label: yup.string().optional(),
			value: yup.mixed().optional(),
		})
		.nullable()
		.optional(),
});

export const FormPostagem = ({
	idPostagem,
	tipoForm,
	onSubmitCallback,
}: IFormPostagem & {onSubmitCallback?: () => void}) => {
	const [loading, setLoading] = useState(false);
	const [comunidades, setComunidades] = useState<Comunidade[]>([]);
	const [loadingData, setLoadingData] = useState(false);

	const {
		control,
		handleSubmit,
		formState: {errors},
		reset,
		setValue,
	} = useForm<FormValues>({
		resolver: yupResolver(schema) as any,
		defaultValues: {
			texto: "",
			imagem: null,
			comunidade: undefined,
		},
	});

	// Carregar comunidades
	useEffect(() => {
		const loadComunidades = async () => {
			// Verificar se o backend está disponível
			const isBackendAvailable = await checkBackendConnection();

			if (!isBackendAvailable) {
				console.warn("Backend não está disponível. Usando dados mock.");
				// Dados mock para desenvolvimento
				setComunidades([
					{label: "Comunidade Teste 1", value: 1},
					{label: "Comunidade Teste 2", value: 2},
				]);
				return;
			}

			try {
				const response = await ComunidadeService.listAll();
				const comunidadesFormatadas = response.data.map((comunidade: any) => ({
					label: comunidade.nome || comunidade.title,
					value: comunidade.id,
				}));
				setComunidades(comunidadesFormatadas);
			} catch (error) {
				console.error("Erro ao carregar comunidades:", error);
				// Fallback para dados mock
				setComunidades([{label: "Comunidade Padrão", value: 1}]);
			}
		};

		loadComunidades();
	}, []);

	// Carregar dados para edição
	useEffect(() => {
		const loadPostagem = async () => {
			if (tipoForm === "editar" && idPostagem) {
				setLoadingData(true);
				try {
					const response = await PostagemService.get(idPostagem);
					const postagem = response.data;

					setValue("texto", postagem.texto || "");

					// Se houver comunidade associada
					if (postagem.comunidade) {
						setValue("comunidade", {
							label: postagem.comunidade.nome || postagem.comunidade.title,
							value: postagem.comunidade.id,
						});
					}
				} catch (error) {
					console.error("Erro ao carregar postagem:", error);
					alert("Erro ao carregar dados da postagem");
				} finally {
					setLoadingData(false);
				}
			}
		};

		loadPostagem();
	}, [idPostagem, tipoForm, setValue]);

	// Submit
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		setLoading(true);

		try {
			const formData = new FormData();
			formData.append("texto", data.texto);

			if (data.imagem) {
				formData.append("imagem", data.imagem);
			}

			if (data.comunidade?.value) {
				formData.append("comunidade", String(data.comunidade.value));
			}

			// Debug - verificar o que está sendo enviado
			console.log("Dados do formulário:", {
				texto: data.texto,
				imagem: data.imagem,
				comunidade: data.comunidade,
			});

			if (tipoForm === "editar" && idPostagem) {
				await PostagemService.put(idPostagem, formData);
				alert("Postagem atualizada com sucesso!");
			} else {
				await PostagemService.post(formData);
				alert("Postagem criada com sucesso!");
			}

			reset();
			onSubmitCallback?.();
		} catch (error) {
			console.error("Erro ao salvar postagem:", error);

			// Melhor tratamento de erro com tipagem
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				console.error("Dados do erro:", axiosError.response?.data);
				alert(
					`Erro ao salvar postagem: ${JSON.stringify(axiosError.response?.data || "Erro desconhecido")}`,
				);
			} else {
				alert("Erro ao salvar postagem. Verifique sua conexão.");
			}
		} finally {
			setLoading(false);
		}
	};

	if (loadingData) {
		return <div className="text-center py-4">Carregando dados...</div>;
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4"
		>
			{/* Select de Comunidade */}
			{comunidades.length > 0 && (
				<div>
					<label className="block text-sm font-medium text-gray-900 mb-2">
						Comunidade
					</label>
					<Controller
						name="comunidade"
						control={control}
						render={({field}) => (
							<BeeSelect
								options={comunidades}
								placeholder="Selecione uma comunidade"
								icone={Hexagon}
								value={field.value}
								onChange={field.onChange}
								error={errors.comunidade?.message}
							/>
						)}
					/>
				</div>
			)}

			{/* Área de Texto */}
			<div>
				<Controller
					name="texto"
					control={control}
					render={({field}) => (
						<BeeTextArea
							id="texto"
							label="Conteúdo"
							placeholder="Digite seu conteúdo..."
							defaultValue={field.value}
							onChange={(e) => field.onChange(e.target.value)}
						/>
					)}
				/>
				{errors.texto && (
					<p className="text-red-500 text-sm mt-1">{errors.texto.message}</p>
				)}
			</div>

			{/* Upload de Arquivo */}
			<div>
				<Controller
					name="imagem"
					control={control}
					render={({field}) => (
						<BeeArquivo
							value={field.value}
							onChange={field.onChange}
							error={errors.imagem?.message}
						/>
					)}
				/>
			</div>

			{/* Botão de Submit */}
			<BeeButton
				label={tipoForm === "editar" ? "Atualizar" : "Publicar"}
				variante="primaria"
				icone={<PaperPlaneRight size={18} />}
				desabilitado={loading}
			/>

			{loading && (
				<p className="text-center text-gray-600">
					{tipoForm === "editar" ? "Atualizando..." : "Publicando..."}
				</p>
			)}
		</form>
	);
};

export default FormPostagem;
