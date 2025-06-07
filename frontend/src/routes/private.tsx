import Layout from "../features/Layout/Layout";
import EditPostagem from "../features/Postagem/Edit";
import CreatePostagem from "../features/Postagem/Create";
import Perfil from "../features/Perfil/Perfil";

export const privatesRoutes = [
	{
		path: "bizzu/",
		element: <Layout />,
		children: [
			{
				path: ":username",
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
		],
	},
];
