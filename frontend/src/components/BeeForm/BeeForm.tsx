import {useForm} from "react-hook-form";
import {IBeeForm} from "./IBeeForm";
import {yupResolver} from "@hookform/resolvers/yup";
import BeeInput from "../BeeInput/BeeInput";
import {BeeTextArea} from "../BeeTextArea/BeeTextArea";
import BeeArquivo from "../BeeArquivo/BeeArquivo";

const BeeForm = ({schema, sections, onSubmit}: IBeeForm) => {
	const {
		control,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(schema) as any,
	});

	console.log(sections.fields);

	return (
		<>
			<div className="bg-white p-6 rounded-lg shadow-sm w-[550px]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					{sections.fields.map((field: any) => {
						console.log(field.type == "textarea");
						return (
							field.type == "input" && (
								<BeeInput
									name={field.name}
									control={control}
									label={field.props.label}
									placeholder={field.props.label}
								/>
							),
							field.type == "textarea" && (
								<BeeTextArea
									control={control}
									name={field.name}
									label={field.props.label}
									placeholder={field.props.label}
								/>
							),
							field.type == "arquivo" && (
								<BeeArquivo
									control={control}
									name={field.name}
									label={field.props.label}
								/>
							)
							// field.type == "categorias" && (
							// 	<BeeCategoria
							// 		errors=""
							// 		watch={watch}
							// 	/>
							// )
						);
					})}
				</form>
			</div>
		</>
	);
};

export default BeeForm;
