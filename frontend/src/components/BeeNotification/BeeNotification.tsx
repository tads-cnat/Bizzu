import {Button, notification} from "antd";
import {IBeeNotification} from "./IBeeNotification";
import "./styles.css";
import {Link} from "react-router-dom";

type NotificationType = "success" | "info" | "warning" | "error";

const BeeNotification = ({message, title, type, content}: IBeeNotification) => {
	const [api, contextHolder] = notification.useNotification();

	const openNotificationWithIcon = (type: NotificationType) => {
		api[type]({
			message: title,
			description: <Link to={`/login/`}>{message}</Link>,
		});
	};
	return (
		<>
			{contextHolder}
			<Button onClick={() => openNotificationWithIcon(type)}>{content}</Button>
		</>
	);
};

export default BeeNotification;
