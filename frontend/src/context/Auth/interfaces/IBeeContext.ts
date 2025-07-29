import { IBeeUsuario } from "../../../components/BeeFTPerfil/IBeeUsuario";

export interface IBeeContext extends IBeeUsuario{
    autenticar: (username:string, password:string) => Promise<void>;
    deslogar: () => void;
    atualizarUsuario: () => void;
}
