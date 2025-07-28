export interface IBeeAbasPerfil {
    //Quem estará inicialmente selecionado
	initialActiveKey?: string;
    //O conteúdo que vai ter naquela tab
    children: React.ReactNode[];
    //Perfil é daquele usuário
    owner: boolean;
}