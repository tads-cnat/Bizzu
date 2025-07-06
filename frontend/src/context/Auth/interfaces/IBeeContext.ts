import { IBeeUsuario } from "../../../components/BeeFTPerfil/IBeeUsuario";


export interface IBeeContext extends IBeeUsuario{
    //Função que vai autentica usuaŕio 
    autenticar: (username:string, password:string) => Promise<void>;
    //Funçãoque vai ser usada para deslogar usuário 
    deslogar: () => void;
}
