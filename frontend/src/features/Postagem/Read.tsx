import {useEffect, useState} from "react";
import BeePost from "../../components/BeePost/BeePost";
import PostagemService from "../../services/models/PostagemService";
import {BeePostProps} from "../../components/BeePost/BeePostProps";

const Read: React.FC = () => {
	const [postagens, setPostagens] = useState<BeePostProps[]>([]);

	async function curtido() {
		console.log("Aqui será desenvolvida a lógica do curtir");
	}

	async function comentado() {
		console.log("Aqui será desenvolvida a lógica do comentar");
	}

	async function loadUsers(): Promise<void> {
		void PostagemService.listAll()
			.then((response) => {
				setPostagens(response.data);
			})
			.catch(() => {
				console.log("Não recebeu dados");
			});
	}

	useEffect(() => {
		loadUsers();
	}, []);

	return (
		<>
			{postagens !== undefined &&
				postagens.map((post: BeePostProps, id: number) => (
					<BeePost
						key={id}
						conteudo={post?.conteudo}
						tags={post?.tags}
						curtidas={post?.curtidas}
						comentarios={post?.comentarios}
						usuario={post?.usuario}
						dataPublicacao={post.dataPublicacao}
						imagemPost={post?.imagemPost}
						imagemUsuarioLogado={post?.imagemUsuarioLogado}
						onCurtir={curtido}
						onAbrirComentarios={comentado}
					/>
				))}
		</>
	);
};

export default Read;
