import React, {useState} from "react";
import {Tabs} from "antd";
import {IBeeAbasPerfil} from "./IBeeAbasPerfil";

const BeeAbasPerfil: React.FC<IBeeAbasPerfil> = ({
	children,
	initialActiveKey,
}) => {
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
	const [activeKey, setActiveKey] = useState(initialActiveKey || abas[0].key);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	return (
		<Tabs
			type="card"
			activeKey={activeKey}
			onChange={onChange}
			items={abas}
		/>
	);
};

export default BeeAbasPerfil;
