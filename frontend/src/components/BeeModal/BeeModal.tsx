import {useEffect, useState} from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import {TrashSimple, File} from "@phosphor-icons/react";
import {BeeButton} from "../BeeButtons/BeeButtons";
import {IBeeModal} from "./IBeeModal";
import {BeeButtonVariantes} from "../BeeButtons/IBeeButtons";

const BeeModal = ({
	label,
	text,
	type,
	onExcluir,
	id,
	openDefault = true,
}: IBeeModal) => {
	const [open, setOpen] = useState(openDefault);
	const [buttonType, setbuttonType] = useState<BeeButtonVariantes>("negativo");
	const [stateIcon, setStateIcon] = useState(
		<TrashSimple
			aria-hidden="true"
			size={64}
			color="#333333"
		/>,
	);
	const [labelButton, setLabelButton] = useState("Descartar");
	const handleExcluirClick = () => {
		console.log("AQUII ", onExcluir);

		if (onExcluir && id) {
			onExcluir(id);
		}
		setOpen(false);
	};

	const handleCancelDelete = () => {
		setOpen(false);
	};

	//Aqui estou mudando icones e cores de acordo com o tipo do modal escolhido
	useEffect(() => {
		if (type === "salvar") {
			setbuttonType("primaria");
			setStateIcon(
				<File
					aria-hidden="true"
					size={64}
					color="#333333"
				/>,
			);
			setLabelButton("Salvar");
		} else {
			setbuttonType("negativo");
			setStateIcon(
				<TrashSimple
					aria-hidden="true"
					size={64}
					color="#333333"
				/>,
			);
			setLabelButton("Descartar");
		}
	}, [type]);

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
							className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm data-closed:sm:translate-y-0 data-closed:sm:scale-95"
						>
							<div className="bg-[#F2F2F7] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-center justify-center">
									<div className="mx-auto flex size-12 shrink-0 items-center rounded-full sm:mx-0 sm:size-10">
										{stateIcon}
									</div>
								</div>
								<div className="mt-4 text-center sm:mt-0 sm:ml-2 sm:text-center">
									<DialogTitle
										as="h3"
										className="text-base font-semibold text-[#333333] font-poppins"
									>
										{label}
									</DialogTitle>
									<div className="mt-1">
										<p className="text-sm text-[#B0B0B0] font-poppins">
											{text}
										</p>
									</div>
								</div>
							</div>
							<div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
								<BeeButton
									label={labelButton}
									variante={buttonType}
									onClick={handleExcluirClick}
								/>
								<BeeButton
									label="Cancelar"
									variante="neutro"
									onClick={handleCancelDelete}
								/>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default BeeModal;
