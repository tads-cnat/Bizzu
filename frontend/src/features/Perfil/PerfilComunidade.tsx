import {useParams} from "react-router-dom";

const PerfilComunidade = () => {
	const identificator = useParams().username;
	console.log(identificator);

	return (
		<>
			<h2>LAAA</h2>
		</>
	);
};

export default PerfilComunidade;
