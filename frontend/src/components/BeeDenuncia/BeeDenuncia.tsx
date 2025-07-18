import React, {useState} from "react";
import {Divider, List} from "antd";
import {IBeeDenuncia} from "./IBeeDenuncia";
import "./BeeDenuncia.css";

const BeeDenuncia: React.FC<IBeeDenuncia> = ({tipos, onTipoSelecionado}) => {
	const [selecionado, setSelecionado] = useState<string | null>(null);
	return (
		<>
			<Divider orientation="left">Tipos de Denúncia</Divider>
			<List
				bordered
				dataSource={tipos}
				renderItem={(item) => (
					<List.Item
						onClick={() => {
							console.log("item selecionado:", item.value);
							setSelecionado(item.value);
							onTipoSelecionado(item.value);
						}}
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
