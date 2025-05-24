import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {DotsThreeVertical, PencilSimple, Trash} from "@phosphor-icons/react";

const BeeDropPost: React.FC = () => {
	return (
		<Menu
			as="div"
			className="absolute top-8 right-4 text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-100 rounded-full transition duration-200 ease-in-out"
		>
			<div>
				<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 font-semibold text-gray-900 ring-inset hover:bg-gray-50">
					<DotsThreeVertical
						size={24}
						weight="bold"
					/>
				</MenuButton>
			</div>
			<MenuItems
				transition
				className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-bl-lg rounded-tr-lg bg-[#333333] shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
			>
				<div className="py-1">
					<MenuItem>
						<a
							href="#"
							className="flex items-center gap-2 block px-4 py-2 text-sm text-[#F8F4E6] data-focus:bg-zinc-600 data-focus:text-[#F8F4E6] data-focus:outline-hidden"
						>
							<PencilSimple
								size={24}
								weight="bold"
								className="text-inherit"
							/>
							Editar repositório
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="#"
							className="flex items-center gap-2 block px-4 py-2 text-sm text-[#F8F4E6] data-focus:bg-zinc-600 data-focus:text[#F8F4E6] data-focus:outline-hidden"
						>
							<Trash
								size={24}
								weight="bold"
								className="text-inherit"
							/>
							Excluir repositório
						</a>
					</MenuItem>
				</div>
			</MenuItems>
		</Menu>
	);
};

export default BeeDropPost;

{
	/* <button className="absolute top-8 right-4 text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-100 rounded-full transition duration-200 ease-in-out">
	<DotsThreeVertical
		size={24}
		weight="bold"
	/>
</button>; */
}
