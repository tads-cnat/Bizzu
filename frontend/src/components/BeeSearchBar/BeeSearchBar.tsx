import { useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { IBeeSearchBar } from "./IBeeSearchBar";        


function BeeSearchBar({ onSearch }: IBeeSearchBar) {
	const [termo, setTermo] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const handleSearch = () => {
		onSearch(termo);
	};
	return (
		<div className="relative flex items-center w-full max-w-md">
			<input
				type="text"
				value={termo}
				onChange={(e) => setTermo(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder="Busque no Bizzu..."
				className="w-full px-4 py-2 bg-[#F2F2F7] rounded-[15px] outline-none"
			/>

			{/* Botão de busca */}
			<button
				onClick={handleSearch}
				className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ${
					isFocused ? "w-12 h-12" : "w-10 h-10"
				} rounded-full bg-[#FCBD18]`}
			>
				<MagnifyingGlass size={32} color="#faf6ef" />
			</button>
		</div>
	);
}
export default BeeSearchBar;