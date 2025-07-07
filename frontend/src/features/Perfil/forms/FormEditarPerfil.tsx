import React from "react";
import {IFormEditarPerfil} from "./IFormEditarPerfil";
import axios from "axios";
import {useState, useEffect, ChangeEvent, FormEvent} from "react";

const FormEditarPerfil: React.FC<IFormEditarPerfil> = ({
	nome,
	descricao,
	imagemPerfil,
	linkedinUrl,
	escolaFormacao,
	instituicaoAtual,
}) => {
	const [form, setForm] = useState<IFormEditarPerfil>({
		nome: "",
		descricao: "",
		linkedinUrl: "",
		escolaFormacao: "",
		instituicaoAtual: "",
	});
	const [imagem, setImagem] = useState<File | null>(null);
	const [mensagem, setMensagem] = useState("");
	const token = localStorage.getItem("token");
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
		const formData = new FormData();
		Object.entries(form).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				formData.append(key, value);
			}
		});

		if (imagem) {
			formData.append("imagemPerfil", imagem);
		}

		try {
			await axios.patch("/api/usuario/editarPerfil/", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});
			setMensagem("Perfil atualizado com sucesso!");
		} catch (error: any) {
			console.error(error.response?.data || error.message);
			setMensagem("Erro ao atualizar perfil.");
		}
	};

	useEffect(() => {
		axios
			.get("/api/usuario/perfil/", {
				headers: {Authorization: `Bearer ${token}`},
			})
			.then((res) => {
				setForm(res.data);
			})
			.catch((err) => {
				console.error("Erro ao carregar perfil", err);
			});
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold text-gray-900">Profile</h2>
					<p className="mt-1 text-sm text-gray-600">
						This information will be displayed publicly so be careful what you
						share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
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
									placeholder="https://linkedin.com/in/seu-perfil"
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
								About
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
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
					>
						Salvar
					</button>
					{mensagem && <p className="text-sm text-green-600">{mensagem}</p>}
				</div>
			</div>
		</form>
	);
};
export default FormEditarPerfil;
