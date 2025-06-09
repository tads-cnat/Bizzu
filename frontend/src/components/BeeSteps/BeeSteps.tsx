import {Steps} from "antd";
import {IBeeSteps} from "./IBeeSteps";

const BeeSteps = ({current}: IBeeSteps) => (
	<Steps
		size="small"
		current={current}
		style={{color: "#333333"}}
		items={[
			{
				title: "Autenticação",
			},
			{
				title: "Sobre você",
			},
			{
				title: "Comunidade",
			},
		]}
	/>
);

export default BeeSteps;

//Componente do cadastro
