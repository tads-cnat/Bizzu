import "./App.css";
import BeePost from "./components/BeePost/BeePost";

import BeeHeader from "./components/BeeHeader/BeeHeader";

function App() {
const dummyPost = {
	usuario: {
		name: "Luiz Fernando",
		date: new Date("2025-05-07T08:00:00"),
		image: "/eu.jpg",
	},
	conteudo: "Esse é um post de teste com uma imagem e algumas tags.",
	imagemPost: "https://i.imgur.com/1kLxFNS.png",
	imagemUsuarioLogado: "/eu.jpg",
	tags: [
		{ label: "INFOWEB", color: "#F2F2F7" },
		{ label: "REACT", color: "#F2F2F7" },
		{ label: "TESTE", color: "#F2F2F7" },
	],
	curtidas: 23,
	comentarios: 5,
};


	return (
		<>
			<BeeHeader />
		</>
	);
}

export default App;

