import type React from "react";
import BeeSearchBar from "../BeeSearchBar/BeeSearchBar";
import BeeButton from "../BeeButtons/BeeButtons";
import {SignIn, SignOut} from "@phosphor-icons/react";
import acessAuth from "../../utils/acessAuth";
import {Link, useNavigate} from "react-router-dom";
//import UsuarioService from "../../services/models/UsuarioService";
import BeeNotification from "../BeeNotification/BeeNotification";
import type {IUsuarioPesquisa} from "../BeeSearchDropdown/IBeeSearchDropdown";

const BeeHeader: React.FC = () => {
	const {deslogar} = acessAuth();
	const {username} = acessAuth();

	const mudar = useNavigate();

	const sair = () => {
		deslogar();
		mudar("/login", {replace: true});
	};

	const handleSelectUser = (usuario: IUsuarioPesquisa) => {
		mudar(`/${usuario.username}/`);
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white h-[70px] px-8 border-b border-gray-300">
			<div className="flex items-center">
				<Link to={`/`}>
					<img
						src="/logo.png"
						alt="BIZZU Logo"
						className="w-32"
					/>
				</Link>
			</div>
			{username === undefined || username == "" ? (
				<BeeNotification
					type="warning"
					title="Você não está conectado"
					message="Faça o login e aproveite integralmente o bizzu"
					content={<BeeSearchBar onSearch={() => {}} />}
				/>
			) : (
				<BeeSearchBar
					onSearch={() => {}}
					showUserSearch={true}
					onSelectUser={handleSelectUser}
					placeholder="Buscar usuários..."
				/>
			)}

			{username != undefined && username != "" ? (
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
