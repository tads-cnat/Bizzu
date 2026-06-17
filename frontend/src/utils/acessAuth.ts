import { useContext } from "react";
import { AutenticationContext } from "../context/Auth/Auth";

const acessAuth = () => {
    const contexto = useContext(AutenticationContext);
    if (contexto === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    
    return contexto;
};

export default acessAuth;