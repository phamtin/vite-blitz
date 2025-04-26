import ky, {
	type BeforeErrorHook,
	HTTPError,
	type KyResponse,
	type NormalizedOptions,
} from "ky";

export class AppError extends HTTPError {
	status: number;

	constructor(
		status: number,
		message: string,
		response: KyResponse,
		request: Request,
		options: NormalizedOptions,
	) {
		super(response, request, options);
		this.status = status;
		this.message = message;
	}
}

const api = ky.extend({
	// prefixUrl: "http://149.28.151.181:8080",
	prefixUrl: import.meta.env.VITE_API_URL,
	timeout: 10000,
	throwHttpErrors: true,
	retry: {
		limit: 0,
		methods: ["get", "post", "put", "patch", "delete"],
		statusCodes: [408, 429, 500, 502, 503],
	},
	hooks: {
		beforeRequest: [
			(request) => {
				const data = JSON.parse(localStorage.getItem("app") || "{}");
				if (data.state?.auth?.currentLoggedInUser?.jwt) {
					const jwt = data.state.auth.currentLoggedInUser.jwt;
					request.headers.set("Authorization", `Bearer ${jwt}`);
				}
				return request;
			},
		],
		afterResponse: [
			async (request, options, response) => {
				const copiedResponse = response.clone();
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const r: any = await response.json();

				switch (r.status) {
					case 400:
						throw new AppError(400, r.message, response, request, options);
					case 401:
						throw new AppError(401, r.message, response, request, options);
					case 403:
						throw new AppError(403, r.message, response, request, options);
					case 500:
						throw new AppError(403, r.message, response, request, options);
					default:
						break;
				}

				return copiedResponse;
			},
		],
		beforeError: [
			(error) => {
				const { response, request, options } = error;

				return new AppError(
					response.status,
					error.message,
					response,
					request,
					options,
				);
			},
		] as BeforeErrorHook[],
	},
});

export default api;
