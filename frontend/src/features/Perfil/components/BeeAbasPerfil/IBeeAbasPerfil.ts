export interface IBeeAbasPerfil {
    //Quem estará inicialmente selecionado
	initialActiveKey?: string;
    //O conteúdo que vai ter naquela tab
    children: React.ReactNode[];
    //Perfil é daquele usuário
    owner: boolean;
    //Papel do usuário
    papel:string;
    // para dizer se é comunidade ou não
    isComunidade?: boolean;
}