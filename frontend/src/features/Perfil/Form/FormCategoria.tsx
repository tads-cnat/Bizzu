import {useState} from "react";
import BeeButton from "../../../components/BeeButtons/BeeButtons";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import BeeInput from "../../../components/BeeInput/BeeInput";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import BeeSelect from "../../../components/BeeSelect/BeeSelect";
import {Hexagon} from "@phosphor-icons/react";
import CategoriaService from "../../../services/models/CategoriaService";

const schema = yup.object().shape({
	nome: yup.string().required("O nome é obrigatório"),
	tipo: yup.mixed().required("Selecione um tipo"),
});

const FormCategoria = ({
	label,
	defaultValues = undefined,
	type = "criar",
}: any) => {
	const [open, setOpen] = useState(true);

	const handleCreate = async (data: {
		nome: string;
		tipo: string;
	}): Promise<void> => {
		console.log("DATA ", data);
		let tipagem = "mat";
		if (data.tipo.value == "2") tipagem = "per";
		else if (data.tipo.value == "3") tipagem = "tec";
		const response = {nome: data.nome, tipo: tipagem};
		if (type == "criar") {
			await CategoriaService.post(response);
		} else {
			await CategoriaService.put(defaultValues?.id.id, response);
		}
		await window.location.reload();
		setOpen(false);
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
		defaultValues: defaultValues || {nome: "", tipo: undefined},
	});

	const options = [
		{label: "Matéria", value: 1},
		{label: "Período", value: 2},
		{label: "Tecnologia", value: 3},
	];

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
										{label}
									</DialogTitle>
									<form onSubmit={handleSubmit(handleCreate)}>
										<div className="mt-5">
											<BeeInput
												placeholder="Digite o nome da categoria"
												label="Nome"
												type="text"
												control={control}
												name="nome"
												register={{...register("nome")}}
											/>
											{errors.nome && (
												<p className="text-red-500 text-sm mt-1">
													{errors.nome.message}
												</p>
											)}
										</div>
										<div className="mt-3">
											<BeeSelect
												control={control}
												name="tipo"
												placeholder="Selecione o tipo"
												options={options}
												icone={Hexagon}
												defaultValue={
													defaultValues
														? {
																value: defaultValues.value,
																label:
																	defaultValues.label == "mat"
																		? "Matéria"
																		: defaultValues.label == "tec"
																			? "Tecnologia"
																			: "Período",
															}
														: undefined
												}
											/>

											{errors.tipo && (
												<p className="text-red-500 text-sm mt-1">
													{errors.tipo.message}
												</p>
											)}
										</div>
										<div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4 mt-3">
											<BeeButton label="Salvar" />
											<BeeButton
												label="Cancelar"
												variante="neutro"
												type="button"
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

export default FormCategoria;
