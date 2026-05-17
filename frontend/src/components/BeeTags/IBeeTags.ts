export type colors = "magenta" | "orange" | "cyan";
export type types = "tec" | "mat" | "per";

export default interface IBeeTags {
  // Texto para ser exibido na tag
  label: string;
  // Cor da tag que se altera dependendo de onde ela é inserida
  color: colors;
  //Tipo da tag
  tipo?: types;
// eslint-disable-next-line semi
};
