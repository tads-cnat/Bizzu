export type tipo = "success" | "info" | "warning" | "error";

export interface IBeeAlert {
	// O tipo de mensagem
	typeAlert: tipo;
	// A mensagem que vai exibir
	messageAlert: string;
}
