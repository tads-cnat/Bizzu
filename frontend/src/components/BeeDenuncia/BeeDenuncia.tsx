import React, {useState} from "react";
import {Divider, List} from "antd";
import {IBeeDenuncia} from "./IBeeDenuncia";
import "./BeeDenuncia.css";

const BeeDenuncia: React.FC<IBeeDenuncia> = ({tipos, onTipoSelecionado}) => {
	const [selecionado, setSelecionado] = useState<string | null>(null);

	const handleItemClick = (item: any, e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		console.log("item selecionado:", item.value);
		setSelecionado(item.value);
		onTipoSelecionado(item.value);
	};

	return (
		<>
			<Divider orientation="left">Tipos de Denúncia</Divider>
			<List
				bordered
				dataSource={tipos}
				renderItem={(item) => (
					<List.Item
						onClick={(e) => handleItemClick(item, e)}
						className={selecionado === item.value ? "item-selecionado" : ""}
						style={{cursor: "pointer"}}
					>
						{item.label}
					</List.Item>
				)}
			/>
		</>
	);
};

export default BeeDenuncia;
