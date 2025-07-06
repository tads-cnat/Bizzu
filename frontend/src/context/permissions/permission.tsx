import {createContext, useEffect, useState} from "react";
import {IContextPermission} from "./interfaces/IContextPermission";
import {IProviderPermission} from "./interfaces/IProviderPermission";
import {Types} from "../../permissions/types";
import {getPermissions} from "../../utils/getPermissions";
import {useLocation} from "react-router-dom";
import acessAuth from "../../utils/acessAuth";
import getLocalStorage from "../../utils/getLocalStorage";

export const PermissionContext = createContext<IContextPermission>(
	{} as IContextPermission,
);

const PermissionProvider = ({children}: IProviderPermission) => {
	const [path, setPath] = useState<string>(useLocation().pathname);
	const {papel} = acessAuth();

	const [role, setRole] = useState(papel);
	const [permissions, setPermissions] = useState<Record<Types, boolean>>({
		[Types.READ]: false,
		[Types.CREATE]: false,
		[Types.UPDATE]: false,
		[Types.DELETE]: false,
	});

	const {username} = acessAuth();

	const location = useLocation();
	useEffect(() => {
		if (papel) {
			const userPermissions = getPermissions(
				location.pathname,
				papel,
				username,
			);
			setPermissions(userPermissions);
		} else {
			if (username != undefined) {
				setRole(getLocalStorage().papel);
			}
		}
	}, [path, role]);

	useEffect(() => {
		setPath(location.pathname);
	}, [location]);

	return (
		<>
			<PermissionContext.Provider value={{permissions}}>
				{children}
			</PermissionContext.Provider>
		</>
	);
};

export default PermissionProvider;
