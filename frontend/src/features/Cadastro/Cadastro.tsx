import background from "../../assets/LOGIN.svg";
import FormSig from "./Forms/FormSig";

const Cadastro: React.FC = () => {
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
				<div
					className="
					w-full mr-8 sm:max-w-md md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-center md:w-1/2"
				>
					<div className="bg-white p-8 w-full">
						<FormSig />
					</div>
				</div>
			</div>
		</>
	);
};

export default Cadastro;
