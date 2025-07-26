import React, {useState, useEffect} from "react";
import {IFormEditarPerfil} from "./IFormEditarPerfil";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import getLocalStorage from "../../../utils/getLocalStorage";
import BeeButton from "../../../components/BeeButtons/BeeButtons";
import {BeeTextArea} from "../../../components/BeeTextArea/BeeTextArea";
import BeeArquivo from "../../../components/BeeArquivo/BeeArquivo";
import BeeAlert from "../../../components/BeeAlert/BeeAlert";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import BeeInput from "../../../components/BeeInput/BeeInput";
import UsuarioService from "../../../services/models/UsuarioService";

const schema = yup.object().shape({
	nome: yup.string().optional(),
	descricao: yup.string().optional(),
	escolaFormacao: yup.string().optional(),
	instituicaoAtual: yup.string().optional(),
	imagemPerfil: yup.mixed().optional(),
});

const FormEditarPerfil: React.FC = () => {
	const [alert, setAlert] = useState<boolean>(false);
	const [status, setStatus] = useState<string>("error");
	const [usuario, setUsuario] = useState();
	const usuarioLocal = getLocalStorage();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	useEffect(() => {
		const carregarInfoUsuario = async () => {
			if (!usuarioLocal.username || !usuarioLocal.token) return;

			try {
				const response = await UsuarioService.getbyUsername(
					usuarioLocal.username,
				);
				setUsuario(response);
			} catch (error) {
				console.error("Erro ao buscar dados do usuário:", error);
			}
		};

		carregarInfoUsuario();
	}, [setUsuario]);

	const caminho = useNavigate();
	const onSubmit = async (data: IFormEditarPerfil) => {
		try {
			const dataSubmit = new FormData();
			if (data.nome !== "") dataSubmit.append("nome", data.nome);
			else dataSubmit.append("nome", usuario.nome);
			if (data.descricao !== "" && data.descricao !== undefined)
				dataSubmit.append("descricao", data.descricao);
			else dataSubmit.append("descricao", usuario.descricao);
			if (data.imagemPerfil !== "" && data.imagemPerfil !== undefined)
				dataSubmit.append("imagemPerfil", data.imagemPerfil);
			if (data.escolaFormacao !== "")
				dataSubmit.append("escolaFormacao", data.escolaFormacao);
			if (data.instituicaoAtual !== "")
				dataSubmit.append("instituicaoAtual", data.instituicaoAtual);
			else dataSubmit.append("instituicaoAtual", usuario.instituicaoAtual);
			await UsuarioService.patch(usuario.id, dataSubmit);
			// caminho(`/${usuarioLocal.username}`);
			window.location.href = `/${usuarioLocal.username}`;
		} catch (e) {
			console.error("Não foi possivel salvar o usuário", e);
		}
	};

	return (
		<>
			<form
				className="bg-white p-6 rounded-lg shadow-md"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-2xl font-bold ">Editar perfil</h1>
				<div className="space-y-12">
					<div>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
							<div className="col-span-full">
								<BeeInput
									placeholder="Digite seu nome"
									label="Nome"
									type="text"
									defaultValue={
										usuario !== undefined
											? usuario.nome
												? usuario.nome
												: ""
											: ""
									}
									register={{...register("nome")}}
								/>
								{errors.nome && (
									<p className="text-red-500 text-sm mt-1">
										{errors.nome.message}
									</p>
								)}
							</div>

							<div className="col-span-full">
								<Controller
									name="descricao"
									control={control}
									render={({field}) => (
										<BeeTextArea
											{...field}
											id="descricao"
											defaultValue={
												usuario !== undefined
													? usuario.descricao
														? usuario.descricao
														: ""
													: ""
											}
											rows={3}
										/>
									)}
								/>
								{errors.descricao && (
									<p className="text-red-500 text-sm mt-1">
										{errors.descricao.message}
									</p>
								)}
							</div>
							<div className="col-span-full">
								<div>
									<BeeInput
										placeholder="Digite a escola de formação"
										label="Escola de formação"
										type="text"
										defaultValue={
											usuario !== undefined
												? usuario.escolaFormacao != undefined &&
													usuario.escolaFormacao != "undefined"
													? usuario.escolaFormacao
													: ""
												: ""
										}
										register={{...register("escolaFormacao")}}
									/>
									{errors.escolaFormacao && (
										<p className="text-red-500 text-sm mt-1">
											{errors.escolaFormacao.message}
										</p>
									)}
								</div>
							</div>
							<div className="col-span-full">
								<BeeInput
									placeholder="Digite a instituição atual"
									label="Instituição atual"
									defaultValue={
										usuario !== undefined
											? usuario.instituicaoAtual != undefined &&
												usuario.instituicaoAtual != "undefined"
												? usuario.instituicaoAtual
												: ""
											: ""
									}
									type="text"
									register={{...register("instituicaoAtual")}}
								/>

								{errors.instituicaoAtual && (
									<p className="text-red-500 text-sm mt-1">
										{errors.instituicaoAtual.message}
									</p>
								)}
							</div>
							<div className="col-span-full">
								<Controller
									name="imagemPerfil"
									control={control}
									render={({field}) => (
										<BeeArquivo
											value={
												usuario !== undefined
													? usuario.imagemPerfil
														? usuario.imagemPerfil
														: ""
													: ""
											}
											onChange={field.onChange}
											multiple={false}
										/>
									)}
								/>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<BeeButton
							label="cancelar"
							variante="negativo"
							onClick={() => navigate(`/${usuarioLocal.username}`)}
						/>
						<BeeButton
							variante="primaria"
							label="Salvar"
						/>
						{alert &&
							(status === "success" ? (
								<BeeAlert
									typeAlert="success"
									messageAlert={"Perfil alterado com sucesso"}
								/>
							) : (
								<BeeAlert
									typeAlert="error"
									messageAlert={"Não foi possível alterar o sue perfil"}
								/>
							))}
					</div>
				</div>
			</form>
		</>
	);
};

export default FormEditarPerfil;
