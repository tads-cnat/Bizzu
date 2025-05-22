import React from "react";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";
import BeeButton from "../BeeButtons/BeeButtons";
import {SignOut} from "@phosphor-icons/react"; // Importa o ícone de logout

const BeeHeader: React.FC = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white py-4 px-8 shadow-sm">
			<div className="flex items-center">
				<img
					src="/logo.png"
					alt="BIZZU Logo"
					className="w-32"
				/>
			</div>
			<BeeSearchBar
				onSearch={(termo: string) => console.log("Search term:", termo)}
			/>
			<BeeButton
				onClick={() => console.log("Logout clicked")}
				icone={
					<SignOut
						size={20}
						weight="bold"
					/>
				} // Ícone à esquerda do texto
				label="Sair"
				variante="negativo"
				className="ml-4"
			/>
		</header>
	);
};

export default BeeHeader;
