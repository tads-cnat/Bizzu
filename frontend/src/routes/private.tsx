import Layout from "../features/Layout/Layout";

export const privatesRoutes = [
	{
		path: "bizzu/",
		element: <Layout />,
		children: [
			// {
			// 	path: "postagem/",
			// 	element: <Read />,
			// },
		],
	},
];
