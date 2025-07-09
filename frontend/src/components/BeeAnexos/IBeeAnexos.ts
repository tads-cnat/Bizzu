export interface IBeeAnexos {
  // String responsável por representar o nome e o tipo de arquivo exemplo: "arquivo.txt"
  path: string
  // Função opcional para lidar com a exclusão do anexo
  onDelete?: () => void
}
