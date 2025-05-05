import "./App.css";
import BeeTags from "./components/BeeTags/BeeTags";
import { BeeButton } from './components/BeeButtons/BeeButtons';
import { FaSignOutAlt, FaFilter, FaPlus, FaPen, FaEye, FaUserPlus, FaAd, FaBed, FaAngry } from 'react-icons/fa';

// Ex de como usar o onClick do componente botão, no seu app você cria a sua função normalmente, no botão você irá criar o 
// onClick={} (basta clicar tab que ele ja monta o onClick para você) e colocar dentro o nome da sua função, e ele ja irá 
// fazer o que a sua função mandar, como no exemplo a baixo

const alerta = () => {
  alert('Você está sendo alertado!');
};

const teste = () => {
  alert('Este é um teste!');
};


function App() {
	return (
		<>
			<BeeTags
				label="INFOWEB"
				color="#FCBD18"
			/>
			

<div className="flex flex-col ml-30 gap-3 p-4 bg-gray-900 w-30 h-auto">
      <BeeButton label="Sair" icone={<FaSignOutAlt />} variante="negativo" />
      <BeeButton label="Filtrar" icone={<FaFilter />} variante="aviso" />
      <BeeButton label="Novo" icone={<FaPlus />} variante="primaria" />
      <BeeButton label="Postar" variante="secundaria" />
      <BeeButton label="Ver mais" variante="secundaria" />
      <BeeButton label="Editar" icone={<FaPen />} variante="neutro" />
      <BeeButton label="Ver" icone={<FaEye />} variante="neutro" />
      {/* Aqui tem o exemplo de desabilitado, onde o botão fica opaco, sem cursor-pointer e o mouse ainda fica como negativo */}
      <BeeButton label="Seguir" icone={<FaUserPlus />} desabilitado variante="primaria" />
      {/* E aqui temos o exemplo da utilização de uma função pelo onClick do botão */}
      <BeeButton label="Alertar" icone={<FaAd />} variante="aviso" onClick={alerta} />
    </div>
      <div>
        {/* Exemplo de como criar seu próprio botão com o tailwind, utilizando o className. (até o momento não funcionando com o uso da variante) */}
      <BeeButton classesDefault={false} label="Teste" icone={<FaAngry/>} className="flex gap-2 items-center justify-center bg-blue-300 w-20 h-10 rounded-md cursor-pointer" onClick={teste} />
      </div>
    </>
		
	);
}

export default App;

//Estou está página inicialmente para testes
