import {Hexagon} from "@phosphor-icons/react";
import "./App.css";
import BeeSelect from "./components/BeeSelect/BeeSelect";

const people = [
	{
		value: 1,
		label: "Wade Cooper",
	},
	{
		value: 2,
		label: "Arlene Mccoy",
	},
];
//Esse people tem propósito de teste pois ele na verdade vai ser o retorno JSON da API que vai ter exatamente isso

function App() {
	return (
		<>
			<BeeSelect
				placeholder="Selecione sua comunidade"
				options={people}
				icon={Hexagon}
			/>
		</>
	);
}

export default App;

//Estou está página inicialmente para testes
