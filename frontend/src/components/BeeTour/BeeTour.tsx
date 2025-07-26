import {useState} from "react";
import {Tour} from "antd";
import type {TourProps} from "antd";
import {IBeeTour} from "./IBeeTour";

const BeeTour = ({com1, com2, com3}: IBeeTour) => {
	const [open, setOpen] = useState<boolean>(true);

	const steps: TourProps["steps"] = [
		{
			title: "Bem-vindo ao Bizzu!!!",
			description:
				"É muito importante para nós ter você aqui. Vamos conhecer um pouquinho?",
			target: () => com1.current,
			nextButtonProps: {
				children: "Quero conhecer mais",
				style: {
					backgroundColor: "#FCBD18",
					color: "#fff",
					borderRadius: "8px",
					height: "28px",
					padding: "0 24px",
				},
			},
			prevButtonProps: {
				children: "Quero descobir sozinho",
				style: {
					backgroundColor: "bg-gray-300",
					color: "#333",
					height: "28px",
					padding: "0 24px",
					borderRadius: "8px",
				},
			},
		},
		{
			title: "Publicações",
			description:
				"Crie postagens, compartilhe repositórios e acompanhe tudo de um só lugar. Seu conteúdo, sua vitrine!",
			target: () => com2.current,
			nextButtonProps: {
				children: "Próximo",
				style: {
					backgroundColor: "#FCBD18",
					color: "#fff",
					borderRadius: "8px",
					height: "28px",
					padding: "0 24px",
				},
			},
			prevButtonProps: {
				children: "Voltar",
				style: {
					backgroundColor: "bg-gray-300",
					color: "#333",
					height: "28px",
					padding: "0 24px",
				},
			},
		},
		{
			title: "Informações pricipais",
			description:
				"Aqui é onde o seu universo começa a ganhar forma explore suas principais informações e descubra tudo o que você pode fazer. Tem muito mais além do que parece à primeira vista... então bora fuçar!",
			target: () => com3.current,
			nextButtonProps: {
				children: "Finalizar Tour",
				style: {
					backgroundColor: "#FCBD18",
					color: "#fff",
					borderRadius: "8px",
					height: "28px",
					padding: "0 24px",
				},
			},
			prevButtonProps: {
				children: "Voltar",
				style: {
					backgroundColor: "bg-gray-300",
					color: "#333",
					height: "28px",
					padding: "0 24px",
				},
			},
		},
	];
	return (
		<>
			<Tour
				open={open}
				onClose={() => setOpen(false)}
				steps={steps}
				indicatorsRender={(current, total) => (
					<div style={{display: "flex", gap: 8}}>
						{Array.from({length: total}).map((_, index) => (
							<div
								key={index}
								style={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									backgroundColor: index === current ? "#FCBD18" : "#ccc",
								}}
							/>
						))}
					</div>
				)}
			/>
		</>
	);
};

export default BeeTour;
