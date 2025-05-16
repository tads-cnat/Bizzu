import {privatesRoutes} from "./private";
import {publicRoutes} from "./public";
import {useRoutes} from "react-router-dom";

export const AllRoutes = () => {
	const routes = [...privatesRoutes, ...publicRoutes];
	return useRoutes([...routes]);
};
