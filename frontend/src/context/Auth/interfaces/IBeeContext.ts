export interface IBeeContext {
    // Propriedades do usuário
    username: string;
    token: string;
    id: number;
    papel: string;
    
    // Funções de autenticação
    autenticar: (username:string, password:string) => Promise<void>;
    deslogar: () => void;
    atualizarUsuario: () => void;
}
