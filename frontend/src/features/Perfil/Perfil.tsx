import BeeAbasPerfil from "./components/BeeAbasPerfil/BeeAbasPerfil";
import type React from "react";
import {useState} from "react";
import BeePost from "../../components/BeePost/BeePost";
import type {IPostagem} from "../../interfaces/Postagem";
import BeeHeaderProfile from "./components/BeeHeaderProfile/BeeHeaderProfile";
import BeePerfilSidebar from "../../components/BeePerfilSidebar/BeePerfilSidebar";
import acessPermissions from "../../utils/acessPermissions";
import {Empty, Spin} from "antd";
import FormCategoria from "./Form/FormCategoria";
import BeeEditTag from "./components/BeeEditTag/BeeEditTag";
import BeeButton from "../../components/BeeButtons/BeeButtons";
import {IRepositorio} from "../../interfaces/Repositorio";
import BeeRepo from "../../components/BeeRepo/BeeRepo";
import useUser from "../../hooks/useUser";
import tagsCategory from "../../utils/tagsCategory";

const Perfil: React.FC = () => {
	let {load} = acessPermissions();
	const [abrirModal, setModal] = useState<Boolean>(false);
	const [key, setKey] = useState<number>(0);
	const {
		categorias,
		comunidades,
		postagens,
		repositorio,
		handleExcluir,
		handleExcluirRepositorio,
	} = useUser();

	const getComunidadeNome = (comunidadeId: number | null): string | null => {
		if (!comunidadeId) return null;
		const comunidade = comunidades.find((c) => c.id === comunidadeId);
		return comunidade?.nome || null;
	};

	const modal = () => {
		if (!abrirModal) return null;
		return (
			<FormCategoria
				key={key}
				label="Criar Categoria"
			/>
		);
	};

	return (
		<>
			{!load ? (
				<Spin />
			) : (
				<div>
					<BeeHeaderProfile />
					<BeeAbasPerfil initialActiveKey="1">
						{postagens?.length ? (
							<div className="space-y-4">
								{postagens.map((post: IPostagem) => {
									const tags = tagsCategory(post.categorias, categorias);
									const comunidadeNome = getComunidadeNome(
										post.comunidade ?? null,
									);

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
									const comunidadeNome = getComunidadeNome(
										repo.comunidade ?? null,
									);

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
						<div>
							<BeeButton
								label="Adicionar categoria"
								onClick={() => {
									setModal(true);
									setKey((prev) => prev + 1);
								}}
							/>
							{/* <FormCategoria /> */}
							<BeeEditTag />
						</div>
					</BeeAbasPerfil>

					<aside className="fixed top-[80px] right-4 w-1/4 min-h-screen shadow-md flex flex-col justify-start px-3 py-4 rounded-xl bg-white z-40 overflow-y-auto gap-4">
						<BeePerfilSidebar />
					</aside>
				</div>
			)}
			{modal()}
		</>
	);
};

export default Perfil;
