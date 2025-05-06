export interface IBeeAbasPerfil {'' 
     // Texto para ser exibido na tag
    abas: string[];
     // Texto da aba fica destacado quando selecionado pelo usúario
    onAbaSelect?: (abas: string) => void;
}