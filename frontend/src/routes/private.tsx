import Layout from "../features/Layout/Layout";
import EditPostagem from "../features/Postagem/Edit";
import CreatePostagem from "../features/Postagem/Create";
import Read from "../features/Postagem/Read";

export const privatesRoutes = [
	{
		path: "bizzu/",
		element: <Layout />,
		children: [
			{
				path: "postagem/",
				element: <Read />,
			},
			{
				path: "postagem/criar",
				element: <CreatePostagem />,
			},
			{
				path: "postagem/editar/:id",
				element: <EditPostagem />,
			},
		],
	},
];
