import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {DotsThreeVertical} from "@phosphor-icons/react";

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
				className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
			>
				<div className="py-1">
					<MenuItem>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
						>
							Account settings
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
						>
							Support
						</a>
					</MenuItem>
					<MenuItem>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
						>
							License
						</a>
					</MenuItem>
					<form
						action="#"
						method="POST"
					>
						<MenuItem>
							<button
								type="submit"
								className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
							>
								Sign out
							</button>
						</MenuItem>
					</form>
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
