import {UploadSimple} from "@phosphor-icons/react";
import {Button, Upload, UploadFile} from "antd";
import {IBeeArquivo} from "./IBeeArquivo";
import {useEffect, useState} from "react";
import {UploadChangeParam} from "antd/es/upload";
import {Controller} from "react-hook-form";

const BeeArquivo: React.FC<IBeeArquivo> = ({
	name,
	value,
	label,
	onChange,
	multiple,
	control,
	defaultValue,
}: IBeeArquivo) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	useEffect(() => {
		const arquivosOrigem = value ?? defaultValue;
		if (!arquivosOrigem) return;

		const arquivos: UploadFile[] = Array.isArray(arquivosOrigem)
			? (arquivosOrigem
					.map((f, index) => {
						if (typeof f === "string") {
							return {
								uid: `file-${index}`,
								name: f.split("/").pop() ?? `arquivo-${index}`,
								status: "done",
								url: f,
							};
						} else if (f instanceof File) {
							return {
								uid: `file-${index}`,
								name: f.name,
								status: "done",
								originFileObj: f,
							};
						}
						return null;
					})
					.filter(Boolean) as UploadFile[])
			: typeof arquivosOrigem === "string"
				? [
						{
							uid: "file-1",
							name: arquivosOrigem.split("/").pop() ?? "arquivo",
							status: "done",
							url: arquivosOrigem,
						},
					]
				: [
						{
							uid: "file-1",
							name: arquivosOrigem.name,
							status: "done",
							originFileObj: arquivosOrigem,
						},
					];

		setFileList(arquivos);
	}, [defaultValue, value]);

	const handleChange = (
		info: UploadChangeParam<UploadFile>,
		fieldOnChange: (value: any) => void,
	) => {
		let newFileList = info.fileList;

		if (!multiple && newFileList.length > 1) {
			newFileList = [newFileList[newFileList.length - 1]];
		}

		setFileList(newFileList);

		const arquivos = newFileList
			.map((f) => f.originFileObj || f.url)
			.filter(Boolean);
		const finalValue = multiple ? arquivos : (arquivos[0] ?? null);

		fieldOnChange(finalValue);
		onChange?.(finalValue);
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
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({field}) => (
				<Upload
					multiple={multiple}
					listType="picture"
					onChange={(value) => handleChange(value, field.onChange)}
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
			)}
		/>
	);
};

export default BeeArquivo;
