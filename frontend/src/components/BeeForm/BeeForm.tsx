import {useForm} from "react-hook-form";
import {IBeeForm} from "./IBeeForm";
import {yupResolver} from "@hookform/resolvers/yup";
import BeeInput from "../BeeInput/BeeInput";
import {BeeTextArea} from "../BeeTextArea/BeeTextArea";
import BeeArquivo from "../BeeArquivo/BeeArquivo";
import BeeCategoria from "../BeeCategoria/BeeCategoria";
import BeeSelect from "../BeeSelect/BeeSelect";
import {Hexagon} from "@phosphor-icons/react";

const BeeForm = ({
	schema,
	sections,
	onSubmit,
	options,
	defaultValues,
}: IBeeForm) => {
	const {
		control,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema) as any,
	});

	return (
		<>
			<div className="bg-white p-6 rounded-lg shadow-sm w-[550px]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					{sections.fields.map((field: any) => {
						if (field.type == "input") {
							return (
								<BeeInput
									name={field.name}
									control={control}
									label={field.props.label}
									placeholder={field.props.placeholder}
									defaultValue={defaultValues ? defaultValues[field.name] : ""}
								/>
							);
						}

						if (field.type == "textarea") {
							return (
								<BeeTextArea
									control={control}
									name={field.name}
									label={field.props.label}
									placeholder={field.props.placeholder}
									defaultValue={defaultValues ? defaultValues[field.name] : ""}
								/>
							);
						}

						if (field.type == "arquivo") {
							return (
								<BeeArquivo
									control={control}
									name={field.name}
									label={field.props.label}
								/>
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
				</form>
			</div>
		</>
	);
};

export default BeeForm;
