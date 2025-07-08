import {Empty} from "antd";
import acessAuth from "../utils/acessAuth";
import {privatesRoutes} from "./private";
import {publicRoutes} from "./public";
import {useRoutes} from "react-router-dom";

export const AllRoutes = () => {
	const semRota = {
		path: "*",
		element: (
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description="Essa página não existe"
			/>
		),
	};
	const {token} = acessAuth();
	if (token !== undefined)
		return useRoutes([...privatesRoutes, ...publicRoutes, semRota]);
	else return useRoutes([...publicRoutes, semRota]);
};
