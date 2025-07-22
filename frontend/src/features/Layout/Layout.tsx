import React from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";

const Layout: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="fixed top-[80px] w-1/5 min-h-screen shadow-md flex flex-col justify-start rounded-xl bg-white z-40 overflow-y-auto">
				<BeeSidebar />
				<div className="fixed top-[80px] left-1/5 w-200 h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-full max-w-[500px] px-4 flex flex-col">
						<Outlet />
					</div>
				</div>
				<aside className="fixed top-[80px] right-2 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto">
					<BeePerfilSidebar />
				</aside>
			</div>
		</>
	);
};

export default Layout;
