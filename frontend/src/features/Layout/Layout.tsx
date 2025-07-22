import React from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";

const Layout: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex flex-col flex-1 items-start w-200 mt-20 ">
				<BeeSidebar />
				<div className="fixed top-[80px] ml-70 w-[59%] h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-full max-w-[500px] px-4 flex flex-col">
						<Outlet />
					</div>
				</div>
				<aside className="fixed top-[80px] right-4 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
					<BeePerfilSidebar />
				</aside>
			</div>
		</>
	);
};

export default Layout;
