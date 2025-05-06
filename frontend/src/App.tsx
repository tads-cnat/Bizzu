import "./App.css";
import BeeTags from "./components/BeeTags/BeeTags";
import CaixaRepositorio from "./components/BeeCaixaRepositorio/BeeCaixaRepositorio"

function App() {
	return (
		<>
			<BeeTags
				label="INFOWEB"
				color="#FCBD18"
			/>

			<CaixaRepositorio
			usuarioIconeUrl="https://i.pravatar.cc/100?img=4"
			usuarioNome="Rielps"
			dataPostagem={new Date(Date.now() - 4 * 60 * 60 * 1000)} // há 4 horas
			tituloPostagem="Pilha Dinâmica"
			descricaoPostagem="Uma bomba que tive que fazer em EDL, deu trabalho mas tá bom"
			tags={[
				{ label: "TADS", color: "#facc15" },
				{ label: "EDNL", color: "#f97316" },
				{ label: "3P", color: "#a855f7" },
			]}
			/>

		</>
	);
}

export default App;

//Estou está página inicialmente para testes
