import "./App.css";
import BeeTags from "./components/BeeTags/BeeTags";
import { BeeButton } from './components/BeeButtons/BeeButtons';
import { FaSignOutAlt, FaFilter, FaPlus, FaPen, FaEye, FaUserPlus } from 'react-icons/fa';


function App() {
	return (
		<>
			<BeeTags
				label="INFOWEB"
				color="#FCBD18"
			/>

			

<div className="flex flex-col gap-3 p-4 bg-gray-900 w-30 h-100">
      <BeeButton label="Sair" icon={<FaSignOutAlt />} variant="danger" />
      <BeeButton label="Filtrar" icon={<FaFilter />} variant="warning" />
      <BeeButton label="Novo" icon={<FaPlus />} variant="primary" />
      <BeeButton label="Postar" variant="secondary" />
      <BeeButton label="Ver mais" variant="secondary" />
      <BeeButton label="Editar" icon={<FaPen />} variant="neutral" />
      <BeeButton label="Ver" icon={<FaEye />} variant="neutral" />
      <BeeButton label="Seguir" icon={<FaUserPlus />} variant="primary" />
    </div>
				
		</>
		
	);
}

export default App;

//Estou está página inicialmente para testes
