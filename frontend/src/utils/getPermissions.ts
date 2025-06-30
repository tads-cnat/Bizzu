import { Types } from "../permissions/types"
import { Permissions } from "../permissions/permissions";
import { isUsername } from "./path";
import { Roles } from "../permissions/roles";

export const getPermissions = (path: string,role: Roles, username:string): Record<Types, boolean> => {

    const permissions: Record<Types, boolean> = {
		[Types.READ]: false,
		[Types.CREATE]: false,
		[Types.UPDATE]: false,
		[Types.DELETE]: false,
	};
    const user = isUsername(path);
	for (const permission in permissions) {
        let atribuiPermissao; 
        
        console.log("Entrou: ", path);
        if (user){
            atribuiPermissao = Permissions['/:username/'][permission as Types]
        }
        else atribuiPermissao = Permissions[path][permission as Types];
        
        if (atribuiPermissao?.includes(role)) { //Se aquele papel tiver permissão para aquilo
            if (path.slice(1,path.length - 1) == username && permission != "read"){ // Se para fazer algo precisar estar na conta pessoal ele verifica se tá logado e limita
                permissions[permission as Types] = true;
            }
            else if (permission == "read") permissions[permission as Types] = true;
            else permissions[permission as Types] = false;
        }
    }
    
	return permissions;
};