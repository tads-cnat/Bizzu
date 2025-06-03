export interface ICategoria {
  id: number;
  nome: string;
  tipo: "tec" | "mat" | "per";
}

export interface IBeeFiltroCategorias {
  categorias: ICategoria[];
  categoriasSelecionadas: number[];
  aoSelecionarCategoria: (id: number) => void;
  aoPesquisar: (termo: string) => void;
}
