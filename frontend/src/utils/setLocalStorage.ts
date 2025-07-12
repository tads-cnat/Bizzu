import { IBeeUsuario } from "../components/BeeFTPerfil/IBeeUsuario"

const setLocalStorage = (user:IBeeUsuario | null ) => {
    localStorage.setItem("usuario", JSON.stringify(user));
};

export default setLocalStorage;