import Layout from "../features/Layout/Layout";
import EditPostagem from "../features/Postagem/Edit";
import CreatePostagem from "../features/Postagem/Create";
import Perfil from "../features/Perfil/Perfil";
import EditRepositorio from "../features/Repositorio/Edit";
import CreateRepositorio from "../features/Repositorio/Create";
import Repositorio from "../features/Repositorio/Repositorio";
import LayoutFeed from "../features/Layout/LayoutFeed";
import PerfilComunidade from "../features/Perfil/PerfilComunidade";
import LayoutCommunity from "../features/Layout/LayoutCommunity";
import DetalhesRepositorio from "../features/Repositorio/Detalhes";
import EditPerfil from "../features/Perfil/Edit";
import CreateComunidade from "../features/Comunidade/Create";
import EditComunidade from "../features/Comunidade/Edit";
import RepositoriosFavoritos from "../features/Repositorio/RepositoriosFavoritos";

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
				path: "repositorio/criar/",
				element: <CreateRepositorio />,
			},
			{
				path: "repositorio/editar/:id",
				element: <EditRepositorio />,
			},
			{
				path: "repositorio",
				element: <Repositorio />,
			},
			{
				path: "editar",
				element: <EditPerfil />,
			},
			{
				path: "repositorio/:id",
				element: <DetalhesRepositorio />,
			},
			{
				path: "comunidade/criar/",
				element: <CreateComunidade />,
			},
			{
				path: "comunidade/editar/:id",
				element: <EditComunidade />,
			},
			{
				path: "repositorios-favoritos",
				element: <RepositoriosFavoritos />,
			},
		],
	},
	{
		path: "",
		element: <LayoutCommunity />,
		children: [
			{
				path: "comunidade/:id",
				element: <PerfilComunidade />,
			},
		],
	},
];
