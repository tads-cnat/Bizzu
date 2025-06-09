import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import acessAuth from "../../../utils/acessAuth";
import BeeAlert from "../../../components/BeeAlert/BeeAlert";
import BeeInput from "../../../components/BeeInput/BeeInput";
import BeeButton from "../../../components/BeeButtons/BeeButtons";
import BeeSteps from "../../../components/BeeSteps/BeeSteps";
import BeeCard from "../../../components/BeeCard/BeeCard";
import ComunidadeService from "../../../services/models/ComunidadeService";
import {IBeeComunidade} from "../../../interfaces/IBeeComunidade";

const schema = yup.object().shape({
	nome: yup.string().required("O nome é obrigatório"),
	username: yup.string().required("O usuário é obrigatório"),
	password: yup.string().required("A senha é obrigatória"),
	passwordConfirmation: yup
		.string()
		.test("passwords-match", "Confime sua senha", function (value) {
			return this.parent.password === value;
		}),
	descricao: yup.string().optional(),
	formacao: yup.string().optional(),
	instituicao: yup.string().optional(),
});

const FormSig: React.FC = () => {
	const [status, setStatus] = useState<string>("error");
	const [alert, setAlert] = useState<boolean>(false);
	const {autenticar} = acessAuth();
	const [current, setCurrent] = useState<number>(0);
	const [comunidade, setComunidade] = useState<IBeeComunidade[]>();

	const {
		handleSubmit,
		register,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	async function loadComunidades() {
		try {
			const response = await ComunidadeService.listAll();
			setComunidade(response.data);
		} catch {
			console.error("Não foi possível carregar as comunidades");
		}
	}

	const redirecionar = useNavigate();

	const addUser = () => {
		if (current == 0) setCurrent(1);
		else if (current == 1) setCurrent(2);
		else saveUser;
	};
	async function saveUser(data: {
		username: string;
		password: string;
	}): Promise<void> {
		try {
			await autenticar(data.username, data.password);
			setStatus("success");
			setAlert(true);
			redirecionar(`bizzu/${data.username}/`);
		} catch (e) {
			setStatus("error");
			setAlert(true);
			console.error("Deu erro", e);
		}
	}

	return (
		<>
			<BeeSteps current={current} />

			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[400px]">
				{alert ? (
					status === "success" ? (
						<BeeAlert
							typeAlert="success"
							messageAlert="Cadastro realizado com sucesso"
						/>
					) : (
						<BeeAlert
							typeAlert="error"
							messageAlert="Não foi possível fazer o cadastro"
						/>
					)
				) : (
					<p></p>
				)}
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Vamos nós conectar?
					</h2>
				</div>

				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={handleSubmit(addUser)}
						className="space-y-6"
					>
						{current == 0 && (
							<div>
								<div>
									<div>
										<BeeInput
											placeholder="Digite seu nome"
											label="nome"
											type="text"
											register={{...register("nome")}}
										/>
										{errors.username && (
											<p className="text-red-500 text-sm mt-1">
												{errors.username.message}
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
									</div>
								</div>

								<div>
									<p className="text-right text-sm/6 text-gray-500">
										Já tem uma conta?{" "}
										<a
											href="#"
											className="font-semibold text-[#FCBD18] hover:text-indigo-500"
										>
											Faça Login
										</a>
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
										register={{...register("formacao")}}
									/>
									{errors.formacao && (
										<p className="text-red-500 text-sm mt-1">
											{errors.formacao.message}
										</p>
									)}
								</div>

								<div className="mt-2 mb-5">
									<BeeInput
										placeholder="Onde você estuda atualmente..."
										label="Instituição Atual"
										type="text"
										register={{...register("instituicao")}}
									/>
									{errors.instituicao && (
										<p className="text-red-500 text-sm mt-1">
											{errors.instituicao.message}
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
							<div>
								{comunidade?.map((com) => (
									<BeeCard
										title={com.nome}
										description={com.descricao}
									/>
								))}

								<BeeButton
									variante="aviso"
									label="Criar conta"
									tamanho="grande"
								/>
							</div>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default FormSig;
