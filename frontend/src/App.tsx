import AuthProvider from "./context/Auth/Auth";
import PermissionProvider from "./context/permissions/permission";
import {AllRoutes} from "./routes/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";	

function App() {
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<AuthProvider>
					<PermissionProvider>
						<AllRoutes />
					</PermissionProvider>
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
