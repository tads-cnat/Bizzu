import {IBeeInput} from "./IBeeInput";

const BeeInput: React.FC<IBeeInput> = ({
	label,
	placeholder,
	type,
	icon: Icon,
	register,
}) => {
	return (
		<>
			<div>
				<label
					htmlFor="price"
					className="block text-sm/6 font-medium text-gray-900"
				>
					{label}
				</label>
				<div className="mt-2">
					<div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
						<div>
							{Icon && (
								<Icon
									size={20}
									color="#000"
									weight="bold"
								/>
							)}
						</div>
						<input
							{...register}
							type={type}
							placeholder={placeholder}
							className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default BeeInput;
