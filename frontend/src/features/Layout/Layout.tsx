import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";

const Layout: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex flex-col lg:flex-row flex-1 items-start mt-4 px-4 gap-6 bg-[#F2F2F7] ">
				<BeeSidebar
					userName="Rielps"
					userImage="https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//20146321/a59600ff-f32e-40c9-b3c5-631c3a747d30.png&w=1024&h=1024&f=webp"
					items={[]}
				/>
				<div className="fixed top-[80px] left-1/5 w-268 h-[calc(100vh-80px)] flex-1 flex flex-col px-3 py-4 rounded-xl z-40 overflow-y-auto justify-start items-center">
					<div className="w-[500px] flex flex-col">
						<Outlet />
					</div>
				</div>
				<aside className="fixed top-[80px] right-4 w-100 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40">
					<p>Adicionar posteriormente os repositórios</p>
				</aside>
			</div>
		</>
	);
};

export default Layout;
