import React, {useState, useEffect, ChangeEvent} from "react";
import {IFormEditarPerfil} from "./IFormEditarPerfil";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import getLocalStorage from "../../../utils/getLocalStorage";
import BeeButton from "../../../components/BeeButtons/BeeButtons";

const FormEditarPerfil: React.FC<IFormEditarPerfil> = ({onClose}) => {
	const [form, setForm] = useState<IFormEditarPerfil>({
		nome: "",
		descricao: "",
		linkedinUrl: "",
		escolaFormacao: "",
		instituicaoAtual: "",
	});
	const [imagem, setImagem] = useState<File | null>(null);
	const [mensagem, setMensagem] = useState("");
	const [userId, setUserId] = useState<number | null>(null);
	const usuarioLocal = getLocalStorage();
	const navigate = useNavigate();

	const handleChange = (
		usuario: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm({...form, [usuario.target.name]: usuario.target.value});
	};
	const handleImagemChange = (usuario: ChangeEvent<HTMLInputElement>) => {
		if (usuario.target.files && usuario.target.files.length > 0) {
			setImagem(usuario.target.files[0]);
		}
	};
	const handleSubmit = async (usuario: React.FormEvent) => {
		usuario.preventDefault();

		if (!userId) {
			setMensagem("ID do usuário não carregado.");
			return;
		}

		const formData = new FormData();
		Object.entries(form).forEach(([key, value]) => {
			if (typeof value === "string" && value.trim() !== "") {
				formData.append(key, value);
			}
		});
		if (imagem) {
			formData.append("imagemPerfil", imagem);
		}

		try {
			await axios.patch(
				`http://localhost:8000/api/usuario/${userId}/`,
				formData,
			);
			setMensagem("Perfil atualizado com sucesso!");
			navigate(`/bizzu/${usuarioLocal.username}`);
			window.location.reload();
		} catch (error: any) {
			console.error(error.response?.data || error.message);
			setMensagem("Erro ao atualizar perfil.");
		}
	};

	useEffect(() => {
		const carregarInfoUsuario = async () => {
			if (!usuarioLocal.username || !usuarioLocal.token) return;

			try {
				const response = await axios.get(
					`http://localhost:8000/api/usuario/userByusername/${usuarioLocal.username}/`,
				);
				console.log("Dados do usuário no editar perfil:", response.data);
				setForm({
					nome: response.data.nome || "",
					descricao: response.data.descricao || "",
					linkedinUrl: response.data.linkedinUrl || "",
					escolaFormacao: response.data.escolaFormacao || "",
					instituicaoAtual: response.data.instituicaoAtual || "",
				});
				setUserId(response.data.id);
			} catch (error) {
				console.error("Erro ao buscar dados do usuário:", error);
			}
		};

		carregarInfoUsuario();
	}, []);

	return (
		<form
			className="rounded-xl border border-gray-400 p-6 bg-white"
			onSubmit={handleSubmit}
		>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<div className="sm:col-span-3">
								<label
									htmlFor="nome"
									className="block text-sm font-medium text-gray-900"
								>
									Nome
								</label>
								<div className="mt-2">
									<input
										id="nome"
										name="nome"
										type="text"
										value={form.nome}
										onChange={handleChange}
										className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 border outline-gray-300 focus:outline-indigo-600 sm:text-sm"
									/>
								</div>
							</div>
							<label
								htmlFor="linkedinUrl"
								className="block text-sm font-medium text-gray-900"
							>
								LinkedIn
							</label>
							<div className="mt-2">
								<input
									id="linkedinUrl"
									name="linkedinUrl"
									type="text"
									value={form.linkedinUrl}
									onChange={handleChange}
									className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-base text-gray-900 shadow-sm focus:outline-indigo-600 sm:text-sm"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="descricao"
								className="block text-sm font-medium text-gray-900"
							>
								Descrição
							</label>
							<div className="mt-2">
								<textarea
									id="descricao"
									name="descricao"
									rows={3}
									value={form.descricao}
									onChange={handleChange}
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="imagemPerfil"
								className="block text-sm font-medium text-gray-900"
							>
								Foto de Perfil
							</label>
							<input
								id="imagemPerfil"
								name="imagemPerfil"
								type="file"
								onChange={handleImagemChange}
								className="mt-2"
							/>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="escolaFormacao"
								className="block text-sm font-medium text-gray-900"
							>
								Escola/Formação
							</label>
							<div className="mt-2">
								<input
									id="escolaFormacao"
									name="escolaFormacao"
									type="text"
									value={form.escolaFormacao}
									onChange={handleChange}
									className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 border outline-gray-300 focus:outline-indigo-600 sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="instituicaoAtual"
								className="block text-sm font-medium text-gray-900"
							>
								Instituição Atual
							</label>
							<div className="mt-2">
								<input
									id="instituicaoAtual"
									name="instituicaoAtual"
									type="text"
									value={form.instituicaoAtual}
									onChange={handleChange}
									className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 border outline-gray-300 focus:outline-indigo-600 sm:text-sm"
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
					{mensagem && <p className="text-sm text-green-600">{mensagem}</p>}
				</div>
			</div>
		</form>
	);
};
export default FormEditarPerfil;
