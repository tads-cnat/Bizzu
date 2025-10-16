import {Card} from "antd";
import {IBeeCard} from "./IBeeCard";

const {Meta} = Card;

const BeeCard = ({title, description, click, cover}: IBeeCard) => {
	return (
		<>
			<Card
				title={title}
				style={{width: 500, marginBottom: "10px", justifySelf: "center"}}
				onClick={click}
				cover={cover}
				hoverable
			>
				<Meta
					description={description}
					style={{marginBottom: "10px"}}
				/>
			</Card>
		</>
	);
};

export default BeeCard;
