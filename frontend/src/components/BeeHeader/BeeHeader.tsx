import React from "react";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";
import BeeButton from "../BeeButtons/BeeButtons";
import {SignIn, SignOut} from "@phosphor-icons/react";
import acessAuth from "../../utils/acessAuth";
import {Link, useNavigate} from "react-router-dom";
import UsuarioService from "../../services/models/UsuarioService";
import BeeNotification from "../BeeNotification/BeeNotification";

const BeeHeader: React.FC = () => {
	const {deslogar} = acessAuth();
	const {username} = acessAuth();

	const mudar = useNavigate();

	const sair = () => {
		UsuarioService.logout()
			.then((response) => {
				console.log("Logout realizado com sucesso ", response);
			})
			.catch((e) => {
				console.log("Ainda está logado", e);
			});
		deslogar();
		mudar("/login", {replace: true});
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white py-4 px-8 shadow-sm">
			<div className="flex items-center">
				<Link to={`/feed/`}>
					<img
						src="/logo.png"
						alt="BIZZU Logo"
						className="w-32"
					/>
				</Link>
			</div>
			{username === undefined ? (
				<BeeNotification
					type="warning"
					title="Você não está conectado"
					message="Faça o login e aproveite integralmente o bizzu"
					content={<BeeSearchBar onSearch={() => {}} />}
				/>
			) : (
				<BeeSearchBar
					onSearch={(termo: string) => console.log("Search term:", termo)}
				/>
			)}

			{username != undefined ? (
				<BeeButton
					onClick={() => sair()}
					icone={
						<SignOut
							size={20}
							weight="bold"
						/>
					}
					label="Sair"
					variante="negativo"
					className="ml-4"
				/>
			) : (
				<Link to={`/login/`}>
					<BeeButton
						icone={
							<SignIn
								size={20}
								weight="bold"
							/>
						}
						label="Entrar"
						variante="aviso"
						className="ml-4"
					/>
				</Link>
			)}
		</header>
	);
};

export default BeeHeader;
