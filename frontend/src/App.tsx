import "./App.css";
import {
	House,
	Users,
	Globe,
  } from '@phosphor-icons/react';

  import { BeeSidebar } from './components/BeeSidebar/BeeSidebar.tsx';

function App() {

	return (
		<>
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