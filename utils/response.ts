import type { Mutation, Query } from "@tanstack/react-query";
import type { MessageInstance } from "antd/es/message/interface";
import type { AppError } from "api/api";

const messageOk = (messageApi: MessageInstance, msg: string) => {
	return messageApi.success(msg);
};

const handleReactQueryError = (
	query: Query<unknown, unknown, unknown> | Mutation<unknown, unknown, unknown>,
	error: Error,
	cbNoti: (type: "error", msg: string) => void,
) => {
	const appError: AppError = error as AppError;

	switch (appError.status) {
		case 401:
		case 403:
			localStorage.removeItem("app");
			window.location.replace("/login");
			return;
		default:
			break;
	}

	// only show error toasts if we already have data in the cache
	// which indicates a failed background update
	if (query.state.data !== undefined) {
		cbNoti("error", error.message);
	}
};

export { messageOk, handleReactQueryError };
