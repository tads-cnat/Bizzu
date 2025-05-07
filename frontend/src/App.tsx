import "./App.css";
import BeePost from "./components/BeePost/BeePost";

function App() {
	const dummyPost = {
		nome: "Luiz Fernando",
		imagemPerfil: "https://via.placeholder.com/40",
		tempoPostado: "• 4h atrás",
		conteudo: "Esse é um post de teste com uma imagem e algumas tags.",
		imagemPost: "https://i.imgur.com/1kLxFNS.png",
		imagemUsuarioLogado: "https://via.placeholder.com/40",
		tags: [
			{label: "INFOWEB", color: "#F2F2F7"},
			{label: "REACT", color: "#F2F2F7"},
			{label: "TESTE", color: "#F2F2F7"},
		],
		curtidas: 23,
		comentarios: 5,
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="w-[600px]">
				<BeePost {...dummyPost} />
			</div>
		</div>
	);
}

export default App;
