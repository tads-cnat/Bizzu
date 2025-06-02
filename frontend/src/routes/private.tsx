import Layout from "../features/Layout/Layout";
import Read from "../features/Postagem/Read";

export const privatesRoutes = [
	{
		path: "bizzu/",
		element: <Layout />,
		children: [
			{
				path: "postagem/:id",
				element: <Read />,
			},
		],
	},
];
