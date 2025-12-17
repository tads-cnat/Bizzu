import type React from "react";
import type IBeeSelect from "./IBeeSelect";
import {useEffect, useState, useCallback} from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {CaretUpDown, X} from "@phosphor-icons/react";
import {Controller} from "react-hook-form";

const BeeSelect = ({
	options,
	placeholder,
	icone: Icon,
	value,
	onChange,
	error,
	name,
	control,
	defaultValue,
}: IBeeSelect) => {
	const [selected, setSelected] = useState<any>(
		defaultValue ? defaultValue : {label: placeholder, value: ""},
	);

	const handleClear = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			const emptyValue = {label: placeholder, value: ""};
			onChange?.(emptyValue);
		},
		[placeholder, onChange],
	);

	// Evitar loop infinito verificando se o valor realmente mudou
	useEffect(() => {
		if (
			value &&
			(value.value !== selected?.value || value.label !== selected?.label)
		) {
			setSelected(value);
		} else if (defaultValue && !value) {
			setSelected(defaultValue);
		} else if (!value && selected?.value !== "") {
			setSelected({label: placeholder, value: ""});
		}
	}, [value, placeholder, defaultValue]);

	return (
		<div className="w-full max-w-full">
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({field}) => {
					return (
						<Listbox
							value={field.value}
							onChange={(newValue) => {
								const numericValue = newValue?.value
									? Number(newValue.value)
									: null;
								field.onChange({value: numericValue, label: newValue.label});
							}}
						>
							<div className="relative">
								<ListboxButton
									className="relative w-full cursor-default rounded-lg bg-[#FFFFFF] py-1.5 pr-10 pl-3 text-left text-[#333333] outline-1 -outline-offset-1 outline-[#B0B0B0] focus:outline-2 focus:-outline-offset-2 focus:outline-[#333333] sm:text-sm/6"
									type="button"
								>
									<span className="flex items-center">
										{Icon && (
											<Icon
												size={20}
												weight="bold"
												className="mr-2"
											/>
										)}
										<span className="block truncate">
											{field.value?.value ? field.value.label : placeholder}
										</span>
									</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
										{field.value?.value && field.value.value !== "" ? (
											<button
												type="button"
												onClick={(e) => {
													field.onChange("");
													handleClear(e);
												}}
												className="pointer-events-auto cursor-pointer hover:bg-gray-100 rounded p-1"
											>
												<X size={16} />
											</button>
										) : (
											<CaretUpDown size={20} />
										)}
									</span>
								</ListboxButton>

								<ListboxOptions
									transition
									className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
								>
									{options.map((op) => (
										<ListboxOption
											key={op.value}
											value={op}
											className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-focus:bg-[#FCBD18] data-focus:text-white"
										>
											<div className="flex items-center">
												<span className="block truncate font-normal group-data-selected:font-semibold">
													{op.label}
												</span>
											</div>
										</ListboxOption>
									))}
								</ListboxOptions>
							</div>
						</Listbox>
					);
				}}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default BeeSelect;
