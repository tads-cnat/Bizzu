import {JSX} from "react";
import IBeeTags from "./IBeeTags";

export default function BeeTags(props: IBeeTags): JSX.Element {
	const {label, color} = props;
	return (
		<>
			<div
				className="w-auto h-6 inline-flex rounded-[10px] items-center p-3"
				style={{backgroundColor: color}}
			>
				<p className="text-[#333333] font-semibold text-[12px]">#{label}</p>
			</div>
		</>
	);
}
