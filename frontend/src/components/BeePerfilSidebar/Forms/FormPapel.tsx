import BeeButton from "../../../components/BeeButtons/BeeButtons";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {BeeTextArea} from "../../BeeTextArea/BeeTextArea";
import UsuarioService from "../../../services/models/UsuarioService";
import acessAuth from "../../../utils/acessAuth";
import {IBeeUser} from "../../../features/Perfil/components/BeeHeaderProfile/IBeeUser";

const schema = yup.object().shape({
	descricao: yup.string().required("A descrição é obrigatória"),
});

const FormPapel = () => {
	const [open, setOpen] = useState(true);
	const {username} = acessAuth();
	const [usuario, setUsuario] = useState<IBeeUser>();

	useEffect(() => {
		if (usuario === undefined) {
			void UsuarioService.getbyUsername(String(username))
				.then((response) => {
					setUsuario(response);
				})
				.catch(() => {
					console.error("Não recebeu dados");
				});
		}
	}, []);

	const handleCreate = async (data: {descricao: string}): Promise<void> => {
		try {
			const dados = new FormData();
			dados.append("descricao", data.descricao);
			dados.append("solicitante", String(usuario?.id));
			UsuarioService.solicitarMudanca(dados);
			setOpen(false);
		} catch (e) {
			console.error("Erro ao criar solicitação", e);
		}
	};

	const handleCancelDelete = () => {
		setOpen(false);
	};

	const {
		handleSubmit,
		register,
		control,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<>
			<Dialog
				open={open}
				onClose={setOpen}
				className="relative z-50"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-[#B0B0B0]/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
				/>

				<div className="fixed inset-0 z-40 w-screen overflow-y-auto  ">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
						<DialogPanel
							transition
							className="relative overflow-visible transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm data-closed:sm:translate-y-0 data-closed:sm:scale-95"
						>
							<div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="mt-4 sm:mt-0 sm:ml-2">
									<DialogTitle
										as="h3"
										className="text-base text-[#333333] font-poppins"
									>
										Solicitar mudança
									</DialogTitle>
									<form onSubmit={handleSubmit(handleCreate)}>
										<div className="mt-5">
											<Controller
												name="descricao"
												control={control}
												render={({field}) => (
													<BeeTextArea
														placeholder="Digite brevemente por que você deseja ser moderador"
														label="Descriçao"
														defaultValue={field.value}
														onChange={(e) => field.onChange(e.target.value)}
													/>
												)}
											/>
											{errors.descricao && (
												<p className="text-red-500 text-sm mt-1">
													{errors.descricao.message}
												</p>
											)}
										</div>

										<div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4 mt-3">
											<BeeButton label="Solicitar" />
											<BeeButton
												label="Cancelar"
												variante="neutro"
												onClick={handleCancelDelete}
											/>
										</div>
									</form>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default FormPapel;
