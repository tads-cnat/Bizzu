import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
	<GoogleOAuthProvider clientId="339878763062-a58uon1csivv1ru7ubt1g60cmc5tao3a.apps.googleusercontent.com">
		<App />
	</GoogleOAuthProvider>
	</BrowserRouter>,
);
