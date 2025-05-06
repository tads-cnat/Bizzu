import "./App.css";
import BeeTags from "./components/BeeTags/BeeTags";
import BeeSearchBar from "./components/BeeSearchBar/BeeSearchBar";

function App() {

	return (
		<>
			<BeeTags
				label="INFOWEB"
				color="#FCBD18"
			/>

			<BeeSearchBar onSearch={(value) => console.log("Busca:", value)} />
		</>
	);
}

export default App;

//Estou está página inicialmente para testes  altere para a maneira que deveria ser
