export type tipoDenuncia ={
    value: string;
    label: string;
}

export interface IBeeDenuncia {
    // Props que carrega os tipos das denúncias do backend
	tipos: tipoDenuncia[]; 
    // Função utilizada para pegar o tipo de denuncia selecionado
    onTipoSelecionado: (tipo: string) => void;

}