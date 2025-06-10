import {Card} from "antd";
import {IBeeCard} from "./IBeeCard";
import BeeButton from "../BeeButtons/BeeButtons";

const {Meta} = Card;

const BeeCard = ({title, description}: IBeeCard) => {
	return (
		<>
			<Card
				title={title}
				style={{width: 300, marginBottom: "10px", justifySelf: "center"}}
			>
				<Meta
					description={description}
					style={{marginBottom: "10px"}}
				/>
				<BeeButton
					variante="primaria"
					label="Seguir"
				/>
			</Card>
		</>
	);
};

export default BeeCard;
