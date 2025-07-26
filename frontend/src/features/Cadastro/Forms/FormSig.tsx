import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import BeeInput from "../../../components/BeeInput/BeeInput";
import BeeButton from "../../../components/BeeButtons/BeeButtons";
import BeeSteps from "../componentes/BeeSteps/BeeSteps";
import BeeArquivo from "../../../components/BeeArquivo/BeeArquivo";
import UsuarioService from "../../../services/models/UsuarioService";
import {Link, useNavigate} from "react-router-dom";
const schema = yup.object().shape({
	nome: yup.string().required("O nome é obrigatório"),
	username: yup
		.string()
		.required("O usuário é obrigatório")
		.test(
			"username-disponivel",
			"Um usuário com esse username já existe",
			async function (value) {
				try {
					const response = await UsuarioService.usernameExists(value);

					return response.data == "Um usuário com esse username não existe";
				} catch (err) {
					console.error("Erro ao verificar username:", err);
					return true;
				}
			},
		),
	password: yup
		.string()
		.required("A senha é obrigatória")
		.min(8, "O campo precisa ter pelo menos 8 caracteres."),
	passwordConfirmation: yup
		.string()
		.required("Esse campo é obrigatório")
		.test("passwords-match", "As senhas não correspondem", function (value) {
			return this.parent.password === value;
		}),
	descricao: yup.string().optional(),
	escolaFormacao: yup.string().optional(),
	instituicaoAtual: yup.string().optional(),
	imagemPerfil: yup.mixed().optional(),
	banner: yup.mixed().optional(),
});

const FormSig: React.FC = () => {
	const [current, setCurrent] = useState<number>(0);

	const {
		handleSubmit,
		register,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	const redirecionar = useNavigate();

	async function saveUser(data: {
		username: string;
		password: string;
		nome: string;
		descricao: string;
		imagemPerfil: File;
		escolaFormacao: string;
		instituicaoAtual: string;
		banner: File;
	}): Promise<void> {
		if (current == 0) setCurrent(1);
		else if (current == 1) setCurrent(2);
		else {
			try {
				const dataSubmit = new FormData();
				dataSubmit.append("password", data.password);
				dataSubmit.append("username", data.username);
				dataSubmit.append("nome", data.nome);
				if (data.descricao !== null)
					dataSubmit.append("descricao", data.descricao);
				if (data.imagemPerfil !== null && data.imagemPerfil !== undefined)
					dataSubmit.append("imagemPerfil", data.imagemPerfil);
				if (data.banner !== null && data.banner !== undefined)
					dataSubmit.append("banner", data.banner);
				if (data.escolaFormacao !== null)
					dataSubmit.append("escolaFormacao", data.escolaFormacao);
				if (data.instituicaoAtual !== null)
					dataSubmit.append("instituicaoAtual", data.instituicaoAtual);
				dataSubmit.append("papel", "int");
				await UsuarioService.post(dataSubmit);
				redirecionar(-1);
			} catch (e) {
				console.error("Deu erro", e);
			}
		}
	}

	return (
		<>
			<BeeSteps current={current} />
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Vamos nós conectar?
				</h2>
			</div>

			<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					onSubmit={handleSubmit(saveUser)}
					className="space-y-6"
				>
					{current == 0 && (
						<div>
							<div>
								<div>
									<BeeInput
										placeholder="Digite seu nome"
										label="Nome"
										type="text"
										register={{...register("nome")}}
									/>
									{errors.nome && (
										<p className="text-red-500 text-sm mt-1">
											{errors.nome.message}
										</p>
									)}
								</div>
							</div>

							<div>
								<div>
									<BeeInput
										placeholder="Digite seu usuário"
										label="Usuário"
										type="text"
										register={{...register("username")}}
									/>
									{errors.username && (
										<p className="text-red-500 text-sm mt-1">
											{errors.username.message}
										</p>
									)}
								</div>
							</div>

							<div>
								<div className="mt-2">
									<BeeInput
										placeholder="Digite sua senha"
										label="Senha"
										type="password"
										register={{...register("password")}}
									/>
									{errors.password && (
										<p className="text-red-500 text-sm mt-1">
											{errors.password.message}
										</p>
									)}
								</div>
							</div>

							<div>
								<div className="mt-2">
									<BeeInput
										placeholder="Digite sua senha novamente"
										label="Confime sua senha"
										type="password"
										register={{...register("passwordConfirmation")}}
									/>
									{errors.passwordConfirmation && (
										<p className="text-red-500 text-sm mt-1">
											{errors.passwordConfirmation.message}
										</p>
									)}
								</div>
							</div>

							<div className="mt-2">
								<p className="text-right text-sm/6 text-gray-500">
									Já tem uma conta?{" "}
									<Link
										to={`/login/`}
										className="font-semibold text-[#FCBD18] hover:text-indigo-500"
									>
										Faça Login
									</Link>
								</p>
							</div>
							<BeeButton
								variante="aviso"
								label="Próximo Passo"
								tamanho="grande"
							/>
						</div>
					)}

					{current == 1 && (
						<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
							<div className="mt-2">
								<BeeInput
									placeholder="Fale um pouco mais sobre você..."
									label="Descrição"
									type="text"
									register={{...register("descricao")}}
								/>
								{errors.descricao && (
									<p className="text-red-500 text-sm mt-1">
										{errors.descricao.message}
									</p>
								)}
							</div>

							<div className="mt-2">
								<BeeInput
									placeholder="Antiga formação..."
									label="Escola de formação"
									type="text"
									register={{...register("escolaFormacao")}}
								/>
								{errors.escolaFormacao && (
									<p className="text-red-500 text-sm mt-1">
										{errors.escolaFormacao.message}
									</p>
								)}
							</div>

							<div className="mt-2 mb-5">
								<BeeInput
									placeholder="Onde você estuda atualmente..."
									label="Instituição Atual"
									type="text"
									register={{...register("instituicaoAtual")}}
								/>
								{errors.instituicaoAtual && (
									<p className="text-red-500 text-sm mt-1">
										{errors.instituicaoAtual.message}
									</p>
								)}
							</div>
							<BeeButton
								variante="aviso"
								label="Próximo Passo"
								tamanho="grande"
							/>
						</div>
					)}
					{current == 2 && (
						<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
							<div className="mt-2">
								<Controller
									name="imagemPerfil"
									control={control}
									render={({field}) => (
										<BeeArquivo
											multiple={false}
											value={field.value}
											onChange={(val) => field.onChange(val)}
										/>
									)}
								/>
							</div>
							<div className="mt-2">
								<Controller
									name="banner"
									control={control}
									render={({field}) => (
										<BeeArquivo
											multiple={false}
											value={field.value}
											onChange={(val) => field.onChange(val)}
										/>
									)}
								/>
							</div>
							<BeeButton
								variante="aviso"
								label="Cadastrar"
								tamanho="grande"
							/>
						</div>
					)}
				</form>
			</div>
		</>
	);
};

export default FormSig;
