import acessAuth from "../utils/acessAuth";
import {privatesRoutes} from "./private";
import {publicRoutes} from "./public";
import {useRoutes} from "react-router-dom";

export const AllRoutes = () => {
	const {username} = acessAuth();
	if (username !== undefined)
		return useRoutes([...privatesRoutes, ...publicRoutes]);
	else useRoutes([...publicRoutes]);
};
