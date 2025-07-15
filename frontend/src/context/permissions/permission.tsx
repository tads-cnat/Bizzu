import {createContext, useEffect, useState} from "react";
import {IContextPermission} from "./interfaces/IContextPermission";
import {IProviderPermission} from "./interfaces/IProviderPermission";
import {Types} from "../../permissions/types";
import {getPermissions} from "../../utils/getPermissions";
import {useLocation} from "react-router-dom";
import acessAuth from "../../utils/acessAuth";

export const PermissionContext = createContext<IContextPermission>(
	{} as IContextPermission,
);

const PermissionProvider = ({children}: IProviderPermission) => {
	const {papel, username} = acessAuth();
	const location = useLocation();
	const [permissions, setPermissions] = useState<Record<Types, boolean>>({
		[Types.READ]: false,
		[Types.CREATE]: false,
		[Types.UPDATE]: false,
		[Types.DELETE]: false,
	});

	useEffect(() => {
		if (papel) {
			const userPermissions = getPermissions(
				location.pathname,
				papel,
				username,
			);
			setPermissions(userPermissions);
		}
	}, [location.pathname, papel, username]);

	return (
		<>
			<PermissionContext.Provider value={{permissions}}>
				{children}
			</PermissionContext.Provider>
		</>
	);
};

export default PermissionProvider;
