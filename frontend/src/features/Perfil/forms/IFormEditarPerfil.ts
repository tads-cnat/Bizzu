export interface IFormEditarPerfil {
	nome?: string;
	descricao?: string;
	imagemPerfil?: string;
	linkedinUrl?: string;
	escolaFormacao?: string;
	instituicaoAtual?: string;
	onClose?: () => void;
}
