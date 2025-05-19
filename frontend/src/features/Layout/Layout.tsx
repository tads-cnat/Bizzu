import BeeHeader from "../../components/BeeHeader/BeeHeader";
import {Outlet} from "react-router";
import {BeeSidebar} from "../../components/BeeSidebar/BeeSidebar";

const Layout: React.FC = () => {
	return (
		<>
			<BeeHeader />
			<div className="flex flex-col lg:flex-row flex-1 items-start mt-4 px-4 gap-6">
				<BeeSidebar
					userName="Rielps"
					userImage="https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//20146321/a59600ff-f32e-40c9-b3c5-631c3a747d30.png&w=1024&h=1024&f=webp"
					items={[]}
				/>
				<div className="flex justify-center w-full max-w-2xl shadow-md rounded-xl bg-[#F2F2F7] p-4 min-h-screen ml-4">
					<Outlet />
				</div>
				<aside className="w-full max-w-sm shadow-md rounded-xl bg-[#F2F2F7] p-4 min-h-screen ml-4">
					<p>Adicionar posteriormente os repositórios</p>
				</aside>
			</div>
		</>
	);
};

export default Layout;
