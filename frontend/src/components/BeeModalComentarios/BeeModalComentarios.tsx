"use client";

import type React from "react";
import {useState, useEffect} from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import {X, PaperPlaneRight, Warning} from "@phosphor-icons/react";
import BeePost from "../BeePost/BeePost";
import type {
	Comentario,
	ComentariosResponse,
} from "../../interfaces/Comentario";
import ComentarioService from "../../services/models/ComentarioService";
import type {IBeeModalComentarios} from "./IBeeModalComentarios";
import BeeFTPerfil from "../BeeFTPerfil/BeeFTPerfil";

// Função para calcular tempo decorrido
function tempoDesde(data: string): string {
	const date = new Date(data);
	const agora = new Date();
	const diffMs = agora.getTime() - date.getTime();
	const diffSegundos = Math.floor(diffMs / 1000);
	const minutos = Math.floor(diffSegundos / 60);
	const horas = Math.floor(minutos / 60);
	const dias = Math.floor(horas / 24);

	if (dias > 0) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
	if (horas > 0) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
	if (minutos > 0) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
	return "agora mesmo";
}

const BeeModalComentarios: React.FC<IBeeModalComentarios> = ({
	isOpen,
	onClose,
	post,
	onComentarioAdicionado,
}) => {
	const [comentarios, setComentarios] = useState<Comentario[]>([]);
	const [novoComentario, setNovoComentario] = useState("");
	const [loading, setLoading] = useState(false);
	const [enviandoComentario, setEnviandoComentario] = useState(false);
	const [totalComentarios, setTotalComentarios] = useState(0);

	// Carregar comentários quando o modal abrir
	useEffect(() => {
		if (isOpen && post.id) {
			carregarComentarios();
		}
	}, [isOpen, post.id]);

	const carregarComentarios = async () => {
		if (!post.id) return;

		setLoading(true);
		try {
			const response: ComentariosResponse =
				await ComentarioService.getComentariosByPostagem(post.id);
			setComentarios(response.comentarios);
			setTotalComentarios(response.total);
		} catch (error) {
			console.error("Erro ao carregar comentários:", error);
		} finally {
			setLoading(false);
		}
	};

	const enviarComentario = async () => {
		if (!novoComentario.trim() || !post.id || enviandoComentario) return;

		setEnviandoComentario(true);
		try {
			const comentarioCriado = await ComentarioService.criarComentario(
				post.id,
				novoComentario.trim(),
			);

			// Adicionar o novo comentário no início da lista (mais recente)
			setComentarios((prev) => [comentarioCriado, ...prev]);
			setTotalComentarios((prev) => prev + 1);
			setNovoComentario("");

			if (onComentarioAdicionado) {
				onComentarioAdicionado();
			}
		} catch (error) {
			console.error("Erro ao enviar comentário:", error);
			alert("Erro ao enviar comentário. Tente novamente.");
		} finally {
			setEnviandoComentario(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			enviarComentario();
		}
	};

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className="relative z-50"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/30 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
			/>

			<div className="fixed inset-0 z-50 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel
						transition
						className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
					>
						{/* Header do Modal */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<DialogTitle className="text-lg font-semibold text-[#333333]">
								Comentários ({totalComentarios})
							</DialogTitle>
							<button
								onClick={onClose}
								className="rounded-full p-2 hover:bg-gray-100 transition-colors"
							>
								<X
									size={20}
									className="text-gray-500"
								/>
							</button>
						</div>

						{/* Conteúdo do Modal */}
						<div className="max-h-[70vh] overflow-y-auto">
							{/* Post Original */}
							<div className="p-4 border-b border-gray-100">
								<BeePost
									{...post}
									onCurtir={() => {}}
									onAbrirComentarios={() => {}}
									onExcluir={() => {}}
									disableInteractions={true} // Desabilitar interações no post dentro do modal
								/>
							</div>

							{/* Lista de Comentários */}
							<div className="p-4 space-y-4">
								{loading ? (
									<div className="text-center py-8 text-gray-500">
										Carregando comentários...
									</div>
								) : comentarios.length === 0 ? (
									<div className="text-center py-8 text-gray-500">
										Seja o primeiro a comentar!
									</div>
								) : (
									comentarios.map((comentario) => (
										<div
											key={comentario.id}
											className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
										>
											{/* Avatar do usuário */}
											<img
												src={
													comentario.usuario.imagemPerfil
														? `${comentario.usuario.imagemPerfil}`
														: "http://localhost:8000/imgPostagens/usuarios/2025/06/10/sem_imagem_avatar.png"
												}
												alt={comentario.usuario.nome}
												className="w-10 h-10 object-cover flex-shrink-0"
												style={{
													clipPath:
														"polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
												}}
											/>

											{/* Conteúdo do comentário */}
											<div className="flex-1 min-w-0">
												<div className="relative bg-gray-100 rounded-2xl px-4 py-2">
													<div className="flex items-center mb-1">
														<span className="font-semibold text-sm text-[#333333]">
															{comentario.usuario.nome}
														</span>
														<span className="text-xs text-gray-500">
															@{comentario.usuario.username}
														</span>
														<Menu
															as="div"
															className="absolute top-2 right-2 z-10"
														>
															<div>
																<MenuButton className="p-0 m-0 bg-transparent rounded-none shadow-none ring-0 hover:bg-transparent">
																	<Warning
																		size={24}
																		className="text-gray-500 hover:text-red-500"
																	/>
																</MenuButton>
															</div>

															<MenuItems
																transition
																className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
															>
																<div className="py-1">
																	<MenuItem>
																		<a
																			href="#"
																			className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
																		>
																			Denunciar comentário
																		</a>
																	</MenuItem>
																</div>
															</MenuItems>
														</Menu>
													</div>
													<p className="text-sm text-[#333333] break-words">
														{comentario.conteudo}
													</p>
												</div>
												<div className="mt-1 px-2">
													<span className="text-xs text-gray-500">
														{tempoDesde(comentario.dataPostagem)}
													</span>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>

						{/* Campo para novo comentário */}
						<div className="border-t border-gray-200 p-4">
							<div className="flex gap-3">
								<div className="flex-1">
									<textarea
										value={novoComentario}
										onChange={(e) => setNovoComentario(e.target.value)}
										onKeyPress={handleKeyPress}
										placeholder="Escreva um comentário..."
										className="w-full px-4 py-2 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#FCBD18] focus:border-transparent"
										rows={2}
										maxLength={500}
										disabled={enviandoComentario}
									/>
									<div className="flex justify-between items-center mt-1 px-2">
										<span className="text-xs text-gray-500">
											{novoComentario.length}/500
										</span>
									</div>
								</div>
								<button
									onClick={enviarComentario}
									disabled={!novoComentario.trim() || enviandoComentario}
									className="self-center p-2 bg-[#FCBD18] text-white rounded-full hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									<PaperPlaneRight
										size={20}
										weight="bold"
									/>
								</button>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default BeeModalComentarios;
