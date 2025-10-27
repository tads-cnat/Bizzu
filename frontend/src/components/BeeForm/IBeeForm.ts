export interface IBeeForm {
	schema: any;
	sections: section;
	onSubmit: any;
	options?: any;
	defaultValues?: any
	usuario?: any;
}

export interface section {
	fields: field[];
}

interface field {
	name: string;
	type: string;
	props: any;
}
