import {useState, useEffect, useCallback, useRef} from "react";
import {MagnifyingGlass} from "@phosphor-icons/react";
import {IBeeSearchBar} from "./IBeeSearchBar";
import BeeSearchDropdown from "../BeeSearchDropdown/BeeSearchDropdown";
import type {IUsuarioPesquisa} from "../BeeSearchDropdown/IBeeSearchDropdown";
import UsuarioService from "../../services/models/UsuarioService";

function BeeSearchBar({
	onSearch,
	showUserSearch = false,
	onSelectUser,
	placeholder = "Busque no Bizzu...",
}: IBeeSearchBar) {
	const [termo, setTermo] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [usuarios, setUsuarios] = useState<IUsuarioPesquisa[]>([]);
	const [loading, setLoading] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const searchTimeoutRef = useRef<number | null>(null);

	const pesquisarUsuarios = useCallback(
		async (termoPesquisa: string) => {
			if (!termoPesquisa.trim() || !showUserSearch) {
				setUsuarios([]);
				setShowDropdown(false);
				return;
			}

			setLoading(true);
			setShowDropdown(true);

			try {
				const response = await UsuarioService.pesquisarUsuarios(termoPesquisa);
				setUsuarios(response.data || []);
			} catch (error) {
				console.error("Erro ao pesquisar usuários:", error);
				setUsuarios([]);
			} finally {
				setLoading(false);
			}
		},
		[showUserSearch],
	);

	useEffect(() => {
		if (!showUserSearch) return;

		if (searchTimeoutRef.current) {
			clearTimeout(searchTimeoutRef.current);
		}

		searchTimeoutRef.current = setTimeout(() => {
			pesquisarUsuarios(termo);
		}, 300);

		return () => {
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current);
			}
		};
	}, [termo, pesquisarUsuarios, showUserSearch]);

	const handleSearch = () => {
		onSearch(termo);
		setShowDropdown(false);
	};

	const handleSelectUser = (usuario: IUsuarioPesquisa) => {
		if (onSelectUser) {
			onSelectUser(usuario);
		}
		setTermo("");
		setShowDropdown(false);
	};

	const handleCloseDropdown = () => {
		setShowDropdown(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const novoTermo = e.target.value;
		setTermo(novoTermo);

		if (!showUserSearch) {
			setShowDropdown(false);
		}
	};

	const handleFocus = () => {
		setIsFocused(true);
		if (showUserSearch && termo.trim()) {
			setShowDropdown(true);
		}
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<div className="relative flex items-center w-full max-w-md">
			{/* FIM DO CÓDIGO NOVO */}
			<input
				type="text"
				value={termo}
				onChange={handleInputChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder}
				className="w-full px-4 py-2 bg-[#F2F2F7] h-[36px] rounded-[15px] outline-none"
			/>

			{/* Botão de busca */}
			<button
				onClick={handleSearch}
				className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ${
					isFocused ? "w-12 h-12" : "w-10 h-10"
				} rounded-full bg-[#FCBD18]`}
			>
				<MagnifyingGlass
					size={32}
					color="#faf6ef"
				/>
			</button>

			{/* INÍCIO DO CÓDIGO NOVO - Dropdown de resultados */}
			{showUserSearch && (
				<BeeSearchDropdown
					usuarios={usuarios}
					loading={loading}
					isVisible={showDropdown}
					onSelectUser={handleSelectUser}
					onClose={handleCloseDropdown}
				/>
			)}
			{/* FIM DO CÓDIGO NOVO */}
		</div>
	);
}

export default BeeSearchBar;
