import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";

const Layout: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex flex-col lg:flex-row flex-1 items-start mt-4 px-4 gap-6 bg-[#F2F2F7] ">
				<BeeSidebar items={[]} />
				<div className="fixed top-[80px] left-1/5 w-200 h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-full max-w-[500px] px-4 flex flex-col">
						<Outlet />
					</div>
				</div>
				<aside className="fixed top-[80px] right-4 w-100 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40">
					<p>Adicionar informações do perfil aqui</p>
				</aside>
			</div>
		</>
	);
};

export default Layout;
