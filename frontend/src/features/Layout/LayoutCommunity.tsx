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
				<div className="flex-1 mx-auto w-full md:ml-[220px] md:mr-[300px] px-4 py-4 overflow-y-auto pr-2 py-4 space-y-4">
					<div className="max-w-[600px] mx-auto">
						<Outlet />
					</div>
				</div>
				<aside className="hidden lg:block fixed top-[70px] right-0 w-[300px] h-[calc(100vh-70px)] px-3 py-4 bg-white border-l border-gray-300 overflow-y-auto">
					<BeeSidebarCommunity />
				</aside>
			</div>
		</>
	);
};

export default LayoutCommunity;
