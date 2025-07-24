import React from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeeSidebarCommunity from "../Perfil/components/BeeSidebarCommunity/BeeSidebarCommunity";

const LayoutCommunity: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex flex-col flex-1 items-start w-1/5 mt-20">
				<BeeSidebar />
				<div className="fixed top-[80px] ml-70 w-[66%] h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-[550px] px-4 flex flex-col">
						<Outlet />
					</div>
				</div>
				<aside className="fixed top-[80px] right-4 w-[22%] min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
					<BeeSidebarCommunity />
				</aside>
			</div>
		</>
	);
};

export default LayoutCommunity;
