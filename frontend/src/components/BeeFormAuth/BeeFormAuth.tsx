import acessAuth from "../../utils/acessAuth";
import BeeButton from "../BeeButtons/BeeButtons";
import BeeInput from "../BeeInput/BeeInput";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import BeeAlert from "../BeeAlert/BeeAlert";
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

const schema = yup.object().shape({
	username: yup.string().required("O usuário é obrigatório"),
	password: yup.string().required("A senha é obrigatória"),
});

const BeeFormAuth: React.FC = () => {
	const [status, setStatus] = useState<string>("error");
	const [alert, setAlert] = useState<boolean>(false);
	const {autenticar} = acessAuth();

	const {
		handleSubmit,
		register,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	const redirecionar = useNavigate();
	const deOndeVeio = useLocation();

	async function saveUser(data: {
		username: string;
		password: string;
	}): Promise<void> {
		try {
			await autenticar(data.username, data.password);
			setStatus("success");
			setAlert(true);
			setTimeout(() => {
				setAlert(false);
			}, 4000);
			if (deOndeVeio.state?.fromCadastro) {
				localStorage.setItem("hasSeenTour", "false");
				redirecionar(`/${data.username}/`, {
					state: {
						showTour: true,
					},
				});
			} else {
				localStorage.setItem("hasSeenTour", "true");
				redirecionar(`/${data.username}/`);
			}
		} catch (e) {
			setStatus("error");
			setAlert(true);
			setTimeout(() => {
				setAlert(false);
			}, 4000);
			console.error("Deu erro", e);
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[400px]">
				{alert ? (
					status === "success" ? (
						<BeeAlert
							typeAlert="success"
							messageAlert="Login realizado com sucesso"
						/>
					) : (
						<BeeAlert
							typeAlert="error"
							messageAlert="Não foi possível fazer o login"
						/>
					)
				) : (
					<p></p>
				)}
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Bem-Vindo de volta
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={handleSubmit(saveUser)}
						className="space-y-6"
					>
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
							<p className="text-right text-sm/6 text-gray-500">
								Não tem conta?{" "}
								<Link
									to={`/cadastro/`}
									className="font-semibold text-[#FCBD18] hover:text-indigo-500"
								>
									Cadastre-se
								</Link>
							</p>
						</div>
						<BeeButton
							variante="aviso"
							label="Entrar"
							classesDefault={false}
							className="px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 bg-[#FCBD18] text-white hover:bg-yellow-500 sm:w-full sm:max-w-sm mt-5"
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default BeeFormAuth;
