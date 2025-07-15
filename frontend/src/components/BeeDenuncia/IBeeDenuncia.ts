export type tipoDenuncia = "Spam" | "Ofensivo" | "Fake news" | "Outro";

export type entidadeDenunciada = "comentario" | "postagem" | "repositorio";

export interface IBeeDenuncia {
    // ID da entidade denunciada
	id?: number;
    // Tipo de item denunciado
	entidade?: entidadeDenunciada; 
    // Um ou mais tipos de denúncia
	tipos: tipoDenuncia[]; 

}