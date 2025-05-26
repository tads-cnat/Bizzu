import {AllRoutes} from "./routes/routes";
import { FormPostagem } from "./features/Postagem/Forms/FormPostagem";


function App() {
	return (
		<>
			<div className="min-h-screen flex flex-col">
				<AllRoutes />;
				<FormPostagem />

			</div>
		</>
	);
}

export default App;
