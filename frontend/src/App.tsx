import {DiscordLogo, GithubLogo} from "@phosphor-icons/react";
import "./App.css";
import BeeInput from "./components/BeeInput/BeeInput";

function App() {
	return (
		<>
			<BeeInput
				label="usuario"
				placeholder="placeholder"
				icon={GithubLogo}
			/>
		</>
	);
}

export default App;
