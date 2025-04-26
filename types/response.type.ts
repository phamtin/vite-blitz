export type Ok<T> = {
	status: number;
	data: T;
};

export type Err = {
	status: number;
	code: string;
	message: string;
};
