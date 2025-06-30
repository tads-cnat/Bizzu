import { IBeeUsuario } from "../components/BeeFTPerfil/IBeeUsuario"

const setRoleLocalStorage = (role:IBeeUsuario | null ) => {
    localStorage.setItem("role", JSON.stringify(role));
};

export default setRoleLocalStorage;