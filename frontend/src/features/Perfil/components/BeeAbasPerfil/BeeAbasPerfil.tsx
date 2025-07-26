import React, {useState} from "react";
import {IBeeAbasPerfil} from "./IBeeAbasPerfil";
import "./styles.css";
import getLocalStorage from "../../../../utils/getLocalStorage";
import {Tabs} from "antd";

const BeeAbasPerfil: React.FC<IBeeAbasPerfil> = ({
	children,
	initialActiveKey,
}) => {
	const [papel, setPapel] = useState("");
	if (getLocalStorage() != null && papel == "") {
		setPapel(getLocalStorage().papel);
	}
	const childrenArray = React.Children.toArray(children);
	const abas = [
		{
			key: "1",
			label: <span className="text-[#333333] font-medium">Postagens</span>,
			children: <>{childrenArray[0]}</>,
		},
		{
			key: "2",
			label: <span className="text-[#333333] font-medium">Repositórios</span>,
			children: <>{childrenArray[1]}</>,
		},
	];
	if (papel === "mod") {
		abas.push({
			key: "3",
			label: <span className="text-[#333333] font-medium">Categorias</span>,
			children: <>{childrenArray[2]}</>,
		});
	}
	const [activeKey, setActiveKey] = useState(initialActiveKey || abas[0].key);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};
	if (papel === "mod") {
		abas.push({
			key: "4",
			label: <span className="text-[#333333] font-medium">Solicitações</span>,
			children: <>{childrenArray[3]}</>,
		});
	}

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
