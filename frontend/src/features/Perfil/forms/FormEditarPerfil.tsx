import React, {useState, useEffect, ChangeEvent} from "react";
import {IFormEditarPerfil} from "./IFormEditarPerfil";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import getLocalStorage from "../../../utils/getLocalStorage";
import BeeButton from "../../../components/BeeButtons/BeeButtons";
import BeeInputPerfil from "../../../components/BeeInputPerfil/IBeeInputPerfil";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import BeeArquivo from "../../../components/BeeArquivo/BeeArquivo";
import BeeAlert from "../../../components/BeeAlert/BeeAlert";

const FormEditarPerfil: React.FC = () => {
	const [alert, setAlert] = useState<boolean>(false);
	const [status, setStatus] = useState<string>("error");
	const [mensagem, setMensagem] = useState("");
	const [userId, setUserId] = useState<number | null>(null);
	const usuarioLocal = getLocalStorage();
	const navigate = useNavigate();

	const {control, handleSubmit, setValue} = useForm<IFormEditarPerfil>({
		defaultValues: {
			nome: "",
			descricao: "",
			linkedinUrl: "",
			escolaFormacao: "",
			instituicaoAtual: "",
		},
	});

	useEffect(() => {
		const carregarInfoUsuario = async () => {
			if (!usuarioLocal.username || !usuarioLocal.token) return;

			try {
				const response = await axios.get(
					`http://localhost:8000/api/usuario/userByusername/${usuarioLocal.username}/`,
				);
				const data = response.data;
				setUserId(data.id);

				setValue("nome", data.nome || "");
				setValue("descricao", data.descricao || "");
				setValue("linkedinUrl", data.linkedinUrl || "");
				setValue("escolaFormacao", data.escolaFormacao || "");
				setValue("instituicaoAtual", data.instituicaoAtual || "");
			} catch (error) {
				console.error("Erro ao buscar dados do usuário:", error);
			}
		};

		carregarInfoUsuario();
	}, [setValue, usuarioLocal]);

	const onSubmit = async (data: IFormEditarPerfil) => {
		if (!userId) {
			setMensagem("ID do usuário não carregado.");
			setStatus("error");
			setAlert(true);
			return;
		}

		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			if (key !== "imagem") {
				if (typeof value === "string" && value.trim() !== "") {
					formData.append(key, value);
				}
			}
		});

		if (data.imagem && data.imagem instanceof File) {
			formData.append("imagemPerfil", data.imagem);
		}

		try {
			await axios.patch(
				`http://localhost:8000/api/usuario/${userId}/`,
				formData,
			);

			setMensagem("Perfil atualizado com sucesso!");
			setStatus("success");
			setAlert(true);

			navigate(`/bizzu/${usuarioLocal.username}`);
			window.location.reload();
		} catch (error: any) {
			console.error(error.response?.data || error.message);
			setMensagem("Erro ao atualizar perfil.");
			setStatus("error");
			setAlert(true);
		}
	};

	return (
		<>
			<h1 className="text-2xl font-bold mb-4">Editar perfil</h1>

			<form
				className="bg-white p-6 rounded-lg shadow-md"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="space-y-12">
					<div>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-4">
								<div className="sm:col-span-3">
									<div className="mt-2">
										<Controller
											name="nome"
											control={control}
											render={({field}) => (
												<BeeInputPerfil
													{...field}
													label="Nome"
													type="text"
													placeholder="João"
												/>
											)}
										/>
									</div>
								</div>
								<div className="mt-2">
									<Controller
										name="linkedinUrl"
										control={control}
										render={({field}) => (
											<BeeInputPerfil
												{...field}
												label="LinkedIn"
												type="text"
												placeholder="https://br.linkedin.com/"
											/>
										)}
									/>
								</div>
							</div>

							<div className="col-span-full">
								<div className="mt-2">
									<Controller
										name="descricao"
										control={control}
										render={({field}) => (
											<BeeTextArea
												{...field}
												id="descricao"
												rows={3}
											/>
										)}
									/>
								</div>
							</div>

							<div className="col-span-full">
								<Controller
									name="imagem"
									control={control}
									render={({field}) => (
										<BeeArquivo
											value={field.value}
											onChange={field.onChange}
											multiple={false}
										/>
									)}
								/>
							</div>

							<div className="sm:col-span-3">
								<div className="mt-2">
									<Controller
										name="escolaFormacao"
										control={control}
										render={({field}) => (
											<BeeInputPerfil
												{...field}
												label="Escola/Formação"
												type="text"
												placeholder="Formado no IFRN"
											/>
										)}
									/>
								</div>
							</div>
							<div className="sm:col-span-4">
								<div className="mt-2">
									<Controller
										name="instituicaoAtual"
										control={control}
										render={({field}) => (
											<BeeInputPerfil
												{...field}
												label="Instituicao Atual"
												type="text"
												placeholder="IFRN"
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<BeeButton
							label="cancelar"
							variante="negativo"
							onClick={() => navigate(`/bizzu/${usuarioLocal.username}`)}
						/>
						<BeeButton
							variante="primaria"
							label="Salvar"
						/>
						{alert &&
							(status === "success" ? (
								<BeeAlert
									typeAlert="success"
									messageAlert={mensagem}
								/>
							) : (
								<BeeAlert
									typeAlert="error"
									messageAlert={mensagem}
								/>
							))}
					</div>
				</div>
			</form>
		</>
	);
};

export default FormEditarPerfil;
