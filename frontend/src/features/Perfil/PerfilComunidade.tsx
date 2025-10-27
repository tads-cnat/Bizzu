import {useParams} from "react-router-dom";
import useCommunity from "../../hooks/useCommunity";
import BeeHeaderComunnity from "./components/BeeHeaderCommunity/BeeHeaderCommunity";
import BeeAbasPerfil from "./components/BeeAbasPerfil/BeeAbasPerfil";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import {Empty} from "antd";
import tagsCategory from "../../utils/tagsCategory";
import BeePost from "../../components/BeePost/BeePost";
import {IPostagem} from "../../interfaces/Postagem";
import {IRepositorio} from "../../interfaces/Repositorio";
import {useState} from "react";
import getLocalStorage from "../../utils/getLocalStorage";

const PerfilComunidade = () => {
	const identificator = useParams().id;
	const {
		comunidade,
		categorias,
		comunidades,
		repositorio,
		handleExcluir,
		handleExcluirRepositorio,
		postagens,
	} = useCommunity(Number(identificator));
	const [userLocal, setUserlocal] = useState();
	const [papel, setPapel] = useState("");
	if (getLocalStorage() != null && papel == "") {
		setPapel(getLocalStorage().papel);
		if (userLocal == undefined) setUserlocal(getLocalStorage().username);
	}

	const getComunidadeNome = (comunidadeId: number | null): string | null => {
		if (!comunidadeId) return null;
		const comunidade = comunidades.find((c) => c.id === comunidadeId);
		return comunidade?.nome || null;
	};

	return (
		<>
			<BeeHeaderComunnity comunidade={comunidade} />
			<BeeAbasPerfil
				initialActiveKey={"1"}
				owner={userLocal}
				papel={papel}
				isComunidade={true}
			>
				{postagens?.length ? (
					<div className="space-y-4">
						{postagens.map((post: IPostagem) => {
							const tags = tagsCategory(post.categorias, categorias);
							const comunidadeNome = getComunidadeNome(post.comunidade ?? null);

							return (
								<div
									key={post.id}
									className="mb-6"
								>
									{comunidadeNome && (
										<div className="bg-white p-2 rounded-t-lg border-b border-gray-200">
											<p className="text-sm text-gray-600">
												<span className="font-medium">Comunidade:</span>{" "}
												{comunidadeNome}
											</p>
										</div>
									)}

									<BeePost
										key={post.id}
										id={post.id}
										texto={post.texto}
										tags={tags}
										curtidas={post.curtidas || 0}
										comentarios={post.comentarios || 0}
										usuario={post.usuario}
										dataPublicacao={post.dataPublicacao}
										imagemPost={post.imagem}
										onExcluir={handleExcluir}
										comunidade={comunidadeNome}
									/>
								</div>
							);
						})}
					</div>
				) : (
					<Empty
						description="Não há postagens"
						image={Empty.PRESENTED_IMAGE_SIMPLE}
					/>
				)}
				{repositorio.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{repositorio.map((repo: IRepositorio) => {
							const tags = tagsCategory(repo.categorias, categorias);
							const comunidadeNome = getComunidadeNome(repo.comunidade ?? null);

							return (
								<>
									<BeeRepo
										id={repo.id}
										descricao={repo.descricao}
										dataPublicacao={repo.dataPublicacao}
										usuario={repo.usuario}
										titulo={repo.titulo}
										tags={tags}
										comunidade={comunidadeNome}
										imagemRepo={repo.imagem}
										onExcluir={handleExcluirRepositorio}
									/>
								</>
							);
						})}
					</div>
				) : (
					<Empty
						description="Não há reositórios"
						image={Empty.PRESENTED_IMAGE_SIMPLE}
					/>
				)}
			</BeeAbasPerfil>
		</>
	);
};

export default PerfilComunidade;
