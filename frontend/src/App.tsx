import AuthProvider from "./context/Auth/Auth";
import {AllRoutes} from "./routes/routes";

function App() {
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<AuthProvider>
					<AllRoutes />;
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
