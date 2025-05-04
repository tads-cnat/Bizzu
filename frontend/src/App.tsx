import "./App.css";
import BeeTags from "./components/BeeTags/BeeTags";
import BeeAbasPerfil from "./components/BeeAbasPerfil/BeeAbasPerfil"; // ⬅️ novo import

function App() {
	const abas = ["Posts", "Repositórios", "Comentários"];

	const handleAbaSelect = (aba: string) => {
		console.log("Aba selecionada:", aba);
	};

	return (
		<>
			<BeeTags
				label="INFOWEB"
				color="#FCBD18"
			/>

			<div className="mt-6 p-4">
				<BeeAbasPerfil abas={abas} onAbaSelect={handleAbaSelect} />
			</div>
		</>
	);
}

export default App;


//Estou está página inicialmente para testes


