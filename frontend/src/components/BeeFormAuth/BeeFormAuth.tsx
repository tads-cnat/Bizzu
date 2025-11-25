import acessAuth from "../../utils/acessAuth";
import BeeButton from "../BeeButtons/BeeButtons";
import BeeInput from "../BeeInput/BeeInput";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import BeeAlert from "../BeeAlert/BeeAlert";
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {GoogleLogin} from "@react-oauth/google";

const schema = yup.object().shape({
	username: yup.string().required("O usuário é obrigatório"),
	password: yup.string().required("A senha é obrigatória"),
});

const BeeFormAuth: React.FC = () => {
	const [status, setStatus] = useState<string>("error");
	const [alert, setAlert] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("Não foi possível fazer o login");
	const {autenticar, atualizarUsuario} = acessAuth();

	const {
		handleSubmit,
		register,
		formState: {errors},
		control,
	} = useForm({resolver: yupResolver(schema)});
	const redirecionar = useNavigate();
	const deOndeVeio = useLocation();

	async function saveUser(data: {username: string; password: string}) {
		try {
			await autenticar(data.username, data.password);
			handleLoginSuccessUI(data.username, false);
		} catch (e) {
			handleLoginErrorUI(e);
		}
	}

	async function loginGoogle(token: string) {
		try {
			const res = await fetch("http://localhost:8000/auth/google/", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({token}),
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				
				// Tratamento específico para e-mail não educacional
				if (res.status === 403 && errorData.error === "Acesso restrito a e-mails educacionais") {
					throw new Error(
						errorData.message || 
						"O Bizzu é exclusivo para a comunidade acadêmica. Use um e-mail institucional."
					);
				}
				
				throw new Error("Falha ao autenticar com Google");
			}

			const data = await res.json();

			const userData = {
				token: data.access,
				username: data.user.username,
				id: data.user.id,
				papel: data.user.papel,
			};

			localStorage.setItem("usuario", JSON.stringify(userData));
			atualizarUsuario();

			const username = data.user?.username || "me";
			const isNew = data.is_new === true;

			handleLoginSuccessUI(username, isNew);
		} catch (err) {
			handleLoginErrorUI(err);
		}
	}

	function handleLoginSuccessUI(username: string, isNew: boolean) {
		setStatus("success");
		setAlert(true);
		setTimeout(() => setAlert(false), 4000);

		if (isNew) {
			localStorage.setItem("hasSeenTour", "false");
			redirecionar(`/${username}/`, {state: {showTour: true}});
			return;
		}

		if (deOndeVeio.state?.fromCadastro) {
			localStorage.setItem("hasSeenTour", "false");
			redirecionar(`/${username}/`, {state: {showTour: true}});
		} else {
			localStorage.setItem("hasSeenTour", "true");
			redirecionar(`/${username}/`);
		}
	}

	function handleLoginErrorUI(error: any) {
		console.error("Erro no login:", error);
		
		// Extrai mensagem de erro se disponível
		const errorMessage = error?.message || "Não foi possível fazer o login";
		
		setErrorMessage(errorMessage);
		setStatus("error");
		setAlert(true);
		setTimeout(() => setAlert(false), 6000); // 6 segundos para mensagens mais longas
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[400px]">
			{alert &&
				(status === "success" ? (
					<BeeAlert
						typeAlert="success"
						messageAlert="Login realizado com sucesso"
					/>
				) : (
					<BeeAlert
						typeAlert="error"
						messageAlert={errorMessage}
					/>
				))}

			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
					Bem-Vindo de volta
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					onSubmit={handleSubmit(saveUser)}
					className="space-y-6"
				>
					<BeeInput
						placeholder="Digite seu usuário"
						label="Usuário"
						type="text"
						control={control}
						name="username"
					/>
					{errors.username && (
						<p className="text-red-500 text-sm">{errors.username.message}</p>
					)}

					<BeeInput
						placeholder="Digite sua senha"
						label="Senha"
						type="password"
						name="password"
						control={control}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password.message}</p>
					)}

					<p className="text-right text-sm text-gray-500">
						Não tem conta?{" "}
						<Link
							to="/cadastro/"
							className="font-semibold text-[#FCBD18] hover:text-indigo-500"
						>
							Cadastre-se
						</Link>
					</p>

					<BeeButton
						variante="aviso"
						label="Entrar"
						classesDefault={false}
						className="px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 bg-[#FCBD18] text-white hover:bg-yellow-500 sm:w-full sm:max-w-sm mt-5"
					/>

					<div className="mt-3 flex justify-center">
						<GoogleLogin
							onSuccess={(credentialResponse) => {
								if (credentialResponse.credential)
									loginGoogle(credentialResponse.credential);
								else handleLoginErrorUI("Token Google inválido");
							}}
							onError={() => handleLoginErrorUI("Erro no login com Google")}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BeeFormAuth;
