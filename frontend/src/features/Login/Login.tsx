import BeeFormAuth from "../../components/BeeFormAuth/BeeFormAuth";
import background from "../../assets/LOGIN.svg";

const Login: React.FC = () => {
	return (
		<div
			className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
			style={{
				backgroundImage: `url(${background})`,
			}}
		>
			<div
				className="
					w-full mr-8 sm:max-w-md md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-center md:w-1/2"
			>
				<div className="bg-white p-8 w-full">
					<BeeFormAuth />
				</div>
			</div>
		</div>
	);
};

export default Login;
