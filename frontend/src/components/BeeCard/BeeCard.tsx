import {Card} from "antd";
import {IBeeCard} from "./IBeeCard";
import {Link} from "react-router-dom";

const {Meta} = Card;

const BeeCard = ({title, description, click, cover}: IBeeCard) => {
	return (
		<>
			<Link to={click}>
				<Card
					title={title}
					style={{width: 500, marginBottom: "10px", justifySelf: "center"}}
					cover={cover}
					hoverable
				>
					<Meta
						description={description}
						style={{marginBottom: "10px"}}
					/>
				</Card>
			</Link>
		</>
	);
};

export default BeeCard;
