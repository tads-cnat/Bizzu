import React, {useState} from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";

const Layout: React.FC = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<BeeHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

			<div className="flex pt-[70px] h-[calc(100vh-70px)]">
				<div
					className={`
						fixed top-[70px] left-0 h-full bg-white z-40 border-r border-gray-200 
						transition-transform duration-300
						w-[250px]
						${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
						md:translate-x-0 md:w-[300px]
					`}
				>
					<BeeSidebar />
				</div>

				<div className="flex-1 mx-auto w-full md:ml-[220px] md:mr-[250px] px-4 py-4 overflow-y-auto">
					<div className="max-w-[600px] mx-auto">
						<Outlet />
					</div>
				</div>

				<aside className="hidden lg:block fixed top-[70px] right-0 w-[250px] h-[calc(100vh-70px)] px-3 py-4 bg-white border-l border-gray-300 overflow-y-auto">
					<BeePerfilSidebar />
				</aside>
			</div>
		</>
	);
};

export default Layout;
