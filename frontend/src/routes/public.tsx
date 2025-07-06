import Cadastro from "../features/Cadastro/Cadastro";
import Login from "../features/Login/Login";

export const publicRoutes = [
	{
		path: "/login/",
		element: <Login />,
	},
	{
		path: "/cadastro/",
		element: <Cadastro />,
	},
];
