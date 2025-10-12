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
import {useEffect, useState} from "react";

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
		reset,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema) as any,
		defaultValues: {
			texto: defaultValues ? defaultValues.texto : null,
			imagem: defaultValues ? defaultValues.imagem : null,
			arquivo: defaultValues ? defaultValues.arquivo : null,
			comunidade: defaultValues ? defaultValues.comunidade : null,
			categoria: defaultValues ? defaultValues.categoria : null,
		},
	});

	const caminho = useNavigate();
	const [nomeComunidade, setNomeComunidade] = useState("Escolha uma ");

	const nome = watch("comunidade");

	useEffect(() => {
		if (typeof nome === "string") setNomeComunidade("Escolha uma ");
		else if (typeof nome === "object" && nome !== null)
			setNomeComunidade(nome.label);
	}, [nome]);

	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

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
										defaultValue={defaultValues ? defaultValues[nameField] : ""}
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
									<div>
										<BeeArquivo
											control={control}
											name={field.name}
											label={field.props.label}
											defaultValue={
												defaultValues ? defaultValues[nameField] : ""
											}
										/>
										{errorMessage !== undefined && (
											<p className="text-red-500 text-sm">{errorMessage}</p>
										)}
									</div>
								</>
							);
						}

						if (field.type == "categorias") {
							const nameField = field.name;
							const errorMessage = errors[nameField]?.message as
								| string
								| undefined;
							return (
								<div>
									<BeeCategoria
										errors=""
										watch={watch}
										name={field.name}
										control={control}
										defaultValue={
											defaultValues ? defaultValues[field.name] : ""
										}
									/>
									{errorMessage !== undefined && (
										<p className="text-red-500 text-sm">{errorMessage}</p>
									)}
								</div>
							);
						}
						if (field.type == "select") {
							return (
								<div className="bg-white p-2 rounded-t-lg border-b border-gray-200">
									<div className="flex items-center justify-between gap-4">
										<p className="text-sm text-gray-600 break-words w-full">
											<span className="font-medium">Comunidade:</span>{" "}
											{nomeComunidade}
										</p>
										<BeeSelect
											icone={Hexagon}
											options={options}
											placeholder={field.props.placeholder}
											name={field.props.name}
											control={control}
											defaultValue={
												defaultValues ? defaultValues[field.name] : ""
											}
										/>
									</div>
								</div>
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
