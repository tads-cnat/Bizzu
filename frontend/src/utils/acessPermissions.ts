import { useContext } from "react";
import { PermissionContext } from "../context/permissions/permission";

const acessPermissions = () => {
    const contexto = useContext(PermissionContext);
    if (contexto === undefined) {
        throw new Error("Deu erro no contexto de permissão");
    }
    
    return contexto;
};

export default acessPermissions;