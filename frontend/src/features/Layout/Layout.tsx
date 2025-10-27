import React from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";

const Layout: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex mt-[70px] h-[calc(100vh-70px)]">
				<div className="w-1/5 min-w-[200px] h-full fixed left-0 top-[70px] bg-white z-30 border-r border-gray-200">
					<BeeSidebar />
				</div>

				<div className="flex-1 ml-[20%] mr-[22%] h-full flex flex-col justify-start items-center overflow-y-auto px-3 py-4">
					<div className="w-[550px] px-4 flex flex-col">
						<div className="max-h-full overflow-y-auto">
							<Outlet />
						</div>
					</div>
				</div>

				<aside className="fixed top-[70px] right-0 w-[22%] h-[calc(100vh-70px)] flex flex-col justify-start px-3 py-4 bg-white z-40 overflow-hidden border-l border-gray-300">
					<BeePerfilSidebar />
				</aside>
			</div>
		</>
	);
};

export default Layout;
