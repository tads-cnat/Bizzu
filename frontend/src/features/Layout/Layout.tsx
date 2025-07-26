import React from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";

const Layout: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex flex-col flex-1 items-start w-1/5 mt-20">
				<BeeSidebar />
				<div className="fixed top-[70px] ml-70 w-[66%] h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-[550px] px-4 flex flex-col">
						<div className="mb-4">
							<Outlet />
						</div>
					</div>
				</div>
				<aside className="fixed top-[70px] right-4 w-[22%] min-h-screen flex flex-col justify-start px-3 py-4 bg-white z-40 overflow-y-auto gap-4 border-r border-gray-300">
					<BeePerfilSidebar />
				</aside>
			</div>
		</>
	);
};

export default Layout;
