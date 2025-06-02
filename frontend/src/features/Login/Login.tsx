import BeeFormAuth from "../../components/BeeFormAuth/BeeFormAuth";
import background from "../../assets/LOGIN.svg";

const Login: React.FC = () => {
	return (
		<>
			<div
				className="relative h-screen bg-cover bg-center"
				style={{
					backgroundImage: `url(${background})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-y-0 right-0 flex items-center justify-center w-1/2">
					<div className="bg-white p-8 rounded-md shadow-lg">
						<BeeFormAuth />
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
