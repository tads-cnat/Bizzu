import React, {useState} from "react";
import {IBeeAbasPerfil} from "./IBeeAbasPerfil";
import "./styles.css";
import {Tabs} from "antd";

const BeeAbasPerfil: React.FC<IBeeAbasPerfil> = ({
	children,
	initialActiveKey,
	papel,
	owner,
	isComunidade,
}) => {
	const childrenArray = React.Children.toArray(children);
	const abas = [];
	if (papel === "mod" || papel == "int") {
		abas.push({
			key: "1",
			label: <span className="text-[#333333] font-medium">Postagens</span>,
			children: <>{childrenArray[0]}</>,
		});
		abas.push({
			key: "2",
			label: <span className="text-[#333333] font-medium">Repositórios</span>,
			children: <>{childrenArray[1]}</>,
		});
	}
	if (papel === "mod" && owner) {
		abas.push({
			key: "4",
			label: <span className="text-[#333333] font-medium">Solicitações</span>,
			children: <>{childrenArray[3]}</>,
		});
	}
	if (papel === "mod" && owner) {
		abas.push({
			key: "3",
			label: <span className="text-[#333333] font-medium">Categorias</span>,
			children: <>{childrenArray[2]}</>,
		});
		abas.push({
			key: "5",
			label: <span className="text-[#333333] font-medium">Denúncias</span>,
			children: <>{childrenArray[4]}</>,
		});
	}
	if (papel === "adm" && owner && !isComunidade) {
		abas.push({
			key: "6",
			label: <span className="text-[#333333] font-medium">Comunidades</span>,
			children: <>{childrenArray[5]}</>,
		});
	}
	if (papel === "adm" && isComunidade) {
		abas.push({
			key: "1",
			label: <span className="text-[#333333] font-medium">Postagens</span>,
			children: <>{childrenArray[0]}</>,
		});
		abas.push({
			key: "2",
			label: <span className="text-[#333333] font-medium">Repositórios</span>,
			children: <>{childrenArray[1]}</>,
		});
	}
	const [activeKey, setActiveKey] = useState(initialActiveKey || abas[0].key);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	return (
		<>
			<Tabs
				type="line"
				activeKey={activeKey}
				onChange={onChange}
				items={abas}
			/>
		</>
	);
};

export default BeeAbasPerfil;
