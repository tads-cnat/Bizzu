export interface IBeeFormacaoAcademicaCard {
  /** Uma lista (array) de objetos contendo as informações de cada formação acadêmica a ser exibida. */
  formacoes: {
    /** O nome da instituição de ensino. Ex: "IFRN" */
    instituicao: string
    /** O nome do curso. Ex: "Redes" */
    curso: string
  }[]

  /** Função a ser chamada quando o usuário clicar no botão de adicionar uma nova formação. */
  onAdicionar?: () => void

  /** Função a ser chamada quando o usuário clicar no botão para editar as formações existentes. */
  onEditar?: () => void
}