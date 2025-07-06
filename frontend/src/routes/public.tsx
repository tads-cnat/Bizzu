import {Empty} from "antd";
import Cadastro from "../features/Cadastro/Cadastro";
import LayoutFeed from "../features/Layout/LayoutFeed";
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
	{
		path: "/feed",
		element: <LayoutFeed />,
	},
];
