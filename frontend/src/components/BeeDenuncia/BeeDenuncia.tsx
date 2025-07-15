import React, {useState} from "react";
import {Divider, List} from "antd";
import {IBeeDenuncia} from "./IBeeDenuncia";
import "./BeeDenuncia.css";

const BeeDenuncia: React.FC<IBeeDenuncia> = ({id, entidade, tipos}) => {
	const [selecionado, setSelecionado] = useState<string | null>(null);

	return (
		<>
			<Divider orientation="left">Tipos de Denúncia</Divider>
			<List
				bordered
				dataSource={tipos}
				renderItem={(item) => (
					<List.Item
						onClick={() => setSelecionado(item)}
						className={selecionado === item ? "item-selecionado" : ""}
						style={{cursor: "pointer"}}
					>
						{item}
					</List.Item>
				)}
			/>
		</>
	);
};

export default BeeDenuncia;
