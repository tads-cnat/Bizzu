export interface Comentario {
    id: number
    conteudo: string
    dataPostagem: string
    usuario: {
      id: number
      username: string
      nome: string
      imagemPerfil?: string
    }
    postagem: number
  }
  
  export interface ComentariosResponse {
    comentarios: Comentario[]
    total: number
  }
  