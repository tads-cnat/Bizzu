export interface IBeeCommunity{
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
    banner?: string
    anoFundacao: string;
    coordenacao: string;
    segue?: number[];
    seguido_por?: number[];
}