import {useEffect, useState} from "react";
import {Empty, Tag} from "antd";
import CategoriaService from "../../../../services/models/CategoriaService";
import {Categoria} from "../../../../interfaces/IBeeCategoria";
import BeeModal from "../../../../components/BeeModal/BeeModal";
import FormCategoria from "../../Form/FormCategoria";

const BeeEditTag = () => {
	const [categoria, setcategoria] = useState<Categoria[]>([]);
	const [excluir, setExcluir] = useState<Boolean>(false);
	const [editar, setEditar] = useState<Boolean>(false);
	const [categoriaSelecionada, setSelecionada] = useState<any>();
	const [key, setKey] = useState<number>(0);
	const [keyEdit, setKeyEdit] = useState<number>(0);

	async function loadCategoria() {
		const response = await CategoriaService.listAll();
		setcategoria(response.data);
	}

	const onExcluir = async (id: number) => {
		await CategoriaService.delete(id.id);
		await loadCategoria(); //Para recarregar as categorias então ele espera excluir e recarrega
		setExcluir(false);
	};

	useEffect(() => {
		loadCategoria();
	}, []);

	const modal = () => {
		if (!excluir) return null;
		return (
			<BeeModal
				key={key}
				onExcluir={onExcluir}
				id={categoriaSelecionada}
				text="Você deseja excluir essa categoria?"
				label="Descartar"
				type="descartar"
				openDefault={true}
			/>
		);
	};

	const editarModal = () => {
		if (!editar) return null;
		let tipoSecundario = 1;
		if (categoriaSelecionada.tipo == "per") tipoSecundario = 2;
		else if (categoriaSelecionada.tipo == "tec") tipoSecundario = 3;
		return (
			<FormCategoria
				key={keyEdit}
				label="Editar Categoria"
				defaultValues={{
					id: categoriaSelecionada,
					nome: categoriaSelecionada.nome,
					value: tipoSecundario,
				}}
				type="editar"
			/>
		);
	};

	return (
		<>
			{categoria.length > 0 ? (
				<div className="flex flex-wrap gap-2 mt-2">
					{categoria.map((comunidade) => (
						<div>
							<Tag
								style={{cursor: "pointer"}}
								bordered={false}
								closable
								onClick={(e) => {
									setEditar(true);
									e.preventDefault();
									setSelecionada(comunidade);
									setKeyEdit((prev) => prev + 1);
								}}
								color={
									comunidade.tipo == "mat"
										? "orange"
										: comunidade.tipo == "per"
											? "cyan"
											: "magenta"
								}
								onClose={(e) => {
									setExcluir(true);
									e.preventDefault(); //Para não apagar se eu cancelar
									setSelecionada(comunidade);
									setKey((prev) => prev + 1);
								}}
							>
								{comunidade.nome}
							</Tag>
						</div>
					))}
				</div>
			) : (
				<Empty
					description="Não há categorias cadastradas"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			)}
			{modal()}
			{editarModal()}
		</>
	);
};

export default BeeEditTag;
