import {useEffect, useState} from "react";
import BeeButton from "../BeeButtons/BeeButtons";
import DenunciaService from "../../services/models/DenunciaService";
import {Empty} from "antd";
import PostagemService from "../../services/models/PostagemService";
import RepositorioService from "../../services/models/RepositorioService";
import {useNavigate} from "react-router-dom";
import ComentarioService from "../../services/models/ComentarioService";
import BeeModal from "../BeeModal/BeeModal";

const BeeCardDenuncia = () => {
	const [denuncia, setDenuncia] = useState([]);
	const [postagem, setPostagem] = useState([]);
	const [repositorio, setRepositorio] = useState([]);
	const [comentario, setComentario] = useState([]);
	const [modal, setModal] = useState(false);
	const [feedbackModal, setFeedbackModal] = useState({
		id: 1,
		label: "",
		text: "",
		type: "",
		funcao: () => {},
	});

	const loadDenuncia = async () => {
		try {
			const response = await DenunciaService.listAll();
			setDenuncia(response.data);
		} catch {
			console.error("Não foi possível carregar denuncias");
		}
	};

	const loadPostagem = async () => {
		try {
			const p: any[] = [];
			const den = denuncia.map(async (d: any) => {
				if (d.postagem != null) {
					const response = await PostagemService.get(d.postagem);
					p.push({...response.data, tipo: d.tipo, idDenuncia: d.id});
				}
			});
			await Promise.all(den);
			setPostagem(p);
		} catch {
			console.error("Não foi possível carregar denuncias");
		}
	};

	const loadRepositorio = async () => {
		try {
			const p: any[] = [];
			const den = denuncia.map(async (d: any) => {
				if (d.repositorio != null) {
					const response = await RepositorioService.get(d.repositorio);
					p.push({...response.data, tipo: d.tipo, idDenuncia: d.id});
				}
			});
			await Promise.all(den);
			setRepositorio(p);
		} catch {
			console.error("Não foi possível carregar denuncias");
		}
	};

	const loadComentario = async () => {
		try {
			const p: any[] = [];
			const den = denuncia.map(async (d: any) => {
				if (d.repositorio != null) {
					const response = await ComentarioService.get(d.repositorio);
					p.push({...response.data, tipo: d.tipo, idDenuncia: d.id});
				}
			});
			await Promise.all(den);
			setComentario(p);
		} catch {
			console.error("Não foi possível carregar denuncias");
		}
	};

	useEffect(() => {
		loadDenuncia();
	}, []);

	useEffect(() => {
		loadPostagem();
		loadRepositorio();
		loadComentario();
	}, [denuncia]);

	const handleAprovarClick = async (id: number, tipo: string) => {
		try {
			let excluir: () => Promise<void>;
			let feedbackData: any;
			if (tipo === "post") {
				excluir = async () => {
					try {
						await PostagemService.delete(id);
						window.location.reload();
					} catch {
						console.error("Não foi possível excluír a postagem");
					}
				};

				feedbackData = {
					id,
					label: "Excluir postagem",
					text: "Essa ação acarretará na exclusão da postagem denunciada",
					type: "descartar",
					funcao: excluir,
				};
			} else if (tipo === "repo") {
				excluir = async () => {
					try {
						await RepositorioService.delete(id);
						window.location.reload();
					} catch {
						console.error("Não foi possível excluír o repositório");
					}
				};

				feedbackData = {
					id,
					label: "Excluir Repositório",
					text: "Essa ação acarretará na exclusão do repositório denunciado",
					type: "descartar",
					funcao: excluir,
				};
			} else {
				excluir = async () => {
					try {
						await ComentarioService.delete(id);
						window.location.reload();
					} catch {
						console.error("Não foi possível excluír o comentário");
					}
				};

				feedbackData = {
					id,
					label: "Excluir Comentário",
					text: "Essa ação acarretará na exclusão do comentário denunciado",
					type: "descartar",
					funcao: excluir,
				};
			}

			setFeedbackModal(feedbackData);
			setModal(true);
		} catch (error) {
			console.error("Erro ao aprovar denuncia:", error);
		}
	};

	const handleReprovarClick = async (id: number) => {
		try {
			const excluir = async () => {
				try {
					await DenunciaService.delete(id);
					window.location.reload();
				} catch {
					console.error("Não foi possível excluír a denuncia");
				}
			};
			setFeedbackModal({
				id,
				label: "Excluir Denúncia",
				text: "Essa ação acarretará na exclusão da denúncia",
				type: "descartar",
				funcao: excluir,
			});
			setModal(true);
		} catch (error) {
			console.error("Erro ao reprovar denuncia:", error);
		}
	};

	const navigate = useNavigate();

	return (
		<>
			{modal && (
				<BeeModal
					id={feedbackModal.id}
					key={`${feedbackModal.id}-${Date.now()}`}
					label={feedbackModal.label}
					text={feedbackModal.text}
					type={feedbackModal.type}
					onExcluir={feedbackModal.funcao}
				/>
			)}
			{denuncia.length > 0 ? (
				<div>
					{postagem.length > 0 && (
						<div>
							{postagem.map((post: any) => (
								<div
									key={post.id}
									className="bg-white shadow  rounded-lg p-4 mb-4 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
								>
									<div className="bg-white p-2 rounded-t-lg border-b border-gray-200">
										<div className="flex items-center justify-between relative">
											<p className="text-sm text-gray-600">
												<span className="font-medium">Tipo da denúncia:</span>{" "}
												{post.tipo}
											</p>
											<p className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md select-none bg-[#2db7f5]">
												Postagem
											</p>
										</div>
									</div>
									<div className="flex flex-col space-y-2">
										<p className="mb-3 mt-2">{post.texto}</p>
										{post.imagem && (
											<img
												src={post.imagem || "/placeholder.svg"}
												alt="Imagem do post"
												className="rounded-lg mb-3 w-full object-cover"
											/>
										)}
									</div>

									<div className="px-6 py-2  sm:flex sm:flex-row-reverse sm:px-0 gap-4">
										<BeeButton
											label="Aprovar"
											variante="primaria"
											onClick={() => handleAprovarClick(post.id, "post")}
										/>
										<BeeButton
											label="Reprovar"
											variante="neutro"
											onClick={() => handleReprovarClick(post.idDenuncia)}
										/>
									</div>
								</div>
							))}
						</div>
					)}
					{repositorio.length > 0 && (
						<div>
							{repositorio.map((repo: any) => (
								<div
									key={repo.id}
									className="bg-white shadow  rounded-lg p-4 mb-4 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
								>
									<div className="bg-white p-2 rounded-t-lg border-b border-gray-200">
										<div className="flex items-center justify-between relative">
											<p className="text-sm text-gray-600">
												<span className="font-medium">Tipo da denúncia:</span>{" "}
												{repo.tipo}
											</p>
											<p className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md select-none bg-[#87d068]">
												Repositório
											</p>
										</div>
									</div>
									<div
										className="bg-[#F7F7FA] shadow-md rounded-xl p-3 mb-2 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
										onClick={() => {
											navigate(`/repositorio/${repo.id}`);
										}}
									>
										<h3 className="text-lg font-semibold mt-2">
											{repo.titulo}
										</h3>
										<p className="mb-3 mt-2">{repo.descricao}</p>
									</div>

									<div className="px-6 py-2  sm:flex sm:flex-row-reverse sm:px-0 gap-4">
										<BeeButton
											label="Aprovar"
											variante="primaria"
											onClick={() => handleAprovarClick(repo.id, "repo")}
										/>
										<BeeButton
											label="Reprovar"
											variante="neutro"
											onClick={() => handleReprovarClick(repo.idDenuncia)}
										/>
									</div>
								</div>
							))}
						</div>
					)}
					{comentario.length > 0 && (
						<div>
							{comentario.map((com: any) => (
								<div
									key={com.id}
									className="bg-white shadow  rounded-lg p-4 mb-4 relative w-full flex flex-col gap-1 border border-[#F2F2F7] transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
								>
									<div className="bg-white p-2 rounded-t-lg border-b border-gray-200">
										<div className="flex items-center justify-between relative">
											<p className="text-sm text-gray-600">
												<span className="font-medium">Tipo da denúncia:</span>{" "}
												{com.tipo}
											</p>
											<p className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md select-none bg-[#f50]">
												Comentário
											</p>
										</div>
									</div>
									<div className="flex flex-col space-y-2">
										<p className="mb-3 mt-2">{com.conteudo}</p>
									</div>

									<div className="px-6 py-2  sm:flex sm:flex-row-reverse sm:px-0 gap-4">
										<BeeButton
											label="Aprovar"
											variante="primaria"
											onClick={() => handleAprovarClick(com.id, "com")}
										/>
										<BeeButton
											label="Reprovar"
											variante="neutro"
											onClick={() => handleReprovarClick(com.idDenuncia)}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			) : (
				<Empty
					description="Não há denpuncias"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			)}
		</>
	);
};

export default BeeCardDenuncia;
