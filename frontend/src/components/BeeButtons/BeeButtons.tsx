import {BeeButtonProps} from "./IBeeButtons";

// Aqui estamos criando a base dos botões, todos eles seguem um padrão, e esse padrão é determinado aqui
// Caso precise modificar o modelo do botão de forma específica, modificar aqui, criando uma constante e adicionando ao seu botão
// a sua constante criada. Lembre-se de nunca mexer nas especificações bases do componente, pois pode gerar atritos no restante
// no mais chamar Luiz Roberto para resolver isso

export const BeeButton = ({
	label,
	icone,
	variante = "primaria",
	onClick,
	desabilitado = false,
	classesDefault = true,
	className = "",
	type = "submit",
}: BeeButtonProps) => {
	// Aqui estão as classes defaults em tailwind para os botões
	const classesPrimarias =
		"flex items-center justify-center gap-2 px-4 py-2 rounded-md min-h-[36px] font-medium text-sm transition-all duration-200";
	// Aqui está a classe para botões desabilitados
	const classesDesabilitado = "opacity-50 cursor-not-allowed";
	const classeAtivo = "cursor-pointer";

	// Aqui são as variáveis existentes, então ao criar uma nova, adicionar a cor do botão, a cor do texto e o hover dela aqui!
	const classesVariantes = {
		primaria: "bg-[#058B92] text-white hover:bg-teal-700 cursor",
		secundaria: "bg-teal-500 text-white hover:bg-teal-600 cursor",
		negativo: "bg-[#D32F2F] text-white hover:bg-red-700 cursor",
		aviso: "bg-[#FCBD18] text-white hover:bg-yellow-500 cursor",
		neutro: "bg-gray-300 text-black hover:bg-gray-400 cursor",
	}; // Secundaria é opcional

	// Aqui é onde vamos referenciar as classes que criamos para dentro do tailwind do botão principal, então na constante classes nós temos
	// as variantes que criamos dentro das ClassesPrimarias e das Classes Variantes para ele adicionar tanto a cor quanto o modelo do botão
	// e também temos o tailwind do botão desabilitado sendo aplicado caso o desenvolvedor escolha desabilitar o botão

	const classes = classesDefault
		? `${classesPrimarias} ${classesVariantes[variante]} ${
				desabilitado ? classesDesabilitado : classeAtivo
			}`
		: className; // usa as classes personalizadas diretamente

	return (
		// Talvez o desabilitado esteja aparecendo com erro para algumas pessoas, mas ele está funcionando normalmente, não sei o porque
		// ele aparece como erro
		<button
			onClick={onClick}
			disabled={desabilitado}
			className={classes}
			type={type}
		>
			{icone && <span>{icone}</span>}
			<span>{label}</span>
		</button>
	);
};

export default BeeButton;
