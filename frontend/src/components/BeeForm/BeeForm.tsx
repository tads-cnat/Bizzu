import {useForm} from "react-hook-form";
import {IBeeForm} from "./IBeeForm";
import {yupResolver} from "@hookform/resolvers/yup";
import BeeInput from "../BeeInput/BeeInput";

const BeeForm = ({schema, sections, onSubmit}: IBeeForm) => {
	const {control, handleSubmit} = useForm({
		resolver: yupResolver(schema) as any,
	});

	return (
		<>
			<div className="bg-white p-6 rounded-lg shadow-sm w-[550px]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					{sections.fields.map(
						(field: any) =>
							field.type == "input" && (
								<BeeInput
									name="input"
									control={control}
									label={field.prop.label}
									placeholder={field.prop.label}
								/>
							),
					)}
				</form>
			</div>
		</>
	);
};

export default BeeForm;
