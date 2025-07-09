import {Alert} from "antd";
import {IBeeAlert} from "./IBeeAlert";

const BeeAlert = ({typeAlert, messageAlert}: IBeeAlert) => {
	return (
		<>
			<Alert
				message={messageAlert}
				type={typeAlert}
				showIcon
			/>
		</>
	);
};

export default BeeAlert;
