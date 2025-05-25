import Layout from "../features/Layout/Layout";
import EditPostagem from "../features/Postagem/Edit";
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
				path: "postagem/editar",
				element: <EditPostagem />,
			},
		],
	},
];
