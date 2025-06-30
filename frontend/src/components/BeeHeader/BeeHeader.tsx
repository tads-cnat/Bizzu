import React from "react";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";
import BeeButton from "../BeeButtons/BeeButtons";
import {SignOut} from "@phosphor-icons/react";
import acessAuth from "../../utils/acessAuth";
import {Link, useNavigate} from "react-router-dom";

const BeeHeader: React.FC = () => {
	const {deslogar} = acessAuth();

	const mudar = useNavigate();

	const sair = () => {
		deslogar();
		mudar("/login", {replace: true});
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white py-4 px-8 shadow-sm">
			<div className="flex items-center">
				<Link to={`/feed`}>
					<img
						src="/logo.png"
						alt="BIZZU Logo"
						className="w-32"
					/>
				</Link>
			</div>
			<BeeSearchBar
				onSearch={(termo: string) => console.log("Search term:", termo)}
			/>

			<BeeButton
				onClick={() => sair()}
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
