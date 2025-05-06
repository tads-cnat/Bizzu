import "./App.css";
<<<<<<< HEAD
import {
	House,
	Users,
	Globe,
  } from '@phosphor-icons/react';

  import { BeeSidebar } from './components/BeeSidebar/BeeSidebar.tsx';
=======
import BeeTags from "./components/BeeTags/BeeTags";
import BeeSearchBar from "./components/BeeSearchBar/BeeSearchBar";
>>>>>>> 9277d80 (feat: Cria componente de barra de pesquisa)

function App() {

	return (
		<>
<<<<<<< HEAD
<div className="bg-gray-800">
	
			  <BeeSidebar
		  userName="Riel Lopes"
		  userImage=""
		  items={[
			{
			  label: 'Página inicial',
			  icon: <House size={20} />,
			  onClick: () => console.log('Home'),
			},
			{
			  label: 'Você segue',
			  icon: <Users size={20} />,
			  onClick: () => console.log('Você segue'),
			},
			{
			  label: 'Comunidades',
			  icon: <Globe size={20} />,
			  children: [
				{
				  label: 'TADS',
				  image: '/img/tads.png',
				  onClick: () => console.log('TADS'),
				},
				{
				  label: 'REDES',
				  image: '/img/redes.png',
				  onClick: () => console.log('Redes'),
				},
				{
				  label: 'INFOWEB',
				  image: '/img/infoweb.png',
				  onClick: () => console.log('Infoweb'),
				},
			  ],
			},
		  ]}
		/>
</div>

    </>
	);
}

export default App;
=======
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
>>>>>>> 9277d80 (feat: Cria componente de barra de pesquisa)
