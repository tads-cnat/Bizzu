import {useEffect, useState, useCallback} from "react";
import {useForm, Controller, type SubmitHandler} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {BeeButton} from "../../../components/BeeButtons/BeeButtons";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import {PaperPlaneRight, Hexagon} from "@phosphor-icons/react";
import PostagemService from "../../../services/models/PostagemService";
import type {IFormPostagem} from "./IFormPostagem";
import BeeArquivo from "../../../components/BeeArquivo/BeeArquivo";
import BeeSelect from "../../../components/BeeSelect/BeeSelect";
import BeeFiltroCategorias from "../../../components/BeeFiltroCategorias/BeeFiltroCategorias";
import ComunidadeService from "../../../services/models/ComunidadeService";
import CategoriaService from "../../../services/models/CategoriaService";
import type {Categoria} from "../../../interfaces/Categoria";
import type {ComunidadeSelect} from "../../../interfaces/Comunidade";
import type {PostagemFormValues} from "../../../interfaces/Postagem";
import {useNavigate} from "react-router-dom";
import acessAuth from "../../../utils/acessAuth";
import UsuarioService from "../../../services/models/UsuarioService";
import {IBeeUser} from "../../../components/BeeHeaderProfile/IBeeUser";
import {BeePostProps} from "../../../components/BeePost/IBeePost";

// Schema de validação com Yup
const schema = yup.object().shape({
	texto: yup
		.string()
		.required("Conteúdo é obrigatório")
		.min(1, "Conteúdo não pode estar vazio")
		.max(200, "Conteúdo não pode ter mais de 200 caracteres"),
	imagem: yup.mixed().nullable().optional(),
	comunidade: yup
		.object()
		.shape({
			label: yup.string().optional(),
			value: yup.mixed().optional(),
		})
		.nullable()
		.optional(),
	categorias: yup
		.array()
		.of(yup.number())
		.min(1, "Selecione pelo menos uma categoria"),
});

