import "./App.css";
import Post from "./components/Post/Post";

function App() {
	const dummyPost = {
		username: "joaosilva",
		profilePicUrl: "https://via.placeholder.com/40",
		timeAgo: "2 horas atrás",
		content: "Esse é um post de teste com uma imagem e algumas tags.",
		imageUrl: "https://i.imgur.com/1kLxFNS.png",
		tags: [
			{label: "INFOWEB", color: "#FCBD18"},
			{label: "REACT", color: "#61DBFB"},
			{label: "TESTE", color: "#FF69B4"},
		],
		likesCount: 23,
		commentsCount: 5,
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="w-[600px]">
				<Post {...dummyPost} />
			</div>
		</div>
	);
}

export default App;
