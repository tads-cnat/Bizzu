export type tipoAlerta = "success" | "info" | "warning" | "error";

export interface IBeeAlert {
	// O tipo de mensagem
	typeAlert: tipoAlerta;
	// A mensagem que vai exibir
	messageAlert: string;
}
