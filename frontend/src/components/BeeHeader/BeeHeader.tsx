import React from "react";
import { Link } from "react-router-dom";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";
import BeeButton from "../BeeButtons/BeeButtons";
import { SignOut, PlusCircle } from "@phosphor-icons/react";

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
			<Link to="/bizzu/postagem/criar">
          		<BeeButton icone={<PlusCircle size={20} weight="bold" />} label="Nova Postagem" variante="primaria" />
       		</Link>
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
