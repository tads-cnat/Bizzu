import Layout from "../features/Layout/Layout";
import EditPostagem from "../features/Postagem/Edit";
import CreatePostagem from "../features/Postagem/Create";
import Perfil from "../features/Perfil/Perfil";
import EditRepositorio from "../features/Repositorio/Edit";
import CreateRepositorio from "../features/Repositorio/Create";
import Repositorio from "../features/Repositorio/Repositorio";
import LayoutFeed from "../features/Layout/LayoutFeed";

export const privatesRoutes = [
	{
		path: "/",
		element: <LayoutFeed />,
	},
	{
		path: "",
		element: <Layout />,
		children: [
			{
				path: "/:username",
				element: <Perfil />,
			},
			{
				path: "postagem/criar/",
				element: <CreatePostagem />,
			},
			{
				path: "postagem/editar/:id",
				element: <EditPostagem />,
			},
			{
				path: "repositorio/criar",
				element: <CreateRepositorio />,
			},
			{
				path: "repositorio/criar/",
				element: <CreateRepositorio />,
			},
			{
				path: "repositorio/editar/",
				element: <EditRepositorio />,
			},
			{
				path: "repositorio",
				element: <Repositorio />,
			},
		],
	},
];
