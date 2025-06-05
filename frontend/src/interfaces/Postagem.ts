// Interface para usuário
export interface Usuario {
  id?: number
  nome: string
  imagemPerfil?: string
}

// Interface para postagem conforme retornada pelo backend
export interface Postagem {
  id: number
  texto: string
  imagem?: string
  dataPublicacao: string
  usuario?: Usuario | null
  comunidade?: number | null
  categorias: number[]
  curtidas?: number
  comentarios?: number
}

// Interface para valores do formulário de postagem
export interface PostagemFormValues {
  texto: string
  imagem?: string | null
  comunidade?: { label: string; value: string | number } | undefined
  categorias: number[]
}

// Interface para tag - corrigida para ser mais específica
export interface Tag {
  label: string
  color: string
  tipo: "tec" | "mat" | "per" // Removido o opcional para ser mais específico
}
