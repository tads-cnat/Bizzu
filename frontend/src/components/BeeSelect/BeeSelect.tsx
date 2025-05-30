import IBeeSelect from "./IBeeSelect";
import {useEffect, useState} from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {CaretUpDown, X} from "@phosphor-icons/react";

const BeeSelect = ({options, placeholder, icone: Icon}: IBeeSelect) => {
	const [selected, setSelected] = useState(options);
	const [iconSelect, setIconSelect] = useState(<CaretUpDown size={20} />);

	useEffect(() => {
		if (selected.value !== undefined) {
			setIconSelect(<X size={20} />);
		} else {
			setIconSelect(<CaretUpDown size={20} />);
		}
	}, [selected]);

	return (
		<Listbox
			value={selected}
			onChange={setSelected}
		>
			<div className="relative mt-2 w-fit inderline-flex">
				<ListboxButton className="grid cursor-default grid-cols-1 rounded-lg bg-[#FFFFFF] py-1.5 pr-2 pl-3 text-left text-[#333333] outline-1 -outline-offset-1 outline-[#B0B0B0] focus:outline-2 focus:-outline-offset-2 focus:outline-[#333333] sm:text-sm/6">
					<span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
						{Icon && (
							<Icon
								size={20}
								weight="bold"
								style={{marginRight: 8}}
							/>
						)}
						<span className="block truncate">
							{selected.label || placeholder}
						</span>
						<span
							className="block truncate"
							onClick={() => {
								setSelected(options);
							}}
						>
							{iconSelect}
						</span>
					</span>
				</ListboxButton>

				<ListboxOptions
					transition
					className="z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
				>
					{options.map((op) => (
						<ListboxOption
							key={op.value}
							value={op}
							className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#FCBD18] data-focus:text-white data-focus:outline-hidden"
						>
							<div className="flex items-center">
								<span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
									{op.label}
								</span>
							</div>
						</ListboxOption>
					))}
				</ListboxOptions>
			</div>
		</Listbox>
	);
};

export default BeeSelect;
