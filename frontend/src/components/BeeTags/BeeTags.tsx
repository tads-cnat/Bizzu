"use client";

import type React from "react";
import type IBeeTags from "./IBeeTags";
import {Tag} from "antd";

const BeeTags: React.FC<IBeeTags> = ({label, color}) => {
	return (
		<Tag
			bordered={false}
			color={color}
		>
			#{label}
		</Tag>
	);
};

export default BeeTags;