export const FormPostagem = ({
	idPostagem,
	tipoForm,
	idUser,
}: IFormPostagem & {onSubmitCallback?: () => void}) => {
	const [loading, setLoading] = useState(false);
	const [comunidades, setComunidades] = useState<ComunidadeSelect[]>([]);
	const [categorias, setCategorias] = useState<Categoria[]>([]);
	const [loadingData, setLoadingData] = useState(false);
	const [termoPesquisa, setTermoPesquisa] = useState("");

	const {
		control,
		handleSubmit,
		formState: {errors},
		setValue,
		watch,
		getValues,
	} = useForm<PostagemFormValues>({
		resolver: yupResolver(schema) as any,
		defaultValues: {
			texto: "",
			imagem: null,
			comunidade: undefined,
			categorias: [],
		},
	});
	const [postagens, setPostagens] = useState<BeePostProps>();
	const [usuario, setUsuario] = useState<IBeeUser>();
	const {username} = acessAuth();
	useEffect(() => {
		if (usuario === undefined) {
			void UsuarioService.getbyUsername(username)
				.then((response) => {
					setUsuario(response);
				})
				.catch(() => {
					console.log("Não recebeu dados");
				});
		}
	}, []);

	const categoriasSelecionadas = watch("categorias");

	useEffect(() => {
		const loadComunidades = async () => {
			try {
				const response = await ComunidadeService.listAll();
				if (response.data && Array.isArray(response.data)) {
					const comunidadesFormatadas = response.data.map(
						(comunidade: any) => ({
							label: comunidade.nome || comunidade.title,
							value: comunidade.id,
						}),
					);
					setComunidades(comunidadesFormatadas);
				} else {
					setComunidades([]);
				}
			} catch {
				setComunidades([]);
			}
		};

		loadComunidades();
	}, []);

	useEffect(() => {
		const loadCategorias = async () => {
			setLoading(true);
			try {
				const response = await CategoriaService.listAll();
				if (response.data && Array.isArray(response.data)) {
					setCategorias(response.data);
				} else {
					setCategorias([]);
				}
			} catch {
				setCategorias([]);
			} finally {
				setLoading(false);
			}
		};

		loadCategorias();
	}, []);

	useEffect(() => {
		const loadPostagem = async () => {
			if (tipoForm === "editar" && idPostagem && comunidades.length > 0) {
				setLoadingData(true);
				try {
					const response = await PostagemService.get(idPostagem);
					const postagem = response.data;
					setPostagens(postagem);

					setValue("texto", postagem.texto || "");

					if (postagem.imagem) {
						setValue("imagem", postagem.imagem);
					}

					if (postagem.comunidade) {
						const comunidadeEncontrada = comunidades.find(
							(c) => c.value === postagem.comunidade,
						);
						if (comunidadeEncontrada) {
							setValue("comunidade", comunidadeEncontrada);
						}
					}

					if (postagem.categorias && postagem.categorias.length > 0) {
						setValue("categorias", postagem.categorias);
					}
					if (postagem.usuario) {
						setValue("usuario", postagem.usuario);
					}
				} catch {
					alert("Erro ao carregar dados da postagem");
				} finally {
					setLoadingData(false);
				}
			}
		};

		loadPostagem();
	}, [idPostagem, tipoForm, setValue, comunidades]);

	const categoriasFiltradas = categorias.filter((categoria) =>
		categoria.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
	);

	const aoSelecionarCategoria = useCallback(
		(categoriaId: number) => {
			const categoriasAtuais = getValues("categorias") || [];
			let novasCategorias;

			if (categoriasAtuais.includes(categoriaId)) {
				novasCategorias = categoriasAtuais.filter((id) => id !== categoriaId);
			} else {
				novasCategorias = [...categoriasAtuais, categoriaId];
			}

			setValue("categorias", novasCategorias, {shouldValidate: true});
		},
		[getValues, setValue],
	);

	const handleComunidadeChange = useCallback(
		(value: ComunidadeSelect) => {
			const currentValue = getValues("comunidade");
			if (currentValue?.value !== value.value) {
				setValue("comunidade", value.value ? value : undefined, {
					shouldValidate: true,
				});
			}
		},
		[setValue, getValues],
	);

	const handlePesquisarCategorias = useCallback((termo: string) => {
		setTermoPesquisa(termo);
	}, []);

	const caminho = useNavigate();
	const onSubmit: SubmitHandler<PostagemFormValues> = async (data) => {
		if (tipoForm == "criar") {
			const dataSubmit = new FormData();
			dataSubmit.append("usuario", String(usuario?.id));
			dataSubmit.append("texto", data.texto);
			if (data.imagem !== null && data.imagem !== undefined)
				dataSubmit.append("imagem", data.imagem);
			for (let i = 0; i < data.categorias.length; i++) {
				dataSubmit.append("categorias", String(data.categorias[i]));
			}
			dataSubmit.append("comunidade", String(data.comunidade?.value));
			try {
				await PostagemService.post(dataSubmit);
				caminho(-1);
			} catch (e) {
				console.error("Deu mal", e);
			}
		} else {
			const dataSubmit = new FormData();
			dataSubmit.append("texto", getValues("texto"));
			if (
				getValues("imagem") !== null &&
				getValues("imagem") &&
				postagens?.imagem != getValues("imagem")
			) {
				dataSubmit.append("imagem", getValues("imagem"));
			}
			for (let i = 0; i < getValues("categorias").length; i++) {
				dataSubmit.append("categorias", String(getValues("categorias")[i]));
			}
			console.log(getValues("categorias"));
			dataSubmit.append("comunidade", String(getValues("comunidade")?.value));

			try {
				await PostagemService.patch(idPostagem, dataSubmit);
				caminho(-1);
			} catch (e) {
				console.error("Deu mal editar", e);
			}
		}
	};

	if (loadingData) {
		return <div className="text-center py-4">Carregando dados...</div>;
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				{/* Área de Texto */}
				<div>
					<Controller
						name="texto"
						control={control}
						render={({field}) => (
							<BeeTextArea
								id="texto"
								label="Conteúdo da Postagem"
								placeholder="Digite o conteúdo da sua postagem..."
								defaultValue={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								rows={4}
							/>
						)}
					/>
					{errors.texto && (
						<p className="text-red-500 text-sm mt-1">{errors.texto.message}</p>
					)}
					<p className="text-gray-500 text-xs mt-1">
						{watch("texto")?.length || 0}/200 caracteres
					</p>
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
								multiple={false}
							/>
						)}
					/>
				</div>

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
									onChange={handleComunidadeChange}
									error={errors.comunidade?.message}
								/>
							)}
						/>
					</div>
				)}

				{/* Seleção de Categorias */}
				{categorias.length > 0 && (
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Categorias *
						</label>
						<BeeFiltroCategorias
							categorias={categoriasFiltradas}
							categoriasSelecionadas={categoriasSelecionadas || []}
							aoSelecionarCategoria={aoSelecionarCategoria}
							aoPesquisar={handlePesquisarCategorias}
						/>
						{errors.categorias && (
							<p className="text-red-500 text-sm mt-1">
								{errors.categorias.message}
							</p>
						)}
						{categoriasSelecionadas && categoriasSelecionadas.length > 0 && (
							<div className="mt-2">
								<p className="text-sm text-gray-600">
									Categorias selecionadas: {categoriasSelecionadas.length}
								</p>
								<div className="flex flex-wrap gap-1 mt-1">
									{categoriasSelecionadas.map((catId) => {
										const categoria = categorias.find(
											(cat) => cat.id === catId,
										);
										return categoria ? (
											<span
												key={catId}
												className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#FCBD18] text-gray-900"
											>
												{categoria.nome}
											</span>
										) : null;
									})}
								</div>
							</div>
						)}
					</div>
				)}

				{/* Botão de Submit */}
				<BeeButton
					label={
						tipoForm === "editar" ? "Atualizar Postagem" : "Publicar Postagem"
					}
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
		</div>
	);
};

export default FormPostagem;
