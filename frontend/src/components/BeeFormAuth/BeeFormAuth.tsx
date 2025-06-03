import acessAuth from "../../utils/acessAuth";
import BeeButton from "../BeeButtons/BeeButtons";
import BeeInput from "../BeeInput/BeeInput";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
	username: yup.string().required("O usuário é obrigatório"),
	password: yup.string().required("A senha é obrigatória"),
});

const BeeFormAuth: React.FC = () => {
	const {autenticar} = acessAuth();

	const {
		handleSubmit,
		register,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	async function saveUser(data: {
		username: string;
		password: string;
	}): Promise<void> {
		try {
			await autenticar(data.username, data.password);
			console.log("Deu bom");
		} catch (e) {
			console.error("Deu erro", e);
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[400px]">
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
								<a
									href="#"
									className="font-semibold text-[#FCBD18] hover:text-indigo-500"
								>
									Cadastre-se
								</a>
							</p>
						</div>
						<BeeButton
							variante="aviso"
							label="Entrar"
							tamanho="grande"
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default BeeFormAuth;
