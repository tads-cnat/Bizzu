import React from "react";
import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";
import BeeSidebarCommunity from "../Perfil/components/BeeSidebarCommunity/BeeSidebarCommunity";

const LayoutCommunity: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex pt-[70px] h-[calc(100vh-70px)]">
				<div
					className={`
						fixed top-[70px] left-0 h-full bg-white z-40 border-r border-gray-200 
						transition-transform duration-300
						w-[250px]-translate-x-full
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
				<aside className="fixed top-[70px] right-4 w-[22%] min-h-screen border-r border-gray-300 flex flex-col justify-start px-3 py-4 bg-white z-40 overflow-y-auto gap-4">
					<BeeSidebarCommunity />
				</aside>
			</div>
		</>
	);
};

export default LayoutCommunity;
