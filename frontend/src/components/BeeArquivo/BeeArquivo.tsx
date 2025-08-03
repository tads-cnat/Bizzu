import {UploadSimple} from "@phosphor-icons/react";
import {Button, Upload, UploadFile} from "antd";
import {IBeeArquivo} from "./IBeeArquivo";
import {useEffect, useState} from "react";
import {UploadChangeParam} from "antd/es/upload";

const BeeArquivo: React.FC<IBeeArquivo> = ({
	value,
	label,
	onChange,
	multiple,
}: IBeeArquivo) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	// Inicializar fileList a partir de value (em edição)
	useEffect(() => {
		if (!value) return;

		let arquivos: UploadFile[] = [];

		if (Array.isArray(value)) {
			arquivos = value
				.map((file: any, index) => {
					if (file instanceof File) {
						return {
							uid: `${index}-${file.name}`,
							name: file.name,
							status: "done",
							originFileObj: file,
						};
					} else if (typeof file === "string") {
						// URL de arquivo já salvo
						return {
							uid: `${index}-${file}`,
							name: file.split("/").pop() ?? `arquivo-${index}`,
							status: "done",
							url: file,
						};
					}
					return null;
				})
				.filter(Boolean) as UploadFile[];
		} else {
			// único arquivo
			if (value instanceof File) {
				arquivos = [
					{
						uid: "1",
						name: value.name,
						status: "done",
						originFileObj: value,
					},
				];
			} else if (typeof value === "string") {
				arquivos = [
					{
						uid: "1",
						name: value.split("/").pop() ?? "arquivo",
						status: "done",
						url: value,
					},
				];
			}
		}

		setFileList(arquivos);
	}, [value]);

	const handleChange = (info: UploadChangeParam<UploadFile>) => {
		let newFileList = info.fileList;

		if (!multiple && newFileList.length > 1) {
			newFileList = [newFileList[newFileList.length - 1]];
		}

		setFileList(newFileList);

		const arquivos = newFileList
			.map((f) => f.originFileObj || f.url)
			.filter(Boolean);

		onChange?.(multiple ? arquivos : (arquivos[0] ?? null));
	};
	const handleRemove = async (arquivos: UploadFile) => {
		const newList = fileList.filter((f) => f.uid !== arquivos.uid);
		setFileList(newList);

		const arquivos2 = newList
			.map((f) => f.originFileObj || f.url)
			.filter(Boolean);
		onChange?.(multiple ? arquivos : (arquivos2[0] ?? null));

		//Adicionar chamada de API para deletar caso um arquivo já está gurdado no banco em atualizar

		return true;
	};

	return (
		<Upload
			multiple={multiple}
			listType="picture"
			onChange={handleChange}
			onRemove={handleRemove}
			beforeUpload={() => false}
			fileList={fileList}
		>
			<Button
				type="primary"
				style={{
					backgroundColor: "#FCBD18",
				}}
				icon={<UploadSimple />}
				className="mb-2"
			>
				{label}
			</Button>
		</Upload>
	);
};

export default BeeArquivo;
