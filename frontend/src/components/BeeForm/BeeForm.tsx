import {useForm} from "react-hook-form";
import {IBeeForm} from "./IBeeForm";
import {yupResolver} from "@hookform/resolvers/yup";
import BeeInput from "../BeeInput/BeeInput";
import {BeeTextArea} from "../BeeTextArea/BeeTextArea";
import BeeArquivo from "../BeeArquivo/BeeArquivo";
import BeeCategoria from "../BeeCategoria/BeeCategoria";
import BeeSelect from "../BeeSelect/BeeSelect";
import {Hexagon} from "@phosphor-icons/react";
import BeeButton from "../BeeButtons/BeeButtons";
import {useNavigate} from "react-router-dom";

const BeeForm = ({
	schema,
	sections,
	onSubmit,
	options,
	defaultValues,
	usuario,
}: IBeeForm) => {
	const {
		control,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema) as any,
	});

	const caminho = useNavigate();

	console.log("SCHEMA ", schema);

	return (
		<>
			<div className="bg-white p-6 rounded-lg shadow-sm w-[550px]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					{sections.fields.map((field: any) => {
						if (field.type == "input") {
							const nameField = field.name;
							const errorMessage = errors[nameField]?.message as
								| string
								| undefined;
							return (
								<>
									<BeeInput
										name={field.name}
										control={control}
										label={field.props.label}
										placeholder={field.props.placeholder}
										defaultValue={
											defaultValues ? defaultValues[field.name] : ""
										}
									/>
									{errorMessage !== undefined && (
										<p className="text-red-500 text-sm">{errorMessage}</p>
									)}
								</>
							);
						}

						if (field.type == "textarea") {
							const nameField = field.name;
							const errorMessage = errors[nameField]?.message as
								| string
								| undefined;
							return (
								<>
									<BeeTextArea
										control={control}
										name={field.name}
										label={field.props.label}
										placeholder={field.props.placeholder}
										defaultValue={
											defaultValues ? defaultValues[field.name] : ""
										}
									/>
									{errorMessage !== undefined && (
										<p className="text-red-500 text-sm">{errorMessage}</p>
									)}
								</>
							);
						}

						if (field.type == "arquivo") {
							const nameField = field.name;
							const errorMessage = errors[nameField]?.message as
								| string
								| undefined;
							return (
								<>
									<BeeArquivo
										control={control}
										name={field.name}
										label={field.props.label}
									/>
									{errorMessage !== undefined && (
										<p className="text-red-500 text-sm">{errorMessage}</p>
									)}
								</>
							);
						}

						if (field.type == "categorias") {
							return (
								<BeeCategoria
									errors=""
									watch={watch}
								/>
							);
						}
						if (field.type == "select") {
							return (
								<BeeSelect
									icone={Hexagon}
									options={options}
									placeholder={field.props.placeholder}
								/>
							);
						}
					})}
					<div className="mt-6 flex items-center justify-end gap-x-6">
						<BeeButton
							label="cancelar"
							variante="negativo"
							onClick={() => caminho(`/${usuario.username}`)}
						/>
						<BeeButton
							label={"Salvar"}
							variante="primaria"
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default BeeForm;
