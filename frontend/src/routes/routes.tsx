import acessAuth from "../utils/acessAuth";
import {privatesRoutes} from "./private";
import {publicRoutes} from "./public";
import {useRoutes} from "react-router-dom";

export const AllRoutes = () => {
	const {token} = acessAuth();
	if (token !== undefined)
		return useRoutes([...privatesRoutes, ...publicRoutes]);
	else return useRoutes([...publicRoutes]);
};
