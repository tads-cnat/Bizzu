export interface IBeeForm {
	schema: any;
	sections: section;
	onSubmit: any;
}

interface section {
	fields: [
		{
			name: string;
			type: string;
			props: any;
		},
	];
}
